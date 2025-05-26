'use client';
import { useAuthStore } from '@/store/auth';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to the Home Page, {user?.name}!
      </h1>
    </main>
  );
}
