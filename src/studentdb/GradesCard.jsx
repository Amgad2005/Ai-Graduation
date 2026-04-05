import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1', value: 85 },
  { name: '2', value: 95 },
  { name: '3', value: 90 },
  { name: '4', value: 100 },
  { name: '5', value: 80 },
];

export default function GradesCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-6 font-sans">Grades:</h3>
      <div className="space-y-3 mb-4">
        {['A', 'B', 'C', 'D', 'F'].map((grade, index) => (
          <div key={grade} className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-6">{grade}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${85 - index * 12}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-around mt-2 text-sm text-gray-600">
          <span>المواد</span>
        </div>
      </div>
    </div>
  );
}
