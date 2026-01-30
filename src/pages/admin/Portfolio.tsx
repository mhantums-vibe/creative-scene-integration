import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Image } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  full_description: string | null;
  category: string | null;
  image_url: string | null;
  technologies: string[];
  client_name: string | null;
  live_url: string | null;
  github_url: string | null;
  completion_date: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

const categories = [
  "Web Application",
  "Mobile App",
  "E-commerce",
  "Corporate Website",
  "Landing Page",
  "Dashboard",
  "API/Backend",
  "Other",
];

const initialFormData = {
  title: "",
  slug: "",
  description: "",
  full_description: "",
  category: "Web Application",
  image_url: "",
  technologies: "",
  client_name: "",
  live_url: "",
  github_url: "",
  completion_date: "",
  is_featured: false,
  is_active: true,
  display_order: 0,
};

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      logger.error("Error fetching portfolio items", error);
      toast.error("Failed to fetch portfolio items");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: selectedItem ? formData.slug : generateSlug(title),
    });
  };

  const handleEdit = (item: PortfolioItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      description: item.description || "",
      full_description: item.full_description || "",
      category: item.category || "Web Application",
      image_url: item.image_url || "",
      technologies: item.technologies?.join(", ") || "",
      client_name: item.client_name || "",
      live_url: item.live_url || "",
      github_url: item.github_url || "",
      completion_date: item.completion_date || "",
      is_featured: item.is_featured ?? false,
      is_active: item.is_active ?? true,
      display_order: item.display_order ?? 0,
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setFormData({
      ...initialFormData,
      display_order: items.length + 1,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const technologiesArray = formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const itemData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description || null,
        full_description: formData.full_description || null,
        category: formData.category,
        image_url: formData.image_url || null,
        technologies: technologiesArray,
        client_name: formData.client_name || null,
        live_url: formData.live_url || null,
        github_url: formData.github_url || null,
        completion_date: formData.completion_date || null,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        display_order: formData.display_order,
      };

      if (selectedItem) {
        const { error } = await supabase
          .from("portfolio_items")
          .update(itemData)
          .eq("id", selectedItem.id);

        if (error) throw error;
        toast.success("Portfolio item updated");
      } else {
        const { error } = await supabase
          .from("portfolio_items")
          .insert(itemData);

        if (error) throw error;
        toast.success("Portfolio item created");
      }

      setIsDialogOpen(false);
      fetchItems();
    } catch (error) {
      logger.error("Error saving portfolio item", error);
      toast.error("Failed to save portfolio item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      const { error } = await supabase
        .from("portfolio_items")
        .delete()
        .eq("id", selectedItem.id);

      if (error) throw error;
      toast.success("Portfolio item deleted");
      setIsDeleteDialogOpen(false);
      fetchItems();
    } catch (error) {
      logger.error("Error deleting portfolio item", error);
      toast.error("Failed to delete portfolio item");
    }
  };

  const handleToggleActive = async (item: PortfolioItem) => {
    try {
      const { error } = await supabase
        .from("portfolio_items")
        .update({ is_active: !item.is_active })
        .eq("id", item.id);

      if (error) throw error;
      toast.success(`Project ${item.is_active ? "deactivated" : "activated"}`);
      fetchItems();
    } catch (error) {
      logger.error("Error toggling portfolio status", error);
      toast.error("Failed to update portfolio status");
    }
  };

  const handleToggleFeatured = async (item: PortfolioItem) => {
    try {
      const { error } = await supabase
        .from("portfolio_items")
        .update({ is_featured: !item.is_featured })
        .eq("id", item.id);

      if (error) throw error;
      toast.success(`Project ${item.is_featured ? "unfeatured" : "featured"}`);
      fetchItems();
    } catch (error) {
      logger.error("Error toggling featured status", error);
      toast.error("Failed to update featured status");
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("site_assets")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("site_assets")
      .getPublicUrl(filePath);

    return data.publicUrl;
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground">Manage your project showcase</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Links</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No portfolio items found. Add your first project.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                          <Image className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        {item.client_name && (
                          <p className="text-xs text-muted-foreground">{item.client_name}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-muted rounded-md text-xs">
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {item.technologies?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[10px]"
                          >
                            {tech}
                          </span>
                        ))}
                        {(item.technologies?.length || 0) > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{(item.technologies?.length || 0) - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {item.live_url && (
                          <a
                            href={item.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-xs flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Live
                          </a>
                        )}
                        {item.github_url && (
                          <a
                            href={item.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:underline text-xs"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <StatusBadge status={item.is_active ? "Active" : "Inactive"} />
                        {item.is_featured && (
                          <span className="text-[10px] text-amber-600 font-medium">★ Featured</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Switch
                          checked={item.is_active}
                          onCheckedChange={() => handleToggleActive(item)}
                        />
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDeleteDialogOpen(true);
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
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItem ? "Edit Project" : "Add New Project"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., E-commerce Platform"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e-commerce-platform"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client_name">Client Name</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="e.g., Acme Corp"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                placeholder="Brief project summary for cards..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description">Full Description</Label>
              <Textarea
                id="full_description"
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                rows={4}
                placeholder="Detailed project description for the detail page..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="e.g., React, Node.js, PostgreSQL, Tailwind CSS"
              />
            </div>

            <div className="space-y-2">
              <Label>Project Image</Label>
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url || "" })}
                onUpload={handleImageUpload}
                label=""
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="live_url">Live URL</Label>
                <Input
                  id="live_url"
                  type="url"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="completion_date">Completion Date</Label>
                <Input
                  id="completion_date"
                  type="date"
                  value={formData.completion_date}
                  onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  min={0}
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
            </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {selectedItem ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Project"
        description={`Are you sure you want to delete "${selectedItem?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
