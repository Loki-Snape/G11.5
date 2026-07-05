"use server";
import prisma from '@/app/lib/prisma';

export async function submitCaseReport(prevState: unknown, formData: FormData) {
  const reporterName = formData.get('reporterName') as string;
  const reporterPhone = formData.get('reporterPhone') as string;
  const reporterEmail = formData.get('reporterEmail') as string;
  const location = formData.get('location') as string;
  const activityTypes = formData.getAll('activityTypes') as string[];
  const description = formData.get('description') as string || '';
  const timing = formData.get('timing') as string;
  const dangerLevel = formData.get('dangerLevel') as string;

  if (!reporterName || !reporterPhone || !reporterEmail || !location || !timing || !dangerLevel) {
    throw new Error('All required fields must be filled');
  }

  // Auto-generate tracking number
  const count = await prisma.cases.count();
  const trackingNumber = `G11.5-CASE-${String(count + 1).padStart(3, '0')}`;

  const activityTypesStr = activityTypes.join(', ');

  await prisma.cases.create({
    data: {
      tracking_number: trackingNumber,
      status: 'Review Pending',
      description,
      location,
      created_by: reporterName,
      reporter_phone: reporterPhone,
      reporter_email: reporterEmail,
      activity_types: activityTypesStr,
      timing,
      danger_level: dangerLevel,
    },
  });

  return { success: true };
}
