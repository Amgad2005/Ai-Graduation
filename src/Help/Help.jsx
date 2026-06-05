import React from "react";
import { useNavigate } from "react-router-dom";

function Help() {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-white shadow-md px-5 py-2 rounded-xl flex items-center gap-2
                   hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
      >
        <span className="text-2xl font-bold">←</span>
        <span>رجوع</span>
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8
                      hover:shadow-lg transition-shadow duration-200">
        <h1 className="text-4xl font-bold text-blue-600 mb-3 text-center">
          المرشد الأكاديمي الذكي
        </h1>

        <p className="text-gray-600 leading-7">
          هذا النظام يساعد الطالب بعد تسجيل الدخول من خلال تحليل الصحيفة
          الأكاديمية ومقارنتها بلائحة الكلية لتقديم أفضل اقتراحات التسجيل
          ومتابعة المسار الدراسي.
        </p>
      </div>

      {/* Project Idea */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8
                      hover:shadow-lg transition-shadow duration-200">

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          فكرة المشروع
        </h2>

        <p className="text-gray-600 leading-7">
          عند تسجيل دخول الطالب إلى الموقع، يقوم المرشد الذكي بقراءة الصحيفة
          الأكاديمية الخاصة بالطالب، ثم يقارنها مع لائحة الكلية لمعرفة:
        </p>

        <ul className="mt-4 space-y-3 text-gray-700">

          <li className="hover:text-blue-600 transition-colors duration-150">
            <i className="fa-solid fa-check text-green-500 ml-2"></i>
            المواد التي نجح فيها الطالب
          </li>

          <li className="hover:text-blue-600 transition-colors duration-150">
            <i className="fa-solid fa-xmark text-red-500 ml-2"></i>
            المواد التي رسب فيها الطالب
          </li>

          <li className="hover:text-blue-600 transition-colors duration-150">
            <i className="fa-solid fa-book text-blue-500 ml-2"></i>
            المواد التي لم يدرسها بعد
          </li>

          <li className="hover:text-blue-600 transition-colors duration-150">
            <i className="fa-solid fa-chart-line text-purple-500 ml-2"></i>
            المتطلبات السابقة لكل مادة
          </li>

        </ul>
      </div>

      {/* Services */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow-md p-6 text-center
                        hover:shadow-lg transition-shadow duration-200">
          <i className="fa-solid fa-lightbulb text-4xl text-yellow-500 mb-3"></i>
          <h3 className="font-bold text-lg mb-2">مواد مقترحة</h3>
          <p className="text-gray-600 text-sm">
            اقتراح أفضل المواد المناسبة للتسجيل في الفصل القادم.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center
                        hover:shadow-lg transition-shadow duration-200">
          <i className="fa-solid fa-list-check text-4xl text-blue-500 mb-3"></i>
          <h3 className="font-bold text-lg mb-2">مواد متبقية</h3>
          <p className="text-gray-600 text-sm">
            عرض المواد التي لم يقم الطالب بدراستها حتى الآن.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center
                        hover:shadow-lg transition-shadow duration-200">
          <i className="fa-solid fa-trophy text-4xl text-green-500 mb-3"></i>
          <h3 className="font-bold text-lg mb-2">مواد منتهية</h3>
          <p className="text-gray-600 text-sm">
            إظهار المواد التي تم اجتيازها والنتيجة الخاصة بكل مادة.
          </p>
        </div>

      </div>

      {/* GPA */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8
                      hover:shadow-lg transition-shadow duration-200">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          كيفية حساب GPA
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 text-center">

          <div className="bg-green-100 text-green-700 p-4 rounded-xl font-bold text-xl hover:bg-green-200 transition-colors duration-150">A = 4.0</div>
          <div className="bg-blue-100 text-blue-700 p-4 rounded-xl font-bold text-xl hover:bg-blue-200 transition-colors duration-150">B = 3.0</div>
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-xl font-bold text-xl hover:bg-yellow-200 transition-colors duration-150">C = 2.0</div>
          <div className="bg-orange-100 text-orange-700 p-4 rounded-xl font-bold text-xl hover:bg-orange-200 transition-colors duration-150">D = 1.0</div>
          <div className="bg-red-100 text-red-700 p-4 rounded-xl font-bold text-xl hover:bg-red-200 transition-colors duration-150">F = 0.0</div>

        </div>

        <div className="bg-gray-100 rounded-xl p-4 text-center font-semibold text-lg
                        hover:bg-gray-200 transition-colors duration-150">
          GPA = مجموع (النقاط × الساعات) ÷ مجموع الساعات
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-md p-6
                      hover:shadow-lg transition-shadow duration-200">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          مسار الطالب الدراسي
        </h2>

        <div className="border-r-2 border-blue-500 pr-4 space-y-6">

          {["تسجيل الدخول", "تحليل الصحيفة الأكاديمية", "مقارنة مع لائحة الكلية", "تقديم اقتراحات ذكية"].map((text, i) => (
            <div key={i} className="hover:translate-x-1 transition-transform duration-150">

              <h3 className="font-bold text-blue-600">
                <i className="fa-solid fa-circle-dot ml-2"></i>
                {text}
              </h3>

              <p className="text-gray-600 text-sm">
                شرح خطوة {i + 1} في رحلة الطالب.
              </p>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Help;