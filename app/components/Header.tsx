import React from 'react';
import { Book } from 'lucide-react';

interface HeaderProps {
  section: string;
  unit: string;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ section, unit, title }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl mb-10 flex justify-between items-center shadow-xl">
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