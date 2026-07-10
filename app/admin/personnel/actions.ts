'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createMemberAction(data: {
  name: string;
  slug: string;
  role: string;
  tier: string;
  clearance_level: string;
  portraitUrl: string;
}) {
  try {
    // Check if slug is unique
    const existing = await prisma.members.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new Error('Member with this slug already exists.');
    }

    await prisma.members.create({
      data: {
        name: data.name,
        slug: data.slug,
        role: data.role,
        tier: data.tier,
        clearance_level: data.clearance_level,
        portraitUrl: data.portraitUrl || null,
      },
    });

    revalidatePath('/admin/personnel');
    revalidatePath('/team');
  } catch (error: any) {
    console.error('Failed to create member:', error);
    throw new Error(error.message || 'Failed to create member.');
  }
}

export async function deleteMemberAction(id: number) {
  try {
    await prisma.members.delete({
      where: { id },
    });
    revalidatePath('/admin/personnel');
    revalidatePath('/team');
  } catch (error) {
    console.error('Failed to delete member:', error);
    throw new Error('Failed to delete member.');
  }
}

export async function updateMemberRoleAction(id: number, role: string) {
  try {
    await prisma.members.update({
      where: { id },
      data: { role },
    });
    revalidatePath('/admin/personnel');
    revalidatePath('/team');
  } catch (error) {
    console.error('Failed to update member role:', error);
    throw new Error('Failed to update member role.');
  }
}

export async function updateMemberTierAction(id: number, tier: string) {
  try {
    await prisma.members.update({
      where: { id },
      data: { tier },
    });
    revalidatePath('/admin/personnel');
    revalidatePath('/team');
  } catch (error) {
    console.error('Failed to update member tier:', error);
    throw new Error('Failed to update member tier.');
  }
}

