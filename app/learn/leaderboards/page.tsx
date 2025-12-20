"use client"
import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const leagues = [
    { color: 'bg-purple-400', gem: '💎' },
    { color: 'bg-pink-300', gem: '💎' },
    { color: 'bg-gray-700', gem: '💎' },
    { color: 'bg-cyan-300', gem: '🔑' }
  ];

  interface UserScore {
    ID_User: number;
    HoTen: string;
    Email: string;
    Diem: number;
  }

  const [leaderboardData, setLeaderboardData] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/users/top-score')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.data) {
          setLeaderboardData(json.data);
        }
      })
      .catch((err) => console.error('Failed to fetch leaderboard:', err))
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="min-h-screen bg-white p-6 relative z-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-b px-6 py-8 text-center">
            <h1 className="text-3xl font-black text-gray-800 mb-2">Bảng xếp hạng</h1>
            <p className="text-gray-500 text-base mb-1">Top 5 người học tốt nhất</p>
          </div>

          {/* Leaderboard List */}
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : (
              leaderboardData.map((user, idx) => {
                const rank = idx + 1;
                const avatar = '👤'; // placeholder avatar
                return (
                  <div
                    key={user.ID_User}
                    className={`flex items-center justify-between px-6 py-4 transition-colors ${idx % 2 === 0 ? 'bg-gray-50' : 'hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-black text-lg flex-shrink-0 ${rank === 1 ? 'bg-yellow-400' :
                          rank === 2 ? 'bg-gray-400' :
                            rank === 3 ? 'bg-orange-400' :
                              'bg-transparent text-gray-700'}`}
                      >
                        {rank <= 3 ? rank : <span className="text-gray-600 font-bold">{rank}</span>}
                      </div>

                      {/* Avatar with Badge */}
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-md">
                          {avatar}
                        </div>
                      </div>

                      {/* User Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800 text-base">{user.HoTen}</span>
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-gray-700 font-bold text-lg">
                      {user.Diem} Điểm
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Info Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Cạnh tranh với những người học khác và lên hạng!
        </p>
      </div>
    </div>
  );
}