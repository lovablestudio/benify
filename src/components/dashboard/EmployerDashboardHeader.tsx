
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmployerDashboardHeaderProps {
  title: string;
}

const EmployerDashboardHeader = ({ title }: EmployerDashboardHeaderProps) => {
  const { language } = useLanguage();

  return (
    <header className="bg-white py-6 px-8 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {title}
        </h1>
        <div className="flex gap-4">
          <Button variant="default" className="bg-[#0E292C] hover:bg-[#1A3B3F]">
            {language === 'ar' ? 'إضافة رصيد' : 'Add Money'}
          </Button>
          <Button variant="outline">
            {language === 'ar' ? 'خصم مبلغ' : 'Deduct Money'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default EmployerDashboardHeader;
