'use server';

import { signIn, signOut } from '@/auth';

export const login = async () => {
  await signIn('github', { redirectTo: '/https://travel-planner-egcjkr2zh-roberts-projects-2634047b.vercel.app/' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/https://travel-planner-egcjkr2zh-roberts-projects-2634047b.vercel.app/' });
};
