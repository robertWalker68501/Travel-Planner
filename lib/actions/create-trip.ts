'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

const CreateTrip = async (formData: FormData) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Unauthorized: Please sign in to create a trip');
  }

  const title = formData.get('title')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const startDateStr = formData.get('startDate')?.toString();
  const endDateStr = formData.get('endDate')?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error('All fields are required');
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  await prisma.trip.create({
    data: {
      title,
      description,
      imageUrl,
      startDate,
      endDate,
      userId: session.user.id,
    },
  });

  redirect('/trips');
};

export default CreateTrip;
