"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from '@iconify/react';
import Image from "next/image";

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
        ${active 
          ? "border-2 border-blue-400 bg-blue-50 text-blue-500" 
          : "border-2 border-transparent text-gray-600 hover:bg-gray-200"
        }`}
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
    label="LEARN"
    href="/"
    active={pathname === "/"}
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
    label="LETTERS"
    href="/letters"
    active={pathname === "/letters"}
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
    label="LEADERBOARDS"
    href="/leaderboards"
    active={pathname === "/leaderboards"}
  />
</div>

<div>
  <NavItem
    icon={<Icon icon="noto:bust-in-silhouette" width={28} />}
    label="PROFILE"
    href="/profile"
    active={pathname === "/profile"}
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
    label="MORE"
    href="/more"
    active={pathname === "/more"}
  />
</div>

</div>

    </div>
  );
};