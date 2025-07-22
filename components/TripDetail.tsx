'use client';

import { Location, Trip } from '@/app/generated/prisma';
import Image from 'next/image';
import { Calendar, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import Map from '@/components/Map';
import SortableItinerary from './sortable-itinerary';

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='container mx-auto space-y-8 px-4 py-8'>
      {trip.imageUrl && (
        <div className='relative h-72 w-full overflow-hidden rounded-xl shadow-lg md:h-96'>
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className='object-cover'
            fill
            priority
          />
        </div>
      )}
      <div className='flex flex-col items-start justify-between rounded-lg bg-white p-6 shadow md:flex-row md:items-center'>
        <div>
          <h1 className='text-4xl font-extrabold text-gray-900'>
            {trip.title}
          </h1>

          <div className='mt-2 flex items-center text-gray-500'>
            <Calendar className='mr-2 h-5 w-5' />
            <span className='text-lg'>
              {trip.startDate.toLocaleDateString()} -{' '}
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className='mt-4 md:mt-0'>
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button className='cursor-pointer'>
              <Plus className='mr-2 h-5 w-5' /> Add Location
            </Button>
          </Link>
        </div>
      </div>
      <div className='rounded-lg bg-white p-6 shadow'>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className='mb-6'>
            <TabsTrigger
              value='overview'
              className='text-lg'
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value='itinerary'
              className='text-lg'
            >
              Itinerary
            </TabsTrigger>
            <TabsTrigger
              value='map'
              className='text-lg'
            >
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='overview'
            className='space-y-6'
          >
            <div className='grid gap-6 md:grid-cols-2'>
              <div>
                <h2 className='mb-4 text-2xl font-semibold'> Trip Summary</h2>
                <div className='space-y-4'>
                  <div className='flex items-start'>
                    <Calendar className='mr-3 h-6 w-6 text-gray-500' />
                    <div>
                      <p className='font-medium text-gray-700'> Dates</p>
                      <p className='text-sm text-gray-500'>
                        {trip.startDate.toLocaleDateString()} -{' '}
                        {trip.endDate.toLocaleDateString()}
                        <br />
                        {`${Math.round(
                          (trip.endDate.getTime() - trip.startDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )} days(s)`}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start'>
                    <MapPin className='mr-3 h-6 w-6 text-gray-500' />
                    <div>
                      <p> Destinations</p>
                      <p>
                        {trip.locations.length}{' '}
                        {trip.locations.length === 1 ? 'location' : 'locations'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='h-72 overflow-hidden rounded-lg shadow'>
                <Map itineraries={trip.locations} />
              </div>
              {trip.locations.length === 0 && (
                <div className='p-4 text-center'>
                  <p>Add locations to see them on the map.</p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button className='cursor-pointer'>
                      {' '}
                      <Plus className='mr-2 h-5 w-5' /> Add Location
                    </Button>
                  </Link>
                </div>
              )}

              <div>
                <p className='leading-relaxed text-gray-600'>
                  {trip.description}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value='itinerary'
            className='space-y-6'
          >
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-2xl font-semibold'> Full Itinerary</h2>
            </div>

            {trip.locations.length === 0 ? (
              <div className='p-4 text-center'>
                <p>Add locations to see them on the itinerary.</p>
                <Link href={`/trips/${trip.id}/itinerary/new`}>
                  <Button>
                    {' '}
                    <Plus className='mr-2 h-5 w-5' /> Add Location
                  </Button>
                </Link>
              </div>
            ) : (
              <SortableItinerary
                locations={trip.locations}
                tripId={trip.id}
              />
            )}
          </TabsContent>

          <TabsContent
            value='map'
            className='space-y-6'
          >
            <div className='h-72 overflow-hidden rounded-lg shadow'>
              <Map itineraries={trip.locations} />
            </div>
            {trip.locations.length === 0 && (
              <div className='p-4 text-center'>
                <p>Add locations to see them on the map.</p>
                <Link href={`/trips/${trip.id}/itinerary/new`}>
                  <Button>
                    {' '}
                    <Plus className='mr-2 h-5 w-5' /> Add Location
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className='text-center'>
        <Link href={`/trips`}>
          <Button className='cursor-pointer'> Back to Trips</Button>
        </Link>
      </div>
    </div>
  );
}
