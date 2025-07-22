'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa6';
import { login, logout } from '@/lib/auth-actions';
import { Session } from 'next-auth';

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className='border-b border-gray-200 bg-white py-4 shadow-md'>
      <div className='container mx-auto flex items-center justify-between px-6 lg:px-8'>
        <Link
          href='/'
          className='flex items-center'
        >
          <Image
            src='/assets/images/logo.png'
            alt='Logo'
            width={50}
            height={50}
          />
          <span className='text-2xl font-bold text-gray-800'>
            Travel Planner
          </span>
        </Link>

        <div className='flex items-center space-x-4'>
          {session ? (
            <>
              <Link
                href='/trips'
                className='text-slate-900 transition-colors duration-300 hover:text-sky-500'
              >
                My Trips
              </Link>
              <Link
                href='/globe'
                className='text-slate-900 transition-colors duration-300 hover:text-sky-500'
              >
                Globe
              </Link>

              <button
                className='flex cursor-pointer items-center justify-center rounded-sm bg-gray-800 p-2 text-white hover:bg-gray-900'
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className='flex cursor-pointer items-center justify-center rounded-sm bg-gray-800 p-2 text-white hover:bg-gray-900'
              onClick={login}
            >
              Sign In <FaGithub className='ml-2 size-6' />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
