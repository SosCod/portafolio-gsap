import { ProjectForm } from '@/components/admin/project-form';
import { updateProject } from '@/app/actions/projects';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, project.id);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">
          Update the details of your project.
        </p>
      </div>
      <ProjectForm project={project} action={updateProjectWithId} />
    </div>
  );
}
