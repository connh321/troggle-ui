import type { Metadata, Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import React, { ReactElement } from 'react';
import './globals.css';

const openSans = Open_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Troggle',
  description: 'TODO!!!!!!!!!!!!!!!!!!!!!!!!!',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1a1b2c' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1b2c' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${openSans.className} ${openSans.className} z-0 relative`}
      >
        {children}
      </body>
    </html>
  );
}
