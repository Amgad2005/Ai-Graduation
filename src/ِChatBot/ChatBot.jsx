import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatBot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { type: "bot", text: "مرحبًا بك في مساعد بوابة خدمات الطلاب، كيف يمكنني مساعدتك اليوم؟" }
  ]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { type: "user", text: input },
      { type: "bot", text: "جارٍ الرد..." }
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
   <div className="min-h-screen bg-gray-100 flex flex-col">
  {/* Header */}
  <div className="bg-white border-b p-3 sm:p-4 flex items-center justify-between flex-wrap gap-2">
    
    {/* Back Button */}
    <button 
      onClick={() => navigate("/profile")}
      className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded hover:bg-blue-500 hover:text-white mb-2 sm:mb-4 me-auto"
    >
      الرجوع
    </button>

    {/* Title Center */}
    <div className="text-center flex-1 mb-2 sm:mb-3 w-full sm:w-auto">
      <h1 className="text-base sm:text-lg md:text-xl font-bold">
        بوابة خدمات الطالب
      </h1>
      <p className="text-xs sm:text-sm text-gray-500">
        جامعة بنها - كلية الحاسبات والذكاء الاصطناعي
      </p>
    </div>
  </div>

  {/* Main Container */}
  <div className="flex-1 flex justify-center px-2 sm:px-4 pb-24 mt-2 sm:mt-3">
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow flex flex-col overflow-hidden">
      
      {/* Assistant Header */}
      <div className="flex items-center ms-auto bg-gray-50 p-3 sm:p-4 border-b flex-wrap gap-2">
        <div className="text-end me-2 sm:me-3">
          <h2 className="font-semibold text-sm sm:text-base">
            مساعد بوابة الطالب الذكي
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            اسأل عن أي شيء يتعلق بالخدمات الطلابية
          </p>
        </div>
        <div className="bg-blue-100 p-2 rounded-full">
          <i className="fa-solid fa-comments text-blue-500 text-sm sm:text-base"></i>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-around p-3 sm:p-4 bg-gray-50 border-b flex-wrap gap-3">
        
        <div className="flex flex-col items-center gap-2 w-[45%] sm:w-auto">
          <div className="bg-purple-500 text-white p-2 sm:p-3 rounded-xl">
            <i className="fa-solid fa-circle-question text-sm sm:text-base"></i>
          </div>
          <span className="text-[10px] sm:text-xs">استفسار أكاديمي</span>
        </div>

        <div className="flex flex-col items-center gap-2 w-[45%] sm:w-auto">
          <div className="bg-orange-500 text-white p-2 sm:p-3 rounded-xl">
            <i className="fa-solid fa-file-lines text-sm sm:text-base"></i>
          </div>
          <span className="text-[10px] sm:text-xs">التسجيل الخاص</span>
        </div>

        <div className="flex flex-col items-center gap-2 w-[45%] sm:w-auto">
          <div className="bg-green-500 text-white p-2 sm:p-3 rounded-xl">
            <i className="fa-solid fa-calendar text-sm sm:text-base"></i>
          </div>
          <span className="text-[10px] sm:text-xs">الجدول الدراسي</span>
        </div>

        <div className="flex flex-col items-center gap-2 w-[45%] sm:w-auto">
          <div className="bg-blue-500 text-white p-2 sm:p-3 rounded-xl">
            <i className="fa-solid fa-comment-dots text-sm sm:text-base"></i>
          </div>
          <span className="text-[10px] sm:text-xs">تسجيل شكوى</span>
        </div>

      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm max-w-[80%] sm:max-w-xs ${
                msg.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={chatEndRef} />
      </div>
    </div>
  </div>

  {/* Fixed Input */}
  <div className="fixed bottom-0 left-0 w-full bg-white border-t p-2 sm:p-3 flex justify-center">
    <div className="w-full max-w-5xl flex items-center gap-2">
      
      {/* Upload Button */}
      <label className="cursor-pointer bg-gray-100 p-2 rounded-xl">
        <i className="fa-solid fa-paperclip text-sm sm:text-base"></i>
        <input
          type="file"
          className="hidden"
          onChange={(e) => console.log(e.target.files)}
        />
      </label>

      {/* Input */}
      <input
        type="text"
        placeholder="اكتب رسالتك هنا..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none"
      />

      {/* Send */}
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-2 rounded-xl"
      >
        <i className="fa-solid fa-paper-plane text-sm sm:text-base"></i>
      </button>
    </div>
  </div>
</div>
  );
}
