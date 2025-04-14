
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import EmployerSidebar from "@/components/dashboard/EmployerSidebar";
import EmployerDashboardHeader from "@/components/dashboard/EmployerDashboardHeader";
import InsuranceContent from "@/components/dashboard/InsuranceContent";

const EmployerInsurancePage = () => {
  const { user, userRole } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="flex h-screen bg-gray-50">
      <EmployerSidebar />
      
      <div className="flex-1 overflow-auto">
        <EmployerDashboardHeader 
          title={language === 'ar' ? 'التأمين الصحي' : 'Health Insurance'} 
        />
        
        <InsuranceContent />
      </div>
    </div>
  );
};

export default EmployerInsurancePage;
