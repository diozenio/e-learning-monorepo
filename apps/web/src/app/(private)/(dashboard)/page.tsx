'use client';
import { useAuth } from '@/providers/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to the Home Page, {user?.name}!
      </h1>
      <button
        onClick={logout}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Logout
      </button>
    </main>
  );
}
