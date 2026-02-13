"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Briefcase,
  Loader2,
  GripVertical,
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

const API_BASE = "http://localhost:3000/api/careers";

interface CareerOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  order: number;
}

export default function CareersPage() {
  const [openings, setOpenings] = useState<CareerOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOpening, setEditingOpening] = useState<CareerOpening | null>(
    null,
  );
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Drag state
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formType, setFormType] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formRequirements, setFormRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");

  const fetchOpenings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (Array.isArray(data)) {
        setOpenings(data);
      }
    } catch (err) {
      console.error("Failed to fetch career openings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpenings();
  }, [fetchOpenings]);

  const resetForm = () => {
    setFormTitle("");
    setFormDepartment("");
    setFormLocation("");
    setFormType("");
    setFormDescription("");
    setFormRequirements([]);
    setNewRequirement("");
    setEditingOpening(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (opening: CareerOpening) => {
    setEditingOpening(opening);
    setFormTitle(opening.title);
    setFormDepartment(opening.department);
    setFormLocation(opening.location);
    setFormType(opening.type);
    setFormDescription(opening.description);
    setFormRequirements([...opening.requirements]);
    setShowForm(true);
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormRequirements([...formRequirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormRequirements(formRequirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: formTitle,
      department: formDepartment,
      location: formLocation,
      type: formType,
      description: formDescription,
      requirements: formRequirements,
    };

    try {
      if (editingOpening) {
        await fetch(`${API_BASE}/${editingOpening.id}`, {
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
      await fetchOpenings();
    } catch (err) {
      console.error("Failed to save career opening:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await fetchOpenings();
    } catch (err) {
      console.error("Failed to delete career opening:", err);
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

    const reordered = [...openings];
    const [draggedEntry] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, draggedEntry);

    setOpenings(reordered);
    setDraggingIdx(null);
    dragItem.current = null;
    dragOverItem.current = null;

    try {
      await fetch(`${API_BASE}/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: reordered.map((o) => o.id) }),
      });
    } catch (err) {
      console.error("Failed to save order:", err);
      await fetchOpenings();
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Careers</h1>
          <p className="text-muted-foreground">
            Manage job openings displayed on the careers page. Drag to reorder.
          </p>
        </div>
        <Button onClick={openCreateForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Opening
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
          <CardDescription>
            Current job opportunities available at the company.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : openings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground/30" />
              <h3 className="mt-4 text-lg font-semibold">
                No job openings found
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2">
                Create a new job opening to start recruiting.
              </p>
              <Button
                onClick={openCreateForm}
                variant="outline"
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Opening
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openings.map((opening, idx) => (
                  <TableRow
                    key={opening.id}
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
                      <div className="font-medium">{opening.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1 max-w-[250px]">
                        {opening.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{opening.department}</Badge>
                    </TableCell>
                    <TableCell>{opening.location}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{opening.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(opening)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(opening.id)}
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
                {editingOpening ? "Edit Job Opening" : "Add New Job Opening"}
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
                    htmlFor="title"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Job Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="title"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Senior AI Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="department"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Department <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="department"
                      required
                      value={formDepartment}
                      onChange={(e) => setFormDepartment(e.target.value)}
                      placeholder="Engineering"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="location"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Location <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="location"
                      required
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="Remote"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="type"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Job Type <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="type"
                    required
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder="Full-time"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="description"
                    required
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={3}
                    className="resize-none"
                    placeholder="Job description..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Requirements
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addRequirement();
                        }
                      }}
                      placeholder="Add a requirement and press Enter"
                    />
                    <Button
                      type="button"
                      onClick={addRequirement}
                      variant="secondary"
                    >
                      Add
                    </Button>
                  </div>
                  {formRequirements.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formRequirements.map((req, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="gap-1 pr-1"
                        >
                          {req}
                          <button
                            type="button"
                            onClick={() => removeRequirement(idx)}
                            className="rounded-full hover:bg-destructive hover:text-destructive-foreground p-0.5 transition-colors"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
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
                    {editingOpening ? "Save Changes" : "Add Opening"}
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
                Delete Job Opening
              </CardTitle>
              <CardDescription>
                Are you sure you want to delete this job opening? This action
                cannot be undone.
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
                  Delete Opening
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
