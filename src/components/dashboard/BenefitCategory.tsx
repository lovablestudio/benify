
import { useLanguage } from "@/contexts/LanguageContext";
import BenefitCard from "./BenefitCard";
import { Benefit } from "./BenefitCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getIconComponent } from "@/utils/benefitsUtils";

interface BenefitCategoryProps {
  category: string;
  benefits: Benefit[];
  allowance: number | null;
  formatCurrency: (amount: number) => string;
  loading: boolean;
  onPurchaseClick: (benefit: Benefit) => void;
}

const BenefitCategory = ({
  category,
  benefits,
  allowance,
  formatCurrency,
  loading,
  onPurchaseClick
}: BenefitCategoryProps) => {
  const { language } = useLanguage();
  
  // Render skeleton cards when loading
  if (loading) {
    return (
      <div className="mb-10 last:mb-0">
        <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">
          {category}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={`skeleton-${category}-${i}`} className="rounded-xl border h-full">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
              <div className="p-6 flex flex-col h-full">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <Skeleton className="h-10 w-full mt-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 last:mb-0">
      <h3 className="text-lg font-medium mb-4 text-gray-800 border-b pb-2">
        {category}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit) => {
          const IconComponent = getIconComponent(benefit.icon_name);
          
          return (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              allowance={allowance}
              formatCurrency={formatCurrency}
              IconComponent={IconComponent}
              loading={loading}
              onPurchaseClick={onPurchaseClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BenefitCategory;
