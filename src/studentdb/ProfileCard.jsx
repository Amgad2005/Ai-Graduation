export default function ProfileCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">المعدل التراكمي:</p>
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {/* Background circle - red */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#ef4444"
                strokeWidth="8"
              />
              {/* Foreground circle - green (75% filled) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset="62.8"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">4/3.3</span>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-1">أحمد مصطفى كمال</h3>
        <p className="text-sm text-gray-500">442220045</p>
      </div>
    </div>
  );
}
