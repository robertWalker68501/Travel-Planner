import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

const TripsPage = async () => {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  if (!session) {
    return (
      <div className='flex h-screen items-center justify-center text-xl text-gray-700'>
        Please Sign In.
      </div>
    );
  }

  return (
    <div className='container mx-auto space-y-6 px-4 py-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <Link href='/trips/new'>
          <Button className='cursor-pointer'>New Trip</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {session.user?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {trips.length === 0
              ? 'Start planning you first trip by clicking the button above'
              : `You have ${trips.length} ${trips.length == 1 ? 'trip' : 'trips'} planned. ${upcomingTrips.length > 0 ? `${upcomingTrips.length} upcoming.` : ''}`}
          </p>
        </CardContent>
      </Card>

      <div className=''>
        <h2 className='mb-4 text-xl font-semibold'>Your Recent Trips</h2>
        {trips.length === 0 ? (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-8'>
              <h3 className='mb-2 text-xl font-medium'>No trips yet.</h3>
              <p className='mb-4 max-w-md text-center'>
                Start planning yuo adventure by creating you first trip.
              </p>
              <Link href='/trips/new'>
                <Button className='mt-4'>Create Trip</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {sortedTrips.slice(0, 6).map((trip) => (
              <Link
                key={trip.id}
                href={`/trips/${trip.id}`}
              >
                <Card className='h-full transition-shadow hover:shadow-md'>
                  <CardHeader>
                    <CardTitle className='line-clamp-1'>{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-2 line-clamp-2 text-sm'>
                      {trip.description}
                    </p>
                    <div className='text-sm'>
                      {new Date(trip.startDate).toLocaleDateString()} -{' '}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
