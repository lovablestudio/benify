import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

interface SpendingOverviewChartProps {
  timeframe: "weekly" | "monthly" | "quarterly" | "yearly";
}

const SpendingOverviewChart = ({ timeframe }: SpendingOverviewChartProps) => {
  const { language } = useLanguage();
  
  // Generate mock data based on timeframe
  const data = useMemo(() => {
    // This is mock data, would be replaced with real data from an API
    if (timeframe === "weekly") {
      return [
        { name: language === 'ar' ? "الأحد" : "Sun", amount: 40 },
        { name: language === 'ar' ? "الإثنين" : "Mon", amount: 120 },
        { name: language === 'ar' ? "الثلاثاء" : "Tue", amount: 80 },
        { name: language === 'ar' ? "الأربعاء" : "Wed", amount: 150 },
        { name: language === 'ar' ? "الخميس" : "Thu", amount: 220 },
        { name: language === 'ar' ? "الجمعة" : "Fri", amount: 190 },
        { name: language === 'ar' ? "السبت" : "Sat", amount: 70 },
      ];
    } else if (timeframe === "monthly") {
      return [
        { name: language === 'ar' ? "الأسبوع 1" : "Week 1", amount: 680 },
        { name: language === 'ar' ? "الأسبوع 2" : "Week 2", amount: 820 },
        { name: language === 'ar' ? "الأسبوع 3" : "Week 3", amount: 750 },
        { name: language === 'ar' ? "الأسبوع 4" : "Week 4", amount: 930 },
      ];
    } else if (timeframe === "quarterly") {
      return [
        { name: language === 'ar' ? "يناير" : "Jan", amount: 2800 },
        { name: language === 'ar' ? "فبراير" : "Feb", amount: 3200 },
        { name: language === 'ar' ? "مارس" : "Mar", amount: 2950 },
      ];
    } else {
      return [
        { name: language === 'ar' ? "الربع 1" : "Q1", amount: 8950 },
        { name: language === 'ar' ? "الربع 2" : "Q2", amount: 9800 },
        { name: language === 'ar' ? "الربع 3" : "Q3", amount: 10500 },
        { name: language === 'ar' ? "الربع 4" : "Q4", amount: 12200 },
      ];
    }
  }, [timeframe, language]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0E292C" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0E292C" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tickMargin={10}
            fontSize={12}
            tickFormatter={(value) => language === 'ar' ? value : value} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickMargin={10}
            fontSize={12}
            tickFormatter={(value) => `$${value}`} 
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, language === 'ar' ? 'المبلغ' : 'Amount']} 
            labelFormatter={(label) => language === 'ar' ? label : label}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#0E292C" 
            fillOpacity={1} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingOverviewChart;
