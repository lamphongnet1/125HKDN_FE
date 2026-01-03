import './globals.css';
import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <body>
                <div className="flex min-h-screen bg-gray-50">
                    <AdminSidebar />
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
