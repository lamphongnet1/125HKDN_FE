import './globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <body>
                {children}
            </body>
        </html>
    );
}
