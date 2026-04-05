import { useState } from 'react';
import { BookOpen, FileText, Users, GraduationCap, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Admindb() {


    // إجمالي طلاب القسم
  const totalDepartmentStudents = 148;

  // المواد الـ 5 اللي الأدمن مسؤول عنها
  const [subjects] = useState([
    { name: 'المادة 1', code: 'CS401', students: 138, capacity: 150 },
    { name: 'المادة 2', code: 'CS305', students: 125, capacity: 150 },
    { name: 'المادة 3', code: 'CS402', students: 142, capacity: 150 },
    { name: 'المادة 4', code: 'CS403', students: 118, capacity: 150 },
    { name: 'المادة 5', code: 'CS404', students: 135, capacity: 150 },
  ]);

  // الطلبات الاستثنائية
  const [exceptionalRequests] = useState({
    graduation: {
      type: 'graduation',
      count: 32,
      approved: 28,
      pending: 4
    },
    otherDepartment: {
      type: 'other_department',
      count: 18,
      approved: 15,
      pending: 3
    }
  });

  const totalRequests = exceptionalRequests.graduation.count + exceptionalRequests.otherDepartment.count;
  const totalApproved = exceptionalRequests.graduation.approved + exceptionalRequests.otherDepartment.approved;
  const totalPending = exceptionalRequests.graduation.pending + exceptionalRequests.otherDepartment.pending;
  const approvalRate = Math.round((totalApproved / totalRequests) * 100);

  // بيانات الطلبات الاستثنائية للرسم البياني
  const requestsData = [
    { name: 'دواعي التخرج', approved: exceptionalRequests.graduation.approved, pending: exceptionalRequests.graduation.pending },
    { name: 'مواد من أقسام أخرى', approved: exceptionalRequests.otherDepartment.approved, pending: exceptionalRequests.otherDepartment.pending },
  ];

   return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl mb-2">لوحة معلومات القسم</h2>
        <p className="text-gray-600">إحصائيات شاملة عن الطلاب المسجلين والطلبات</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">إجمالي طلاب القسم</p>
              <p className="text-2xl">{totalDepartmentStudents}</p>
              <p className="text-xs text-gray-500 mt-1">{subjects.length} مواد</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">طلبات دواعي التخرج</p>
              <p className="text-2xl">{totalRequests}</p>
              <p className="text-xs text-gray-500 mt-1">إجمالي الطلبات</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">موافق على طلباتهم</p>
              <p className="text-2xl">{totalApproved}</p>
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
              <p className="text-gray-600 text-sm">قيد المراجعة</p>
              <p className="text-2xl">{totalPending}</p>
              <p className="text-xs text-gray-500 mt-1">طلبات منتظرة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Department Subjects Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg mb-4">عدد الطلاب المسجلين في مواد القسم</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                style={{ fontSize: '12px' }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#3b82f6" name="الطلاب المسجلين" />
              <Bar dataKey="capacity" fill="#e5e7eb" name="السعة الكلية" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Exceptional Requests Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg mb-4">الطلبات الاستثنائية</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={requestsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="approved" fill="#10b981" name="موافق عليها" />
              <Bar dataKey="pending" fill="#f59e0b" name="قيد المراجعة" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Details Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg">مواد القسم - التفاصيل</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-right py-3 px-6 text-sm font-medium text-gray-600">كود المادة</th>
                <th className="text-right py-3 px-6 text-sm font-medium text-gray-600">اسم المادة</th>
                <th className="text-center py-3 px-6 text-sm font-medium text-gray-600">الطلاب المسجلين</th>
                <th className="text-center py-3 px-6 text-sm font-medium text-gray-600">السعة</th>
                <th className="text-center py-3 px-6 text-sm font-medium text-gray-600">المتبقي</th>
                <th className="text-center py-3 px-6 text-sm font-medium text-gray-600">نسبة الإشغال</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                const occupancy = Math.round((subject.students / subject.capacity) * 100);
                const available = subject.capacity - subject.students;
                
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-600">{subject.code}</td>
                    <td className="py-4 px-6 font-medium">{subject.name}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {subject.students}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {subject.capacity}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        available > 10 
                          ? 'bg-green-50 text-green-700' 
                          : available > 5 
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {available}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              occupancy >= 90 ? 'bg-red-500' : 
                              occupancy >= 75 ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`}
                            style={{ width: `${occupancy}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{occupancy}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exceptional Requests Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg mb-4 pb-4 border-b border-gray-200">طلبات فتح مواد دواعي التخرج</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">إجمالي الطلبات</span>
              <span className="text-2xl font-medium">{exceptionalRequests.graduation.count}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">موافق عليها</span>
              <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium">
                {exceptionalRequests.graduation.approved}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">قيد المراجعة</span>
              <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium">
                {exceptionalRequests.graduation.pending}
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">معدل القبول</span>
                <span className="text-xl font-medium text-green-600">
                  {Math.round((exceptionalRequests.graduation.approved / exceptionalRequests.graduation.count) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg mb-4 pb-4 border-b border-gray-200">طلبات فتح مواد من أقسام أخرى</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">إجمالي الطلبات</span>
              <span className="text-2xl font-medium">{exceptionalRequests.otherDepartment.count}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">موافق عليها</span>
              <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium">
                {exceptionalRequests.otherDepartment.approved}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">قيد المراجعة</span>
              <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium">
                {exceptionalRequests.otherDepartment.pending}
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">معدل القبول</span>
                <span className="text-xl font-medium text-green-600">
                  {Math.round((exceptionalRequests.otherDepartment.approved / exceptionalRequests.otherDepartment.count) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}