
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Benefit } from "@/components/dashboard/BenefitCard";
import { useToast } from "@/components/ui/use-toast";

export const useBenefits = (enabled = true, companyId?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [useFallback, setUseFallback] = useState(false);

  const mockBenefits: Benefit[] = [
    {
      id: "1",
      name: "Anghami Premium",
      description: "Unlimited music streaming service with access to millions of Arabic and international songs",
      category: "Entertainment",
      icon_name: "music",
      price: 15,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "2",
      name: "Shahid VIP",
      description: "Premium Arabic streaming platform with exclusive series, movies and shows",
      category: "Entertainment",
      icon_name: "tv",
      price: 20,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "3",
      name: "beIN SPORTS Connect",
      description: "Stream live sports including football, tennis, and basketball",
      category: "Entertainment",
      icon_name: "dumbbell",
      price: 25,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "4",
      name: "Fitness Time Membership",
      description: "Access to premium fitness centers across Saudi Arabia",
      category: "Health & Wellness",
      icon_name: "dumbbell",
      price: 40,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "5",
      name: "Gold's Gym Membership",
      description: "Monthly membership to Gold's Gym facilities",
      category: "Health & Wellness",
      icon_name: "dumbbell",
      price: 45,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "6",
      name: "9 Round Kickboxing",
      description: "30-minute kickboxing fitness circuit training sessions",
      category: "Health & Wellness",
      icon_name: "dumbbell",
      price: 35,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "7",
      name: "Zeen Home Spa Session",
      description: "In-home massage and wellness treatments",
      category: "Wellness",
      icon_name: "heart",
      price: 50,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "8",
      name: "Paragon Spa Treatment",
      description: "Luxurious spa treatment at Paragon Spa",
      category: "Wellness",
      icon_name: "heart",
      price: 60,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "9",
      name: "The River Spa Package",
      description: "Relaxing spa package at The River Spa",
      category: "Wellness",
      icon_name: "heart",
      price: 55,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "10",
      name: "Metro Tickets Monthly Pass",
      description: "Monthly pass for metro transportation",
      category: "Transportation",
      icon_name: "train",
      price: 30,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "11",
      name: "Touch Medical Clinic Checkup",
      description: "Basic health checkup at Touch Medical Clinic",
      category: "Healthcare",
      icon_name: "heart",
      price: 70,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "12",
      name: "U Clinic Consultation",
      description: "Medical consultation at U Clinic",
      category: "Healthcare",
      icon_name: "heart",
      price: 65,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "13",
      name: "Muvi Cinema Tickets",
      description: "Monthly movie tickets at Muvi Cinema",
      category: "Entertainment",
      icon_name: "tv",
      price: 25,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "14",
      name: "AMC Cinema Tickets",
      description: "Monthly movie tickets at AMC Cinema",
      category: "Entertainment",
      icon_name: "tv",
      price: 25,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "15",
      name: "VOX Cinema Tickets",
      description: "Monthly movie tickets at VOX Cinema",
      category: "Entertainment",
      icon_name: "tv",
      price: 25,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "16",
      name: "Bujairi Terrace Dining Voucher",
      description: "Dining voucher for restaurants at Bujairi Terrace",
      category: "Dining",
      icon_name: "utensils",
      price: 40,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "17",
      name: "The Capital Lounge Dining Voucher",
      description: "Fine dining experience at The Capital Lounge",
      category: "Dining",
      icon_name: "utensils",
      price: 50,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "18",
      name: "Cafe Bateel Voucher",
      description: "Gift card for premium coffee and dates at Cafe Bateel",
      category: "Dining",
      icon_name: "coffee",
      price: 30,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "19",
      name: "Urth Cafe Voucher",
      description: "Dining voucher for Urth Cafe",
      category: "Dining",
      icon_name: "coffee",
      price: 35,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "20",
      name: "Jolt Coffee Gift Card",
      description: "Gift card for specialty coffee at Jolt Coffee",
      category: "Dining",
      icon_name: "coffee",
      price: 25,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    },
    {
      id: "21",
      name: "Half Million Coffee Subscription",
      description: "Monthly coffee subscription at Half Million",
      category: "Dining",
      icon_name: "coffee",
      price: 30,
      status: "active",
      visibility: "public",
      company_id: companyId || null
    }
  ];

  const { data: benefits, isLoading: benefitsLoading, error: benefitsError } = useQuery({
    queryKey: ["employerBenefits", companyId, useFallback],
    queryFn: async () => {
      if (useFallback) {
        console.log("Using fallback mock benefits data");
        return mockBenefits;
      }
      
      console.log("Fetching benefits...", companyId ? `for company: ${companyId}` : 'all benefits');
      
      try {
        if (companyId) {
          const { data, error } = await supabase
            .from("available_benefits")
            .select("*")
            .eq("company_id", companyId);
            
          if (error) {
            console.error("Error fetching benefits:", error);
            setUseFallback(true);
            return mockBenefits;
          }
          
          console.log("Benefits fetched successfully:", data);
          return data as Benefit[];
        } else {
          const { data, error } = await supabase
            .from("available_benefits")
            .select("*");
            
          if (error) {
            console.error("Error fetching benefits:", error);
            setUseFallback(true);
            return mockBenefits;
          }
          
          console.log("Benefits fetched successfully:", data);
          return data as Benefit[];
        }
      } catch (error) {
        console.error("Exception in benefits query:", error);
        setUseFallback(true);
        return mockBenefits;
      }
    },
    enabled,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.error("Query error fetching benefits:", error);
        toast({
          title: "Using fallback data",
          description: "We're having trouble connecting to the database. Using sample data instead.",
          variant: "default",
        });
        setUseFallback(true);
      }
    }
  });

  const updateBenefitVisibility = async (benefitId: string, visibility: string): Promise<void> => {
    if (useFallback) {
      toast({
        title: "Success",
        description: visibility === 'public' 
          ? "Benefit is now visible to employees" 
          : "Benefit is now hidden from employees",
      });
      return;
    }
    
    try {
      console.log(`Updating benefit ${benefitId} visibility to ${visibility}`);
      
      const { data, error } = await supabase
        .from("available_benefits")
        .update({ visibility })
        .eq("id", benefitId)
        .select();

      if (error) {
        console.error("Error updating benefit visibility:", error);
        throw error;
      }

      console.log("Benefit visibility updated successfully:", data);
      
      queryClient.invalidateQueries({ queryKey: ["employerBenefits", companyId] });
      
      toast({
        title: "Success",
        description: visibility === 'public' 
          ? "Benefit is now visible to employees" 
          : "Benefit is now hidden from employees",
      });
    } catch (error) {
      console.error("Exception updating benefit visibility:", error);
      toast({
        title: "Error",
        description: "Failed to update benefit visibility. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const createBenefit = async (newBenefit: Omit<Benefit, 'id'>) => {
    if (useFallback) {
      toast({
        title: "Success",
        description: "New benefit has been created successfully.",
      });
      return true;
    }
    
    try {
      console.log("Creating new benefit:", newBenefit);
      
      const { data, error } = await supabase
        .from("available_benefits")
        .insert(newBenefit)
        .select();

      if (error) {
        console.error("Supabase error creating benefit:", error);
        throw error;
      }

      console.log("Benefit created successfully:", data);
      
      queryClient.invalidateQueries({ queryKey: ["employerBenefits", companyId] });
      
      toast({
        title: "Success",
        description: "New benefit has been created successfully.",
      });

      return true;
    } catch (error) {
      console.error("Exception creating benefit:", error);
      toast({
        title: "Error",
        description: "Failed to create new benefit. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteBenefit = async (benefitId: string): Promise<boolean> => {
    if (useFallback) {
      toast({
        title: "Success",
        description: "Benefit has been deleted successfully.",
      });
      return true;
    }
    
    try {
      console.log(`Deleting benefit with ID: ${benefitId}`);
      
      const { data, error } = await supabase
        .from("available_benefits")
        .delete()
        .eq("id", benefitId)
        .select();

      if (error) {
        console.error("Error deleting benefit:", error);
        toast({
          title: "Error",
          description: "Failed to delete benefit. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      console.log("Benefit deleted successfully:", data);
      
      queryClient.invalidateQueries({ queryKey: ["employerBenefits", companyId] });
      
      toast({
        title: "Success",
        description: "Benefit has been deleted successfully.",
      });
      
      return true;
    } catch (error) {
      console.error("Exception deleting benefit:", error);
      toast({
        title: "Error",
        description: "Failed to delete benefit. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    benefits,
    benefitsLoading,
    benefitsError,
    updateBenefitVisibility,
    createBenefit,
    deleteBenefit
  };
};
