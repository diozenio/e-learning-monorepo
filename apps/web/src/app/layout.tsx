import './globals.css';

import type { Metadata } from 'next';
import { Lora } from 'next/font/google';

import { AppProvider } from '@/providers/AppProvider';

const loraSerif = Lora({
  variable: '--font-lora-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-Learning Platform',
  description: 'A platform for online learning',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${loraSerif.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
