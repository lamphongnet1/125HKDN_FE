import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-10 rounded-2xl max-w-md text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-4">🎉 Bắt đầu bài học!</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Bạn sẵn sàng học cách đặt món ăn chưa? Hãy cùng bắt đầu nhé!
        </p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-blue-500/50"
        >
          Bắt đầu học
        </button>
      </div>
    </div>
  );
};