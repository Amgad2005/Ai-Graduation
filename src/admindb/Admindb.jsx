import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Api from '../Api/Api';

export default function Admindb() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverview() {
      try {
        const res = await Api.get('/admin/overview');
        setOverview(res.data?.data);
      } catch (err) {
        console.error('OVERVIEW ERROR:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOverview();
  }, []);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-6 flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  // ---- استخراج البيانات ----
  const gradApproved = overview?.material_requests?.approved?.graduation ?? 0;
  const gradPending  = overview?.material_requests?.pending?.graduation  ?? 0;
  const gradRejected = overview?.material_requests?.rejected?.graduation ?? 0;
  const gradTotal    = gradApproved + gradPending + gradRejected;

  const regApproved  = overview?.material_requests?.approved?.regular ?? 0;
  const regPending   = overview?.material_requests?.pending?.regular  ?? 0;
  const regRejected  = overview?.material_requests?.rejected?.regular ?? 0;
  const regTotal     = regApproved + regPending + regRejected;

  const totalRequests = overview?.material_requests?.total             ?? 0;
  const totalApproved = overview?.material_requests?.approved?.total   ?? 0;
  const totalPending  = overview?.material_requests?.pending?.total    ?? 0;
  const totalRejected = overview?.material_requests?.rejected?.total   ?? 0;

  const totalStudents = overview?.students?.total ?? 0;
  const totalCourses  = overview?.courses?.total  ?? 0;

  const approvalRate = totalRequests > 0
                     ? Math.round((totalApproved / totalRequests) * 100)
                     : 0;

  const requestsData = [
    { name: 'دواعي التخرج',          approved: gradApproved, pending: gradPending, rejected: gradRejected },
    { name: 'تسجيل مواد استثنائية',  approved: regApproved,  pending: regPending,  rejected: regRejected  },
  ];

  const levelData = Object.entries(overview?.students?.by_level ?? {}).map(
    ([level, count]) => ({ name: level.replace('level_', ''), طلاب: count })
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-6" dir="rtl">

      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">لوحة المعلومات</h2>
        <p className="text-gray-500 text-sm">إحصائيات شاملة عن تسجيل المواد وطلبات الطلاب</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">إجمالي الطلبات</p>
              <p className="text-2xl font-bold">{totalRequests}</p>
              <p className="text-xs text-gray-400 mt-1">{totalCourses} مادة • {totalStudents} طالب</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">موافق عليها</p>
              <p className="text-2xl font-bold">{totalApproved}</p>
              <p className="text-xs text-green-600 mt-1">معدل قبول {approvalRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">قيد المراجعة</p>
              <p className="text-2xl font-bold">{totalPending}</p>
              <p className="text-xs text-gray-400 mt-1">طلبات منتظرة</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <X className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">مرفوضة</p>
              <p className="text-2xl font-bold">{totalRejected}</p>
              <p className="text-xs text-gray-400 mt-1">طلبات مرفوضة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-base font-semibold mb-4">إحصائيات الطلبات</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={requestsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="approved" fill="#10b981" name="موافق عليها"   radius={[4,4,0,0]} />
              <Bar dataKey="pending"  fill="#f59e0b" name="قيد المراجعة" radius={[4,4,0,0]} />
              <Bar dataKey="rejected" fill="#ef4444" name="مرفوضة"       radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-base font-semibold mb-4">توزيع الطلاب على المستويات</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={levelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="طلاب" fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Requests Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold mb-4 pb-4 border-b border-gray-200">طلبات دواعي التخرج</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{gradTotal}</span>
              <span className="text-gray-500 text-sm">إجمالي الطلبات</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-lg font-medium">{gradApproved}</span>
              <span className="text-gray-500 text-sm">موافق عليها</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 bg-orange-50 text-orange-700 rounded-lg font-medium">{gradPending}</span>
              <span className="text-gray-500 text-sm">قيد المراجعة</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg font-medium">{gradRejected}</span>
              <span className="text-gray-500 text-sm">مرفوضة</span>
            </div>
            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xl font-bold text-green-600">
                {gradTotal > 0 ? Math.round((gradApproved / gradTotal) * 100) : 0}%
              </span>
              <span className="text-gray-500 text-sm">معدل القبول</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold mb-4 pb-4 border-b border-gray-200">طلبات تسجيل المواد الاستثنائية</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{regTotal}</span>
              <span className="text-gray-500 text-sm">إجمالي الطلبات</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-lg font-medium">{regApproved}</span>
              <span className="text-gray-500 text-sm">موافق عليها</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 bg-orange-50 text-orange-700 rounded-lg font-medium">{regPending}</span>
              <span className="text-gray-500 text-sm">قيد المراجعة</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg font-medium">{regRejected}</span>
              <span className="text-gray-500 text-sm">مرفوضة</span>
            </div>
            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xl font-bold text-green-600">
                {regTotal > 0 ? Math.round((regApproved / regTotal) * 100) : 0}%
              </span>
              <span className="text-gray-500 text-sm">معدل القبول</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}