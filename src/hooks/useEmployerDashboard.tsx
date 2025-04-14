
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const useEmployerDashboard = (userId: string | undefined, company: string | null) => {
  const [companyEmployees, setCompanyEmployees] = useState<any[]>([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const { toast } = useToast();
  const [companyStats, setCompanyStats] = useState({
    currentBalance: 0,
    assignedUsers: 0,
    fundRequests: { count: 0, status: 'active' as const },
    reimbursements: { count: 0, status: 'inactive' as const },
    receipts: { count: 0, status: 'active' as const },
  });

  useEffect(() => {
    const fetchEmployerData = async () => {
      if (!userId) return;
      
      try {
        console.log("Fetching employer data for user:", userId);
        
        // Get employer profile using the custom function to avoid RLS issues
        const { data: profileData, error: profileError } = await supabase
          .rpc('get_user_profile', { user_id: userId });

        if (profileError) {
          console.error("Error fetching profile via function:", profileError);
          toast({
            title: "Error",
            description: "Failed to load your profile. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        console.log("Profile data fetched successfully:", profileData);
        setProfile(profileData);
        setProfileLoading(false);

        if (profileData?.company) {
          console.log("Fetching employees for company:", profileData.company);
          
          // Get employee balances using the custom function
          const { data: employeesData, error: employeesError } = await supabase
            .rpc('get_company_employee_balances', { company_name: profileData.company });

          if (employeesError) {
            console.error("Error fetching employee balances:", employeesError);
            toast({
              title: "Error",
              description: "Failed to load employee balances. Please try again.",
              variant: "destructive",
            });
            return;
          }
          
          console.log("Employee balances fetched:", employeesData);
          
          // Get employee details using the custom function 
          const { data: employeesFullData, error: employeesDetailsError } = await supabase
            .rpc('get_company_employees', { company_name: profileData.company });
            
          if (employeesDetailsError) {
            console.error("Error fetching employee details:", employeesDetailsError);
            toast({
              title: "Error",
              description: "Failed to load employee details. Please try again.",
              variant: "destructive",
            });
            return;
          }
          
          console.log("Employee details fetched:", employeesFullData);
          
          // Merge employee data from both sources
          const mergedEmployeeData = employeesData?.map((empBalance: any) => {
            const empDetails = employeesFullData?.find(
              (emp: any) => emp.id === empBalance.id
            ) || {};
            
            return {
              ...empBalance,
              ...empDetails
            };
          }) || [];
          
          console.log("Merged employee data:", mergedEmployeeData);
          setCompanyEmployees(mergedEmployeeData);
          
          if (employeesData && employeesData.length > 0) {
            const totalBalance = employeesData.reduce(
              (sum, emp) => sum + (Number(emp.balance_amount) || 0), 
              0
            );
            
            setCompanyStats(prev => ({
              ...prev,
              currentBalance: totalBalance,
              assignedUsers: employeesData.length
            }));
          }
        } else {
          console.log("No company found for this employer");
          setEmployeesLoading(false);
        }
      } catch (error) {
        console.error("Error fetching employer data:", error);
        toast({
          title: "Error",
          description: "Failed to load employer data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setEmployeesLoading(false);
      }
    };

    if (userId) {
      console.log("User authenticated as employer, fetching data");
      fetchEmployerData();
    }
  }, [userId, toast]);

  return {
    profile,
    profileLoading,
    companyEmployees,
    employeesLoading,
    companyStats
  };
};

export default useEmployerDashboard;
