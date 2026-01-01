'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearnContextType, Chuong, BaiHoc } from '@/app/types/quiz.types';


const LearnContext = createContext<LearnContextType | undefined>(undefined);

export function LearnProvider({ children }: { children: ReactNode }) {
  const [chuong, setChuong] = useState<Chuong[] | null>(null);
  const [baiHocMap, setBaiHocMap] = useState<Record<number, BaiHoc[]>>({});
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);  // ✅ Flag để track

  useEffect(() => {
    // ✅ CHỈ FETCH 1 LẦN DUY NHẤT
    if (hasLoaded) {
      console.log('✅ Data đã có sẵn, không fetch lại');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching data lần đầu tiên...');

        const chuongRes = await fetch("http://127.0.0.1:8000/api/chuong")
          .then(res => res.json());

        if (chuongRes.success) {
          setChuong(chuongRes.data);
          
          const baiHocPromises = chuongRes.data.map((ch: Chuong) =>
            fetch(`http://127.0.0.1:8000/api/chuong/${ch.ID_Chuong}/baihoc`)
              .then(res => res.json())
              .then(res => res.success ? { chuongId: ch.ID_Chuong, data: res.data } : null)
              .catch(() => null)
          );

          const baiHocResults = await Promise.all(baiHocPromises);
          const newBaiHocMap: Record<number, BaiHoc[]> = {};
          
          baiHocResults.forEach(result => {
            if (result) {
              newBaiHocMap[result.chuongId] = result.data;
            }
          });
          
          setBaiHocMap(newBaiHocMap);
          setHasLoaded(true);  // ✅ Đánh dấu đã load xong
          console.log('✅ Data đã được load và cache trong Context');
        }
      } catch (err) {
        console.error('❌ Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hasLoaded]);  // ✅ Chỉ chạy khi hasLoaded thay đổi

  return (
    <LearnContext.Provider value={{ chuong, baiHocMap, loading }}>
      {children}
    </LearnContext.Provider>
  );
}

export function useLearn() {
  const context = useContext(LearnContext);
  if (!context) {
    throw new Error('useLearn must be used within LearnProvider');
  }
  return context;
}