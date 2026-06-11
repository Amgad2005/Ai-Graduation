import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api/Api";

export default function NormalException() {
  const navigate = useNavigate();

  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statusMap = {
    pending:  { label: "⏳ قيد المراجعة", className: "bg-yellow-100 text-yellow-700" },
    approved: { label: "✅ تمت الموافقة", className: "bg-green-100 text-green-700" },
    rejected: { label: "❌ مرفوض",        className: "bg-red-100 text-red-700" },
  };

  const fetchRequests = async () => {
    const requestsRes = await Api.get("/student/material-requests", {
      params: { type: "regular" },
    });
    const list = requestsRes.data?.data?.requests || [];
    setRequests(list);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const coursesRes = await Api.get("/student/courses");
        const remaining = coursesRes.data?.data?.remaining || [];
        setAvailableCourses(remaining);
        await fetchRequests();
      } catch (err) {
        console.error("LOAD ERROR:", err);
      }
    }
    loadData();

    // Polling كل 30 ثانية
    const interval = setInterval(() => {
      fetchRequests();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!selectedCourseId || !reason) {
      setError("من فضلك اختر المادة واكتب سبب الطلب");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setLoading(true);
    try {
      await Api.post("/student/material-requests/regular", {
        courses: [Number(selectedCourseId)],
        student_notes: reason,
      });

      await fetchRequests();

      setSelectedCourseId("");
      setReason("");
      setToast("تم إرسال الطلب بنجاح ✅");
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      console.error("SUBMIT ERROR:", err.response?.data);
      setError(err.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 p-3 sm:p-6">

      {/* Toast */}
      {toast && (
        <div className="fixed top-3 sm:top-5 left-3 sm:left-5 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg text-xs sm:text-sm z-50">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-2 flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 rounded-lg shadow hover:bg-gray-50 transition"
        >
          <i className="fa-solid fa-arrow-left"></i>
          الرجوع
        </button>
        <h1 className="text-base sm:text-xl font-bold text-center flex-1 w-full sm:w-auto">
          طلبات التسجيل الاستثنائية
        </h1>
        <div className="hidden sm:block w-10"></div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 text-center text-red-600 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* طلب جديد */}
      <div className="mb-6">
        <h2 className="mb-3 font-semibold text-gray-700 text-sm sm:text-base">
          طلب جديد
        </h2>

        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full mb-4 p-2 sm:p-3 text-sm sm:text-base rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">-- اختر المادة --</option>
          {availableCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name} ({course.code})
            </option>
          ))}
        </select>

        <textarea
          placeholder="سبب الطلب"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full h-24 sm:h-28 p-2 sm:p-3 text-sm sm:text-base rounded-xl border outline-none resize-none mb-4 focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg shadow hover:bg-blue-700 active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "جاري الإرسال..." : "إرسال الطلب"}
          </button>
        </div>
      </div>

      {/* السجل */}
      <div>
        <h2 className="mb-3 font-semibold text-gray-700 text-sm sm:text-base">
          سجل الطلبات
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">
            لا يوجد طلبات حتى الآن
          </p>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {requests.map((req) => {
              const statusInfo = statusMap[req.status] || statusMap["pending"];
              return (
                <div
                  key={req.id}
                  className="bg-white p-3 sm:p-5 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition hover:shadow-md hover:scale-[1.01]"
                >
                  <div className="text-right w-full">
                    <h3 className="font-semibold text-sm sm:text-base">
                      {req.course?.name || req.subject}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {req.student_notes || req.reason}
                    </p>
                    {req.adviser_notes && (
                      <p className="text-xs text-red-500 mt-1">
                        ملاحظة المشرف: {req.adviser_notes}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
                      {formatDate(req.created_at || req.date)}
                    </p>
                  </div>

                  <span className={`text-[10px] sm:text-xs px-3 py-1 rounded-full self-start sm:self-auto ${statusInfo.className}`}>
                    {statusInfo.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}