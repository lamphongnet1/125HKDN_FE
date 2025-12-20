'use client';
import React, { useState, useEffect } from 'react';
import { Target, Trophy, Award, Book, TrendingUp } from 'lucide-react';
import Image from "next/image";

interface User {
  ID_User: number;
  HoTen: string;
  Email: string;
  Diem: number;
  SoGioOnline: number;
}

export const RightSidebar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Lấy dữ liệu user từ localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Lấy chữ cái đầu của tên để hiển thị avatar
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return words[0][0] + words[words.length - 1][0];
    }
    return name[0] || 'U';
  };

  return (
    <div className="sticky top-10 self-start pt-10 px-4">

      {/* User Profile Card */}
      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-[#e5e5e5]">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user ? getInitials(user.HoTen) : 'U'}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">
              {user ? user.HoTen : 'Đang tải...'}
            </div>
            <div className="text-xs text-gray-500">
              {user ? user.Email : ''}
            </div>
          </div>
        </div>
        <div className="pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tổng điểm</span>
            <span className="text-2xl font-bold text-blue-600">
              {user ? user.Diem : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Japanese Proverbs */}
      <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div>
            <img src="https://cdn.creazilla.com/cliparts/7926838/cherry-blossom-clipart-lg.png" alt="flower" width={32} height={32} className="object-cover" />
          </div>
          <h3 className="font-semibold text-gray-800">Ngạn ngữ tiếng Nhật</h3>
        </div>

        <ul className="space-y-3 text-sm text-gray-700">
          <li>
            <p className="font-medium text-gray-900">苦あれば楽あり</p>
            <p className="text-gray-500 italic">Kuwa areba raku ari</p>
          </li>

          <li>
            <p className="font-medium text-gray-900">二兎を追う者は一兎をも得ず</p>
            <p className="text-gray-500 italic">
              Nito o ou mono wa itto o mo ezu
            </p>
          </li>

          <li>
            <p className="font-medium text-gray-900">千里の道も一歩から</p>
            <p className="text-gray-500 italic">
              Senri no michi mo ippo kara
            </p>
          </li>

          <li>
            <p className="font-medium text-gray-900">学問に王道なし</p>
            <p className="text-gray-500 italic">
              Gakumon ni ōdō nashi
            </p>
          </li>
        </ul>
      </div>


      {/* Quiz Results */}
      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-[#e5e5e5]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-400">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png" alt="flower" width={32} height={32} className="object-cover" />
          </div>
          <h3 className="font-semibold text-gray-800">Xứ sở hoa anh đào</h3>
        </div>
        <div className="flex items-center gap-2">
          <img src="https://cdn.saigontimestravel.com/storage/images/retail/wp-content/uploads/2023/12/gioi-thieu-ve-dat-nuoc-nhat-ban-1.jpg" alt="flower" width={400} height={400} className="object-cover" />
        </div>
      </div>
    </div>
  );
};