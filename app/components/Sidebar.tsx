"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, User, MoreHorizontal } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, active }) => (
  <Link href={href}>
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all 
        ${active ? "bg-blue-50 text-blue-500" : "text-gray-600 hover:bg-gray-50"}`}
    >
      <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
      <span className="font-bold text-sm">{label}</span>
    </div>
  </Link>
);

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
<div className="w-72 bg-white p-6 fixed left-0 top-0 h-screen border-r-2 border-[#e5e5e5]">

    <div className="text-blue-500 text-4xl font-bold mb-8 text-center">
    JapanPath 
    </div>

      <div className="space-y-2">
        <NavItem
          icon={<Home className="w-6 h-6" />}
          label="LEARN"
          href="/"
          active={pathname === "/"}
        />

        <NavItem
          icon={<span className="text-2xl">あ</span>}
          label="LETTERS"
          href="/letters"
          active={pathname === "/letters"}
        />

        <NavItem
          icon={<Trophy className="w-6 h-6" />}
          label="LEADERBOARDS"
          href="/leaderboards"
          active={pathname === "/leaderboards"}
        />

        <NavItem
          icon={<User className="w-6 h-6" />}
          label="PROFILE"
          href="/profile"
          active={pathname === "/profile"}
        />

        <NavItem
          icon={<MoreHorizontal className="w-6 h-6" />}
          label="MORE"
          href="/more"
          active={pathname === "/more"}
        />
      </div>
    </div>
  );
};
