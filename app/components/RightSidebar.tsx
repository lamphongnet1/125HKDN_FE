import React from 'react';
import { Flame, Trophy, Target, Calendar, TrendingUp, Award, Star, Book, Clock } from 'lucide-react';

export const RightSidebar = () => {
  return (
    <div className="w-130  h-max sticky top-0 bg-white border-l border-gray-200 p-6">
      {/* User Stats Quick View */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white mb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <div className="font-bold text-lg">Nguyễn Văn A</div>
            <div className="text-sm opacity-90">Online</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">450</div>
            <div className="text-xs opacity-90">Điểm</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs opacity-90">Days Streak</div>
          </div>
        </div>
      </div>

      {/* Learning Progress Today */}
      <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            <span className="font-bold text-gray-800">Hôm nay</span>
          </div>
          <span className="text-sm text-gray-500">3/5 bài</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all"
            style={{ width: '60%' }}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">✅ Bài 1: Hiragana cơ bản</span>
            <span className="text-green-600 font-semibold">100%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">✅ Bài 2: Chào hỏi</span>
            <span className="text-green-600 font-semibold">100%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">📝 Bài 3: Đặt món ăn</span>
            <span className="text-blue-600 font-semibold">75%</span>
          </div>
        </div>
      </div>

      {/* Recent Quiz Results */}
      <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Kết quả gần đây
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">✓</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Trắc nghiệm 1</div>
                <div className="text-xs text-gray-500">Hiragana A-Z</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600">9/10</div>
              <div className="text-xs text-gray-500">90%</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">~</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Trắc nghiệm 2</div>
                <div className="text-xs text-gray-500">Chào hỏi cơ bản</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-yellow-600">7/10</div>
              <div className="text-xs text-gray-500">70%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Types Practice */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 mb-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-6 h-6" />
          <h3 className="font-bold">Luyện tập hôm nay</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-90">🎯 Điền từ</span>
            <span className="font-semibold">5 câu</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-90">👂 Nghe xếp câu</span>
            <span className="font-semibold">3 câu</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-90">🎤 Nghe hội thoại</span>
            <span className="font-semibold">2 câu</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-90">🖼️ Chọn ảnh</span>
            <span className="font-semibold">4 câu</span>
          </div>
        </div>
      </div>

      {/* Current Chapter Progress */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Book className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-gray-800">Chương hiện tại</h3>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-gray-600">Chương 1</div>
              <div className="font-bold text-gray-800">Giao tiếp cơ bản</div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🍱</span>
            </div>
          </div>
          <div className="w-full bg-white rounded-full h-2 mb-2">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '65%' }} />
          </div>
          <div className="text-xs text-gray-600">13/20 bài học</div>
        </div>
        <button className="w-full py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
          Tiếp tục học
        </button>
      </div>
      {/* Footer Links */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-3">
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">ABOUT</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">BLOG</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">STORE</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">EFFICACY</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">CAREERS</a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">INVESTORS</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">TERMS</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">PRIVACY</a>
        </div>
      </div>
    </div>
  );
};