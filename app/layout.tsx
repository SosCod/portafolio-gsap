import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { BackgroundProvider } from '../components/background-provider';
import SmoothScroll from '../components/smooth-scroll';
import LoadingScreen from '../components/loading';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SosCode',
  description: 'Created with v0',

  icons: {
    icon: [
      {
        url: '/icon-code.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-code.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/icon-code.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <SmoothScroll>
          <BackgroundProvider>
            <LoadingScreen />
            {children}
          </BackgroundProvider>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
