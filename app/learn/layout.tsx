import './globals.css';
import { Sidebar } from './components/Sidebar';
import {RightSidebar} from './components/RightSidebar';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
      <div className="flex"> {/* Bỏ h-screen để trang web có thể cuộn tự do */}
          <Sidebar />
          <div className="flex-1 flex justify-center ml-72">
            <div className="w-[692px]">
              {children}
            </div>         
          </div> 
          <RightSidebar />  
        </div>
      </body>
    </html>
  );
}
