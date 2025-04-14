
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Benefit } from "./BenefitCard";

interface PurchaseDialogProps {
  benefit: Benefit | null;
  allowance: number | null;
  formatCurrency: (amount: number) => string;
  loading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (benefit: Benefit) => void;
}

const PurchaseDialog = ({
  benefit,
  allowance,
  formatCurrency,
  loading,
  open,
  onOpenChange,
  onConfirm
}: PurchaseDialogProps) => {
  const { language } = useLanguage();

  if (!benefit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'تأكيد الشراء' : 'Confirm Purchase'}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? `هل أنت متأكد من رغبتك في شراء ${benefit.name}؟`
              : `Are you sure you want to purchase ${benefit.name}?`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-muted-foreground">
              {language === 'ar' ? 'السعر:' : 'Price:'}
            </span>
            <span className="font-bold text-primary">
              {formatCurrency(benefit.price)}
            </span>
          </div>
          
          {allowance !== null && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-muted-foreground">
                  {language === 'ar' ? 'الرصيد الحالي:' : 'Current balance:'}
                </span>
                <span className="font-medium">
                  {formatCurrency(allowance)}
                </span>
              </div>
              
              <div className="flex items-center justify-between px-1">
                <span className="text-muted-foreground">
                  {language === 'ar' ? 'الرصيد بعد الشراء:' : 'Balance after purchase:'}
                </span>
                <span className={`font-bold ${allowance - benefit.price < 0 ? 'text-destructive' : 'text-green-600'}`}>
                  {formatCurrency(Math.max(0, allowance - benefit.price))}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex space-x-2 sm:space-x-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1"
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button 
            onClick={() => onConfirm(benefit)}
            disabled={loading}
            className="flex-1"
          >
            {loading 
              ? (language === 'ar' ? 'جاري المعالجة...' : 'Processing...') 
              : (language === 'ar' ? 'تأكيد الشراء' : 'Confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;
