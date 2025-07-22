'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import createTrip from '@/lib/actions/create-trip';
import { useState, useTransition } from 'react';
import { UploadButton } from '@/lib/upload-thing';
import Image from 'next/image';

const NewTripPage = () => {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className='mx-auto mt-10 max-w-lg'>
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form
            action={(formData: FormData) => {
              if (imageUrl) {
                formData.append('imageUrl', imageUrl);
              }

              startTransition(() => {
                createTrip(formData);
              });
            }}
            className='space-y-6'
          >
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                Title
              </label>
              <input
                type='text'
                name='title'
                placeholder='Japan trip...'
                className={cn(
                  'w-full border border-gray-300 px-3 py-2',
                  'rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                )}
                required
              />
            </div>

            <div>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                Description
              </label>
              <textarea
                name='description'
                placeholder='Trip description...'
                className={cn(
                  'w-full border border-gray-300 px-3 py-2',
                  'rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                )}
                required
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  Start Date
                </label>
                <input
                  type='date'
                  name='startDate'
                  className={cn(
                    'w-full border border-gray-300 px-3 py-2',
                    'rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  )}
                  required
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  End Date
                </label>
                <input
                  type='date'
                  name='endDate'
                  className={cn(
                    'w-full border border-gray-300 px-3 py-2',
                    'rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  )}
                  required
                />
              </div>
            </div>

            <div>
              <label>Trip Image</label>

              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt='Trip Preview'
                  className='mb-4 max-h-48 w-full rounded-md object-cover'
                  width={300}
                  height={100}
                />
              )}
              <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error('Upload failed:', error);
                }}
              />
            </div>

            <Button
              type='submit'
              className='w-full cursor-pointer'
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create Trip'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTripPage;
