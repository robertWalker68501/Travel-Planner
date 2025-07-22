'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/trips');
        const data = await response.json();
        setLocations(data);
        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );

        setVisitedCountries(countries);
      } catch (err) {
        console.error('error', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50'>
      <div className='container mx-auto px-4 py-12'>
        <div className='mx-auto max-w-7xl'>
          <h1 className='mb-12 text-center text-4xl font-bold'>
            Your Travel Journey
          </h1>

          <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-3'>
            <div className='ronded-xl overflow-hidden bg-white shadow-lg lg:col-span-2'>
              <div className='p-6'>
                <h2 className='mb-4 text-2xl font-semibold'>
                  See where you&#39;ve been...
                </h2>

                <div className='relative h-[600px] w-full'>
                  {isLoading ? (
                    <div className='flex h-full items-center justify-center'>
                      <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900'>
                        {' '}
                      </div>
                    </div>
                  ) : (
                    <Globe
                      ref={globeRef}
                      globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
                      bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
                      backgroundColor='rgba(0,0,0,0)'
                      pointColor={() => '#FF5733'}
                      pointLabel='name'
                      pointsData={locations}
                      pointRadius={0.5}
                      pointAltitude={0.1}
                      pointsMerge={true}
                      width={800}
                      height={600}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className='lg:col-span-1'>
              <Card className='sticky top-8'>
                <CardHeader>
                  <CardTitle> Countries Visited</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className='flex h-full items-center justify-center'>
                      <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900'></div>
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      <div className='rounded-lg bg-blue-50 p-4'>
                        <p className='text-sm text-blue-800'>
                          You&#39;ve visited{' '}
                          <span className='font-bold'>
                            {visitedCountries.size}
                          </span>{' '}
                          countries.
                        </p>
                      </div>

                      <div className='max-h-[500px] space-y-2 overflow-y-auto pr-2'>
                        {Array.from(visitedCountries)
                          .sort()
                          .map((country, key) => (
                            <div
                              key={key}
                              className='hover: flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors'
                            >
                              <MapPin className='h-4 w-4 text-red-500' />
                              <span className='font-medium'> {country}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
