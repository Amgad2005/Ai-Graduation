import React, { useRef, useState } from "react";
import { Upload, FileText, X, CheckCircle, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../Api/Api";

export function FileUploadSection() {
  const fileInputRefRegulation = useRef(null);
  const fileInputRefStudents = useRef(null);

  const [regulationFile, setRegulationFile] = useState(null); // ملف اللائحة (PDF)
  const [studentsFile, setStudentsFile] = useState(null);     // ملف الطلاب (Excel)
  const [uploading, setUploading] = useState(false);
  const [processingStatus, setProcessingStatus] = useState(null); // null | 'pending' | 'processing' | 'completed' | 'failed'
  const [advisorStatus, setAdvisorStatus] = useState(null);

  const MAX_SIZE = 10 * 1024 * 1024;

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const validateFile = (file, allowedTypes, label) => {
    if (file.size > MAX_SIZE) {
      toast.error(`الملف ${file.name} أكبر من 10MB`);
      return false;
    }
    const ext = file.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes(ext)) {
      toast.error(`ملف ${label} يجب أن يكون ${allowedTypes.join(" أو ")}`);
      return false;
    }
    return true;
  };

  const handleRegulationChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (validateFile(file, ["pdf"], "اللائحة")) {
      setRegulationFile(file);
      toast.success("تم اختيار ملف اللائحة ✅");
    }
  };

  const handleStudentsChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (validateFile(file, ["xlsx", "xls"], "الطلاب")) {
      setStudentsFile(file);
      toast.success("تم اختيار ملف الطلاب ✅");
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (type === "regulation") {
      if (validateFile(file, ["pdf"], "اللائحة")) {
        setRegulationFile(file);
        toast.success("تم اختيار ملف اللائحة ✅");
      }
    } else {
      if (validateFile(file, ["xlsx", "xls"], "الطلاب")) {
        setStudentsFile(file);
        toast.success("تم اختيار ملف الطلاب ✅");
      }
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // بعت الملفات للـ API
  const handleSubmit = async () => {
    if (!regulationFile || !studentsFile) {
      toast.error("من فضلك ارفع ملف اللائحة وملف الطلاب");
      return;
    }

    setUploading(true);
    setProcessingStatus(null);
    setAdvisorStatus(null);

    try {
      const formData = new FormData();
      formData.append("collage_list", regulationFile);
      formData.append("student_formula", studentsFile);
      formData.append("term", "Next Term");

      await Api.post("/admin/setup/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("تم رفع الملفات بنجاح، جاري المعالجة... ⏳");
      setProcessingStatus("pending");

      // ابدأ polling كل 5 ثواني
      pollStatus();
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "حدث خطأ أثناء الرفع");
    } finally {
      setUploading(false);
    }
  };

  // polling لمتابعة حالة المعالجة
  const pollStatus = () => {
    const interval = setInterval(async () => {
      try {
        const [setupRes, advisorRes] = await Promise.all([
          Api.get("/admin/setup/status"),
          Api.get("/admin/advisor/status"),
        ]);

        const setup = setupRes.data?.data?.processing_status;
        const advisor = advisorRes.data?.data?.advisor_status;

        setProcessingStatus(setup);
        setAdvisorStatus(advisor);

        console.log("Setup:", setup, "| Advisor:", advisor);

        if (setup === "completed" && advisor === "ready") {
          clearInterval(interval);
          toast.success("تمت المعالجة بنجاح! النظام جاهز ✅");
        } else if (setup === "failed") {
          clearInterval(interval);
          toast.error("فشلت المعالجة، حاول مرة أخرى");
        }
      } catch (err) {
        console.error("POLL ERROR:", err);
        clearInterval(interval);
      }
    }, 5000);
  };

  const statusLabels = {
    pending:    { label: "⏳ في الانتظار", color: "text-yellow-600 bg-yellow-50" },
    processing: { label: "🔄 جاري المعالجة", color: "text-blue-600 bg-blue-50" },
    completed:  { label: "✅ اكتملت المعالجة", color: "text-green-600 bg-green-50" },
    failed:     { label: "❌ فشلت المعالجة", color: "text-red-600 bg-red-50" },
    ready:      { label: "✅ جاهز", color: "text-green-600 bg-green-50" },
    idle:       { label: "💤 لم يبدأ بعد", color: "text-gray-600 bg-gray-50" },
    offline:    { label: "❌ غير متصل", color: "text-red-600 bg-red-50" },
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">الإرشاد الأكاديمي</h1>
        <p className="text-gray-600">قم برفع الملفات بسهولة وأمان</p>
      </div>

      {/* Upload Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* اللائحة - PDF */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="font-semibold text-gray-900 mb-1">رفع ملفات اللائحة الأكاديمية</h2>
          <p className="text-xs text-gray-400 mb-6">PDF فقط</p>
          <div
            onDrop={(e) => handleDrop(e, "regulation")}
            onDragOver={handleDragOver}
            onClick={() => fileInputRefRegulation.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer ${
              regulationFile
                ? "border-green-400 bg-green-50"
                : "border-blue-300 bg-blue-50 hover:border-blue-500"
            }`}
          >
            {regulationFile ? (
              <>
                <CheckCircle className="mx-auto w-10 h-10 text-green-600 mb-3" />
                <p className="font-medium text-green-700">{regulationFile.name}</p>
                <p className="text-xs text-gray-400 mt-1">{formatFileSize(regulationFile.size)}</p>
              </>
            ) : (
              <>
                <Upload className="mx-auto w-10 h-10 text-blue-600 mb-3" />
                <p className="font-medium text-gray-900">اسحب ملف اللائحة أو اضغط للاختيار</p>
              </>
            )}
            <input
              ref={fileInputRefRegulation}
              type="file"
              className="hidden"
              onChange={handleRegulationChange}
              accept=".pdf"
            />
          </div>
          {regulationFile && (
            <button
              onClick={() => setRegulationFile(null)}
              className="mt-3 text-xs text-red-500 hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> إزالة الملف
            </button>
          )}
        </div>

        {/* الطلاب - Excel */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="font-semibold text-gray-900 mb-1">رفع صحائف الطلاب</h2>
          <p className="text-xs text-gray-400 mb-6">Excel فقط (.xlsx / .xls)</p>
          <div
            onDrop={(e) => handleDrop(e, "students")}
            onDragOver={handleDragOver}
            onClick={() => fileInputRefStudents.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer ${
              studentsFile
                ? "border-green-400 bg-green-50"
                : "border-green-300 bg-green-50 hover:border-green-500"
            }`}
          >
            {studentsFile ? (
              <>
                <CheckCircle className="mx-auto w-10 h-10 text-green-600 mb-3" />
                <p className="font-medium text-green-700">{studentsFile.name}</p>
                <p className="text-xs text-gray-400 mt-1">{formatFileSize(studentsFile.size)}</p>
              </>
            ) : (
              <>
                <Upload className="mx-auto w-10 h-10 text-green-600 mb-3" />
                <p className="font-medium text-gray-900">اسحب صحائف الطلاب أو اضغط للاختيار</p>
              </>
            )}
            <input
              ref={fileInputRefStudents}
              type="file"
              className="hidden"
              onChange={handleStudentsChange}
              accept=".xlsx,.xls"
            />
          </div>
          {studentsFile && (
            <button
              onClick={() => setStudentsFile(null)}
              className="mt-3 text-xs text-red-500 hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> إزالة الملف
            </button>
          )}
        </div>
      </div>

      {/* زرار الرفع */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={uploading || !regulationFile || !studentsFile}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {uploading ? "جاري الرفع..." : "رفع الملفات وبدء المعالجة"}
        </button>
      </div>

      {/* حالة المعالجة */}
      {processingStatus && (
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-3">
          <h3 className="font-semibold text-gray-900">حالة المعالجة</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium ${statusLabels[processingStatus]?.color}`}>
              قاعدة البيانات: {statusLabels[processingStatus]?.label}
            </div>
            {advisorStatus && (
              <div className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium ${statusLabels[advisorStatus]?.color}`}>
                نظام التوصيات: {statusLabels[advisorStatus]?.label}
              </div>
            )}
          </div>
          {processingStatus !== "completed" && processingStatus !== "failed" && (
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> يتم التحديث تلقائياً كل 5 ثواني...
            </p>
          )}
        </div>
      )}
    </div>
  );
}