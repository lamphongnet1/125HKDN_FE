'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface AdminData {
    ID_Admin: number;
    TenDangNhap: string;
    HoTen: string;
}

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [adminData, setAdminData] = useState<AdminData | null>(null);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('admin_token');
        const data = localStorage.getItem('admin_data');

        if (!token || !data) {
            router.push('/admin/login');
        } else {
            setAdminData(JSON.parse(data));
        }
    }, [router]);

    const handleLogout = () => {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_data');
            router.push('/admin/login');
        }
    };

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

    if (!adminData) {
        return null;
    }

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col overflow-y-auto">
            <div className="p-6 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Admin Panel
                </h1>

                {/* Admin Info */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {adminData.HoTen.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{adminData.HoTen}</p>
                            <p className="text-xs text-gray-600 truncate">@{adminData.TenDangNhap}</p>
                        </div>
                    </div>
                </div>

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

            {/* Logout Button */}
            <div className="p-6 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors"
                >
                    <span>Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
}
