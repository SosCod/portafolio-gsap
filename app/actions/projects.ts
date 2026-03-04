'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Not authenticated');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tags = formData.get('tags') as string;
  const image = formData.get('image') as string;
  const color = formData.get('color') as string;
  const price = parseFloat(formData.get('price') as string) || null;
  const paypalId = (formData.get('paypalId') as string) || null;
  const codeUrl = (formData.get('codeUrl') as string) || null;

  // Default stats for new projects
  const stats = JSON.stringify({
    users: formData.get('stats_users') || '0',
    conversion: formData.get('stats_conversion') || '0%',
  });

  await prisma.project.create({
    data: {
      title,
      description,
      tags,
      image,
      stats,
      color,
      price,
      paypalId,
      codeUrl,
    },
  });

  revalidatePath('/admin/projects');
  revalidatePath('/admin/dashboard');
  revalidatePath('/');
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Not authenticated');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tags = formData.get('tags') as string;
  const image = formData.get('image') as string;
  const color = formData.get('color') as string;
  const price = parseFloat(formData.get('price') as string) || null;
  const paypalId = (formData.get('paypalId') as string) || null;
  const codeUrl = (formData.get('codeUrl') as string) || null;

  const stats = JSON.stringify({
    users: formData.get('stats_users') || '0',
    conversion: formData.get('stats_conversion') || '0%',
  });

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      tags,
      image,
      stats,
      color,
      price,
      paypalId,
      codeUrl,
    },
  });

  revalidatePath('/admin/projects');
  revalidatePath('/admin/dashboard');
  revalidatePath('/');
  redirect('/admin/projects');
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session) throw new Error('Not authenticated');

  await prisma.project.delete({ where: { id } });

  revalidatePath('/admin/projects');
  revalidatePath('/admin/dashboard');
  revalidatePath('/');
}
