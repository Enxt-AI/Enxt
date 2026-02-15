"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Loader2, Save, X, Film } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const API_BASE = "http://localhost:3000/api/ai-film";

type Tab =
  | "hero"
  | "portfolio"
  | "process"
  | "services"
  | "awards"
  | "team"
  | "contact";

const TABS: { key: Tab; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "portfolio", label: "Portfolio" },
  { key: "process", label: "Process Steps" },
  { key: "services", label: "Services" },
  { key: "awards", label: "Awards" },
  { key: "team", label: "Team" },
  { key: "contact", label: "Contact" },
];

// ─── Hero Section ────────────────────────────────────────────
function HeroTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [titleLine1, setTitleLine1] = useState("AI FILM");
  const [titleLine2, setTitleLine2] = useState("PRODUCTION");
  const [titleLine3, setTitleLine3] = useState("WITHOUT LIMITS");
  const [buttonText, setButtonText] = useState("Start Creating");
  const [buttonLink, setButtonLink] = useState("#contact");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/hero`);
        const data = await res.json();
        if (data) {
          setVideoUrl(data.videoUrl || "");
          setTitleLine1(data.titleLine1 || "AI FILM");
          setTitleLine2(data.titleLine2 || "PRODUCTION");
          setTitleLine3(data.titleLine3 || "WITHOUT LIMITS");
          setButtonText(data.buttonText || "Start Creating");
          setButtonLink(data.buttonLink || "#contact");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/hero`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoUrl,
          titleLine1,
          titleLine2,
          titleLine3,
          buttonText,
          buttonLink,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Hero section updated");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>
          Background video, title lines, and CTA button.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Video URL <span className="text-destructive">*</span>
            </label>
            <Input
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title Line 1</label>
              <Input
                value={titleLine1}
                onChange={(e) => setTitleLine1(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title Line 2</label>
              <Input
                value={titleLine2}
                onChange={(e) => setTitleLine2(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title Line 3</label>
              <Input
                value={titleLine3}
                onChange={(e) => setTitleLine3(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Link</label>
              <Input
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" disabled={saving || !videoUrl}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Portfolio Section ───────────────────────────────────────
function PortfolioTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("Creative Productions");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("Featured Video");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/portfolio`);
        const data = await res.json();
        if (data) {
          setSectionTitle(data.sectionTitle || "Creative Productions");
          setDescription(data.description || "");
          setVideoUrl(data.videoUrl || "");
          setVideoTitle(data.videoTitle || "Featured Video");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionTitle,
          description,
          videoUrl,
          videoTitle,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Portfolio section updated");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Portfolio Section</CardTitle>
        <CardDescription>
          Featured work showcase with YouTube embed video.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Section Title</label>
            <Input
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              YouTube Embed URL <span className="text-destructive">*</span>
            </label>
            <Input
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Video Title</label>
            <Input
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={saving || !videoUrl}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Contact Section ─────────────────────────────────────────
function ContactTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("Ready to Light Up the Screen?");
  const [subtitle, setSubtitle] = useState(
    "Book a discovery call to discuss your project.",
  );
  const [buttonText, setButtonText] = useState("Book Discovery Call");
  const [buttonLink, setButtonLink] = useState("https://cal.com");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/contact`);
        const data = await res.json();
        if (data) {
          setTitle(data.title || "Ready to Light Up the Screen?");
          setSubtitle(
            data.subtitle || "Book a discovery call to discuss your project.",
          );
          setButtonText(data.buttonText || "Book Discovery Call");
          setButtonLink(data.buttonLink || "https://cal.com");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, buttonText, buttonLink }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Contact section updated");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Contact CTA Section</CardTitle>
        <CardDescription>
          Call-to-action heading and booking button.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Subtitle</label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Link</label>
              <Input
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Process Steps CRUD ──────────────────────────────────────
interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  order: number;
}

function ProcessTab() {
  const [items, setItems] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ProcessStep | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formNumber, setFormNumber] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/process`);
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const resetForm = () => {
    setFormNumber("");
    setFormTitle("");
    setFormDesc("");
    setEditing(null);
    setShowForm(false);
  };
  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };
  const openEdit = (item: ProcessStep) => {
    setEditing(item);
    setFormNumber(item.number);
    setFormTitle(item.title);
    setFormDesc(item.description);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      number: formNumber,
      title: formTitle,
      description: formDesc,
    };
    try {
      if (editing) {
        await fetch(`${API_BASE}/process/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_BASE}/process`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      await fetchItems();
      toast.success(editing ? "Step updated" : "Step added");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/process/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await fetchItems();
      toast.success("Step deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div />
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Step
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Process Steps</CardTitle>
          <CardDescription>
            Steps displayed in the &quot;How We Create Magic&quot; section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No process steps yet. Add your first step.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="secondary">{item.number}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(item.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
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
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-lg shadow-xl animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{editing ? "Edit Step" : "Add New Step"}</CardTitle>
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
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Number <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    value={formNumber}
                    onChange={(e) => setFormNumber(e.target.value)}
                    placeholder="01"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Concept & Script"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    required
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editing ? "Save Changes" : "Add Step"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" /> Delete Step
              </CardTitle>
              <CardDescription>This action cannot be undone.</CardDescription>
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
    </>
  );
}

// ─── Services CRUD ───────────────────────────────────────────
interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
}

function ServicesTab() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/services`);
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const resetForm = () => {
    setFormTitle("");
    setFormDesc("");
    setFormImage("");
    setEditing(null);
    setShowForm(false);
  };
  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };
  const openEdit = (item: Service) => {
    setEditing(item);
    setFormTitle(item.title);
    setFormDesc(item.description);
    setFormImage(item.imageUrl);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: formTitle,
      description: formDesc,
      imageUrl: formImage,
    };
    try {
      if (editing) {
        await fetch(`${API_BASE}/services/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_BASE}/services`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      await fetchItems();
      toast.success(editing ? "Service updated" : "Service added");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/services/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await fetchItems();
      toast.success("Service deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div />
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>
            Services shown in the &quot;What We Develop&quot; section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No services yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {item.description}
                    </TableCell>
                    <TableCell>
                      <a
                        href={item.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(item.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
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
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-lg shadow-xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                {editing ? "Edit Service" : "Add New Service"}
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
            <CardContent className="overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Campaign & Ad Content"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    required
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Service Image <span className="text-destructive">*</span>
                  </label>
                  <ImageUpload
                    value={formImage}
                    onChange={(url) => setFormImage(url)}
                    onRemove={() => setFormImage("")}
                    disabled={saving}
                  />
                  {formImage && (
                    <p className="text-[10px] text-muted-foreground truncate max-w-full">
                      {formImage}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editing ? "Save Changes" : "Add Service"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" /> Delete Service
              </CardTitle>
              <CardDescription>This action cannot be undone.</CardDescription>
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
    </>
  );
}

// ─── Awards CRUD ─────────────────────────────────────────────
interface Award {
  id: string;
  title: string;
  category: string;
  year: string;
  icon: string;
  order: number;
}

const ICON_OPTIONS = ["Trophy", "Star", "Award", "Crown"];

function AwardsTab() {
  const [items, setItems] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Award | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formYear, setFormYear] = useState("");
  const [formIcon, setFormIcon] = useState("Trophy");

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/awards`);
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const resetForm = () => {
    setFormTitle("");
    setFormCategory("");
    setFormYear("");
    setFormIcon("Trophy");
    setEditing(null);
    setShowForm(false);
  };
  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };
  const openEdit = (item: Award) => {
    setEditing(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormYear(item.year);
    setFormIcon(item.icon);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: formTitle,
      category: formCategory,
      year: formYear,
      icon: formIcon,
    };
    try {
      if (editing) {
        await fetch(`${API_BASE}/awards/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_BASE}/awards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      await fetchItems();
      toast.success(editing ? "Award updated" : "Award added");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/awards/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await fetchItems();
      toast.success("Award deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div />
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Award
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Awards</CardTitle>
          <CardDescription>
            Recognition and awards displayed on the page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No awards yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.year}</Badge>
                    </TableCell>
                    <TableCell>{item.icon}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(item.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
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
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-lg shadow-xl animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{editing ? "Edit Award" : "Add New Award"}</CardTitle>
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
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Cannes Lion"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Category <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="Innovation in AI"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Year <span className="text-destructive">*</span>
                    </label>
                    <Input
                      required
                      value={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                      placeholder="2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Icon</label>
                    <div className="flex gap-2 flex-wrap">
                      {ICON_OPTIONS.map((icon) => (
                        <Button
                          key={icon}
                          type="button"
                          variant={formIcon === icon ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormIcon(icon)}
                        >
                          {icon}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editing ? "Save Changes" : "Add Award"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" /> Delete Award
              </CardTitle>
              <CardDescription>This action cannot be undone.</CardDescription>
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
    </>
  );
}

// ─── Team CRUD ───────────────────────────────────────────────
interface TeamMember {
  id: string;
  name: string;
  crime: string;
  bounty: string;
  description: string;
  imageUrl: string;
  order: number;
}

function TeamTab() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formName, setFormName] = useState("");
  const [formCrime, setFormCrime] = useState("");
  const [formBounty, setFormBounty] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/team-members`);
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const resetForm = () => {
    setFormName("");
    setFormCrime("");
    setFormBounty("");
    setFormDesc("");
    setFormImage("");
    setEditing(null);
    setShowForm(false);
  };
  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };
  const openEdit = (item: TeamMember) => {
    setEditing(item);
    setFormName(item.name);
    setFormCrime(item.crime);
    setFormBounty(item.bounty);
    setFormDesc(item.description);
    setFormImage(item.imageUrl);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: formName,
      crime: formCrime,
      bounty: formBounty,
      description: formDesc,
      imageUrl: formImage,
    };
    try {
      if (editing) {
        await fetch(`${API_BASE}/team-members/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_BASE}/team-members`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      await fetchItems();
      toast.success(editing ? "Member updated" : "Member added");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/team-members/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await fetchItems();
      toast.success("Member deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div />
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Member
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            &quot;Wanted&quot; poster team section members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No team members yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Crime</TableHead>
                  <TableHead>Bounty</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {item.crime}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.bounty}</Badge>
                    </TableCell>
                    <TableCell>
                      <a
                        href={item.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(item.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
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
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-lg shadow-xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                {editing ? "Edit Member" : "Add New Member"}
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
            <CardContent className="overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Marcus 'The Pixel Bandit'"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Crime <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    value={formCrime}
                    onChange={(e) => setFormCrime(e.target.value)}
                    placeholder="ARMED CREATIVE ROBBERY"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Bounty <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    value={formBounty}
                    onChange={(e) => setFormBounty(e.target.value)}
                    placeholder="$8,500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    required
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Photo <span className="text-destructive">*</span>
                  </label>
                  <ImageUpload
                    value={formImage}
                    onChange={(url) => setFormImage(url)}
                    onRemove={() => setFormImage("")}
                    disabled={saving}
                  />
                  {formImage && (
                    <p className="text-[10px] text-muted-foreground truncate max-w-full">
                      {formImage}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editing ? "Save Changes" : "Add Member"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" /> Delete Member
              </CardTitle>
              <CardDescription>This action cannot be undone.</CardDescription>
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
    </>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function AiFilmmakingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("hero");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Filmmaking</h1>
        <p className="text-muted-foreground">
          Manage all sections of the AI Filmmaking page.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b pb-4">
        {TABS.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "hero" && <HeroTab />}
      {activeTab === "portfolio" && <PortfolioTab />}
      {activeTab === "process" && <ProcessTab />}
      {activeTab === "services" && <ServicesTab />}
      {activeTab === "awards" && <AwardsTab />}
      {activeTab === "team" && <TeamTab />}
      {activeTab === "contact" && <ContactTab />}
    </div>
  );
}
