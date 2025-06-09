'use client';
import { useAuth } from '@/providers/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to the Home Page, {user?.name}!
      </h1>
    </main>
  );
}
