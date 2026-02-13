"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  GraduationCap,
  Loader2,
  GripVertical,
  ExternalLink,
  X,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API_BASE = "http://localhost:3000/api/mentors";

interface Mentor {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  expertise: string;
  order: number;
}

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Drag state
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formExpertise, setFormExpertise] = useState("");

  const fetchMentors = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMentors(data);
      }
    } catch (err) {
      console.error("Failed to fetch mentors:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const resetForm = () => {
    setFormName("");
    setFormRole("");
    setFormImageUrl("");
    setFormBio("");
    setFormExpertise("");
    setEditingMentor(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (mentor: Mentor) => {
    setEditingMentor(mentor);
    setFormName(mentor.name);
    setFormRole(mentor.role);
    setFormImageUrl(mentor.imageUrl);
    setFormBio(mentor.bio);
    setFormExpertise(mentor.expertise);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: formName,
      role: formRole,
      imageUrl: formImageUrl,
      bio: formBio,
      expertise: formExpertise,
    };

    try {
      if (editingMentor) {
        await fetch(`${API_BASE}/${editingMentor.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      await fetchMentors();
    } catch (err) {
      console.error("Failed to save mentor:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await fetchMentors();
    } catch (err) {
      console.error("Failed to delete mentor:", err);
    }
  };

  // Drag and drop
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

    const reordered = [...mentors];
    const [draggedItem] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, draggedItem);

    setMentors(reordered);
    setDraggingIdx(null);
    dragItem.current = null;
    dragOverItem.current = null;

    try {
      await fetch(`${API_BASE}/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: reordered.map((m) => m.id) }),
      });
    } catch (err) {
      console.error("Failed to save order:", err);
      await fetchMentors();
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mentors</h1>
          <p className="text-muted-foreground">
            Manage the Board of Mentors displayed on the website. Drag to
            reorder.
          </p>
        </div>
        <Button onClick={openCreateForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Mentor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Board of Mentors</CardTitle>
          <CardDescription>
            A list of distinguished mentors guiding the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : mentors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <GraduationCap className="h-12 w-12 text-muted-foreground/30" />
              <h3 className="mt-4 text-lg font-semibold">No mentors found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2">
                Add your first mentor to showcase their expertise.
              </p>
              <Button
                onClick={openCreateForm}
                variant="outline"
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Mentor
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentors.map((mentor, idx) => (
                  <TableRow
                    key={mentor.id}
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
                    <TableCell>
                      <div>
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                          {mentor.bio}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{mentor.role}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{mentor.expertise}</Badge>
                    </TableCell>
                    <TableCell>
                      <a
                        href={mentor.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline max-w-[120px] truncate"
                        title={mentor.imageUrl}
                      >
                        <ExternalLink className="h-3 w-3 shrink-0" />
                        View
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(mentor)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(mentor.id)}
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
          <Card className="w-full max-w-lg shadow-xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                {editingMentor ? "Edit Mentor" : "Add New Mentor"}
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
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Dr. John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Role <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="role"
                    required
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="AI Pioneer"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="imageUrl"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Image URL <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="imageUrl"
                    type="url"
                    required
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="bio"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Bio <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="bio"
                    required
                    value={formBio}
                    onChange={(e) => setFormBio(e.target.value)}
                    rows={3}
                    className="resize-none"
                    placeholder="Brief biography of the mentor..."
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="expertise"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Expertise <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="expertise"
                    required
                    value={formExpertise}
                    onChange={(e) => setFormExpertise(e.target.value)}
                    placeholder="Neural Networks"
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
                    {editingMentor ? "Save Changes" : "Add Mentor"}
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
                Delete Mentor
              </CardTitle>
              <CardDescription>
                Are you sure you want to delete this mentor? This action cannot
                be undone.
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
                  Delete Mentor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
