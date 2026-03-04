import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deleteProject } from '@/app/actions/projects';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden flex flex-col">
            <div className="h-48 w-full relative bg-muted border-b">
              {project.image.startsWith('http') ||
              project.image.startsWith('/') ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{ background: project.image }}
                />
              )}
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2 min-h-10 mt-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4 flex justify-between gap-4">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/admin/projects/${project.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
              <form
                action={async () => {
                  'use server';
                  await deleteProject(project.id);
                }}
                className="w-full"
              >
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  type="submit"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 py-20 bg-muted/30 border border-dashed rounded-lg">
            <div className="h-16 w-16 bg-muted flex flex-col items-center justify-center rounded-full mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              You haven't added any projects to your portfolio. Start by
              creating your first project to showcase your work.
            </p>
            <Button asChild>
              <Link href="/admin/projects/new">Create Project</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
