
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import EmployerSidebar from "@/components/dashboard/EmployerSidebar";
import EmployerDashboardHeader from "@/components/dashboard/EmployerDashboardHeader";
import EmployerStatsSection from "@/components/dashboard/EmployerStatsSection";
import EmployerEmployeesSection from "@/components/dashboard/EmployerEmployeesSection";
import useEmployerDashboard from "@/hooks/useEmployerDashboard";

const EmployerDashboard = () => {
  const { loading, user, userRole } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Redirect non-employer users
  useEffect(() => {
    if (!loading && user && userRole !== 'employer') {
      console.log("Redirecting non-employer user to dashboard", { userRole });
      navigate("/dashboard");
    }
  }, [loading, userRole, navigate, user]);

  // Load employer dashboard data
  const { 
    companyEmployees, 
    employeesLoading, 
    companyStats 
  } = useEmployerDashboard(user?.id, null);

  if (!user || userRole !== 'employer') {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <EmployerSidebar />
      
      <div className="flex-1 overflow-auto">
        <EmployerDashboardHeader 
          title={language === 'ar' ? 'بدل الصحة والعافية' : 'Health & Wellbeing Allowance'} 
        />
        
        <main className="p-8">
          <EmployerStatsSection companyStats={companyStats} />
          <EmployerEmployeesSection 
            employees={companyEmployees} 
            loading={employeesLoading} 
          />
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
