import React, { useMemo, useState } from "react";
import { FileText, Check, X, Eye } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* =========================
   MAIN COMPONENT
========================= */
export default function AdminExceptionsDash() {
  const [activeTab, setActiveTab] = useState("all");
  const [loadingId, setLoadingId] = useState(null);

  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "أحمد مصطفى",
      studentId: "20128920",
      status: "pending",
      type: "طلب استثنائي",
      subject: "الشبكات العصبية",
      date: "٢٠٢٦/٣/٥",
    },
    {
      id: 2,
      name: "محمد أيمن",
      studentId: "20129145",
      status: "pending",
      type: "فتح مادة لدواعي التخرج",
      subject: "بناء الحاسب",
      date: "٢٠٢٦/٣/٤",
    },
    {
      id: 3,
      name: "مينا إيهاب",
      studentId: "20127856",
      status: "approved",
      type: "طلب استثنائي",
      subject: "طرق الوصول الأمثل",
      date: "٢٠٢٦/٣/٣",
    },
  ]);

  /* =========================
     STATUS UPDATE LOGIC (SIMULATED API)
  ========================= */
  const updateStatus = (id, newStatus) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, newStatus });
      }, 700);
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoadingId(id);

      await updateStatus(id, newStatus);

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: newStatus } : req
        )
      );

      // ✅ TOAST SUCCESS
      toast.success(
        newStatus === "approved"
          ? "تم قبول الطلب بنجاح"
          : "تم رفض الطلب بنجاح"
      );
    } catch (err) {
      // ❌ TOAST ERROR
      toast.error("حدث خطأ أثناء تحديث الطلب");
    } finally {
      setLoadingId(null);
    }
  };

  /* =========================
     COUNTS
  ========================= */
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;

  const totalCount = requests.length;
  const exceptionsCount = requests.filter(
    (r) => r.type === "طلب استثنائي"
  ).length;
  const graduationCount = requests.filter(
    (r) => r.type === "فتح مادة لدواعي التخرج"
  ).length;

  /* =========================
     FILTER
  ========================= */
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      if (activeTab === "all") return true;
      if (activeTab === "exceptions")
        return req.type === "طلب استثنائي";
      if (activeTab === "graduation")
        return req.type === "فتح مادة لدواعي التخرج";
    });
  }, [requests, activeTab]);

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* TOAST CONTAINER */}
      <ToastContainer position="top-right" autoClose={2500} />

      {/* HEADER */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-900">
          لوحة الإدارة
        </h1>
        <p className="text-gray-500">
          إدارة الطلبات الاستثنائية وطلبات فتح المواد
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="قيد الانتظار" count={pendingCount} icon={FileText} color="blue" />
        <StatCard title="مقبول" count={approvedCount} icon={Check} color="green" />
        <StatCard title="مرفوض" count={rejectedCount} icon={X} color="red" />
      </div>

      {/* TABS */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b">

          {[
            { key: "all", label: "جميع الطلبات", count: totalCount },
            { key: "exceptions", label: "استثنائية", count: exceptionsCount },
            { key: "graduation", label: "تخرج", count: graduationCount },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-4 font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}

        </div>

        {/* LIST */}
        <div className="divide-y">
          {filteredRequests.map((req) => {
            const isLoading = loadingId === req.id;

            return (
              <div
                key={req.id}
                className="p-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-gray-50 transition"
              >

                {/* INFO */}
                <div className="space-y-2">
                  <div className="flex gap-3 items-center flex-wrap">
                    <h3 className="font-bold">{req.name}</h3>

                    <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
                      {req.studentId}
                    </span>

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status === "pending"
                        ? "قيد الانتظار"
                        : req.status === "approved"
                        ? "مقبول"
                        : "مرفوض"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    {req.type} • {req.subject}
                  </p>

                  <p className="text-xs text-gray-400">{req.date}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 items-center">

                  {req.status === "pending" && (
                    <>
                      <button
                        disabled={isLoading}
                        onClick={() =>
                          handleStatusChange(req.id, "rejected")
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 disabled:opacity-50"
                      >
                        {isLoading ? "..." : "رفض"} <X className="inline w-4 h-4" />
                      </button>

                      <button
                        disabled={isLoading}
                        onClick={() =>
                          handleStatusChange(req.id, "approved")
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 disabled:opacity-50"
                      >
                        {isLoading ? "..." : "قبول"} <Check className="inline w-4 h-4" />
                      </button>
                    </>
                  )}

                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                    عرض <Eye className="inline w-4 h-4" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================
   STAT CARD COMPONENT
========================= */
function StatCard({ title, count, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{count}</h2>
      </div>

      <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}