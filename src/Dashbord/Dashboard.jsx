import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api/Api";
function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);

 const student = JSON.parse(localStorage.getItem("user")) || {};

const [stats, setStats] = useState({
  completed: 0,
  remaining: 0,
});
  const navigate = useNavigate();
useEffect(() => {
  async function getCourses() {
    try {
      const response = await Api.get("/student/courses");

      console.log("COURSES RESPONSE:", response.data);

      setStats({
        completed: response?.data?.data?.completed?.length || 0,
        remaining: response?.data?.data?.remaining?.length || 0,
      });

    } catch (error) {
      console.log(error);
    }
  }

  getCourses();
}, []);
  return (
    <div
      dir="rtl"
      className="h-screen bg-gray-100 flex overflow-hidden"
    >

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 right-0 h-screen z-50
          w-64 bg-white shadow-lg p-5 flex flex-col justify-between
          transition-all duration-300 ease-in-out

          ${openSidebar
            ? "translate-x-0 opacity-100"
            : "translate-x-full md:translate-x-0 opacity-0 md:opacity-100"}
        `}
      >

        {/* Top */}
        <div>

          {/* Logo */}
          <div className="flex items-center mb-8">
            <i className="fa-solid fa-graduation-cap text-blue-500 text-2xl animate-pulse"></i>

            <h2 className="text-xl font-bold ms-2">
              بوابة خدمات الطالب
            </h2>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-4 text-base font-bold">

            <div className="flex items-center gap-3 text-blue-600">
              <i className="fa-solid fa-book w-5 text-center"></i>
              <span>معلومات الطالب</span>
            </div>


            <div
              onClick={() => navigate("/chat")}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer
              hover:bg-blue-50 hover:text-blue-600 transition-all duration-300
              hover:translate-x-1 hover:shadow-md"
            >
              <i className="fa-solid fa-robot w-5 text-center"></i>
              <span>المرشد الذكي</span>
            </div>

            <div
              onClick={() => navigate("/request")}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer
              hover:bg-blue-50 hover:text-blue-600 transition-all duration-300
              hover:translate-x-1 hover:shadow-md"
            >
              <i className="fa-solid fa-book-open w-5 text-center"></i>
              <span>طلبات دواعي التخرج</span>
            </div>
            <div
              onClick={() => navigate("/normal")}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer
              hover:bg-blue-50 hover:text-blue-600 transition-all duration-300
              hover:translate-x-1 hover:shadow-md"
            >
              <i className="fa-solid fa-book-open w-5 text-center"></i>
              <span>طلبات التسجيل المواد</span>
            </div>

            <div
              onClick={() => navigate("/student-db")}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer
              hover:bg-blue-50 hover:text-blue-600 transition-all duration-300
              hover:translate-x-1 hover:shadow-md"
            >
              <i className="fa-solid fa-chart-line w-5 text-center"></i>
              <span>الاداء الدراسي</span>
            </div>
            
           

            <div
              onClick={() => navigate("/help")}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer
              hover:bg-blue-50 hover:text-blue-600 transition-all duration-300
              hover:translate-x-1 hover:shadow-md"
            >
              <i className="fa-solid fa-circle-question w-5 text-center"></i>
              <span>المساعدة</span>
            </div>

          </nav>
        </div>

        {/* Logout */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-red-600 cursor-pointer
          hover:bg-red-100 p-3 rounded-xl transition-all duration-300
          hover:translate-x-1 hover:shadow-md font-bold text-base"
        >
          <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>

          <span>
            تسجيل الخروج
          </span>
        </div>
      </div>

      {/* Overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 p-4 md:p-5 overflow-hidden">

        {/* Mobile Menu */}
        <button
          onClick={() => setOpenSidebar(true)}
          className="md:hidden mb-4 text-3xl"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-extrabold mb-4 text-gray-800">
          معلومات الطالب
        </h2>

        {/* Main Card */}
        <div
          className="bg-white rounded-3xl shadow-lg p-4 h-[82vh]
          flex flex-col transition-all duration-300 hover:shadow-2xl"
        >

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-4">

            <div
              className="w-20 h-20 rounded-full bg-blue-100
              flex items-center justify-center mb-3
              transition-all duration-300 hover:scale-110"
            >
              <i className="fa-solid fa-user-graduate text-4xl text-blue-600"></i>
            </div>

            <h2 className="text-xl font-extrabold text-gray-800">
              {student.name}
            </h2>

            <p className="text-base font-bold text-gray-500 mt-1">
              كود الطالب : {student.code}
            </p>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3">

            {/* Section */}
            <div
              className="bg-gray-50 rounded-2xl p-3
              flex items-center gap-4 border cursor-pointer
              transition-all duration-300
              hover:scale-[1.02] hover:shadow-lg hover:bg-blue-50"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center
                              transition-all duration-300 hover:rotate-6">
                <i className="fa-solid fa-building-columns text-blue-600 text-lg"></i>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500">
                  القسم
                </p>

                <h3 className="font-extrabold text-lg text-gray-800">
                  غير متوفر
                </h3>
              </div>
            </div>

            {/* Grade */}
            <div
              className="bg-gray-50 rounded-2xl p-3
              flex items-center gap-4 border cursor-pointer
              transition-all duration-300
              hover:scale-[1.02] hover:shadow-lg hover:bg-green-50"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center
                              transition-all duration-300 hover:rotate-6">
                <i className="fa-solid fa-graduation-cap text-green-600 text-lg"></i>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500">
                  السنة الدراسية
                </p>

                <h3 className="font-extrabold text-lg text-gray-800">
                  {student.level}
                </h3>
              </div>
            </div>

            {/* GPA */}
            <div
              className="bg-gray-50 rounded-2xl p-3
              flex items-center gap-4 border cursor-pointer
              transition-all duration-300
              hover:scale-[1.02] hover:shadow-lg hover:bg-purple-50"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center
                              transition-all duration-300 hover:rotate-6">
                <i className="fa-solid fa-chart-line text-purple-600 text-lg"></i>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500">
                  المعدل التراكمي
                </p>

                <h3 className="font-extrabold text-lg text-gray-800">
                  {Number(student.gpa || 0).toFixed(2)}
                </h3>
              </div>
            </div>

            {/* Completed */}
            <div
              className="bg-green-50 rounded-2xl p-3
              flex items-center gap-4 border cursor-pointer
              transition-all duration-300
              hover:scale-[1.02] hover:shadow-lg hover:bg-green-100"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center
                              transition-all duration-300 hover:rotate-6">
                <i className="fa-solid fa-check text-green-600 text-lg"></i>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500">
                  المواد المكتملة
                </p>

                <h3 className="font-extrabold text-lg text-green-700">
                  {stats.completed}
                </h3>
              </div>
            </div>

            {/* Remaining */}
            <div
              className="bg-purple-50 rounded-2xl p-3
              flex items-center gap-4 border cursor-pointer
              transition-all duration-300
              hover:scale-[1.02] hover:shadow-lg hover:bg-purple-100"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center
                              transition-all duration-300 hover:rotate-6">
                <i className="fa-solid fa-clock text-purple-600 text-lg"></i>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500">
                  المواد المتبقية
                </p>

                <h3 className="font-extrabold text-lg text-purple-700">
                  {stats.remaining}
                </h3>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Support Bar */}
      <div
        className="fixed bottom-0 left-0 w-full bg-blue-600
        text-white p-2 flex justify-center items-center gap-2
        text-sm font-bold"
      >
        <i className="fa-solid fa-comment"></i>

        <p>
          هل تحتاج مساعدة تسجيل المواد ؟

          <span
            onClick={() => navigate("/chat")}
            className="cursor-pointer ms-1 hover:opacity-80"
          >
            المرشد الذكي
          </span>
        </p>
      </div>

    </div>
  );
}

export default Dashboard;