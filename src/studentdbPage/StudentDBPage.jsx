import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../studentdb/ProfileCard';
import GradesCard from '../studentdb/GradesCard';
import ChartCard from '../studentdb/ChartCard';
import MaterialsTable from '../studentdb/MaterialsTable';

export default function StudentDBPage() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <i className="fa-solid fa-arrow-left"></i>
            الرجوع
          </button>

          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">الأداء الدراسي</h1>
            <p className="text-xs text-gray-400 mt-0.5">متابعة شاملة لمسيرتك الأكاديمية</p>
          </div>

          {/* Spacer */}
          <div className="w-20"></div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Right Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <ProfileCard />
            <GradesCard />
          </div>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            <ChartCard />
            <MaterialsTable />
          </div>

        </div>
      </main>

    </div>
  );
}
