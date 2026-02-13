"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Phone,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const API_BASE = "http://localhost:3000/api/contact-info";

const TYPE_OPTIONS = [
  { label: "Address", value: "address" },
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "Working Hours", value: "hours" },
  { label: "Map URL", value: "map" },
  { label: "Other", value: "text" },
];

interface ContactInfoItem {
  id: string;
  label: string;
  value: string;
  type: string;
  order: number;
}

export default function ContactInfoPage() {
  const [items, setItems] = useState<ContactInfoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ContactInfoItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Drag state
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  // Form state
  const [formLabel, setFormLabel] = useState("");
  const [formValue, setFormValue] = useState("");
  const [formType, setFormType] = useState(TYPE_OPTIONS[0].value);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to fetch contact info:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const resetForm = () => {
    setFormLabel("");
    setFormValue("");
    setFormType(TYPE_OPTIONS[0].value);
    setEditingItem(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (item: ContactInfoItem) => {
    setEditingItem(item);
    setFormLabel(item.label);
    setFormValue(item.value);
    setFormType(item.type);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingItem) {
        await fetch(`${API_BASE}/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: formLabel,
            value: formValue,
            type: formType,
          }),
        });
      } else {
        await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: formLabel,
            value: formValue,
            type: formType,
          }),
        });
      }
      resetForm();
      await fetchItems();
    } catch (err) {
      console.error("Failed to save contact info:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await fetchItems();
    } catch (err) {
      console.error("Failed to delete contact info:", err);
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

    const reordered = [...items];
    const [draggedItem] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, draggedItem);

    setItems(reordered);
    setDraggingIdx(null);
    dragItem.current = null;
    dragOverItem.current = null;

    try {
      await fetch(`${API_BASE}/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: reordered.map((i) => i.id) }),
      });
    } catch (err) {
      console.error("Failed to save order:", err);
      await fetchItems();
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Info</h1>
          <p className="text-muted-foreground">
            Manage contact details displayed on the website. Drag to reorder.
          </p>
        </div>
        <Button onClick={openCreateForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
          <CardDescription>
            List of contact information items visible to users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Phone className="h-12 w-12 text-muted-foreground/30" />
              <h3 className="mt-4 text-lg font-semibold">
                No contact info found
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2">
                Add your first contact detail to get started.
              </p>
              <Button
                onClick={openCreateForm}
                variant="outline"
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow
                    key={item.id}
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
                    <TableCell className="font-medium">{item.label}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {item.value}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {TYPE_OPTIONS.find((t) => t.value === item.type)
                          ?.label || item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(item)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(item.id)}
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
                {editingItem ? "Edit Contact Info" : "Add New Contact Info"}
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
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label
                    htmlFor="label"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Label <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="label"
                    required
                    value={formLabel}
                    onChange={(e) => setFormLabel(e.target.value)}
                    placeholder="e.g. Our Office"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="value"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Value <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="value"
                    required
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="e.g. 123 AI Street, Tech Valley"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="type"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Type
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className={cn(
                        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
                      )}
                    >
                      {TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {/* Check chevron down icon using simple css border or similar if needed, but native select arrow is often fine or hidden by 'appearance-none' on some OS. 
                        Actually standard select arrow acts weird with appearance-none. Let's remove appearance-none or add custom arrow.
                        For now, removing appearance-none to keep native arrow is safer for accessibility/usability without a custom icon. 
                        Wait, shadcn select is a custom component. I am using native select.
                        I'll just use the Input styles but without appearance-none to keep the arrow.
                    */}
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
                    {editingItem ? "Save Changes" : "Add Item"}
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
                Delete Contact Info
              </CardTitle>
              <CardDescription>
                Are you sure? This action cannot be undone.
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
                  Delete Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
