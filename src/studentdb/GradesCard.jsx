import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const gradeData = [
  { grade: 'A', label: 'ممتاز', percent: 40, color: '#10b981' },
  { grade: 'B', label: 'جيد جداً', percent: 30, color: '#3b82f6' },
  { grade: 'C', label: 'جيد', percent: 15, color: '#f59e0b' },
  { grade: 'D', label: 'مقبول', percent: 10, color: '#f97316' },
  { grade: 'F', label: 'راسب', percent: 5, color: '#ef4444' },
];

const chartData = gradeData.map((g) => ({ name: g.grade, value: g.percent }));

export default function GradesCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-5 text-right">توزيع الدرجات</h3>

      {/* Bars */}
      <div className="space-y-3 mb-6">
        {gradeData.map((g) => (
          <div key={g.grade} className="flex items-center gap-3">
            <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${g.percent}%`, backgroundColor: g.color }}
              />
            </div>
            <span className="text-xs text-gray-500 w-16 text-right">{g.label}</span>
            <span className="text-xs font-medium text-gray-700 w-8 text-left">{g.grade}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={chartData} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip
            formatter={(value) => [`${value}%`, 'النسبة']}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <rect key={index} fill={gradeData[index].color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}