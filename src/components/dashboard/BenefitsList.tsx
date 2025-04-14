
import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle 
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Benefit } from "./BenefitCard";
import BenefitCategory from "./BenefitCategory";
import PurchaseDialog from "./PurchaseDialog";
import { formatCurrency, groupBenefitsByCategory } from "@/utils/benefitsUtils";
import { usePurchaseHandler } from "@/hooks/usePurchaseHandler";

interface BenefitsListProps {
  benefits: Benefit[];
  allowance?: number | null;
  onPurchase?: (benefitId: string) => void;
}

const BenefitsList = ({ benefits, allowance = null, onPurchase }: BenefitsListProps) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [purchasingBenefit, setPurchasingBenefit] = useState<Benefit | null>(null);
  
  const { handlePurchase } = usePurchaseHandler({
    setLoading,
    onPurchase,
    setPurchasingBenefit
  });

  // Filter benefits to only show public ones
  const visibleBenefits = benefits.filter(benefit => benefit.visibility === 'public');
  
  const groupedBenefits = groupBenefitsByCategory(visibleBenefits);
  const currencyFormatter = (amount: number) => formatCurrency(amount, language);
  
  if (visibleBenefits.length === 0) {
    return (
      <Card className="shadow-sm border rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-50 border-b pb-4">
          <CardTitle className="text-lg font-medium text-gray-800">
            {language === 'ar' ? 'المزايا المتاحة' : 'Available Benefits'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            {language === 'ar' 
              ? 'لا توجد مزايا متاحة حاليًا.'
              : 'No benefits available at the moment.'}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      <Card className="shadow-sm border rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-50 border-b pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-medium text-gray-800">
              {language === 'ar' ? 'سوق المزايا' : 'Benefits Marketplace'}
            </CardTitle>
            {allowance !== null && (
              <div className="text-sm font-medium">
                <span className="text-muted-foreground mr-2">
                  {language === 'ar' ? 'الرصيد:' : 'Balance:'}
                </span>
                <span className="text-primary font-bold">{currencyFormatter(allowance)}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {Object.entries(groupedBenefits).map(([category, categoryBenefits]) => (
            <BenefitCategory
              key={category}
              category={category}
              benefits={categoryBenefits}
              allowance={allowance}
              formatCurrency={currencyFormatter}
              loading={loading}
              onPurchaseClick={setPurchasingBenefit}
            />
          ))}
        </CardContent>
      </Card>

      <PurchaseDialog
        benefit={purchasingBenefit}
        allowance={allowance}
        formatCurrency={currencyFormatter}
        loading={loading}
        open={purchasingBenefit !== null}
        onOpenChange={(open) => !open && setPurchasingBenefit(null)}
        onConfirm={handlePurchase}
      />
    </>
  );
};

export default BenefitsList;
