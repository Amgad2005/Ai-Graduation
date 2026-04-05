export default function DepartmentsCard() {
  const departments = [
    { code: 'AI', color: 'blue', label: 'ذكاء اصطناعي' },
    { code: 'SC', color: 'orange', label: 'حاسب علمي' },
    { code: 'IS', color: 'green', label: 'نظم معلومات' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 text-center">الأقسام المرشحة</h3>
      <div className="flex flex-col gap-3 items-center justify-center">
        {departments.map((dept, index) => (
          <div key={index} className="flex items-center gap-2">
            <button
              className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm min-w-[50px] ${
                dept.color === 'blue'
                  ? 'bg-blue-500'
                  : dept.color === 'orange'
                  ? 'bg-orange-500'
                  : 'bg-green-500'
              }`}
            >
              {dept.code}
            </button>
            <span className="text-sm text-gray-700">{dept.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
