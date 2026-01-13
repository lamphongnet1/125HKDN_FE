import { useEffect } from 'react';
import { updateOnlineTime } from '@/app/login/services/userService';

export const useOnlineTimeTracker = () => {
  useEffect(() => {
    const userId = localStorage.getItem('ID_User');
    const loginTime = localStorage.getItem('loginTime');
    if (!userId || !loginTime) return;

    const sendTime = async () => {
      const seconds = Math.floor((Date.now() - parseInt(loginTime)) / 1000);
      if (seconds > 0) {
        try {
          await updateOnlineTime(userId, seconds);
          localStorage.setItem('loginTime', String(Date.now()));
        } catch (err) {
          console.error(err);
        }
      }
    };

    const interval = setInterval(sendTime, 5 * 60 * 1000); // Mỗi 5 phút
    
    const handleExit = () => {
      const seconds = Math.floor((Date.now() - parseInt(loginTime)) / 1000);
      if (seconds > 0) {
        navigator.sendBeacon(
          `http://localhost:8000/api/users/${userId}/online-time`,
          JSON.stringify({ SoGioOnline: seconds })
        );
      }
    };

    window.addEventListener('beforeunload', handleExit);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleExit);
      sendTime();
    };
  }, []);
};