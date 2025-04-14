
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface SalaryOverviewChartProps {
  timeframe: "monthly" | "quarterly" | "yearly";
}

// Employee data that matches the display in EmployeeSalaryTable
const departmentData = [
  {
    name: "Technology",
    employees: 3,
    averageSalary: 15667,
    totalSalary: 47000
  },
  {
    name: "Marketing",
    employees: 2,
    averageSalary: 13250,
    totalSalary: 26500
  },
  {
    name: "Design",
    employees: 1,
    averageSalary: 14000,
    totalSalary: 14000
  },
  {
    name: "Product",
    employees: 1,
    averageSalary: 18000,
    totalSalary: 18000
  },
  {
    name: "Data",
    employees: 1,
    averageSalary: 16000,
    totalSalary: 16000
  },
  {
    name: "Human Resources",
    employees: 1,
    averageSalary: 17000,
    totalSalary: 17000
  },
  {
    name: "Finance",
    employees: 1,
    averageSalary: 14500,
    totalSalary: 14500
  }
];

const SalaryOverviewChart = ({ timeframe }: SalaryOverviewChartProps) => {
  const { language } = useLanguage();
  
  // Adjust the data based on the timeframe
  const data = useMemo(() => {
    // For demo purposes, adjust the data based on the timeframe
    const multiplier = timeframe === "monthly" ? 1 : 
                      timeframe === "quarterly" ? 3 : 12;
    
    return departmentData.map(dept => ({
      name: language === 'ar' ? translateDepartmentToArabic(dept.name) : dept.name,
      averageSalary: dept.averageSalary * multiplier,
      totalSalary: dept.totalSalary * multiplier,
      employees: dept.employees
    }));
  }, [timeframe, language]);

  // Helper function to translate department names to Arabic
  function translateDepartmentToArabic(deptName: string): string {
    const translations: Record<string, string> = {
      "Technology": "التكنولوجيا",
      "Marketing": "التسويق",
      "Design": "التصميم",
      "Product": "المنتج",
      "Data": "البيانات",
      "Human Resources": "الموارد البشرية",
      "Finance": "المالية"
    };
    return translations[deptName] || deptName;
  }

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip 
            formatter={(value: number) => [`${formatCurrency(value)}`, undefined]}
            labelFormatter={(label) => `${label} ${language === 'ar' ? 'القسم' : 'Department'}`}
          />
          <Legend />
          <Bar 
            name={language === 'ar' ? 'متوسط الراتب' : 'Average Salary'} 
            dataKey="averageSalary" 
            fill="#0E292C" 
          />
          <Bar 
            name={language === 'ar' ? 'إجمالي الرواتب' : 'Total Salary'} 
            dataKey="totalSalary" 
            fill="#587375" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryOverviewChart;
