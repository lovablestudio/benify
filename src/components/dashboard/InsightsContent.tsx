
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpendingOverviewChart from "./SpendingOverviewChart";
import CategorySpendingChart from "./CategorySpendingChart";
import EmployeeSpendingTable from "./EmployeeSpendingTable";
import { Button } from "@/components/ui/button";
import { FileDown, Filter } from "lucide-react";

const InsightsContent = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "quarterly" | "yearly">("monthly");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          {language === 'ar' ? 'نظرة عامة على الإنفاق' : 'Spending Overview'}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            {language === 'ar' ? 'تصفية' : 'Filter'}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            {language === 'ar' ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Button 
          variant={timeframe === "weekly" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("weekly")}
          className={timeframe === "weekly" ? "bg-[#0E292C] hover:bg-[#1A3B3F]" : ""}
        >
          {language === 'ar' ? 'أسبوعي' : 'Weekly'}
        </Button>
        <Button 
          variant={timeframe === "monthly" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("monthly")}
          className={timeframe === "monthly" ? "bg-[#0E292C] hover:bg-[#1A3B3F]" : ""}
        >
          {language === 'ar' ? 'شهري' : 'Monthly'}
        </Button>
        <Button 
          variant={timeframe === "quarterly" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("quarterly")}
          className={timeframe === "quarterly" ? "bg-[#0E292C] hover:bg-[#1A3B3F]" : ""}
        >
          {language === 'ar' ? 'ربع سنوي' : 'Quarterly'}
        </Button>
        <Button 
          variant={timeframe === "yearly" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("yearly")}
          className={timeframe === "yearly" ? "bg-[#0E292C] hover:bg-[#1A3B3F]" : ""}
        >
          {language === 'ar' ? 'سنوي' : 'Yearly'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {language === 'ar' ? 'إجمالي الإنفاق بمرور الوقت' : 'Total Spending Over Time'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingOverviewChart timeframe={timeframe} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {language === 'ar' ? 'الإنفاق حسب الفئة' : 'Spending by Category'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategorySpendingChart timeframe={timeframe} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="top-spenders">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="top-spenders">
            {language === 'ar' ? 'أعلى المنفقين' : 'Top Spenders'}
          </TabsTrigger>
          <TabsTrigger value="recent-transactions">
            {language === 'ar' ? 'المعاملات الأخيرة' : 'Recent Transactions'}
          </TabsTrigger>
          <TabsTrigger value="unused-allowances">
            {language === 'ar' ? 'البدلات غير المستخدمة' : 'Unused Allowances'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="top-spenders" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {language === 'ar' ? 'الموظفون الأكثر إنفاقًا' : 'Employees with Highest Spending'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeSpendingTable type="top-spenders" timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent-transactions" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {language === 'ar' ? 'آخر المعاملات' : 'Recent Transactions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeSpendingTable type="recent-transactions" timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unused-allowances" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {language === 'ar' ? 'البدلات غير المستخدمة' : 'Unused Allowances'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeSpendingTable type="unused-allowances" timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsContent;
