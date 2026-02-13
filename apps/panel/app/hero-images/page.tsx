"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ImageIcon,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API_BASE = "http://localhost:3000/api/hero-products";

interface HeroProduct {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  order: number;
}

export default function HeroImagesPage() {
  const [products, setProducts] = useState<HeroProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<HeroProduct | null>(
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
  const [formLink, setFormLink] = useState("#");
  const [formThumbnail, setFormThumbnail] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetForm = () => {
    setFormTitle("");
    setFormLink("#");
    setFormThumbnail("");
    setEditingProduct(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (product: HeroProduct) => {
    setEditingProduct(product);
    setFormTitle(product.title);
    setFormLink(product.link);
    setFormThumbnail(product.thumbnail);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingProduct) {
        await fetch(`${API_BASE}/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle,
            link: formLink,
            thumbnail: formThumbnail,
          }),
        });
      } else {
        await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle,
            link: formLink,
            thumbnail: formThumbnail,
          }),
        });
      }
      resetForm();
      await fetchProducts();
    } catch (err) {
      console.error("Failed to save product:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // Drag and drop handlers
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

    const reordered = [...products];
    const [draggedItem] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, draggedItem);

    setProducts(reordered);
    setDraggingIdx(null);
    dragItem.current = null;
    dragOverItem.current = null;

    // Save new order to DB
    try {
      await fetch(`${API_BASE}/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderedIds: reordered.map((p) => p.id),
        }),
      });
    } catch (err) {
      console.error("Failed to save order:", err);
      await fetchProducts(); // rollback on failure
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hero Images</h1>
          <p className="text-muted-foreground">
            Manage the parallax hero section images. Drag rows to reorder.
          </p>
        </div>
        <Button onClick={openCreateForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Products</CardTitle>
          <CardDescription>
            Images displayed in the hero section carousel/parallax.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted/30 p-4 mb-4 text-sm text-muted-foreground border">
            <strong>Tip:</strong> The hero section displays the first 5 items in
            row 1 and the next 5 in row 2.
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
              <h3 className="mt-4 text-lg font-semibold">No products found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2">
                Add your first hero image to get started.
              </p>
              <Button
                onClick={openCreateForm}
                variant="outline"
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>

                  <TableHead>Title</TableHead>
                  <TableHead>Image URL</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, idx) => (
                  <TableRow
                    key={product.id}
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
                      {product.title}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <a
                        href={product.thumbnail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline truncate w-full"
                      >
                        <span className="truncate">{product.thumbnail}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline truncate w-full"
                      >
                        <span className="truncate">{product.link}</span>
                        {product.link !== "#" && (
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        )}
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(product)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(product.id)}
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
                {editingProduct ? "Edit Product" : "Add New Product"}
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
                    htmlFor="title"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="title"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Product title"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="thumbnail"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Thumbnail URL <span className="text-destructive">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="thumbnail"
                      type="url"
                      required
                      value={formThumbnail}
                      onChange={(e) => setFormThumbnail(e.target.value)}
                      placeholder="https://example.com/image.png"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="link"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Link
                  </label>
                  <Input
                    id="link"
                    value={formLink}
                    onChange={(e) => setFormLink(e.target.value)}
                    placeholder="#"
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
                    {editingProduct ? "Save Changes" : "Add Product"}
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
                Delete Product
              </CardTitle>
              <CardDescription>
                Are you sure you want to delete this product? This action cannot
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
                  Delete Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
