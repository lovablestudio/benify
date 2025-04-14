
import { useLanguage } from "@/contexts/LanguageContext";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { BenefitFormValues } from "@/hooks/useBenefitForm";

interface BenefitFormBasicFieldsProps {
  form: UseFormReturn<BenefitFormValues>;
}

const BenefitFormBasicFields = ({ form }: BenefitFormBasicFieldsProps) => {
  const { language } = useLanguage();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{language === 'ar' ? 'اسم الميزة' : 'Benefit Name'}</FormLabel>
            <FormControl>
              <Input 
                placeholder={language === 'ar' ? 'أدخل اسم الميزة' : 'Enter benefit name'} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{language === 'ar' ? 'الوصف' : 'Description'}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={language === 'ar' ? 'أدخل وصفًا للميزة' : 'Enter benefit description'} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BenefitFormBasicFields;
