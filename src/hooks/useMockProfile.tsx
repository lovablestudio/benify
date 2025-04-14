
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
  company?: string;
  position?: string;
  department?: string;
  salary?: number;
  joining_date?: string;
  company_logo_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface Allowance {
  current_amount: number;
  monthly_renewal_amount: number;
  next_renewal_date: string;
}

export const useMockProfile = (userId: string | undefined, userEmail: string | undefined) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [allowance, setAllowance] = useState<Allowance | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [allowanceLoading, setAllowanceLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) {
          console.log("No userId provided, skipping profile fetch");
          setProfileLoading(false);
          return;
        }
        
        console.log("Fetching profile for userId:", userId);
        
        try {
          // Try to get the actual profile data from Supabase using a direct query
          // This should work with the updated RLS policy
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();
          
          if (profileError) {
            console.error("Error fetching profile directly:", profileError);
            
            // If we still get an error, try to use our custom function
            if (profileError.message.includes('infinite recursion')) {
              console.log("Infinite recursion detected, trying custom function");
              
              // Call the custom SQL function we created
              const { data: funcData, error: funcError } = await supabase
                .rpc('get_user_profile', { user_id: userId });
              
              if (funcError) {
                console.error("Error fetching profile via custom function:", funcError);
                createMockProfile();
              } else if (funcData) {
                console.log("Profile data fetched successfully via custom function:", funcData);
                setProfile(funcData as Profile);
              } else {
                console.log("No profile found via custom function for user ID:", userId);
                createMockProfile();
              }
            } else {
              // For any other errors, fall back to mock data
              createMockProfile();
            }
          } else if (!profileData) {
            console.log("No profile found for user ID:", userId);
            createMockProfile();
          } else {
            console.log("Profile data fetched successfully:", profileData);
            setProfile(profileData);
          }
        } catch (err) {
          console.error("Exception while fetching profile:", err);
          createMockProfile();
        }
        
        // Fetch allowance data
        try {
          const { data: allowanceData, error: allowanceError } = await supabase
            .from('user_allowance')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();
          
          if (allowanceError) {
            console.error("Error fetching allowance:", allowanceError);
            createMockAllowance();
          } else if (!allowanceData) {
            console.log("No allowance found for user ID:", userId);
            createMockAllowance();
          } else {
            console.log("Allowance data fetched successfully:", allowanceData);
            setAllowance(allowanceData);
          }
        } catch (errA) {
          console.error("Exception while fetching allowance:", errA);
          createMockAllowance();
        }
      } catch (error) {
        console.error("Error setting up profile data:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile data. Using mock data instead.",
          variant: "destructive",
        });
        
        createMockProfile();
        createMockAllowance();
      } finally {
        setProfileLoading(false);
        setAllowanceLoading(false);
      }
    };
    
    const createMockProfile = () => {
      // Create a mock profile based on user info we have
      const mockProfile: Profile = {
        id: userId || '',
        full_name: userEmail?.split('@')[0] || "Employee",
        email: userEmail || '',
        role: 'employee',
        position: "Software Engineer",
        department: "Technology",
        salary: 12000,
        joining_date: "2022-01-15",
        company_logo_url: null
      };
      
      setProfile(mockProfile);
      
      toast({
        title: "Using default profile",
        description: "We couldn't retrieve your profile information. Using default values.",
        variant: "destructive",
      });
    };
    
    const createMockAllowance = () => {
      // Mock allowance data
      const mockAllowance: Allowance = {
        current_amount: 50,
        monthly_renewal_amount: 50,
        next_renewal_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
      };
      
      setAllowance(mockAllowance);
    };
    
    fetchProfile();
  }, [userId, userEmail, toast]);

  const updateProfileLogo = (logoUrl: string) => {
    if (profile) {
      setProfile({
        ...profile,
        company_logo_url: logoUrl
      });
    }
  };

  return { 
    profile, 
    allowance, 
    profileLoading, 
    allowanceLoading, 
    setAllowance,
    updateProfileLogo
  };
};
