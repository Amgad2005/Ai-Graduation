import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

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
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Center - Title */}
          <div className="text-center shrink-0">
            <h1 className="text-xl font-bold text-gray-800">بوابة خدمات الطالب</h1>
            <p className="text-sm text-gray-500">جامعة بنها - كلية الحاسبات والذكاء الاصطناعي</p>
          </div>

          {/* Left - Search */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث"
                className="w-72 pr-10 pl-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
