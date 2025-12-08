import React from 'react';
import { Target, Trophy, Award, Book, TrendingUp } from 'lucide-react';

export const RightSidebar = () => {
  return (
    <div className="w-120 h-screen mt-10">
      
      {/* User Profile Card */}
      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-[#e5e5e5]">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            NA
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">Nguyễn Văn A</div>
            <div className="text-xs text-gray-500">nguyenvana@email.com</div>
          </div>
        </div>
        <div className="pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tổng điểm</span>
            <span className="text-2xl font-bold text-blue-600">450</span>
          </div>
        </div>
      </div>

      {/* Today Progress */}
      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-[#e5e5e5]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Tiến độ hôm nay</h3>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">3/5 bài học</span>
            <span className="text-gray-800 font-medium">60%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: '60%' }}></div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-700">Hiragana cơ bản</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-700">Chào hỏi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">→</span>
            <span className="text-gray-700 font-medium">Đặt món ăn (75%)</span>
          </div>
        </div>
      </div>

      {/* Quiz Results */}
      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-[#e5e5e5]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Kết quả trắc nghiệm</h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 font-bold">
                ✓
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">Hiragana A-Z</div>
                <div className="text-xs text-gray-500">Trắc nghiệm 1</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-600">9/10</div>
              <div className="text-xs text-gray-500">90%</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center text-yellow-600 font-bold">
                ~
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">Chào hỏi cơ bản</div>
                <div className="text-xs text-gray-500">Trắc nghiệm 2</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-yellow-600">7/10</div>
              <div className="text-xs text-gray-500">70%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Types */}
      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-[#e5e5e5]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Loại câu hỏi</h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 rounded border border-gray-200 text-center">
            <div className="font-bold text-gray-800">5</div>
            <div className="text-xs text-gray-600">Điền từ</div>
          </div>
          <div className="p-2 rounded border border-gray-200 text-center">
            <div className="font-bold text-gray-800">3</div>
            <div className="text-xs text-gray-600">Nghe xếp câu</div>
          </div>
          <div className="p-2 rounded border border-gray-200 text-center">
            <div className="font-bold text-gray-800">2</div>
            <div className="text-xs text-gray-600">Nghe hội thoại</div>
          </div>
          <div className="p-2 rounded border border-gray-200 text-center">
            <div className="font-bold text-gray-800">4</div>
            <div className="text-xs text-gray-600">Chọn ảnh</div>
          </div>
        </div>
      </div>

      {/* Current Chapter */}
      <div className="bg-white rounded-lg p-4 border-2 border-[#e5e5e5]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Book className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Chương hiện tại</h3>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 mb-3 border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs text-gray-600">Chương 1</div>
              <div className="font-semibold text-gray-800">Giao tiếp cơ bản</div>
            </div>
            <div className="text-2xl">🍱</div>
          </div>
          <div className="w-full bg-white rounded-full h-1.5 mb-1">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="text-xs text-gray-600">13/20 bài học</div>
        </div>

        <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Tiếp tục học
        </button>
      </div>

      {/* Footer */}
      <div className="pt-4 border-[#e5e5e5]">
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