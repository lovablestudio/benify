
import { useLanguage } from "@/contexts/LanguageContext";
import StatCard from "@/components/dashboard/StatCard";
import { formatCurrency } from "@/utils/benefitsUtils";

interface CompanyStats {
  currentBalance: number;
  assignedUsers: number;
  fundRequests: { count: number; status: 'active' | 'inactive' };
  reimbursements: { count: number; status: 'active' | 'inactive' };
  receipts: { count: number; status: 'active' | 'inactive' };
}

interface EmployerStatsSectionProps {
  companyStats: CompanyStats;
}

const EmployerStatsSection = ({ companyStats }: EmployerStatsSectionProps) => {
  const { language } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
        <StatCard 
          title={language === 'ar' ? 'الرصيد الحالي' : 'Current balance'}
          value={formatCurrency(companyStats.currentBalance, language)}
        />
        <StatCard 
          title={language === 'ar' ? 'المستخدمون المعينون' : 'Assigned users'}
          value={companyStats.assignedUsers}
        />
        <StatCard 
          title={language === 'ar' ? 'طلبات التمويل' : 'Fund requests'}
          value={companyStats.fundRequests.count}
          status={companyStats.fundRequests.status}
        />
        <StatCard 
          title={language === 'ar' ? 'المبالغ المستردة' : 'Reimbursements'}
          value={companyStats.reimbursements.count}
          status={companyStats.reimbursements.status}
        />
        <StatCard 
          title={language === 'ar' ? 'الإيصالات' : 'Receipts'}
          value={companyStats.receipts.count}
          status={companyStats.receipts.status}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
        <StatCard 
          title={language === 'ar' ? 'نوع التجديد' : 'Renewal type'}
          value={language === 'ar' ? 'شهري' : 'Monthly'}
        />
        <StatCard 
          title={language === 'ar' ? 'التجديد القادم' : 'Next renewal'}
          value="31 Mar 2024"
        />
        <StatCard 
          title={language === 'ar' ? 'مبلغ التجديد' : 'Renewal amount'}
          value="SAR 80"
        />
        <StatCard 
          title={language === 'ar' ? 'تاريخ انتهاء الرصيد' : 'Balance expires'}
          value={language === 'ar' ? 'نعم - 31 أبريل 2024' : 'Yes - 31 Apr 2024'}
        />
        <StatCard 
          title={language === 'ar' ? 'مبلغ الترحيل' : 'Rollover amount'}
          value={language === 'ar' ? 'غير محدود' : 'Unlimited'}
        />
      </div>
    </>
  );
};

export default EmployerStatsSection;
