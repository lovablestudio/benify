
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // This function should run only once on mount to retrieve the session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        console.log("Getting initial session...");
        
        // Get session from Supabase auth
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          if (!location.pathname.includes("/auth") && !location.pathname.includes("/employer-auth")) {
            navigate("/auth");
          }
          setLoading(false);
          return;
        }
        
        console.log("Session data:", data?.session ? "Session exists" : "No session");
        
        // If no session, redirect to auth page (except if already there)
        if (!data.session) {
          console.log("No session found, redirecting to auth page");
          if (!location.pathname.includes("/auth") && !location.pathname.includes("/employer-auth") && location.pathname !== "/") {
            navigate("/auth");
          }
          setLoading(false);
          return;
        } else {
          // Set user if session exists
          console.log("Session found, setting user");
          setUser(data.session.user);
          
          // Get user role using the custom function to avoid RLS issues
          const { data: userData, error: profileError } = await supabase.rpc('get_user_profile', {
            user_id: data.session.user.id
          });
          
          if (profileError) {
            console.error("Error fetching profile via function:", profileError);
            if (!location.pathname.includes("/auth") && !location.pathname.includes("/employer-auth") && location.pathname !== "/") {
              navigate("/auth");
            }
            setLoading(false);
            return;
          }
          
          if (userData) {
            console.log("User profile data:", userData);
            setUserRole(userData.role);
            
            // Only redirect if we're on the root path or wrong dashboard
            const onRootPath = location.pathname === "/";
            const onWrongDashboard = (userData.role === 'employer' && location.pathname === "/dashboard") || 
                                   (userData.role !== 'employer' && location.pathname === "/employer-dashboard");
            
            if (onRootPath || onWrongDashboard) {
              const targetPath = userData.role === 'employer' ? "/employer-dashboard" : "/dashboard";
              console.log(`Redirecting to appropriate dashboard: ${targetPath}`);
              navigate(targetPath);
            }
          }
        }
      } catch (error) {
        console.error("Initial auth check error:", error);
        if (!location.pathname.includes("/auth") && !location.pathname.includes("/employer-auth") && location.pathname !== "/") {
          navigate("/auth");
        }
      } finally {
        setLoading(false);
      }
    };
    
    getInitialSession();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (event === "SIGNED_OUT") {
          console.log("User signed out, redirecting to auth page");
          navigate("/auth");
          setUserRole(null);
          setUser(null);
        } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          console.log("User signed in or token refreshed");
          if (session) {
            console.log("Setting user from session");
            setUser(session.user);
            
            // Get user role using the custom function to avoid RLS issues
            const { data: userData, error } = await supabase.rpc('get_user_profile', {
              user_id: session.user.id
            });
            
            if (!error && userData) {
              console.log("User profile data after sign in:", userData);
              setUserRole(userData.role);
              
              // Only redirect if on the root path or wrong dashboard
              const onRootPath = location.pathname === "/";
              const onWrongDashboard = (userData.role === 'employer' && location.pathname === "/dashboard") || 
                                     (userData.role !== 'employer' && location.pathname === "/employer-dashboard");
              
              if (onRootPath || onWrongDashboard) {
                const targetPath = userData.role === 'employer' ? "/employer-dashboard" : "/dashboard";
                console.log(`Redirecting to appropriate dashboard: ${targetPath}`);
                navigate(targetPath);
              }
            }
          }
        }
      }
    );
    
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate, location.pathname]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully."
      });
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { loading, user, userRole, handleLogout };
};
