
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface CategorySpendingChartProps {
  timeframe: "weekly" | "monthly" | "quarterly" | "yearly";
}

const CategorySpendingChart = ({ timeframe }: CategorySpendingChartProps) => {
  const { language } = useLanguage();
  
  // Mock data - would be replaced with real data from API
  const data = useMemo(() => {
    // For demo purposes, changing some values based on timeframe
    const multiplier = timeframe === "weekly" ? 1 : 
                      timeframe === "monthly" ? 4 : 
                      timeframe === "quarterly" ? 12 : 52;
    
    return [
      { name: language === 'ar' ? 'الصحة' : 'Health', value: 420 * multiplier, color: "#0E292C" },
      { name: language === 'ar' ? 'اللياقة البدنية' : 'Fitness', value: 380 * multiplier, color: "#1A3B3F" },
      { name: language === 'ar' ? 'الترفيه' : 'Entertainment', value: 290 * multiplier, color: "#2D4D51" },
      { name: language === 'ar' ? 'المطاعم' : 'Dining', value: 210 * multiplier, color: "#406163" },
      { name: language === 'ar' ? 'النقل' : 'Transportation', value: 150 * multiplier, color: "#587375" },
    ];
  }, [timeframe, language]);

  // Calculate total value
  const total = useMemo(() => data.reduce((sum, entry) => sum + entry.value, 0), [data]);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm">${item.value.toLocaleString()}</p>
          <p className="text-xs text-gray-500">
            {Math.round((item.value / total) * 100)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
        <p className="text-sm text-gray-500">
          {language === 'ar' ? 'المجموع' : 'Total'}
        </p>
        <p className="text-xl font-bold">
          ${total.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CategorySpendingChart;
