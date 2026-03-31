import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterCourses() {
  const navigate = useNavigate(); 

  const [courses, setCourses] = useState([
    { name: "مقدمة في علوم الحاسب", code: "CS101", section: "علوم الحاسب", hours: 3, teacher: "د. أحمد محمد" },
    { name: "الرياضيات المتقدمة", code: "MATH201", section: "الرياضيات", hours: 4, teacher: "د. فاطمة علي" },
    { name: "الفيزياء العامة", code: "PHY101", section: "الفيزياء", hours: 3, teacher: "د. خالد حسن" },
  ]);

  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    section: "",
    hours: "",
    teacher: ""
  });

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const addCourse = () => {
    if (newCourse.name && newCourse.code) {
      setCourses([...courses, newCourse]);
      setNewCourse({ name: "", code: "", section: "", hours: "", teacher: "" });
    }
  };

  const deleteCourse = (index) => {
    const updated = courses.filter((_, i) => i !== index);
    setCourses(updated);
  };

  return (
    <div className="p-3 sm:p-6 space-y-6">

  {/* Header */}
  <div className="flex items-center flex-row-reverse mb-4 flex-wrap gap-2">
    
    {/* عنوان */}
    <div className="flex items-center w-full sm:w-auto">
      <i className="fa-solid fa-graduation-cap text-blue-500 text-lg sm:text-xl me-2 sm:me-4"></i>
      <h1 className="text-base sm:text-xl font-semibold">
        تسجيل المواد الدراسية
      </h1>
    </div>

    {/* زر الرجوع */}
    <button 
      onClick={() => navigate("/profile")}
      className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded hover:bg-blue-500 hover:text-white mb-2 sm:mb-4 me-auto"
    >
      الرجوع
    </button>
  </div>

  {/* Add Course Form */}
  <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
    
    <div className="flex justify-between items-center">
      <h2 className="font-medium text-base sm:text-lg">
        إضافة مادة جديدة
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      
      <input
        name="name"
        placeholder="أدخل اسم المادة"
        value={newCourse.name}
        onChange={handleChange}
        className="border rounded p-2 text-sm"
      />

      <input
        name="code"
        placeholder="مثال: CS101"
        value={newCourse.code}
        onChange={handleChange}
        className="border rounded p-2 text-sm"
      />

      <input
        name="section"
        placeholder="أدخل القسم"
        value={newCourse.section}
        onChange={handleChange}
        className="border rounded p-2 text-sm"
      />

      <input
        name="hours"
        placeholder="مثال: 3"
        value={newCourse.hours}
        onChange={handleChange}
        className="border rounded p-2 text-sm"
      />

      <input
        name="teacher"
        placeholder="الدكتور "
        value={newCourse.teacher}
        onChange={handleChange}
        className="border rounded p-2 col-span-1 sm:col-span-2 text-sm"
      />
    </div>

    <button
      onClick={addCourse}
      className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-600 text-sm sm:text-base"
    >
      إضافة المادة
    </button>
  </div>

  {/* Courses Table */}
  <div className="bg-white p-4 sm:p-6 rounded shadow overflow-x-auto">
    
    <h2 className="font-medium text-base sm:text-lg mb-4">
      المواد المسجلة
    </h2>

    <table className="w-full text-right table-auto border-collapse min-w-[600px]">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2 text-xs sm:text-sm">اسم المادة</th>
          <th className="border p-2 text-xs sm:text-sm">رمز المادة</th>
          <th className="border p-2 text-xs sm:text-sm">القسم</th>
          <th className="border p-2 text-xs sm:text-sm">الساعات</th>
          <th className="border p-2 text-xs sm:text-sm">الدكتور</th>
          <th className="border p-2 text-xs sm:text-sm">الإجراءات</th>
        </tr>
      </thead>

      <tbody>
        {courses.map((course, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border p-2 text-xs sm:text-sm">{course.name}</td>
            <td className="border p-2 text-xs sm:text-sm">{course.code}</td>
            <td className="border p-2 text-xs sm:text-sm">{course.section}</td>
            <td className="border p-2 text-xs sm:text-sm">{course.hours}</td>
            <td className="border p-2 text-xs sm:text-sm">{course.teacher}</td>
            <td className="border p-2 flex space-x-2 justify-center">
              <button onClick={() => deleteCourse(index)} className="text-red-500">
                <i className="fa-solid fa-trash text-sm sm:text-base"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>

</div>
  );
}

export default RegisterCourses;