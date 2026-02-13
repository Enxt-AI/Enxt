"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Share2,
  Loader2,
  GripVertical,
  ExternalLink,
  Save,
  X,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Mail,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API_BASE = "http://localhost:3000/api/socials";

const ICON_OPTIONS = [
  { label: "LinkedIn", value: "Linkedin", icon: Linkedin },
  { label: "Twitter", value: "Twitter", icon: Twitter },
  { label: "GitHub", value: "Github", icon: Github },
  { label: "Instagram", value: "Instagram", icon: Instagram },
  { label: "Facebook", value: "Facebook", icon: Facebook },
  { label: "YouTube", value: "Youtube", icon: Youtube },
  { label: "Website", value: "Globe", icon: Globe },
  { label: "Email", value: "Mail", icon: Mail },
];

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  active: boolean;
  order: number;
}

export default function SocialsPage() {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Drag state
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  // Form state
  const [formUrl, setFormUrl] = useState("");
  const [formIcon, setFormIcon] = useState(ICON_OPTIONS[0].value);

  const fetchSocials = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSocials(data);
      }
    } catch (err) {
      console.error("Failed to fetch socials:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSocials();
  }, [fetchSocials]);

  const resetForm = () => {
    setFormUrl("");
    setFormIcon(ICON_OPTIONS[0].value);
    setEditingSocial(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (social: SocialLink) => {
    setEditingSocial(social);
    setFormUrl(social.url);
    setFormIcon(social.icon);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const selectedOption = ICON_OPTIONS.find((opt) => opt.value === formIcon);
    const platformName = selectedOption ? selectedOption.label : formIcon;

    try {
      if (editingSocial) {
        await fetch(`${API_BASE}/${editingSocial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platform: platformName,
            url: formUrl,
            icon: formIcon,
          }),
        });
      } else {
        await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platform: platformName,
            url: formUrl,
            icon: formIcon,
          }),
        });
      }
      resetForm();
      await fetchSocials();
    } catch (err) {
      console.error("Failed to save social link:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await fetchSocials();
    } catch (err) {
      console.error("Failed to delete social link:", err);
    }
  };

  // Drag and drop - placeholder for now as reorder API might not exist yet for socials
  // but logic is same as partners if we implement reorder endpoint
  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDraggingIdx(index);
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = async () => {
    if (dragItem.current === null || dragOverItem.current === null) {
      setDraggingIdx(null);
      return;
    }

    const reordered = [...socials];
    const [draggedItem] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, draggedItem);

    setSocials(reordered);
    setDraggingIdx(null);
    dragItem.current = null;
    dragOverItem.current = null;

    // TODO: Implement reorder API if needed
    /*
    try {
      await fetch(`${API_BASE}/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: reordered.map((p) => p.id) }),
      });
    } catch (err) {
       console.error("Failed to save order:", err);
       await fetchSocials();
    }
    */
  };

  const getIconComponent = (iconName: string) => {
    const option = ICON_OPTIONS.find((opt) => opt.value === iconName);
    const Icon = option ? option.icon : Share2;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Links</h1>
          <p className="text-muted-foreground">
            Manage your social media links displayed in the footer.
          </p>
        </div>
        <Button onClick={openCreateForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Social Link
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social Links List</CardTitle>
          <CardDescription>A list of all active social links.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : socials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Share2 className="h-12 w-12 text-muted-foreground/30" />
              <h3 className="mt-4 text-lg font-semibold">
                No social links found
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2">
                Add your social media profiles to display them on your website.
              </p>
              <Button
                onClick={openCreateForm}
                variant="outline"
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Social Link
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {socials.map((social, idx) => (
                  <TableRow
                    key={social.id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragEnter={() => handleDragEnter(idx)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className={`cursor-grab active:cursor-grabbing ${
                      draggingIdx === idx ? "opacity-40 bg-muted/50" : ""
                    }`}
                  >
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                    </TableCell>
                    <TableCell className="font-medium">
                      {social.platform}
                    </TableCell>
                    <TableCell>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline max-w-[200px] truncate"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {social.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded bg-muted">
                          {getIconComponent(social.icon)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {social.icon}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(social)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(social.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-lg shadow-xl animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                {editingSocial ? "Edit Social Link" : "Add New Social Link"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetForm}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label
                    htmlFor="url"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Profile URL <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="url"
                    type="url"
                    required
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="icon"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Icon
                  </label>
                  <select
                    id="icon"
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editingSocial ? "Save Changes" : "Create Link"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Delete Link
              </CardTitle>
              <CardDescription>
                Are you sure you want to delete this social link?
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
