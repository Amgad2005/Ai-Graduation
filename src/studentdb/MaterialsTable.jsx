import { useEffect, useState } from "react";
import Api from "../Api/Api";

const ITEMS_PER_PAGE = 6;

export default function MaterialsTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await Api.get("/student/courses");
        const completed = res.data?.data?.completed || [];
        const inProgress = res.data?.data?.in_progress || [];

        const all = [
          ...completed.map((c) => ({ ...c, status: "ناجح" })),
          ...inProgress.map((c) => ({ ...c, status: "جاري" })),
        ];
        setCourses(all);
      } catch (err) {
        console.error("COURSES ERROR:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const paginated = courses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 text-right">المواد المسجلة</h3>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-7 h-7 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-6">لا توجد مواد</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 pr-4 text-sm font-medium text-gray-500">الحالة</th>
                  <th className="pb-3 pr-4 text-sm font-medium text-gray-500">الساعات</th>
                  <th className="pb-3 pr-4 text-sm font-medium text-gray-500">الكود</th>
                  <th className="pb-3 pr-4 text-sm font-medium text-gray-500">المادة</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((course, index) => (
                  <tr key={course.id || index} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 pr-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-medium ${
                        course.status === "ناجح"
                          ? "bg-green-50 text-green-600"
                          : "bg-blue-50 text-blue-600"
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-600">{course.credit_hours} ساعات</td>
                    <td className="py-3 pr-4 text-sm text-gray-600">{course.code}</td>
                    <td className="py-3 pr-4 text-sm text-gray-800 font-medium">{course.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm transition ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}