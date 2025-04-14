
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMockProfile } from "@/hooks/useMockProfile";
import { useMockBenefits } from "@/hooks/useMockBenefits";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { loading, user, handleLogout } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const { 
    profile, 
    allowance, 
    allowanceLoading, 
    setAllowance,
    updateProfileLogo
  } = useMockProfile(user?.id, user?.email);
  
  const { 
    benefits, 
    benefitsLoading, 
    handleBenefitPurchase 
  } = useMockBenefits(user?.id);

  const handlePurchase = async (benefitId: string) => {
    if (!user || !allowance) return;
    
    const benefitToPurchase = benefits.find(b => b.id === benefitId);
    if (!benefitToPurchase) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "الميزة غير موجودة" 
          : "Benefit not found",
        variant: "destructive",
      });
      return;
    }
    
    // Check if benefit is already purchased
    if (benefitToPurchase.purchased) {
      toast({
        title: language === 'ar' ? "تم الشراء بالفعل" : "Already Purchased",
        description: language === 'ar' 
          ? "لقد اشتريت هذه الميزة بالفعل" 
          : "You have already purchased this benefit",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user has enough balance
    if (allowance.current_amount < benefitToPurchase.price) {
      toast({
        title: language === 'ar' ? "رصيد غير كافٍ" : "Insufficient Balance",
        description: language === 'ar' 
          ? "رصيد البدل الخاص بك غير كافٍ لهذا العنصر" 
          : "Your allowance balance is not enough for this item",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Insert purchased benefit
      const { error: purchaseError } = await supabase
        .from("purchased_benefits")
        .insert({
          user_id: user.id,
          benefit_id: benefitId,
          amount_paid: benefitToPurchase.price
        });
        
      if (purchaseError) {
        if (purchaseError.code === "23505") {
          toast({
            title: language === 'ar' ? "تم الشراء بالفعل" : "Already Purchased",
            description: language === 'ar' 
              ? "لقد اشتريت هذه الميزة بالفعل" 
              : "You have already purchased this benefit",
            variant: "destructive",
          });
        } else {
          console.error("Purchase error:", purchaseError);
          toast({
            title: language === 'ar' ? "خطأ" : "Error",
            description: language === 'ar' 
              ? "فشل في معالجة الشراء" 
              : "Failed to process purchase",
            variant: "destructive",
          });
        }
        return;
      }
      
      // Update allowance in database
      const newBalance = allowance.current_amount - benefitToPurchase.price;
      const { error: updateError } = await supabase
        .from("user_allowance")
        .update({ current_amount: newBalance })
        .eq("user_id", user.id);
        
      if (updateError) {
        console.error("Allowance update error:", updateError);
        toast({
          title: language === 'ar' ? "خطأ" : "Error",
          description: language === 'ar' 
            ? "تم الشراء ولكن فشل تحديث الرصيد" 
            : "Purchase completed but failed to update balance",
          variant: "destructive",
        });
        return;
      }
      
      // Update local state
      setAllowance({
        ...allowance,
        current_amount: newBalance
      });
      
      handleBenefitPurchase(benefitId);
      
      toast({
        title: language === 'ar' ? "تم الشراء بنجاح" : "Purchase Successful",
        description: language === 'ar' 
          ? `تم شراء ${benefitToPurchase.name} بنجاح` 
          : `Successfully purchased ${benefitToPurchase.name}`,
      });
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "حدث خطأ أثناء معالجة طلبك" 
          : "An error occurred while processing your request",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout 
      loading={loading} 
      onLogout={handleLogout}
    >
      {!loading && (
        <DashboardContent
          user={user}
          profile={profile}
          allowance={allowance}
          benefits={benefits}
          benefitsLoading={benefitsLoading}
          allowanceLoading={allowanceLoading}
          onBenefitPurchase={handlePurchase}
          onAllowanceUpdate={setAllowance}
          onProfileLogoUpdate={updateProfileLogo}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
