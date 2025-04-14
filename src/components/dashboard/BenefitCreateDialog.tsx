
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
import { Benefit } from "@/components/dashboard/BenefitCard";
import { Form } from "@/components/ui/form";
import { useBenefitForm } from "@/hooks/useBenefitForm";
import BenefitFormBasicFields from "./BenefitFormBasicFields";
import BenefitFormAdditionalFields from "./BenefitFormAdditionalFields";

interface BenefitCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (benefit: Omit<Benefit, 'id'>) => Promise<boolean>;
}

const BenefitCreateDialog = ({
  open,
  onOpenChange,
  onSubmit
}: BenefitCreateDialogProps) => {
  const { language } = useLanguage();
  const { form, isSubmitting, handleSubmit } = useBenefitForm(onSubmit, onOpenChange);

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        form.reset();
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'إضافة ميزة جديدة' : 'Add New Benefit'}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? 'أضف ميزة جديدة لتقديمها للموظفين.' 
              : 'Add a new benefit to offer to your employees.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6 py-2">
            <BenefitFormBasicFields form={form} />
            <BenefitFormAdditionalFields form={form} />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (language === 'ar' ? 'جارٍ الإضافة...' : 'Adding...') 
                  : (language === 'ar' ? 'إضافة ميزة' : 'Add Benefit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitCreateDialog;
