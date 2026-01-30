import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Pencil, Trash2, Loader2, GripVertical, Image } from "lucide-react";
import * as Icons from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  icon_url: string | null;
  background_image: string | null;
  features: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const availableIcons = [
  { value: "Globe", label: "Globe (Web)" },
  { value: "Smartphone", label: "Smartphone (App)" },
  { value: "Server", label: "Server (Hosting)" },
  { value: "Palette", label: "Palette (Design)" },
  { value: "Video", label: "Video (Editing)" },
  { value: "Shield", label: "Shield (Security)" },
  { value: "Code", label: "Code" },
  { value: "Database", label: "Database" },
  { value: "Cloud", label: "Cloud" },
  { value: "Settings", label: "Settings" },
  { value: "Cpu", label: "CPU" },
  { value: "Monitor", label: "Monitor" },
  { value: "Wifi", label: "WiFi" },
  { value: "Lock", label: "Lock" },
  { value: "Zap", label: "Zap" },
];

const initialFormData = {
  title: "",
  description: "",
  icon: "Globe",
  icon_url: null as string | null,
  background_image: null as string | null,
  features: "",
  display_order: 0,
  is_active: true,
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedService(null);
    setFormData({
      ...initialFormData,
      display_order: services.length + 1,
    });
    setDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      icon_url: service.icon_url,
      background_image: service.background_image,
      features: service.features.join(", "),
      display_order: service.display_order,
      is_active: service.is_active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const featuresArray = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const serviceData = {
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        icon_url: formData.icon_url,
        background_image: formData.background_image,
        features: featuresArray,
        display_order: formData.display_order,
        is_active: formData.is_active,
      };

      if (selectedService) {
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", selectedService.id);
        if (error) throw error;
        toast({ title: "Service updated successfully" });
      } else {
        const { error } = await supabase.from("services").insert(serviceData);
        if (error) throw error;
        toast({ title: "Service created successfully" });
      }

      setDialogOpen(false);
      fetchServices();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedService) return;

    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", selectedService.id);

      if (error) throw error;
      toast({ title: "Service deleted successfully" });
      setDeleteDialogOpen(false);
      setSelectedService(null);
      fetchServices();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const { error } = await supabase
        .from("services")
        .update({ is_active: !service.is_active })
        .eq("id", service.id);

      if (error) throw error;
      toast({
        title: service.is_active ? "Service deactivated" : "Service activated",
      });
      fetchServices();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const DynamicIcon = ({ name }: { name: string }) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const ServiceIcon = ({ service }: { service: Service }) => {
    if (service.icon_url) {
      return (
        <img 
          src={service.icon_url} 
          alt={service.title}
          className="h-5 w-5 object-contain"
        />
      );
    }
    return <DynamicIcon name={service.icon} />;
  };

  const handleIconUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `service-icons/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("site_assets")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("site_assets")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleBackgroundUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `service-backgrounds/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("site_assets")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("site_assets")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">
            Manage the services displayed on your homepage
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Order</TableHead>
              <TableHead className="w-12">Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Features</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No services found. Create your first service.
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      {service.display_order}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ServiceIcon service={service} />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={service.is_active ? "active" : "inactive"} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(service)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleActive(service)}
                      >
                        <Switch checked={service.is_active} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedService(service);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedService ? "Edit Service" : "Create Service"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Website Development"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the service..."
                rows={2}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Icon</Label>
              <Tabs 
                defaultValue={formData.icon_url ? "upload" : "preset"} 
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preset" className="flex items-center gap-2">
                    <Icons.Shapes className="h-4 w-4" />
                    Preset Icon
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Custom Image
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="preset" className="mt-2">
                  <Select
                    value={formData.icon}
                    onValueChange={(value) =>
                      setFormData({ ...formData, icon: value, icon_url: null })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          <div className="flex items-center gap-2">
                            <DynamicIcon name={icon.value} />
                            <span>{icon.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TabsContent>
                <TabsContent value="upload" className="mt-2">
                  <ImageUpload
                    value={formData.icon_url}
                    onChange={(url) => setFormData({ ...formData, icon_url: url })}
                    onUpload={handleIconUpload}
                    label=""
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended: Square image, min 64x64px, PNG or SVG
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-1">
              <Label>Background Image (Optional)</Label>
              <ImageUpload
                value={formData.background_image}
                onChange={(url) => setFormData({ ...formData, background_image: url })}
                onUpload={handleBackgroundUpload}
                label=""
              />
              <p className="text-xs text-muted-foreground">
                Card background image. Recommended: 400x300px or larger.
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                min={1}
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    display_order: parseInt(e.target.value) || 0,
                  })
                }
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input
                id="features"
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                placeholder="e.g., Custom Design, SEO Optimized, Mobile First"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label htmlFor="is_active">Active (visible on homepage)</Label>
            </div>
            </div>

            <DialogFooter className="mt-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {selectedService ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Service"
        description={`Are you sure you want to delete "${selectedService?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
