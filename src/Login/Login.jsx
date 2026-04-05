import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.jpg";
import university from "../assets/img/university.jpg";

function Login() {
  const [studentCode, setStudentCode] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // 🔒 تحقق من البيانات
    if (!studentCode || !password) {
      alert("من فضلك ادخل البيانات");
      return;
    }

    // 👑 Admin Login
    if (studentCode === "admin" && password === "admin") {
      navigate("/file");
    } else {
      // 👤 User عادي
      navigate("/profile");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 bg-white shadow-sm relative">

        <img
          src={logo}
          alt="left logo"
          className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
        />

        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm sm:text-xl md:text-2xl font-bold text-center w-full px-16 sm:px-0">
          بوابة خدمات الطالب
        </h1>

        <img
          src={university}
          alt="right logo"
          className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
        />
      </div>

      {/* Form */}
      <div className="flex items-center justify-center mt-10 sm:mt-16 px-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[600px] p-4 sm:p-6 md:p-8 rounded-2xl shadow-md"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6">
            تسجيل الدخول
          </h2>

          {/* Student Code */}
          <div className="mb-4 text-right">
            <label className="block mb-2 text-gray-600 text-sm sm:text-base">
              كود الطالب
            </label>
            <input
              type="text"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg border text-end text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل الكود"
            />
          </div>

          {/* Password */}
          <div className="mb-6 text-right">
            <label className="block mb-2 text-gray-600 text-sm sm:text-base">
              كلمة السر
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg border text-end text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="الرقم القومي - الرقم السري"
            />
          </div>

          {/* Submit */}
          <button className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base">
            تسجيل
          </button>

          {/* Forgot */}
          <div className="text-center mt-4 text-xs sm:text-sm text-gray-500">
            <p className="mb-1 cursor-pointer hover:underline">
              هل نسيت كلمة المرور؟
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;