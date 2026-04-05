import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const student = {
    name: "أحمد مصطفى كمال حسن",
    code: "26128228",
    gpa: 3.0,
  };

  const stats = {
    completed: 24,
    remaining: 18,
    cumulative: 3.0,
  };

  const navigate = useNavigate();

  return (
   <div dir="rtl" className="min-h-screen bg-gray-100 flex">

  {/* 🔥 Sidebar */}
  <div className={`
    fixed md:static top-0 right-0 h-full z-50
    w-64 bg-white shadow-lg p-5 flex flex-col justify-between
    transform transition-transform duration-300
    ${openSidebar ? "translate-x-0" : "translate-x-full md:translate-x-0"}
  `}>

    <div>
      {/* Title */}
      <div className="flex items-center mb-4">
        <i className="fa-solid fa-graduation-cap text-blue-500 text-xl"></i>
        <h2 className="text-lg font-bold ms-2">
          بوابة خدمات الطالب
        </h2>
      </div>

      {/* Student Card */}
      <div className="bg-blue-600 text-white rounded-xl p-4 mb-6 shadow">
        <p className="font-semibold text-sm">{student.name}</p>
        <p className="text-sm">الكود: {student.code}</p>
        <p className="text-sm">
          المعدل: {student.gpa.toFixed(2)}
        </p>
      </div>

      {/* Menu */}
      <nav style={{ height:"59vh"}} className="flex flex-col gap-4 text-sm">

        <div className="flex items-center gap-3 text-blue-600 font-medium">
          <i className="fa-solid fa-book"></i>
          <span>معلومات الطالب</span>
        </div>

        <div
          onClick={() => navigate("/register")}
          className="flex items-center gap-3 hover:text-blue-500 cursor-pointer p-2 rounded-lg transition"
        >
          <i className="fa-solid fa-pen"></i>
          <span>تسجيل المواد</span>
        </div>

        <div
          onClick={() => navigate("/chat")}
          className="flex items-center gap-3 hover:text-blue-500 cursor-pointer p-2 rounded-lg transition"
        >
          <i className="fa-solid fa-robot"></i>
          <span>المساعد الذكي</span>
        </div>

        <div className="flex items-center gap-3 hover:text-blue-500 cursor-pointer">
          <i className="fa-solid fa-circle-question"></i>
          <span>المساعدة</span>
        </div>
      </nav>

      {/* Logout */}
      <div className="flex items-center gap-3 text-red-600 cursor-pointer hover:bg-red-100 p-2 rounded-lg transition mt-4">
        <i className="fa-solid fa-right-from-bracket"></i>
        <span
          onClick={() => { navigate("/") }}
          className="font-semibold"
        >
          تسجيل الخروج
        </span>
      </div>
    </div>
  </div>

  {/* 🔥 Overlay في الموبايل */}
  {openSidebar && (
    <div
      className="fixed inset-0 bg-black/40 z-40 md:hidden"
      onClick={() => setOpenSidebar(false)}
    ></div>
  )}

  {/* 🔥 Main */}
  <div className="flex-1 p-4 sm:p-6 md:p-8">

    {/* 🔥 زرار المينيو */}
    <button
      onClick={() => setOpenSidebar(true)}
      className="md:hidden mb-4 text-2xl"
    >
      <i className="fa-solid fa-bars"></i>
    </button>

    <h3 className="text-lg sm:text-xl font-bold mb-4">
      المواد المسجلة
    </h3>

    {/* Empty State */}
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow text-center">
      <div className="flex flex-col items-center py-6 sm:py-10">
        <i className="fa-solid fa-book-open text-3xl sm:text-5xl text-blue-200 mb-4"></i>

        <p className="mb-3 font-medium text-gray-600 text-sm sm:text-base">
          لا توجد مواد مسجلة حالياً
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          تسجيل المواد
        </button>
      </div>

      <div className="mt-6 bg-gray-50 p-3 sm:p-4 rounded border text-xs sm:text-sm text-gray-500">
        يمكنك تسجيل المواد بدءاً من 15 فبراير 2026.
      </div>
    </div>

    {/* Stats */}
    <div className="flex flex-col sm:flex-row mt-6 gap-3 sm:gap-4">

      <div className="flex-1 bg-green-100 p-3 sm:p-4 rounded-xl text-center">
        <p className="font-bold text-green-700 text-base sm:text-lg">
          {stats.completed}
        </p>
        <i className="fa-solid fa-check text-green-600"></i>
        <p className="text-gray-600 text-xs sm:text-sm">
          المواد المكتملة
        </p>
      </div>

      <div className="flex-1 bg-purple-100 p-3 sm:p-4 rounded-xl text-center">
        <p className="font-bold text-purple-700 text-base sm:text-lg">
          {stats.remaining}
        </p>
        <i className="fa-solid fa-clock text-purple-600"></i>
        <p className="text-gray-600 text-xs sm:text-sm">
          المواد المتبقية
        </p>
      </div>

      <div className="flex-1 bg-blue-100 p-3 sm:p-4 rounded-xl text-center">
        <p className="font-bold text-blue-700 text-base sm:text-lg">
          {stats.cumulative.toFixed(2)}
        </p>
        <i className="fa-solid fa-pen text-blue-500"></i>
        <p className="text-gray-600 text-xs sm:text-sm">
          معدلك التراكمي
        </p>
      </div>
    </div>
  </div>

  {/* Support */}
  <div className="fixed bottom-0 left-0 w-full bg-blue-600 text-white p-2 sm:p-3 flex justify-center items-center gap-2 text-xs sm:text-sm">
    <i className="fa-solid fa-comment"></i>
    <p>
      هل تحتاج مساعدة؟
      <span
        onClick={() => navigate("/chat")}
        className="cursor-pointer ms-1 hover:opacity-80"
      >
        تحدث مع المساعد الذكي
      </span>
    </p>
  </div>

</div>
  );
}

export default Dashboard;