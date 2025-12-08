import { useState } from 'react';

export default function More() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8 flex items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="px-6 py-3 bg-green-500 text-white rounded-full font-bold shadow-lg hover:bg-green-600 transition-colors"
        >
          Mở Menu ✏️
        </button>

        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl w-80 z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
              {/* Top Section */}
              <div className="p-3">
                <button className="w-full text-left px-4 py-3.5 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors group">
                  <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span className="font-bold text-gray-700 text-sm tracking-wide">DUOLINGO ENGLISH TEST</span>
                </button>
                
                <button className="w-full text-left px-4 py-3.5 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors group">
                  <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <span className="font-bold text-gray-700 text-sm tracking-wide">SCHOOLS</span>
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 mx-3"></div>

              {/* Bottom Section */}
              <div className="p-3">
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group">
                  <span className="font-bold text-gray-700 text-sm tracking-wide">CÀI ĐẶT</span>
                </button>
                
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group">
                  <span className="font-bold text-gray-700 text-sm tracking-wide">TRỢ GIÚP</span>
                </button>
                
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group">
                  <span className="font-bold text-gray-700 text-sm tracking-wide">ĐĂNG XUẤT</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Info Text */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-gray-600">
        <p className="text-sm">Click vào menu hoặc bên ngoài để đóng/mở</p>
      </div>
    </div>
  );
}