export default function Leaderboard() {
  const leagues = [
    { color: 'bg-purple-400', gem: '💎' },
    { color: 'bg-pink-300', gem: '💎' },
    { color: 'bg-gray-700', gem: '💎' },
    { color: 'bg-cyan-300', gem: '🔑' }
  ];

  const leaderboardData = [
    {
      rank: 1,
      avatar: '👨',
      name: 'GhostjZunn',
      verified: true,
      superBadge: true,
      score: '10001 Điểm',
      highlight: true
    },
    {
      rank: 2,
      avatar: '😎',
      name: 'Lê Trâm Anh Hoàng',
      badge: '🍿',
      score: '3828 Điểm'
    },
    {
      rank: 3,
      avatar: '🐵',
      name: 'Sena セナ',
      superBadge: true,
      score: '3804 Điểm'
    },
    {
      rank: 4,
      avatar: '👨‍💼',
      name: 'yuduki',
      subtitle: '🔥 hơn 1 năm',
      score: '3559 Điểm'
    },
    {
      rank: 5,
      avatar: '😎',
      name: 'Đậu',
      badge: '🎉',
      score: '3478 Điểm'
    },
    {
      rank: 6,
      avatar: '🦍',
      name: 'Thành Lâm HR',
      superBadge: true,
      score: '3320 Điểm'
    }
  ];

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
            <p className="text-gray-500 text-base mb-1">Top 6 người học tốt nhất</p>
          </div>

          {/* Leaderboard List */}
          <div className="divide-y divide-gray-100">
            {leaderboardData.map((user, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between px-6 py-4 transition-colors ${
                  user.highlight ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-black text-lg flex-shrink-0 ${
                    user.rank === 1 ? 'bg-yellow-400' :
                    user.rank === 2 ? 'bg-gray-400' :
                    user.rank === 3 ? 'bg-orange-400' :
                    'bg-transparent text-gray-700'
                  }`}>
                    {user.rank <= 3 ? user.rank : <span className="text-gray-600 font-bold">{user.rank}</span>}
                  </div>

                  {/* Avatar with Badge */}
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-md">
                      {user.avatar}
                    </div>
                  </div>

                  {/* User Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 text-base">{user.name}</span>
                    </div>

                  </div>
                </div>

                {/* Score */}
                <div className="text-gray-700 font-bold text-lg">
                  {user.score}
                </div>
              </div>
            ))}
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