
import { useLanguage } from "@/contexts/LanguageContext";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { BenefitFormValues } from "@/hooks/useBenefitForm";

interface BenefitFormAdditionalFieldsProps {
  form: UseFormReturn<BenefitFormValues>;
}

const BenefitFormAdditionalFields = ({ form }: BenefitFormAdditionalFieldsProps) => {
  const { language } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'ar' ? 'الفئة' : 'Category'}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={language === 'ar' ? 'الصحة والعافية' : 'Health & Wellness'} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'ar' ? 'السعر' : 'Price'}</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0"
                  step="0.01"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="icon_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{language === 'ar' ? 'اسم الأيقونة' : 'Icon Name'}</FormLabel>
            <FormControl>
              <Input 
                placeholder="gift, heart, book, etc" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              {language === 'ar' 
                ? 'استخدم أي اسم أيقونة من Lucide Icons' 
                : 'Use any icon name from Lucide Icons'}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="visibility"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>{language === 'ar' ? 'عرض للموظفين' : 'Visible to Employees'}</FormLabel>
              <FormDescription>
                {language === 'ar' 
                  ? 'عند التمكين، سيتمكن الموظفون من رؤية هذه الميزة وشرائها' 
                  : 'When enabled, employees will be able to see and purchase this benefit'}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value === "public"}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "public" : "private");
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default BenefitFormAdditionalFields;
