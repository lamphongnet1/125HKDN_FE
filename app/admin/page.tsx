'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        // Check if admin is logged in
        const adminToken = localStorage.getItem('admin_token');

        if (adminToken) {
            // Redirect to users page if logged in
            router.push('/admin/users');
        } else {
            // Redirect to login if not logged in
            router.push('/admin/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-gray-600">Đang chuyển hướng...</div>
        </div>
    );
}
