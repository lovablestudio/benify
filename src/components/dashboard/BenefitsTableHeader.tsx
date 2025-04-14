
import { useLanguage } from "@/contexts/LanguageContext";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BenefitsTableHeader = () => {
  const { language } = useLanguage();

  return (
    <TableHeader>
      <TableRow>
        <TableHead>{language === 'ar' ? 'اسم الميزة' : 'Benefit Name'}</TableHead>
        <TableHead>{language === 'ar' ? 'الفئة' : 'Category'}</TableHead>
        <TableHead className="text-right">{language === 'ar' ? 'السعر' : 'Price'}</TableHead>
        <TableHead className="w-24">{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
        <TableHead className="w-24">{language === 'ar' ? 'الرؤية' : 'Visibility'}</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BenefitsTableHeader;
