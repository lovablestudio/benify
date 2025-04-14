
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Benefit } from "@/components/dashboard/BenefitCard";

export const useMockBenefits = (userId: string | undefined) => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [benefitsLoading, setBenefitsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAvailableBenefits = async () => {
      setBenefitsLoading(true);
      try {
        console.log("Setting up mock benefits data");
        
        // Create mock benefits data
        const mockBenefits: Benefit[] = [
          {
            id: "1",
            name: "Health Insurance Premium",
            description: "Comprehensive health insurance coverage for you and your family",
            category: "Health & Wellness",
            icon_name: "heart",
            price: 15,
            status: "active",
            visibility: "public"
          },
          {
            id: "2",
            name: "Gym Membership",
            description: "Access to premium fitness centers across the country",
            category: "Health & Wellness",
            icon_name: "dumbbell",
            price: 10,
            status: "active",
            visibility: "public"
          },
          {
            id: "3",
            name: "Learning Subscription",
            description: "Online courses and professional development resources",
            category: "Education",
            icon_name: "book",
            price: 8,
            status: "active",
            visibility: "public"
          },
          {
            id: "4",
            name: "Mental Health App",
            description: "Premium subscription to meditation and mental wellness app",
            category: "Health & Wellness",
            icon_name: "brain",
            price: 5,
            status: "active",
            visibility: "private"
          },
          {
            id: "5",
            name: "Team Building Event",
            description: "Contribution towards team outing or virtual team building activity",
            category: "Work Culture",
            icon_name: "users",
            price: 12,
            status: "active",
            visibility: "public"
          },
          {
            id: "6",
            name: "Home Office Equipment",
            description: "Ergonomic chair, desk, or other home office essentials",
            category: "Work Equipment",
            icon_name: "laptop",
            price: 20,
            status: "active",
            visibility: "private"
          }
        ];
        
        // Set up mock purchased benefits (for example, the first benefit is purchased)
        const mockPurchasedBenefitIds = new Set(["1"]);
        
        const enrichedBenefits = mockBenefits.map(benefit => ({
          ...benefit,
          purchased: mockPurchasedBenefitIds.has(benefit.id)
        }));
        
        console.log("Mock benefits data:", enrichedBenefits);
        setBenefits(enrichedBenefits);
      } catch (error) {
        console.error("Error setting up mock benefits data:", error);
        toast({
          title: "Error",
          description: "Failed to load available benefits. Using default data instead.",
          variant: "destructive",
        });
      } finally {
        setBenefitsLoading(false);
      }
    };
    
    if (userId) {
      fetchAvailableBenefits();
    }
  }, [userId, toast]);

  const handleBenefitPurchase = (benefitId: string) => {
    // Update local state to show the benefit as purchased
    setBenefits(prevBenefits => 
      prevBenefits.map(benefit => 
        benefit.id === benefitId 
          ? { ...benefit, purchased: true } 
          : benefit
      )
    );
    
    toast({
      title: "Benefit Purchased",
      description: "Your benefit has been successfully purchased!"
    });
    
    return benefitId; // Return benefitId for use in the parent component
  };

  return { benefits, setBenefits, benefitsLoading, handleBenefitPurchase };
};
