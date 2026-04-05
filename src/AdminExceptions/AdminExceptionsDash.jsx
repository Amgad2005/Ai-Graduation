import React, { useState } from 'react';
import { FileText, Check, X, Eye, ArrowRight } from 'lucide-react';

export default function AdminExceptionsDash() {
  const [activeTab, setActiveTab] = useState('all');

  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'أحمد مصطفى',
      studentId: '20128920',
      status: 'pending',
      type: 'طلب استثنائي',
      subject: 'الشبكات العصبية',
      date: '٢٠٢٦/٣/٥'
    },
    {
      id: 2,
      name: 'محمد أيمن',
      studentId: '20129145',
      status: 'pending',
      type: 'فتح مادة لدواعي التخرج',
      subject: 'بناء الحاسب',
      date: '٢٠٢٦/٣/٤'
    },
    {
      id: 3,
      name: 'مينا إيهاب',
      studentId: '20127856',
      status: 'approved',
      type: 'طلب استثنائي',
      subject: 'طرق الوصول الأمثل',
      date: '٢٠٢٦/٣/٣'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  const totalCount = requests.length;
  const exceptionsCount = requests.filter(r => r.type === 'طلب استثنائي').length;
  const graduationCount = requests.filter(r => r.type === 'فتح مادة لدواعي التخرج').length;

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'all') return true;
    if (activeTab === 'exceptions') return req.type === 'طلب استثنائي';
    if (activeTab === 'graduation') return req.type === 'فتح مادة لدواعي التخرج';
    return true;
  });

  return (
    <div className="space-y-6 mt-5">
      <div className="flex items-center justify-between mb-6">
        <div className="text-right">
          <h1 className="text-2xl font-bold text-gray-900">لوحة الإدارة</h1>
          <p className="text-gray-500">إدارة الطلبات الاستثنائية وطلبات فتح المواد</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pending Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between col-span-1">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">طلبات قيد الانتظار</span>
            <span className="text-2xl font-bold mt-1">{pendingCount}</span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Approved Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between col-span-1">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">طلبات موافق عليها</span>
            <span className="text-2xl font-bold mt-1">{approvedCount}</span>
          </div>
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
        </div>

        {/* Rejected Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between col-span-1">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">طلبات مرفوضة</span>
            <span className="text-2xl font-bold mt-1">{rejectedCount}</span>
          </div>
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
            <X className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('all')}
          >
            جميع الطلبات ({totalCount})
          </button>
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'exceptions' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('exceptions')}
          >
            الطلبات الاستثنائية ({exceptionsCount})
          </button>
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'graduation' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('graduation')}
          >
            فتح مواد دواعي التخرج ({graduationCount})
          </button>
        </div>

        {/* Requests List */}
        <div className="divide-y divide-gray-100">
          {filteredRequests.map((req) => (
            <div key={req.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{req.name}</h3>
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-sm">{req.studentId}</span>
                  {req.status === 'pending' && (
                    <span className="text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded text-sm border border-yellow-200">قيد الانتظار</span>
                  )}
                  {req.status === 'approved' && (
                    <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-sm border border-green-200">موافق عليه</span>
                  )}
                  {req.status === 'rejected' && (
                    <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded text-sm border border-red-200">مرفوض</span>
                  )}
                </div>
                
                <div className="text-gray-600 text-sm space-y-1">
                  <p>نوع الطلب: <span className="font-medium text-gray-800">{req.type}</span></p>
                  <p>المادة: <span className="font-medium text-gray-800">{req.subject}</span></p>
                  <p>تاريخ التقديم: <span className="text-gray-500">{req.date}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {req.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusChange(req.id, 'rejected')}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      رفض <X className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleStatusChange(req.id, 'approved')}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      موافقة <Check className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  عرض <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
