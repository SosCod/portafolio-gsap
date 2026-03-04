'use client';

import { useState } from 'react';
import { UploadButton } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@prisma/client';

export function ProjectForm({
  project,
  action,
}: {
  project?: Project | null;
  action: (formData: FormData) => void;
}) {
  const [imageUrl, setImageUrl] = useState<string>(project?.image || '');

  // Safety check for stats parsing
  let parsedStats = { users: '0', conversion: '0%' };
  if (project?.stats) {
    try {
      parsedStats = JSON.parse(project.stats);
    } catch (e) {}
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{project ? 'Edit Project' : 'New Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <Label>Project Image / Background</Label>
            {imageUrl ? (
              <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                {imageUrl.startsWith('http') || imageUrl.startsWith('/') ? (
                  <img
                    src={imageUrl}
                    alt="Project visual"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: imageUrl }}
                  />
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setImageUrl('')}
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="border border-dashed border-primary/30 rounded-lg p-4 bg-muted/20">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setImageUrl(res[0].url);
                      alert('¡Imagen cargada exitosamente! 🎉');
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Upload Error: ${error.message}`);
                  }}
                />
              </div>
            )}
            <input type="hidden" name="image" value={imageUrl} required />
            <p className="text-xs text-muted-foreground">
              You can also manually set a CSS gradient string instead of
              uploading an image (just type it below if you don't upload).
            </p>
            {!imageUrl && (
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={project?.title}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Theme Color</Label>
              <select
                id="color"
                name="color"
                defaultValue={project?.color || 'primary'}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project?.description}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={project?.tags}
              placeholder="Next.js, Tailwind CSS, Prisma"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price (Optional)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={project?.price?.toString() || ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paypalId">PayPal Payment Link (Optional)</Label>
              <Input
                id="paypalId"
                name="paypalId"
                placeholder="https://paypal.me/youruser/20"
                defaultValue={project?.paypalId || ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codeUrl">Code/Demo URL (Optional)</Label>
              <Input
                id="codeUrl"
                name="codeUrl"
                defaultValue={project?.codeUrl || ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="stats_users">Stats: Value 1 (e.g., 10k+)</Label>
              <Input
                id="stats_users"
                name="stats_users"
                defaultValue={parsedStats.users}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stats_conversion">
                Stats: Value 2 (e.g., 15%)
              </Label>
              <Input
                id="stats_conversion"
                name="stats_conversion"
                defaultValue={parsedStats.conversion}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit">
              {project ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
