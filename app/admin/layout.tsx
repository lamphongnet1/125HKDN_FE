'use client';

import './globals.css';
import AdminSidebar from './components/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    return (
        <div className="flex min-h-screen bg-gray-50">
            {!isLoginPage && <AdminSidebar />}
            <main className={isLoginPage ? 'flex-1' : 'flex-1'}>
                {children}
            </main>
        </div>
    );
}
