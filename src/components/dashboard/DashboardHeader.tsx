
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardHeaderProps {
  onLogout: () => void;
}

const DashboardHeader = ({ onLogout }: DashboardHeaderProps) => {
  const { language } = useLanguage();
  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </h1>
        <Button onClick={onLogout}>
          {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
