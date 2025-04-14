
import { Skeleton } from "@/components/ui/skeleton";
import BenefitsCard from "@/components/dashboard/BenefitsCard";
import AllowanceInfo from "@/components/dashboard/AllowanceInfo";
import BenefitsList from "@/components/dashboard/BenefitsList";
import EmployeeDetails from "@/components/dashboard/EmployeeDetails";
import { useLanguage } from "@/contexts/LanguageContext";
import { Benefit } from "@/components/dashboard/BenefitCard";

interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
  company?: string;
  position?: string;
  department?: string;
  salary?: number;
  joining_date?: string;
  company_logo_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface Allowance {
  current_amount: number;
  monthly_renewal_amount: number;
  next_renewal_date: string;
}

interface DashboardContentProps {
  user: any;
  profile: Profile | null;
  allowance: Allowance | null;
  benefits: Benefit[];
  benefitsLoading: boolean;
  allowanceLoading: boolean;
  onBenefitPurchase: (benefitId: string) => void;
  onAllowanceUpdate: (allowance: Allowance) => void;
  onProfileLogoUpdate: (url: string) => void;
}

const DashboardContent = ({
  user,
  profile,
  allowance,
  benefits,
  benefitsLoading,
  allowanceLoading,
  onBenefitPurchase,
  onAllowanceUpdate,
  onProfileLogoUpdate
}: DashboardContentProps) => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-gray-50 p-4 rounded-2xl shadow-sm">
          <BenefitsCard 
            fullName={profile?.full_name || user?.email?.split('@')[0] || 'Employee'}
            userId={user?.id || ''}
            logoUrl={profile?.company_logo_url}
            onLogoUpdated={onProfileLogoUpdate}
            balance={allowance?.current_amount || null}
          />
        </div>
        <EmployeeDetails
          fullName={profile?.full_name || user?.email}
          email={profile?.email}
          position={profile?.position}
          department={profile?.department}
          salary={profile?.salary}
          joiningDate={profile?.joining_date}
          loading={false}
        />
      </div>
      
      <div className="lg:col-span-2 space-y-8">
        {allowanceLoading ? (
          <Skeleton className="h-32 w-full rounded-xl" />
        ) : allowance ? (
          <AllowanceInfo 
            currentAmount={allowance.current_amount} 
            monthlyAmount={allowance.monthly_renewal_amount}
            nextRenewalDate={new Date(allowance.next_renewal_date)}
          />
        ) : (
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border">
            <p className="text-gray-500">
              {language === 'ar' 
                ? 'لا توجد معلومات بدل متاحة حاليًا.' 
                : 'No allowance information available at the moment.'}
            </p>
          </div>
        )}
        
        {benefitsLoading ? (
          <Skeleton className="h-64 w-full rounded-xl" />
        ) : benefits.length > 0 ? (
          <BenefitsList 
            benefits={benefits} 
            allowance={allowance?.current_amount || null}
            onPurchase={onBenefitPurchase}
          />
        ) : (
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border">
            <p className="text-gray-500">
              {language === 'ar' 
                ? 'لا توجد مزايا متاحة حاليًا. يرجى التحقق لاحقًا.' 
                : 'No benefits available at the moment. Please check back later.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
