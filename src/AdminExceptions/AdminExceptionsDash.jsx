import React, { useMemo, useState, useEffect } from "react";
import { FileText, Check, X, Eye, Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../Api/Api";

export default function AdminExceptionsDash() {
  const [activeTab, setActiveTab] = useState("all");
  const [loadingId, setLoadingId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [rejectModal, setRejectModal] = useState({ open: false, id: null });
  const [rejectNote, setRejectNote] = useState("");

  useEffect(() => {
    async function loadRequests() {
      try {
        const res = await Api.get("/admin/material-requests");
        const data = res.data?.data?.requests || [];
        setRequests(data);
      } catch (err) {
        console.error("REQUESTS ERROR:", err);
        toast.error("فشل تحميل الطلبات");
      } finally {
        setLoading(false);
      }
    }
    loadRequests();
  }, []);

  const handleApprove = async (id) => {
    setLoadingId(id);
    try {
      await Api.post("/admin/material-requests/approve", { ids: [id] });
      setRequests((prev) =>
        prev.map((req) => req.id === id ? { ...req, status: "approved" } : req)
      );
      toast.success("تم قبول الطلب بنجاح ✅");
    } catch (err) {
      toast.error("حدث خطأ أثناء القبول");
    } finally {
      setLoadingId(null);
    }
  };

  const openRejectModal = (id) => {
    setRejectNote("");
    setRejectModal({ open: true, id });
  };

  const handleRejectConfirm = async () => {
    if (!rejectNote.trim()) {
      toast.warning("من فضلك اكتب سبب الرفض");
      return;
    }

    const id = rejectModal.id;
    setRejectModal({ open: false, id: null });
    setLoadingId(id);

    try {
      await Api.post("/admin/material-requests/reject", {
        ids: [id],
        adviser_notes: rejectNote,
      });
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: "rejected", adviser_notes: rejectNote } : req
        )
      );
      toast.success("تم رفض الطلب بنجاح");
    } catch (err) {
      toast.error("حدث خطأ أثناء الرفض");
    } finally {
      setLoadingId(null);
      setRejectNote("");
    }
  };

  const pendingCount    = requests.filter((r) => r.status === "pending").length;
  const approvedCount   = requests.filter((r) => r.status === "approved").length;
  const rejectedCount   = requests.filter((r) => r.status === "rejected").length;
  const totalCount      = requests.length;
  const regularCount    = requests.filter((r) => r.type === "regular").length;
  const graduationCount = requests.filter((r) => r.type === "graduation").length;

  const filteredRequests = useMemo(() => {
    let list = requests;

    // فلتر التاب
    if (activeTab === "exceptions") list = list.filter((r) => r.type === "regular");
    if (activeTab === "graduation") list = list.filter((r) => r.type === "graduation");

    // فلتر الـ search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((r) =>
        r.student?.name?.toLowerCase().includes(q) ||
        r.student?.code?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [requests, activeTab, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">⏳ جاري تحميل الطلبات...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6" dir="rtl">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="text-right">
          <h1 className="text-2xl font-bold text-gray-900">لوحة الإدارة</h1>
          <p className="text-gray-500 text-sm">إدارة الطلبات الاستثنائية وطلبات فتح المواد</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم الطالب أو الكود..."
            className="pr-9 pl-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 bg-white w-80"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="قيد الانتظار" count={pendingCount}  icon={FileText} color="blue" />
        <StatCard title="مقبول"         count={approvedCount} icon={Check}    color="green" />
        <StatCard title="مرفوض"         count={rejectedCount} icon={X}        color="red" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b">
          {[
            { key: "all",        label: "جميع الطلبات", count: totalCount },
            { key: "exceptions", label: "استثنائية",    count: regularCount },
            { key: "graduation", label: "تخرج",         count: graduationCount },
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

        <div className="divide-y">
          {filteredRequests.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">لا توجد طلبات</p>
          ) : (
            filteredRequests.map((req) => {
              const isLoading = loadingId === req.id;
              return (
                <div
                  key={req.id}
                  className="p-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-gray-50 transition"
                >
                  <div className="space-y-2 text-right">
                    <div className="flex gap-3 items-center flex-wrap justify-end">
                      <span className={`text-xs px-2 py-1 rounded ${
                        req.status === "pending"  ? "bg-yellow-100 text-yellow-700" :
                        req.status === "approved" ? "bg-green-100 text-green-700" :
                                                    "bg-red-100 text-red-700"
                      }`}>
                        {req.status === "pending"  ? "قيد الانتظار" :
                         req.status === "approved" ? "مقبول" : "مرفوض"}
                      </span>
                      <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
                        {req.student?.code || req.student_id}
                      </span>
                      <h3 className="font-bold">{req.student?.name}</h3>
                    </div>

                    <p className="text-sm text-gray-600">
                      {req.type === "graduation" ? "فتح مادة لدواعي التخرج" : "طلب استثنائي"} • {req.course?.name}
                    </p>

                    {req.student_notes && (
                      <p className="text-xs text-gray-500">ملاحظة الطالب: {req.student_notes}</p>
                    )}

                    {req.adviser_notes && (
                      <p className="text-xs text-red-500">سبب الرفض: {req.adviser_notes}</p>
                    )}

                    <p className="text-xs text-gray-400">{req.created_at?.slice(0, 10)}</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    {req.status === "pending" && (
                      <>
                        <button
                          disabled={isLoading}
                          onClick={() => openRejectModal(req.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 disabled:opacity-50"
                        >
                          {isLoading ? "..." : "رفض"} <X className="inline w-4 h-4" />
                        </button>
                        <button
                          disabled={isLoading}
                          onClick={() => handleApprove(req.id)}
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
            })
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4" dir="rtl">
            <h2 className="text-lg font-bold text-gray-900">سبب الرفض</h2>
            <p className="text-sm text-gray-500">من فضلك اكتب سبب رفض الطلب</p>
            <textarea
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder="اكتب سبب الرفض هنا..."
              className="w-full h-28 p-3 border rounded-xl outline-none resize-none focus:ring-2 focus:ring-red-400 text-sm"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setRejectModal({ open: false, id: null })}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
              >
                تأكيد الرفض
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, count, icon: Icon, color }) {
  const colors = {
    blue:  "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red:   "bg-red-50 text-red-600",
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