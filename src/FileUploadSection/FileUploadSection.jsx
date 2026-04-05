import React, { useRef } from 'react';
import { Upload, FileText, X, Info, Calendar } from 'lucide-react';

export function FileUploadSection({ 
  uploadedFiles, 
  onFileUpload, 
  onRemoveFile 
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      onFileUpload(filesArray);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFileUpload(filesArray);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">الإرشاد الأكاديمي</h1>
        <p className="text-gray-600">قم برفع ملفات الإرشاد الأكاديمي الخاصة بك</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">رفع الملفات</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            عرض الإرشادات
          </button>
        </div>

        {/* Upload Box */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                اختر الملفات أو اسحبها هنا
              </h3>
              <p className="text-sm text-gray-500">
                يمكنك رفع ملفات PDF, DOC, DOCX بحجم أقصى 10MB
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              اختيار الملفات
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              الملفات المرفوعة ({uploadedFiles.length})
            </h3>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFile(index)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <X className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                تأكيد الرفع
              </button>
              <button
                onClick={() => uploadedFiles.forEach((_, i) => onRemoveFile(i))}
                className="px-6 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium text-gray-700 transition-colors"
              >
                مسح الكل
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xs text-gray-600 mb-1">الملفات المرفوعة</p>
          <p className="text-xl font-bold text-gray-900">{uploadedFiles.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xs text-gray-600 mb-1">الحد الأقصى</p>
          <p className="text-xl font-bold text-gray-900">10MB</p>
        </div>
      </div>
    </div>
  );
}
