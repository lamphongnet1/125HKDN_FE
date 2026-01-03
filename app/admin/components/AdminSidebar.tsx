'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            title: 'Quản Lý Tài Khoản',
            href: '/admin/users',
            icon: '👥'
        },
        {
            title: 'Quản Lý Chương',
            href: '/admin/chuong',
            icon: '📚'
        },
        {
            title: 'Quản Lý Bài Học',
            href: '/admin/baihoc',
            icon: '📖'
        },
        {
            title: 'Quản Lý Câu Hỏi',
            href: '/admin/cauhoi',
            icon: '❓'
        }
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">
                    Admin Panel
                </h1>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                                    ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }
                                `}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
