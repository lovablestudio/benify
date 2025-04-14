
import { useLanguage } from "@/contexts/LanguageContext";
import { Benefit } from "@/components/dashboard/BenefitCard";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import BenefitsTableRow from "./BenefitsTableRow";

interface BenefitsTableBodyProps {
  benefits: Benefit[] | undefined;
  onVisibilityChange: (benefitId: string, visibility: string) => Promise<void>;
  onDelete?: (benefitId: string) => Promise<boolean>;
}

const BenefitsTableBody = ({ benefits, onVisibilityChange, onDelete }: BenefitsTableBodyProps) => {
  const { language } = useLanguage();

  if (!benefits || benefits.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
            {language === 'ar' 
              ? 'لا توجد مزايا متاحة. أضف مزايا جديدة لبدء العرض للموظفين.' 
              : 'No benefits available. Add new benefits to start offering to employees.'}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {benefits.map((benefit) => (
        <BenefitsTableRow 
          key={benefit.id}
          benefit={benefit} 
          onVisibilityChange={onVisibilityChange}
          onDelete={onDelete}
        />
      ))}
    </TableBody>
  );
};

export default BenefitsTableBody;
