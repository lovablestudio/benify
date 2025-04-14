
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

interface AllowanceInfoProps {
  currentAmount: number;
  monthlyAmount: number;
  nextRenewalDate: Date;
}

const AllowanceInfo = ({ 
  currentAmount, 
  monthlyAmount, 
  nextRenewalDate 
}: AllowanceInfoProps) => {
  const { language } = useLanguage();
  
  // Calculate percentage of monthly allowance used
  const percentageUsed = Math.min(100, Math.max(0, (currentAmount / monthlyAmount) * 100));
  
  // Format date based on language
  const formattedDate = language === 'ar' 
    ? format(nextRenewalDate, 'dd MMMM yyyy', { locale: arSA }) 
    : format(nextRenewalDate, 'MMMM dd, yyyy');

  // Format currency values based on language
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {language === 'ar' ? 'معلومات البدل الشهري' : 'Monthly Allowance'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {language === 'ar' ? 'المبلغ المتاح' : 'Available Balance'}
            </span>
            <span className="font-semibold">{formatCurrency(currentAmount)}</span>
          </div>
          
          <Progress value={percentageUsed} className="h-2" />
          
          <div className="text-sm text-muted-foreground">
            <span>
              {language === 'ar' 
                ? `${formatCurrency(monthlyAmount)} سيتم إضافتها في ${formattedDate}` 
                : `${formatCurrency(monthlyAmount)} will be added on ${formattedDate}`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllowanceInfo;
