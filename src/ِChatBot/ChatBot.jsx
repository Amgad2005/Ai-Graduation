import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const tabs = [
  { key: "upcoming", label: "الفصل القادم" },
  { key: "remaining", label: "المتبقية" },
  { key: "completed", label: "المكتملة" },
];

export default function StudyPlan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [loadingRecommend, setLoadingRecommend] = useState(false);
  const [courseMap, setCourseMap] = useState({});
  const [courses, setCourses] = useState({
    upcoming: [],
    remaining: [],
    completed: [],
  });

  const loadRecommendations = async () => {
    setLoadingRecommend(true);
    try {
      let advisorReady = false;
      try {
        const statusRes = await Api.get("/student/recommend/status");
        advisorReady = statusRes.data?.data?.status === "ready";
      } catch {
        advisorReady = false;
      }

      if (!advisorReady) {
        toast.warning("نظام التوصيات غير جاهز حالياً، حاول مرة أخرى لاحقاً.", {
          position: "top-center",
        });
        return;
      }

      const recommendResponse = await Api.post("/student/recommend", {
        term: "Next Term",
      });
      const upcomingCourses = recommendResponse.data?.data?.recommended_courses || [];
      setCourses((prev) => ({ ...prev, upcoming: upcomingCourses }));
      toast.success("تم تحميل التوصيات بنجاح ✅", { position: "top-center", autoClose: 2000 });
    } catch (recommendError) {
      console.log("RECOMMEND ERROR STATUS:", recommendError.response?.status);
      console.log("RECOMMEND ERROR DATA:", recommendError.response?.data);
      toast.error("حدث خطأ أثناء تحميل التوصيات", { position: "top-center" });
    } finally {
      setLoadingRecommend(false);
    }
  };

  useEffect(() => {
    async function loadCourses() {
      try {
        const coursesResponse = await Api.get("/student/courses");
        const coursesData = coursesResponse.data.data;

        // بناء map من code → name من كل الكورسات
        const allCourses = [
          ...(coursesData.remaining || []),
          ...(coursesData.completed || []),
        ];
        const map = {};
        allCourses.forEach((c) => {
          if (c.code) map[c.code] = c.name;
        });
        setCourseMap(map);

        setCourses((prev) => ({
          ...prev,
          remaining: coursesData.remaining || [],
          completed: coursesData.completed || [],
        }));
        await loadRecommendations();
      } catch (error) {
        console.error("GENERAL ERROR:", error);
        toast.error("حدث خطأ أثناء تحميل البيانات", { position: "top-center" });
      }
    }
    loadCourses();
  }, []);

  const toggle = (id) => {
    setCourses((prev) => ({
      ...prev,
      upcoming: prev.upcoming.map((c) =>
        c.course_code === id ? { ...c, checked: !c.checked } : c
      ),
    }));
  };

  const handleSave = () => {
    toast.success("تم حفظ الخطة بنجاح ✅", {
      position: "top-center",
      autoClose: 2000,
    });
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
        <div className="flex items-center gap-2">
          <button
            onClick={loadRecommendations}
            disabled={loadingRecommend}
            className="flex items-center gap-2 text-xs sm:text-sm bg-green-500 text-white px-2 sm:px-3 py-2 rounded-lg shadow hover:bg-green-600 transition disabled:opacity-50"
          >
            <i className="fa-solid fa-sync"></i>
            {loadingRecommend ? "جاري التحميل..." : "تحديث التوصيات"}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 rounded-lg shadow hover:bg-gray-50 transition"
          >
            <i className="fa-solid fa-arrow-left"></i>
            الرجوع
          </button>
        </div>
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

        {/* upcoming */}
        {activeTab === "upcoming" && (
          loadingRecommend ? (
            <div className="text-center py-10 text-gray-400">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-lg">⏳ جاري تحليل بياناتك...</p>
              <p className="text-sm mt-1">قد يستغرق هذا حتى 90 ثانية</p>
            </div>
          ) : courses.upcoming.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>لا توجد توصيات متاحة حالياً</p>
              <button
                onClick={loadRecommendations}
                className="mt-3 text-sm text-blue-500 hover:underline"
              >
                حاول مرة أخرى
              </button>
            </div>
          ) : (
            courses.upcoming.map((course, index) => (
              <div
                key={course.course_code || index}
                onClick={() => toggle(course.course_code)}
                className={`bg-white rounded-xl p-3 sm:p-5 flex flex-col border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg gap-3 ${
                  course.checked ? "border-blue-400 bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center ${
                    course.checked ? "bg-blue-600 border-blue-600" : "border-blue-200"
                  }`}>
                    {course.checked && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                  </div>
                  <div className="flex items-center gap-3 flex-1 justify-between">
                    <div className="text-right">
                      <p className="font-bold text-sm sm:text-base text-gray-800">
                        {course.course_title_in_arabic || course.course_title}
                      </p>
                      {course.course_title_in_arabic && course.course_title && (
                        <p className="text-xs text-gray-400 mt-0.5">{course.course_title}</p>
                      )}
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                      📘
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
                    🔖 {course.course_code}
                  </span>
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-lg">
                    ⏱ {course.credits} ساعات معتمدة
                  </span>
                  {course.catalog_availability_proof && (
                    <span className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-lg">
                      📅 {course.catalog_availability_proof}
                    </span>
                  )}
                </div>

                {course.justification && (
                  <div className="bg-green-50 rounded-lg px-3 py-2 text-right">
                    <p className="text-xs text-green-700">
                      <span className="font-semibold">✅ المتطلبات: </span>
                      {course.justification}
                    </p>
                  </div>
                )}
              </div>
            ))
          )
        )}

        {/* remaining */}
        {activeTab === "remaining" &&
          courses.remaining.map((course) => (
            <div key={course.id} className="bg-white rounded-xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg gap-3">
              <div className="w-5 h-5 border-2 border-blue-200 rounded flex-shrink-0"></div>
              <div className="flex items-center gap-3 sm:gap-4 w-full justify-between">
                <div className="text-right">
                  <p className="font-semibold text-sm sm:text-base text-gray-800">{course.name}</p>
                  <div className="flex gap-2 mt-1 justify-end flex-wrap">
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-lg">🔖 {course.code}</span>
                    <span className="bg-blue-50 text-blue-500 text-xs px-2 py-0.5 rounded-lg">⏱ {course.credit_hours} ساعات</span>
                    {course.prerequisite && (
                      <span className="bg-orange-50 text-orange-500 text-xs px-2 py-0.5 rounded-lg">
                        ⚠ يتطلب: {courseMap[course.prerequisite] || course.prerequisite}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center text-sm">📙</div>
              </div>
            </div>
          ))}

        {/* completed */}
        {activeTab === "completed" &&
          courses.completed.map((course) => (
            <div key={course.id} className="bg-white rounded-xl p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg gap-3">
              <div className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold flex-shrink-0">مكتمل</div>
              <div className="flex items-center gap-3 sm:gap-4 w-full justify-between">
                <div className="text-right">
                  <p className="font-semibold text-sm sm:text-base text-gray-800">{course.name}</p>
                  <div className="flex gap-2 mt-1 justify-end flex-wrap">
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-lg">🔖 {course.code}</span>
                    <span className="bg-blue-50 text-blue-500 text-xs px-2 py-0.5 rounded-lg">⏱ {course.credit_hours} ساعات</span>
                  </div>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-lg flex items-center justify-center text-sm">✅</div>
              </div>
            </div>
          ))}
      </div>

      {/* Save Button */}
      {activeTab === "upcoming" && (
        <div className="mt-6 flex gap-3 flex-wrap">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 sm:px-5 py-2 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition"
          >
            حفظ الخطة
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}