export default function MaterialsTable() {
  const materials = [
    { name: 'المادة 1', code: 'CS0823', department: 'SC', status: 'ناجح' },
    { name: 'المادة 2', code: 'CS0823', department: 'AI', status: 'ناجح' },
    { name: 'المادة 3', code: 'CS0823', department: 'IS', status: 'ناجح' },
    { name: 'المادة 4', code: 'CS0823', department: 'SC', status: 'راسب' },
    { name: 'المادة 5', code: 'CS0823', department: 'AI', status: 'ناجح' },
    { name: 'المادة 6', code: 'CS0823', department: 'IS', status: 'ناجح' },
    { name: 'المادة 7', code: 'CS0823', department: 'SC', status: 'ناجح' },
    { name: 'المادة 8', code: 'CS0823', department: 'AI', status: 'راسب' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 text-right">المواد المسجلة</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 pr-4 text-sm font-medium text-gray-500">الحالة</th>
              <th className="pb-3 pr-4 text-sm font-medium text-gray-500">القسم</th>
              <th className="pb-3 pr-4 text-sm font-medium text-gray-500">الكود</th>
              <th className="pb-3 pr-4 text-sm font-medium text-gray-500">المادة</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <tr key={index} className="border-b border-gray-50">
                <td className="py-3 pr-4">
                  <span 
                    className={`px-3 py-1 rounded-md text-sm ${
                      material.status === 'ناجح' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {material.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-sm text-gray-600">{material.department}</td>
                <td className="py-3 pr-4 text-sm text-gray-600">{material.code}</td>
                <td className="py-3 pr-4 text-sm text-gray-800">{material.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded ${
              page === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
