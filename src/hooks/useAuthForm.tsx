
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Shared schema parts
const baseSchema = {
  email: z.string().email(),
  password: z.string().min(6)
};

export const loginSchema = z.object(baseSchema);

export const employeeSignupSchema = z.object({
  ...baseSchema,
  fullName: z.string().min(2)
});

export const employerSignupSchema = z.object({
  ...baseSchema,
  fullName: z.string().min(2),
  companyName: z.string().min(2)
});

export type AuthMode = "login" | "signup";

export const useAuthForm = (role: 'employee' | 'employer') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
      
      if (error) throw error;
      
      // Get profile data to check role
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user?.id)
        .single();
        
      if (profileError) {
        console.error("Error fetching profile:", profileError);
      }
      
      toast({
        title: "Login successful",
        description: "You have been logged in successfully."
      });
      
      // Redirect based on role
      const userRole = profileData?.role || role;
      if (userRole === 'employer') {
        navigate("/employer-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (values: z.infer<typeof employeeSignupSchema | typeof employerSignupSchema>) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            ...(role === 'employer' && { company_name: (values as any).companyName }),
            role
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Sign up successful",
        description: "Your account has been created successfully. Please check your email for verification."
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to create account");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    setError,
    handleLogin,
    handleSignup
  };
};
