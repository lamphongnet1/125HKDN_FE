
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Book } from 'lucide-react';

// Header Component - giữ nguyên như code của bạn
interface HeaderProps {
  section: string;
  unit: string;
  title: string;
  color: string;
}

export const Header: React.FC<HeaderProps> = ({ section, unit, title,color='blue-400' }) => {
  return (
    <div className={`sticky top-0 z-20 bg-gradient-to-r from-${color} to-${color.replace('-400','-600')} text-white p-4 rounded-2xl flex justify-between items-center mb-4`}>
      <div className="flex items-center gap-4">
        <button className="bg-white/20 hover:bg-white/30 w-10 h-10 rounded-lg flex items-center justify-center transition-all">
          ←
        </button>
        <div>
          <div className="text-sm font-semibold opacity-90">
            {section}, {unit}
          </div>
          <div className="text-3xl font-bold">{title}</div>
        </div>
      </div>
      <button className="bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
        <Book className="w-5 h-5" />
        GUIDEBOOK
      </button>
    </div>
  );
};
