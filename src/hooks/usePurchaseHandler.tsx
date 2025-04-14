
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Benefit } from "@/components/dashboard/BenefitCard";

interface UsePurchaseHandlerProps {
  setLoading: (loading: boolean) => void;
  onPurchase?: (benefitId: string) => void;
  setPurchasingBenefit: (benefit: Benefit | null) => void;
}

export const usePurchaseHandler = ({
  setLoading,
  onPurchase,
  setPurchasingBenefit
}: UsePurchaseHandlerProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();

  const handlePurchase = async (benefit: Benefit) => {
    setLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        toast({
          title: language === 'ar' ? "خطأ في المصادقة" : "Authentication Error",
          description: language === 'ar' 
            ? "يجب عليك تسجيل الدخول لشراء المزايا" 
            : "You must be logged in to purchase benefits",
          variant: "destructive",
        });
        return;
      }

      const { data: allowanceData, error: allowanceError } = await supabase
        .from("user_allowance")
        .select("current_amount")
        .eq("user_id", user.user.id)
        .single();

      if (allowanceError || !allowanceData) {
        toast({
          title: language === 'ar' ? "خطأ" : "Error",
          description: language === 'ar' 
            ? "فشل في التحقق من رصيد البدل" 
            : "Failed to verify allowance balance",
          variant: "destructive",
        });
        return;
      }

      if (allowanceData.current_amount < benefit.price) {
        toast({
          title: language === 'ar' ? "رصيد غير كافٍ" : "Insufficient Balance",
          description: language === 'ar' 
            ? "رصيد البدل الخاص بك غير كافٍ لهذا العنصر" 
            : "Your allowance balance is not enough for this item",
          variant: "destructive",
        });
        return;
      }

      const { error: purchaseError } = await supabase
        .from("purchased_benefits")
        .insert({
          user_id: user.user.id,
          benefit_id: benefit.id,
          amount_paid: benefit.price
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

      const newBalance = allowanceData.current_amount - benefit.price;
      const { error: updateError } = await supabase
        .from("user_allowance")
        .update({ current_amount: newBalance })
        .eq("user_id", user.user.id);

      if (updateError) {
        toast({
          title: language === 'ar' ? "خطأ" : "Error",
          description: language === 'ar' 
            ? "تم الشراء ولكن فشل تحديث الرصيد" 
            : "Purchase completed but failed to update balance",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: language === 'ar' ? "تم الشراء بنجاح" : "Purchase Successful",
        description: language === 'ar' 
          ? `تم شراء ${benefit.name} بنجاح` 
          : `Successfully purchased ${benefit.name}`,
      });

      if (onPurchase) {
        onPurchase(benefit.id);
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "حدث خطأ أثناء معالجة طلبك" 
          : "An error occurred while processing your request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setPurchasingBenefit(null);
    }
  };

  return { handlePurchase };
};
