import React from 'react';
import { Search, Menu } from 'lucide-react';

export default function Header({ onMenuToggle }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Right - Icons */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={onMenuToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Center - Title */}
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-800">جامعة بنها - كلية الحاسبات والذكاء الاصطناعي</h1>
          </div>

          {/* Left - Spacer */}
          <div className="flex-1"></div>

        </div>
      </div>
    </header>
  );
}