
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import EmployerSidebar from "@/components/dashboard/EmployerSidebar";
import EmployerDashboardHeader from "@/components/dashboard/EmployerDashboardHeader";
import InsightsContent from "@/components/dashboard/InsightsContent";

const EmployerInsightsPage = () => {
  const { user, userRole } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="flex h-screen bg-gray-50">
      <EmployerSidebar />
      
      <div className="flex-1 overflow-auto">
        <EmployerDashboardHeader 
          title={language === 'ar' ? 'الرؤى والتحليلات' : 'Insights & Analytics'} 
        />
        
        <InsightsContent />
      </div>
    </div>
  );
};

export default EmployerInsightsPage;
