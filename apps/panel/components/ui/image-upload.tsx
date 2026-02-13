"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadImage, deleteImage } from "@/utils/supabase/storage";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setLoading(true);
      const url = await uploadImage(file);
      toast.success("Image uploaded successfully");
      onChange(url);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      await deleteImage(value);
      onRemove(value);
      toast.success("Image removed");
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to remove image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        {value ? (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-input">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={handleRemove}
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                disabled={disabled || loading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <img
              className="object-cover w-full h-full"
              alt="Uploaded image"
              src={value}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-[200px] h-[200px] rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/50">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="h-8 w-8 opacity-50" />
              <span className="text-xs">No image uploaded</span>
            </div>
          </div>
        )}
      </div>

      {!value && (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            disabled={disabled || loading}
            variant="outline"
            onClick={() =>
              document.getElementById("image-upload-input")?.click()
            }
            className="gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload Image
          </Button>
          <input
            id="image-upload-input"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onUpload}
            disabled={disabled || loading}
          />
        </div>
      )}
    </div>
  );
}
