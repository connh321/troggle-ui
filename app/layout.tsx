import type { Metadata } from 'next';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <body className={`${openSans.className} ${openSans.className}`}>
        {children}
      </body>
    </html>
  );
}
