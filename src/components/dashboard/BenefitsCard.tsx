
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { CreditCard } from "lucide-react";

interface BenefitsCardProps {
  fullName: string;
  userId: string;
  logoUrl?: string | null;
  onLogoUpdated: (url: string) => void;
  cardNumber?: string;
  balance?: number | null;
}

const BenefitsCard = ({ 
  fullName, 
  userId, 
  logoUrl, 
  onLogoUpdated, 
  cardNumber = "•••• •••• •••• 4242",
  balance = null
}: BenefitsCardProps) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  // Format currency for display
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "";
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AspectRatio ratio={isMobile ? 1.586 : 1.7} className="bg-transparent">
        <Card className="w-full h-full overflow-hidden relative rounded-xl border-0 shadow-lg bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400">
          {/* Card background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-full w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-white/30 rounded-full"
                  style={{
                    width: `${Math.random() * 80 + 30}px`,
                    height: `${Math.random() * 80 + 30}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5,
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          <CardContent className="p-4 sm:p-6 relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-light opacity-80 text-white">
                  {language === 'ar' ? "مزايا الموظفين - المملكة العربية السعودية" : "EMPLOYEE BENEFITS - KSA"}
                </p>
                <p className="text-lg font-medium mt-1 text-white">Benify Card</p>
              </div>
              
              <div className="flex items-center space-x-1">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-brand-700 rounded-full"></div>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white/60 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Space where the chip was, now removed */}
            <div className="my-6">
              {/* Empty space for layout purposes */}
            </div>
            
            {/* Card number */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex space-x-2 sm:space-x-4 font-mono text-sm sm:text-lg tracking-wider text-white">
                <span>4581</span>
                <span>****</span>
                <span>****</span>
                <span>7895</span>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-80 text-white">{language === 'ar' ? 'صاحب البطاقة' : 'Card Holder'}</p>
                  <p className="text-xs sm:text-base font-medium text-white">{fullName}</p>
                </div>
                
                {balance !== null && (
                  <div className="text-right">
                    <p className="text-xs opacity-80 text-white">{language === 'ar' ? 'الرصيد' : 'Balance'}</p>
                    <p className="text-xs sm:text-base font-semibold text-white flex items-center justify-end">
                      <span className="mr-1">SAR</span>
                      {formatCurrency(balance).replace('SAR', '')}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <CreditCard className="w-4 h-4 sm:w-6 sm:h-6 text-white/70" />
                <p className="text-xs opacity-80 text-white">{language === 'ar' ? 'صالحة حتى' : 'Valid Thru'} 05/28</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </AspectRatio>
    </div>
  );
};

export default BenefitsCard;
