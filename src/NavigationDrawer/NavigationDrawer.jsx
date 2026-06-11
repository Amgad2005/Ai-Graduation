import React from "react";
import {
  X,
  Database,
  BookOpen,
  Shield,
  GraduationCap,
  LogOut,
  File,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavigationDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[70] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Title (NEW) */}
        <div className="flex flex-col items-center px-5 pb-4">
          <GraduationCap className="w-8 h-8 text-blue-500 mb-1" />
          <h2 className="text-base font-bold text-gray-800 text-center">
            كلية الحاسبات والذكاء الاصطناعي
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">

          <div className="my-3 border-t border-gray-100" />

          <DrawerItem
            icon={<BookOpen className="w-5 h-5" />}
            label="الارشاد الاكاديمي"
            active={location.pathname === "/file"}
            onClick={() => {
              navigate("/file");
              onClose();
            }}
          />

          <DrawerItem
            icon={<Shield className="w-5 h-5" />}
            label="Admin DB"
            active={location.pathname === "/admin-db"}
            onClick={() => {
              navigate("/admin-db");
              onClose();
            }}
          />

          <DrawerItem
            icon={<File className="w-5 h-5" />}
            label="Exceptions"
            active={location.pathname === "/exceptions"}
            onClick={() => {
              navigate("/exceptions");
              onClose();
            }}
          />
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6 pt-2">
          <button
            onClick={() => {
              navigate("/");
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 hover:scale-[1.02]"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </>
  );
}

/* =========================
   Drawer Item
   ========================= */
function DrawerItem({ icon, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200
        ${
          active
            ? "bg-blue-500 text-white font-semibold shadow-md"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }
        hover:scale-[1.02]
      `}
    >
      <span
        className={`transition-colors duration-200 ${
          active ? "text-white" : "text-gray-500"
        }`}
      >
        {icon}
      </span>

      <span>{label}</span>
    </button>
  );
}