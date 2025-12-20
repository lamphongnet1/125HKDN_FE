'use client'
import { useState, useEffect } from 'react';

type User = {
  HoTen: string;
  Email: string;
  Diem: number;
  SoGioOnline: number;
  created_at: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/1")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setUser(res.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!user) {
    return <div className="p-10">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen p-4 relative z-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 18s linear infinite; }
      `}</style>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b bg-cyan-100 p-8 text-center relative">
          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">
            ✏️
          </button>
          
          <div className="relative inline-block mb-5">
            <div className="w-36 h-36 border-4 border-dashed border-green-500 rounded-full absolute -top-2 -left-2 animate-spin-slow" />
            <svg className="w-32 h-32 border-8 border-white rounded-full shadow-xl" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="50" fill="#a0e5ff"/>
              <circle cx="64" cy="44" r="25" fill="#7fd1ff"/>
              <circle cx="49" cy="54" r="20" fill="#7fd1ff"/>
              <circle cx="79" cy="54" r="20" fill="#7fd1ff"/>
              <text x="64" y="72" fontSize="50" textAnchor="middle" fill="white">+</text>
            </svg>
          </div>

          <h1 className="text-3xl font-black mb-1">{user.HoTen}</h1>
          <p className="text-gray-600 mb-2">{user.Email}</p>
          <p className="text-gray-500 text-sm mb-4">
            Đã tham gia{" "}
            {new Date(user.created_at).toLocaleDateString("vi-VN", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="bg-gray-50 p-5 rounded-2xl text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-3xl font-extrabold">Chương đã học tới</div>
            <div className="text-sm text-gray-600 mt-1">0</div>
          </div>
          <div className="bg-gray-50 p-5 rounded-2xl text-center">
            <div className="text-3xl mb-2">💪</div>
            <div className="text-3xl font-extrabold text-yellow-500">Điểm hiện tại</div>
            <div className="text-sm text-gray-600 mt-1">{user.Diem}</div>
          </div>
          <div className="bg-gray-50 p-5 rounded-2xl text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-base font-extrabold text-gray-500">Chưa có xếp hạng</div>
            <div className="text-sm text-gray-600 mt-1">Thứ hạng trên bảng xếp hạng</div>
          </div>
          <div className="bg-gray-50 p-5 rounded-2xl text-center">
            <div className="text-3xl mb-2">🕒</div>
            <div className="text-3xl font-extrabold text-gray-500">Số giờ online</div>
            <div className="text-sm text-gray-600 mt-1">{user.SoGioOnline}</div>
          </div>
        </div>

       
      </div>

     
    </div>
  );
}