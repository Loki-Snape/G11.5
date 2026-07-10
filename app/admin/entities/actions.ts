'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createEntityAction(data: {
  entity_name: string;
  tier: string;
  strength: string;
  weakness: string;
  identification_method: string;
  brief_bio: string;
  image_url: string;
}) {
  try {
    const existing = await prisma.entities.findUnique({
      where: { entity_name: data.entity_name },
    });
    if (existing) {
      throw new Error('An anomaly with this name is already cataloged.');
    }

    await prisma.entities.create({
      data: {
        entity_name: data.entity_name,
        tier: data.tier,
        strength: data.strength,
        weakness: data.weakness,
        identification_method: data.identification_method,
        brief_bio: data.brief_bio,
        image_url: data.image_url || null,
      },
    });

    revalidatePath('/admin/entities');
    revalidatePath('/entities');
    revalidatePath('/ghostopedia');
  } catch (error: any) {
    console.error('Failed to catalog entity:', error);
    throw new Error(error.message || 'Failed to catalog anomaly.');
  }
}

export async function deleteEntityAction(id: number) {
  try {
    await prisma.entities.delete({
      where: { id },
    });
    revalidatePath('/admin/entities');
    revalidatePath('/entities');
    revalidatePath('/ghostopedia');
  } catch (error) {
    console.error('Failed to purge entity:', error);
    throw new Error('Failed to purge entity.');
  }
}
