'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateEquipmentStatusAction(id: number, status: string) {
  try {
    await prisma.equipment.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/equipment');
    revalidatePath('/inventory');
  } catch (error) {
    console.error('Failed to update equipment status:', error);
    throw new Error('Failed to update equipment status');
  }
}

export async function createEquipmentAction(data: {
  gear_name: string;
  classification: string;
  status: string;
}) {
  try {
    await prisma.equipment.create({
      data: {
        gear_name: data.gear_name,
        classification: data.classification,
        status: data.status,
      },
    });
    revalidatePath('/admin/equipment');
    revalidatePath('/inventory');
  } catch (error) {
    console.error('Failed to create equipment:', error);
    throw new Error('Failed to create equipment');
  }
}

export async function deleteEquipmentAction(id: number) {
  try {
    await prisma.equipment.delete({
      where: { id },
    });
    revalidatePath('/admin/equipment');
    revalidatePath('/inventory');
  } catch (error) {
    console.error('Failed to delete equipment:', error);
    throw new Error('Failed to delete equipment');
  }
}

