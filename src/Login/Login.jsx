import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api/Api";
import background from "../assets/img/background3.jpg";

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

      const loginResponse = await Api.post("/auth/login", {
        code: studentCode,
        password: password,
      });

      const token = loginResponse.data?.data?.access_token;

      if (!token) {
        alert("لم يتم العثور على Token");
        return;
      }

      localStorage.setItem("token", token);

      const meResponse = await Api.get("/auth/me");
      const user = meResponse.data?.data;
      localStorage.setItem("user", JSON.stringify(user));

      if (user?.role === "admin") {
        navigate("/file");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      if (error.response) {
        alert(`خطأ ${error.response.status}\n${JSON.stringify(error.response.data, null, 2)}`);
      } else if (error.request) {
        alert("لم يتم الاتصال بالسيرفر\nتأكد أن Laravel شغال على http://127.0.0.1:8000");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-3"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[500px]
          p-6 sm:p-8 rounded-2xl
          border border-white/30"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.4)",
            }}
          >
            <i className="fa-solid fa-graduation-cap text-white text-2xl"></i>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow">
            بوابة خدمات الطالب
          </h2>
          <p className="text-white/70 text-sm mt-1">تسجيل الدخول</p>
        </div>

        {/* كود الطالب */}
        <div className="mb-4 text-right">
          <label className="block mb-2 text-white/90 text-sm font-bold">
            كود الطالب
          </label>
          <input
            type="text"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            className="w-full p-3 rounded-xl text-end text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white",
            }}
            placeholder="ادخل الكود"
          />
        </div>

        {/* كلمة السر */}
        <div className="mb-6 text-right">
          <label className="block mb-2 text-white/90 text-sm font-bold">
            كلمة السر
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl text-end text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white",
            }}
            placeholder="ادخل الرقم القومي"
          />
        </div>

        {/* زرار تسجيل */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-white text-sm
            transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
            disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: loading
              ? "rgba(100,100,100,0.4)"
              : "rgba(37, 99, 235, 0.7)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(147,197,253,0.4)",
            boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
          }}
        >
          {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}

export default Login; 