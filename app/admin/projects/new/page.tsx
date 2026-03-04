import { ProjectForm } from '@/components/admin/project-form';
import { createProject } from '@/app/actions/projects';

export default function NewProjectPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Project</h1>
        <p className="text-muted-foreground">
          Add a new project to your portfolio.
        </p>
      </div>
      <ProjectForm action={createProject} />
    </div>
  );
}
