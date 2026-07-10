'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveCaseAction(id: number) {
  try {
    await prisma.cases.update({
      where: { id },
      data: { status: 'Active' },
    });
    revalidatePath('/admin/cases');
    revalidatePath('/cases');
  } catch (error) {
    console.error('Failed to approve case:', error);
    throw new Error('Failed to approve case');
  }
}

export async function solveCaseAction(id: number) {
  try {
    await prisma.cases.update({
      where: { id },
      data: { status: 'Solved' },
    });
    revalidatePath('/admin/cases');
    revalidatePath('/cases');
  } catch (error) {
    console.error('Failed to solve case:', error);
    throw new Error('Failed to solve case');
  }
}

export async function deleteCaseAction(id: number) {
  try {
    await prisma.cases.delete({
      where: { id },
    });
    revalidatePath('/admin/cases');
    revalidatePath('/cases');
  } catch (error) {
    console.error('Failed to delete case:', error);
    throw new Error('Failed to delete case');
  }
}

export async function updateCaseStatusAction(id: number, status: string, threat_rating?: string) {
  try {
    await prisma.cases.update({
      where: { id },
      data: {
        status,
        ...(threat_rating !== undefined ? { threat_rating } : {}),
      },
    });
    revalidatePath('/admin/cases');
    revalidatePath('/cases');
  } catch (error) {
    console.error('Failed to update case status:', error);
    throw new Error('Failed to update case status');
  }
}

export async function updateCaseFieldsAction(
  id: number,
  data: {
    start_date: string | null;
    end_date: string | null;
    case_file_link: string | null;
  }
) {
  try {
    await prisma.cases.update({
      where: { id },
      data: {
        start_date: data.start_date ? new Date(data.start_date) : null,
        end_date: data.end_date ? new Date(data.end_date) : null,
        case_file_link: data.case_file_link || null,
      },
    });
    revalidatePath('/admin/cases');
    revalidatePath('/cases');
  } catch (error) {
    console.error('Failed to update case fields:', error);
    throw new Error('Failed to update case fields');
  }
}

