import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface UserWithRole {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  role?: AppRole;
  role_id?: string;
}

const roleOptions: AppRole[] = ["admin", "manager", "staff", "customer"];

export default function AdminUsers() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [selectedRole, setSelectedRole] = useState<AppRole>("customer");

  const fetchUsers = async () => {
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      // Combine profiles with roles
      const usersWithRoles = (profiles || []).map((profile) => {
        const userRole = roles?.find((r) => r.user_id === profile.user_id);
        return {
          ...profile,
          role: userRole?.role as AppRole || "customer",
          role_id: userRole?.id,
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      logger.error("Error fetching users", error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openRoleDialog = (user: UserWithRole) => {
    setSelectedUser(user);
    setSelectedRole(user.role || "customer");
    setIsRoleDialogOpen(true);
  };

  const handleRoleChange = async () => {
    if (!selectedUser) return;

    try {
      if (selectedUser.role_id) {
        // Update existing role
        const { error } = await supabase
          .from("user_roles")
          .update({ role: selectedRole })
          .eq("id", selectedUser.role_id);

        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from("user_roles")
          .insert({
            user_id: selectedUser.user_id,
            role: selectedRole,
          });

        if (error) throw error;
      }

      toast.success("Role updated");
      setIsRoleDialogOpen(false);
      fetchUsers();
    } catch (error) {
      logger.error("Error updating role", error);
      toast.error("Failed to update role");
    }
  };

  const handleDeleteRole = async () => {
    if (!selectedUser?.role_id) return;

    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("id", selectedUser.role_id);

      if (error) throw error;
      toast.success("Role removed");
      setIsDeleteDialogOpen(false);
      fetchUsers();
    } catch (error) {
      logger.error("Error deleting role", error);
      toast.error("Failed to delete role");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground">Manage users and their roles</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.full_name || "Unnamed User"}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{user.phone || "-"}</p>
                        {user.address && (
                          <p className="text-muted-foreground truncate max-w-48">{user.address}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.role || "customer"} />
                    </TableCell>
                    <TableCell>
                      {format(new Date(user.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openRoleDialog(user)}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        {user.role_id && user.role !== "customer" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                User: <span className="font-medium text-foreground">{selectedUser?.full_name || "Unnamed"}</span>
              </p>
              <Select value={selectedRole} onValueChange={(value: AppRole) => setSelectedRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role} className="capitalize">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRoleChange}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Remove Role"
        description={`Are you sure you want to remove the ${selectedUser?.role} role from ${selectedUser?.full_name}? They will revert to a customer role.`}
        confirmLabel="Remove"
        variant="destructive"
        onConfirm={handleDeleteRole}
      />
    </div>
  );
}
