import React, { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function FileUploadSection({
  uploadedFiles,
  onFileUpload,
  onRemoveFile,
}) {
  const fileInputRefRegulation = useRef(null);
  const fileInputRefStudents = useRef(null);

  const [loading, setLoading] = useState({
    regulation: false,
    students: false,
  });

  const MAX_SIZE = 10 * 1024 * 1024;

  const validateFiles = (files) => {
    const validFiles = [];

    files.forEach((file) => {
      if (file.size > MAX_SIZE) {
        toast.error(`الملف ${file.name} أكبر من 10MB`);
      } else {
        validFiles.push(file);
      }
    });

    return validFiles;
  };

  const handleUpload = async (e, type) => {
    if (!e.target.files) return;

    setLoading((prev) => ({ ...prev, [type]: true }));

    const filesArray = Array.from(e.target.files);
    const valid = validateFiles(filesArray);

    await new Promise((r) => setTimeout(r, 500));

    onFileUpload(valid, type);

    toast.success("تم رفع الملفات بنجاح");

    setLoading((prev) => ({ ...prev, [type]: false }));
  };

  const handleDrop = async (e, type) => {
    e.preventDefault();

    setLoading((prev) => ({ ...prev, [type]: true }));

    const filesArray = Array.from(e.dataTransfer.files);
    const valid = validateFiles(filesArray);

    await new Promise((r) => setTimeout(r, 500));

    onFileUpload(valid, type);

    toast.success("تم رفع الملفات بنجاح");

    setLoading((prev) => ({ ...prev, [type]: false }));
  };

  const handleDragOver = (e) => e.preventDefault();

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
    );
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          الإرشاد الأكاديمي
        </h1>
        <p className="text-gray-600">قم برفع الملفات بسهولة وأمان</p>
      </div>

      {/* =========================
          UPLOAD AREAS
      ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* REGULATION */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="font-semibold text-gray-900 mb-6">
            رفع ملفات اللائحة الأكاديمية
          </h2>

          <div
            onDrop={(e) => handleDrop(e, "regulation")}
            onDragOver={handleDragOver}
            onClick={() => fileInputRefRegulation.current?.click()}
            className="border-2 border-dashed border-blue-300 rounded-xl p-10 text-center bg-blue-50 hover:border-blue-500 transition cursor-pointer"
          >
            <Upload className="mx-auto w-10 h-10 text-blue-600 mb-3" />

            <p className="font-medium text-gray-900">
              اسحب ملفات اللائحة الأكاديمية أو اضغط للاختيار
            </p>

            {loading.regulation && (
              <p className="text-blue-600 mt-3 animate-pulse">
                جاري الرفع...
              </p>
            )}

            <input
              ref={fileInputRefRegulation}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleUpload(e, "regulation")}
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>

        {/* STUDENTS */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="font-semibold text-gray-900 mb-6">
            رفع صحائف الطلاب
          </h2>

          <div
            onDrop={(e) => handleDrop(e, "students")}
            onDragOver={handleDragOver}
            onClick={() => fileInputRefStudents.current?.click()}
            className="border-2 border-dashed border-green-300 rounded-xl p-10 text-center bg-green-50 hover:border-green-500 transition cursor-pointer"
          >
            <Upload className="mx-auto w-10 h-10 text-green-600 mb-3" />

            <p className="font-medium text-gray-900">
              اسحب صحائف الطلاب أو اضغط للاختيار
            </p>

            {loading.students && (
              <p className="text-green-600 mt-3 animate-pulse">
                جاري الرفع...
              </p>
            )}

            <input
              ref={fileInputRefStudents}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleUpload(e, "students")}
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>

      </div>

      {/* FILE LIST */}
      {uploadedFiles.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-3">
          <h3 className="font-semibold text-gray-900">
            الملفات ({uploadedFiles.length})
          </h3>

          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onRemoveFile(index)}
                className="p-2 hover:bg-red-100 rounded-lg transition"
              >
                <X className="text-red-500 w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">لا توجد ملفات مرفوعة بعد</p>
      )}
    </div>
  );
}
