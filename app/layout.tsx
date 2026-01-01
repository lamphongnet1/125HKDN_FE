import { LearnProvider } from '@/contexts/learncontext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <LearnProvider>
           {children}
        </LearnProvider> 
      </body>
    </html>
  );
}
