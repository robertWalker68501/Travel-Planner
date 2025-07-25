'use server';

import { signIn, signOut } from '@/auth';

export const login = async () => {
  await signIn('github', { redirectTo: 'https://travel-planner-psi-one.vercel.app' });
};

export const logout = async () => {
  await signOut({ redirectTo: 'https://travel-planner-psi-one.vercel.app' });
};
