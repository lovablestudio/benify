
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SalaryOverviewChart from "./SalaryOverviewChart";
import EmployeeSalaryTable from "./EmployeeSalaryTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const FinanceContent = () => {
  const { language } = useLanguage();
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  return (
    <main className="p-8 space-y-8">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {language === "ar" ? "نظرة عامة على الرواتب" : "Salary Overview"}
              </CardTitle>
              <CardDescription>
                {language === "ar" 
                  ? "تحليل الرواتب ومقارنتها حسب الأقسام" 
                  : "Analysis of salaries and comparison by department"}
              </CardDescription>
            </div>
            <Tabs defaultValue="monthly" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger 
                  value="monthly" 
                  onClick={() => setTimeframe("monthly")}
                >
                  {language === "ar" ? "شهري" : "Monthly"}
                </TabsTrigger>
                <TabsTrigger 
                  value="quarterly" 
                  onClick={() => setTimeframe("quarterly")}
                >
                  {language === "ar" ? "ربع سنوي" : "Quarterly"}
                </TabsTrigger>
                <TabsTrigger 
                  value="yearly" 
                  onClick={() => setTimeframe("yearly")}
                >
                  {language === "ar" ? "سنوي" : "Yearly"}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <SalaryOverviewChart timeframe={timeframe} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {language === "ar" ? "قائمة رواتب الموظفين" : "Employee Salary List"}
          </CardTitle>
          <CardDescription>
            {language === "ar"
              ? "عرض مفصل لرواتب الموظفين ومعلوماتهم"
              : "Detailed view of employee salaries and information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeSalaryTable />
        </CardContent>
      </Card>
    </main>
  );
};

export default FinanceContent;
