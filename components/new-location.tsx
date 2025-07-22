'use client';

import { useTransition } from 'react';
import { Button } from './ui/button';
import { addLocation } from '@/lib/actions/add-location';

export default function NewLocationClient({ tripId }: { tripId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className='flex min-h-[calc(100vh-8rem)] items-center justify-center bg-gray-50'>
      <div className='mx-auto w-full max-w-md'>
        <div className='rounded-lg bg-white p-8 shadow-lg'>
          <h1 className='mb-6 text-center text-3xl font-bold'>
            {' '}
            Add New Location
          </h1>

          <form
            className='space-y-6'
            action={(formData: FormData) => {
              startTransition(() => {
                addLocation(formData, tripId);
              });
            }}
          >
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                {' '}
                Address
              </label>
              <input
                name='address'
                type='text'
                required
                className='w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
            </div>
            <Button
              type='submit'
              className='w-full cursor-pointer'
            >
              {isPending ? 'Adding...' : 'Add Location'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
