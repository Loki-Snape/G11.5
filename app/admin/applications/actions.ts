'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveApplicationAction(id: number) {
  try {
    // 1. Fetch application details
    const app = await prisma.applications.findUnique({
      where: { id },
    });
    if (!app) {
      throw new Error('Application record not found.');
    }

    // 2. Generate a unique slug
    let baseSlug = app.full_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    let uniqueSlug = baseSlug;
    let count = 1;
    while (true) {
      const existing = await prisma.members.findUnique({
        where: { slug: uniqueSlug },
      });
      if (!existing) break;
      count++;
      uniqueSlug = `${baseSlug}-${count}`;
    }

    // 3. Create the Member record
    await prisma.members.create({
      data: {
        name: app.full_name,
        slug: uniqueSlug,
        role: app.interested_role || 'Support Investigator',
        tier: 'Support Staff',
        clearance_level: 'Level 1',
        portraitUrl: null, // default placeholder
      },
    });

    // 4. Delete the application
    await prisma.applications.delete({
      where: { id },
    });

    revalidatePath('/admin/applications');
    revalidatePath('/admin/personnel');
    revalidatePath('/team');
  } catch (error: any) {
    console.error('Failed to approve application:', error);
    throw new Error(error.message || 'Failed to approve application.');
  }
}

export async function rejectApplicationAction(id: number) {
  try {
    await prisma.applications.delete({
      where: { id },
    });
    revalidatePath('/admin/applications');
  } catch (error) {
    console.error('Failed to reject application:', error);
    throw new Error('Failed to reject application.');
  }
}
