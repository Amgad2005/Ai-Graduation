import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: '11/2023', AI: 65, Mathematics: 60, Programming: 62 },
  { name: '12/2023', AI: 68, Mathematics: 64, Programming: 64 },
  { name: '1/2024', AI: 62, Mathematics: 62, Programming: 60 },
  { name: '2/2024', AI: 70, Mathematics: 66, Programming: 66 },
  { name: '3/2024', AI: 72, Mathematics: 68, Programming: 68 },
  { name: '4/2024', AI: 68, Mathematics: 64, Programming: 66 },
  { name: '5/2024', AI: 75, Mathematics: 70, Programming: 70 },
  { name: '6/2024', AI: 78, Mathematics: 72, Programming: 72 },
  { name: '7/2024', AI: 80, Mathematics: 75, Programming: 75 },
  { name: '8/2024', AI: 82, Mathematics: 78, Programming: 78 },
  { name: '9/2024', AI: 85, Mathematics: 80, Programming: 80 },
  { name: '10/2024', AI: 88, Mathematics: 84, Programming: 84 },
];

export default function ChartCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6 text-sm flex-row-reverse w-full">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-400"></div>
            <span className="text-gray-600">AI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-gray-600">Mathematics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-gray-600">Programming</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} domain={[10, 100]} tickFormatter={(value) => `${value}%`} />
          <Line key="ai-line" type="monotone" dataKey="AI" stroke="#f9a8d4" strokeWidth={2} dot={false} />
          <Line key="math-line" type="monotone" dataKey="Mathematics" stroke="#93c5fd" strokeWidth={2} dot={false} />
          <Line key="prog-line" type="monotone" dataKey="Programming" stroke="#d1d5db" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
