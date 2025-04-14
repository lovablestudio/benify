
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import EmployerSidebar from "@/components/dashboard/EmployerSidebar";
import EmployerDashboardHeader from "@/components/dashboard/EmployerDashboardHeader";
import EmployeeDetails from "@/components/dashboard/EmployeeDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const EmployeeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, user, userRole } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [balanceData, setBalanceData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect non-employer users
    if (!loading && user && userRole !== 'employer') {
      console.log("Redirecting non-employer user to dashboard", { userRole });
      navigate("/dashboard");
    }
  }, [loading, userRole, navigate, user]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (!id || !user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch employee profile data
        const { data: profileData, error: profileError } = await supabase
          .rpc('get_user_profile', { user_id: id });
          
        if (profileError) {
          console.error("Error fetching employee profile:", profileError);
          toast({
            title: "Error",
            description: "Failed to load employee details. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        console.log("Employee profile data:", profileData);
        setEmployeeData(profileData);
        
        // Fetch employee balance using the custom function instead of direct table access
        // This should avoid the RLS policy recursion issue
        if (profileData && profileData.company) {
          try {
            const { data: employeeBalances, error: balancesError } = await supabase
              .rpc('get_company_employee_balances', { company_name: profileData.company });
              
            if (balancesError) {
              console.error("Error fetching company employee balances:", balancesError);
            } else if (employeeBalances) {
              // Find the balance for this specific employee
              const employeeBalance = employeeBalances.find((item: any) => item.id === id);
              if (employeeBalance) {
                setBalanceData({
                  balance_amount: employeeBalance.balance_amount,
                  employee_id: id,
                  updated_at: new Date().toISOString() // Use current date as we don't have the actual update date
                });
              }
            }
          } catch (error) {
            console.error("Error in balance lookup:", error);
          }
        }
      } catch (error) {
        console.error("Exception in employee details fetch:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id, user, toast]);

  if (!user || userRole !== 'employer') {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <EmployerSidebar />
      
      <div className="flex-1 overflow-auto">
        <EmployerDashboardHeader 
          title={language === 'ar' ? 'تفاصيل الموظف' : 'Employee Details'} 
        />
        
        <main className="p-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/employer-dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {language === 'ar' ? 'العودة إلى قائمة الموظفين' : 'Back to Employee List'}
            </Button>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <>
              {employeeData ? (
                <div className="grid grid-cols-1 gap-6">
                  <EmployeeDetails
                    fullName={employeeData.full_name}
                    email={employeeData.email}
                    position={employeeData.position}
                    department={employeeData.department}
                    salary={employeeData.salary}
                    joiningDate={employeeData.joining_date}
                  />
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">
                      {language === 'ar' ? 'معلومات الرصيد' : 'Balance Information'}
                    </h2>
                    <div className="p-4 bg-green-50 rounded-md border border-green-100">
                      <p className="text-lg">
                        <span className="font-medium">
                          {language === 'ar' ? 'الرصيد الحالي: ' : 'Current Balance: '}
                        </span>
                        <span className="text-green-700 font-bold">
                          {new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
                            style: 'currency',
                            currency: 'SAR',
                            maximumFractionDigits: 0
                          }).format(balanceData?.balance_amount || 0)}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {language === 'ar' 
                          ? 'تم التحديث في: ' + new Date(balanceData?.updated_at || Date.now()).toLocaleDateString('ar-SA')
                          : 'Last updated: ' + new Date(balanceData?.updated_at || Date.now()).toLocaleDateString()
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-lg text-center">
                  <p className="text-amber-800">
                    {language === 'ar' 
                      ? 'لم يتم العثور على بيانات لهذا الموظف.' 
                      : 'No data found for this employee.'}
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
