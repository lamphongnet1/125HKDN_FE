"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from '@iconify/react';
import Image from "next/image";
import { updateOnlineTime } from "@/app/login/services/userService";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
  showPopup?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, active, showPopup = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter()
  const handleClick = (e: React.MouseEvent) => {
    if (showPopup) {
      e.preventDefault();
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <div className="relative">
      <Link href={href} onClick={handleClick}>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all 
            ${active
              ? "border-2 border-blue-400 bg-blue-50 text-blue-500"
              : "border-2 border-transparent text-gray-600 hover:bg-gray-200"
            }`}
        >
          <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
          <span className="font-bold text-sm">{label}</span>
        </div>
      </Link>

      {/* Popup Menu */}
      {showPopup && isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-full top-0 ml-2 bg-white rounded-2xl shadow-2xl w-80 z-[70] overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            {/* Top Section */}
            <div className="p-3">
              <button className="w-full text-left px-4 py-3.5 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors">
                <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <span className="font-bold text-gray-700 text-sm tracking-wide">JapanPath TEST</span>
              </button>

              <button className="w-full text-left px-4 py-3.5 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors">
                <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <span className="font-bold text-gray-700 text-sm tracking-wide">SCHOOLS</span>
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 mx-3"></div>

            {/* Bottom Section */}
            <div className="p-3">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors">
                <span className="font-bold text-gray-700 text-sm tracking-wide">CÀI ĐẶT</span>
              </button>

              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors">
                <span className="font-bold text-gray-700 text-sm tracking-wide">TRỢ GIÚP</span>
              </button>

              <button 
                className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={async () => {
                  const userId = localStorage.getItem('ID_User');
                  const loginTime = localStorage.getItem('loginTime');
                  
                  if (userId && loginTime) {
                    const hours = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60);
                    if (hours > 0) {
                      try {
                        await updateOnlineTime(userId, hours);
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }
                  
                  localStorage.clear();
                  
                  router.push('/login');
                }}
              >
                <span className="font-bold text-gray-700 text-sm tracking-wide">ĐĂNG XUẤT</span>
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-white p-6 fixed left-0 top-0 h-screen border-r-2 border-[#e5e5e5] z-50">
      <div className="text-blue-500 text-4xl font-bold mb-8 text-center">
        JapanPath
      </div>
      <div className="space-y-[5px]">

        <div>
          <NavItem
            icon={
              <Image
                src="https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg"
                width={28}
                height={28}
                alt="learn"
              />
            }
            label="HỌC"
            href="/learn"
            active={pathname === "/learn"}
          />
        </div>

        <div>
          <NavItem
            icon={
              <Image
                src="https://d35aaqx5ub95lt.cloudfront.net/vendor/80a60f598d6a6b0493aeb4d7b93fc0e3.svg"
                width={28}
                height={28}
                alt="letters"
              />
            }
            label="BẢNG CHỮ CÁI"
            href="/learn/letters"
            active={pathname === "/learn/letters"}
          />
        </div>

        <div>
          <NavItem
            icon={
              <Image
                src="https://d35aaqx5ub95lt.cloudfront.net/vendor/ca9178510134b4b0893dbac30b6670aa.svg"
                width={28}
                height={28}
                alt="leaderboards"
              />
            }
            label="BẢNG XẾP HẠNG"
            href="/learn/leaderboards"
            active={pathname === "/learn/leaderboards"}
          />
        </div>

        <div>
          <NavItem
            icon={<Icon icon="noto:bust-in-silhouette" width={28} />}
            label="HỒ SƠ NGƯỜI DÙNG"
            href="/learn/profile"
            active={pathname === "/learn/profile"}
          />
        </div>

        <div>
          <NavItem
            icon={
              <Image
                src="https://d35aaqx5ub95lt.cloudfront.net/vendor/7159c0b5d4250a5aea4f396d53f17f0c.svg"
                width={28}
                height={28}
                alt="more"
              />
            }
            label="THÊM"
            href="/more"
            active={pathname === "/more"}
            showPopup={true}
          />
        </div>

      </div>
    </div>
  );
};