
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import EmployeeTable from "@/components/dashboard/EmployeeTable";
import { useState } from "react";
import ImportEmployeesDialog from "@/components/dashboard/ImportEmployeesDialog";

interface EmployerEmployeesSectionProps {
  employees: any[];
  loading: boolean;
}

const EmployerEmployeesSection = ({ employees, loading }: EmployerEmployeesSectionProps) => {
  const { language } = useLanguage();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {language === 'ar' ? 'أرصدة الموظفين' : 'Employee Balances'}
        </h2>
        
        <Button 
          onClick={() => setIsImportDialogOpen(true)}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {language === 'ar' ? 'استيراد الموظفين' : 'Import Employees'}
        </Button>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <Card className="overflow-hidden border-gray-100 shadow-sm">
          <EmployeeTable employees={employees} />
        </Card>
      )}

      <ImportEmployeesDialog 
        open={isImportDialogOpen} 
        onOpenChange={setIsImportDialogOpen} 
      />
    </div>
  );
};

export default EmployerEmployeesSection;
