"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const API_BASE = "http://localhost:3000/api/team";

interface TeamSection {
  id: string;
  imageUrl: string;
}

export default function TeamPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTeamSection();
  }, []);

  const fetchTeamSection = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (data && data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch (err) {
      console.error("Failed to fetch team section:", err);
      toast.error("Failed to fetch team data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Team section updated successfully");
      await fetchTeamSection();
    } catch (err) {
      console.error("Failed to save team section:", err);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Section</h1>
        <p className="text-muted-foreground">
          Manage the content of the Team section on the website.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Team Image</CardTitle>
          <CardDescription>
            Update the main image displayed in the Team section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="imageUrl"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Image URL <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/team-photo.jpg"
                  />
                  {imageUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(imageUrl, "_blank")}
                      title="Preview Image"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Provide a direct link to the image you want to display.
                </p>
              </div>

              {imageUrl && (
                <div className="rounded-md border overflow-hidden bg-muted/50 aspect-video relative flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt="Team Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              <Button type="submit" disabled={saving || !imageUrl}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
