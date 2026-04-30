import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
  { key: "upcoming", label: "الفصل القادم" },
  { key: "remaining", label: "المتبقية" },
  { key: "completed", label: "المكتملة" },
];

const data = {
  upcoming: [
    { id: 1, name: "تعلم الآلة", code: "CS405", hours: 3, checked: false },
    { id: 2, name: "الأمن السيبراني", code: "CS408", hours: 3, checked: false },
    {
      id: 3,
      name: "الحوسبة السحابية",
      code: "CS412",
      hours: 3,
      checked: false,
    },
    {
      id: 4,
      name: "معالجة اللغات الطبيعية",
      code: "CS450",
      hours: 3,
      checked: false,
    },
    { id: 5, name: "نظم التشغيل", code: "CS302", hours: 3, checked: false },
  ],
  remaining: [
    { id: 6, name: "هندسة البرمجيات 2", code: "CS301", hours: 3 },
    { id: 7, name: "نظم التشغيل", code: "CS302", hours: 3 },
  ],
  completed: [
    {
      id: 8,
      name: "مقدمة في علوم الحاسب",
      code: "CS101",
      hours: 3,
      grade: "A",
    },
    { id: 9, name: "هياكل البيانات", code: "CS201", hours: 3, grade: "B+" },
  ],
};

export default function StudyPlan() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [courses, setCourses] = useState(data);

  const toggle = (id) => {
    setCourses((prev) => ({
      ...prev,
      upcoming: prev.upcoming.map((c) =>
        c.id === id ? { ...c, checked: !c.checked } : c,
      ),
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", courses);
    alert("تم حفظ الخطة ✅");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 p-3 sm:p-6">

  {/* Header */}
  <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
    
    <div className="text-right w-full sm:w-auto">
      <h1 className="text-lg sm:text-2xl font-bold">خطة الدراسة</h1>
      <p className="text-xs sm:text-sm text-gray-400">
        توصيات مخصصة بناءً على أدائك واهتماماتك.
      </p>
    </div>

    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 rounded-lg shadow hover:bg-gray-50 transition"
    >
      <i className="fa-solid fa-arrow-left"></i>
      الرجوع
    </button>
  </div>

  {/* Tabs */}
  <div className="flex flex-row-reverse border-b mb-6 overflow-x-auto">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm border-b-2 transition whitespace-nowrap ${
          activeTab === tab.key
            ? "border-indigo-600 text-indigo-600"
            : "border-transparent text-gray-400 hover:text-black"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>

  {/* Cards */}
  <div className="space-y-3 sm:space-y-4">

    {/* الفصل القادم */}
    {activeTab === "upcoming" &&
      courses.upcoming.map((course) => (
        <div
          key={course.id}
          onClick={() => toggle(course.id)}
          className="bg-white rounded-xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between border cursor-pointer transition hover:shadow-md hover:scale-[1.01] gap-3"
        >
          <div
            className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
              course.checked
                ? "bg-indigo-600 border-indigo-600"
                : "border-gray-300"
            }`}
          >
            {course.checked && (
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 w-full justify-between">
            
            <div className="text-right">
              <p className="font-semibold text-sm sm:text-base">
                {course.name}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {course.code} ساعات معتمدة {course.hours}
              </p>
            </div>

            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-sm">
              📘
            </div>
          </div>
        </div>
      ))}

    {/* المتبقية */}
    {activeTab === "remaining" &&
      courses.remaining.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between border transition hover:shadow-md gap-3"
        >
          <div></div>

          <div className="flex items-center gap-3 sm:gap-4 w-full justify-between">
            
            <div className="text-right">
              <p className="font-semibold text-sm sm:text-base">
                {course.name}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {course.code} - {course.hours} ساعات معتمدة
              </p>
            </div>

            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-sm">
              📙
            </div>
          </div>
        </div>
      ))}

    {/* المكتملة */}
    {activeTab === "completed" &&
      courses.completed.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between border transition hover:shadow-md gap-3"
        >
          <div className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold">
            {course.grade}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 w-full justify-between">
            
            <div className="text-right">
              <p className="font-semibold text-sm sm:text-base">
                {course.name}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {course.code} - {course.hours} ساعات معتمدة
              </p>
            </div>

            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-lg flex items-center justify-center text-sm">
              ✅
            </div>
          </div>
        </div>
      ))}
  </div>

  {/* Save Button */}
  <button
    onClick={handleSave}
    className="mt-6 w-full sm:w-auto bg-indigo-600 text-white px-4 sm:px-5 py-2 text-sm sm:text-base rounded-lg hover:bg-indigo-700 transition"
  >
    حفظ الخطة
  </button>
</div>
  );
}
