import './globals.css';
import { Sidebar } from './components/Sidebar';
import {RightSidebar} from './components/RightSidebar';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex justify-center ml-72 p-10">
            <div className="w-[592px]">
              {children}
            </div>
          </div> 
          <RightSidebar />  
        </div>
      </body>
    </html>
  );
}
