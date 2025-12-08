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
      score: '10001 KN',
      highlight: true
    },
    {
      rank: 2,
      avatar: '😎',
      name: 'Lê Trâm Anh Hoàng',
      badge: '🍿',
      score: '3828 KN'
    },
    {
      rank: 3,
      avatar: '🐵',
      name: 'Sena セナ',
      superBadge: true,
      score: '3804 KN'
    },
    {
      rank: 4,
      avatar: '👨‍💼',
      name: 'yuduki',
      subtitle: '🔥 hơn 1 năm',
      score: '3559 KN'
    },
    {
      rank: 5,
      avatar: '😎',
      name: 'Đậu',
      badge: '🎉',
      score: '3478 KN'
    },
    {
      rank: 6,
      avatar: '🦍',
      name: 'Thành Lâm HR',
      superBadge: true,
      score: '3320 KN'
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
            <h1 className="text-3xl font-black text-gray-800 mb-2">Giải đấu Kim Cương</h1>
            <p className="text-gray-500 text-base mb-1">Top 8 đủ điều kiện tham gia Giải vô địch</p>
            <p className="text-yellow-500 font-bold text-lg">3 ngày</p>
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
                    {user.superBadge && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
                    {user.badge && (
                      <div className="absolute -bottom-1 -right-1 text-lg">
                        {user.badge}
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 text-base">{user.name}</span>
                      {user.verified && (
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                    {user.subtitle && (
                      <div className="text-sm text-gray-600 mt-0.5">{user.subtitle}</div>
                    )}
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