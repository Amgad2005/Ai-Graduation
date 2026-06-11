import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Api from "../Api/Api";

export default function ChartCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await Api.get("/student/courses");
        const summary = res.data?.data?.summary;

        setData([
          { name: "مكتملة", value: summary?.completed_count || 0, color: "#10b981" },
          { name: "جاري", value: summary?.in_progress_count || 0, color: "#3b82f6" },
          { name: "متبقية", value: summary?.remaining_count || 0, color: "#e5e7eb" },
        ]);
      } catch (err) {
        console.error("CHART ERROR:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex justify-center items-center h-64">
        <div className="w-7 h-7 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 text-right">توزيع المواد</h3>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data.filter(d => d.value > 0)}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.filter(d => d.value > 0).map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} مادة`, name]}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend مع الأرقام */}
      <div className="flex justify-center gap-4 mt-2">
        {data.map((entry) => (
          <div key={entry.name} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-xs text-gray-500">{entry.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">إجمالي المواد: {total}</p>
    </div>
  );
}