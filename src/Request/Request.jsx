import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const requestsData = [];

export default function GraduationRequests() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState(requestsData);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = () => {
    if (!subject || !reason) {
      setError("من فضلك املا كل البيانات");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const newRequest = {
      id: Date.now(),
      subject,
      reason,
      date: new Date(),
      status: "pending",
    };

    setRequests([newRequest, ...requests]);
    setSubject("");
    setReason("");

    // Toast
    setToast("تم إرسال الطلب بنجاح");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 p-3 sm:p-6">

  {/* Toast */}
  {toast && (
    <div className="fixed top-3 sm:top-5 left-3 sm:left-5 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg text-xs sm:text-sm">
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
      طلبات دواعي التخرج
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

    {/* Input */}
    <input
      type="text"
      placeholder="اكتب اسم المادة"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      className="w-full mb-4 p-2 sm:p-3 text-sm sm:text-base rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Textarea */}
    <textarea
      placeholder="سبب الطلب"
      value={reason}
      onChange={(e) => setReason(e.target.value)}
      className="w-full h-24 sm:h-28 p-2 sm:p-3 text-sm sm:text-base rounded-xl border outline-none resize-none mb-4 focus:ring-2 focus:ring-blue-500"
    ></textarea>

    {/* Button */}
    <div className="flex justify-center">
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg shadow hover:bg-blue-700 active:scale-95 transition"
      >
        إرسال الطلب
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
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-3 sm:p-5 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition hover:shadow-md hover:scale-[1.01]"
          >
            
            {/* البيانات */}
            <div className="text-right w-full">
              <h3 className="font-semibold text-sm sm:text-base">
                {req.subject}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {req.reason}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
                {formatDate(req.date)}
              </p>
            </div>

            {/* الحالة */}
            <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 self-start sm:self-auto">
              ⏳ قيد المراجعة
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
}