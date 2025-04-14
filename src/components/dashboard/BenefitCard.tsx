
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

// Import the types we need
export interface Benefit {
  id: string;
  name: string;
  description: string;
  category: string;
  icon_name: string;
  price: number;
  status: string;
  visibility: string;
  company_id?: string;
  purchased?: boolean;
}

type IconComponentType = React.FC<{ className?: string }>;

interface BenefitCardProps {
  benefit: Benefit;
  allowance: number | null;
  formatCurrency: (amount: number) => string;
  IconComponent: IconComponentType;
  loading: boolean;
  onPurchaseClick: (benefit: Benefit) => void;
}

const BenefitCard = ({
  benefit,
  allowance,
  formatCurrency,
  IconComponent,
  loading,
  onPurchaseClick
}: BenefitCardProps) => {
  const { language } = useLanguage();
  const isSufficient = allowance === null || allowance >= benefit.price;
  
  return (
    <div 
      className="overflow-hidden rounded-xl border transition-all hover:shadow-md group">
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-white rounded-full p-2.5 shadow-md">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            
            {benefit.purchased ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                {language === 'ar' ? 'تم الشراء' : 'Purchased'}
              </Badge>
            ) : (
              <span className="font-bold text-primary text-lg">
                {formatCurrency(benefit.price)}
              </span>
            )}
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow bg-white">
          <h3 className="font-medium text-lg mb-2 leading-tight">{benefit.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">
            {benefit.description}
          </p>
          
          {benefit.purchased ? (
            <Button variant="outline" disabled className="w-full mt-auto">
              {language === 'ar' ? 'تم الشراء' : 'Purchased'}
            </Button>
          ) : (
            <Button 
              className="w-full mt-auto"
              disabled={loading || !isSufficient}
              onClick={() => onPurchaseClick(benefit)}
              variant={isSufficient ? "default" : "outline"}
            >
              {language === 'ar' ? 'شراء' : 'Purchase'}
            </Button>
          )}
          
          {!isSufficient && !benefit.purchased && (
            <div className="flex items-center gap-1 text-xs text-destructive mt-2 justify-center">
              <AlertCircle className="h-3 w-3" />
              <span>
                {language === 'ar' ? 'رصيد غير كافٍ' : 'Insufficient balance'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
