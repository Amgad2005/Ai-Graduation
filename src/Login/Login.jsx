import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api/Api";
import logo from "../assets/img/logo.jpg";
import university from "../assets/img/university.jpg";

function Login() {
  const [studentCode, setStudentCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!studentCode || !password) {
      alert("من فضلك ادخل البيانات");
      return;
    }

    try {
      setLoading(true);

      // Login Request
      const loginResponse = await Api.post("/auth/login", {
        code: studentCode,
        password: password,
      });

      console.log("LOGIN RESPONSE:", loginResponse.data);

      const token = loginResponse.data?.data?.access_token;

      if (!token) {
        alert("لم يتم العثور على Token");
        return;
      }

      localStorage.setItem("token", token);

      // Current User
      const meResponse = await Api.get("/auth/me");

      console.log("ME RESPONSE:", meResponse.data);

      const user = meResponse.data?.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user?.role === "admin") {
        navigate("/file");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.log("========== LOGIN ERROR ==========");
      console.log(error);

      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("FULL ERROR:", error.response.data);

alert(JSON.stringify(error.response.data, null, 2));

        alert(
          `خطأ ${error.response.status}\n${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
      } else if (error.request) {
        console.log("REQUEST:", error.request);

        alert(
          "لم يتم الاتصال بالسيرفر\nتأكد أن Laravel شغال على http://127.0.0.1:8000"
        );
      } else {
        console.log("MESSAGE:", error.message);

        alert(error.message);
      }
    } finally {
      setLoading(false);
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

          <div className="mb-6 text-right">
            <label className="block mb-2 text-gray-600 text-sm sm:text-base">
              كلمة السر
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg border text-end text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل كلمة السر"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base disabled:bg-gray-400"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل"}
          </button>

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