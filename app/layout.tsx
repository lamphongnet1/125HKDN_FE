'use client';

import React from 'react';
import './globals.css';
import { Sidebar } from './components/Sidebar';
import { Dog } from './components/Dog';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <title>Duolingo - Học Ngôn Ngữ</title>
      </head>
      <body className="m-0 p-0">
        <div className="flex h-screen bg-gray-50">
          
          {/* Sidebar cố định */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 p-10 overflow-y-auto">
            {children}
          </div>

          {/* Dog Mascot cố định */}
          <Dog />
        </div>
      </body>
    </html>
  );
}
