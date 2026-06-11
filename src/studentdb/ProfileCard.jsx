import { useEffect, useState } from "react";
import Api from "../Api/Api";

export default function ProfileCard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await Api.get("/auth/me");
        setStudent(res.data?.data);
      } catch (err) {
        console.error("PROFILE ERROR:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-center h-48">
        <div className="w-7 h-7 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const name = student?.name || "—";
  const code = student?.code || "—";
  const level = student?.level || "—";
  const gpa = student?.gpa ? parseFloat(student.gpa) : null;
  const maxGpa = 4;
  const gpaPercent = gpa ? Math.min((gpa / maxGpa) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (gpaPercent / 100) * circumference;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="text-center">

        <p className="text-sm text-gray-500 mb-3">المعدل التراكمي</p>
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke={gpa >= 3 ? "#10b981" : gpa >= 2 ? "#f59e0b" : "#ef4444"}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-800">
                {gpa !== null ? gpa.toFixed(1) : "—"}
              </span>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 text-base mb-1">{name}</h3>
        <p className="text-sm text-gray-400 mb-2">{code}</p>
        <span className="inline-block bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
          {level}
        </span>

      </div>
    </div>
  );
}