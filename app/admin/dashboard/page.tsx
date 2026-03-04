import { auth, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, Package, Tag, Layers, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tight leading-none mb-4">
              Dashboard
            </h1>
            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
              Gestiona tus proyectos y ventas
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/projects/new">
              <Button className="h-12 px-6 rounded-xl bg-primary text-black font-black uppercase tracking-widest text-xs hover:bg-primary/90 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Nuevo Proyecto
              </Button>
            </Link>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button
                variant="outline"
                className="h-12 px-6 rounded-xl border-white/10 hover:bg-white/5 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl border border-white/10 space-y-2">
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">
              Total Proyectos
            </p>
            <p className="text-4xl font-black">{projects.length}</p>
          </div>
          {/* Add more stats here like Sales, etc. */}
        </div>

        {/* Projects Table */}
        <div className="glass rounded-3xl border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">
                  Proyecto
                </th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">
                  Categoría
                </th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">
                  Precio
                </th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-white/[0.01] transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors`}
                      >
                        <Package className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{project.title}</p>
                        <p className="text-gray-500 text-xs font-mono truncate max-w-xs">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                      {project.tags
                        .split(',')
                        .slice(0, 2)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-white/5 border border-white/10 text-white/40"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-primary">
                      {project.price ? `${project.price} USD` : 'Libre'}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-3">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Button
                          variant="outline"
                          className="h-10 px-4 rounded-lg border-white/10 hover:border-primary/50 text-xs"
                        >
                          Editar
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="h-10 px-4 rounded-lg border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs"
                      >
                        Borrar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center space-y-4">
                    <Layers className="w-12 h-12 text-white/10 mx-auto" />
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                      No hay proyectos registrados
                    </p>
                    <Link href="/admin/projects/new">
                      <Button
                        variant="outline"
                        className="h-10 border-primary/20 hover:border-primary/50"
                      >
                        Crear mi primer proyecto
                      </Button>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
