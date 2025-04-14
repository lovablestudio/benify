
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Users, BarChart3, DollarSign, LogOut, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyLogo from "./CompanyLogo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type NavItem = {
  label: string;
  labelAr: string;
  icon: React.ReactNode;
  href: string;
};

const EmployerSidebar = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const { user, handleLogout } = useAuth();
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCompanyName = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .rpc('get_user_profile', { user_id: user.id });
          
        if (error) {
          console.error("Error fetching company name:", error);
          return;
        }
        
        setCompanyName(data.company);
      } catch (error) {
        console.error("Error in company name fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanyName();
  }, [user]);
  
  const navItems: NavItem[] = [
    {
      label: "People",
      labelAr: "الأشخاص",
      icon: <Users className="w-5 h-5" />,
      href: "/employer-dashboard",
    },
    {
      label: "Benefits",
      labelAr: "المزايا",
      icon: <Heart className="w-5 h-5" />,
      href: "/employer-dashboard/benefits",
    },
    {
      label: "Insights",
      labelAr: "الرؤى",
      icon: <BarChart3 className="w-5 h-5" />,
      href: "/employer-dashboard/insights",
    },
    {
      label: "Finance",
      labelAr: "المالية",
      icon: <DollarSign className="w-5 h-5" />,
      href: "/employer-dashboard/finance",
    },
    {
      label: "Insurance",
      labelAr: "التأمين",
      icon: <Shield className="w-5 h-5" />,
      href: "/employer-dashboard/insurance",
    },
  ];

  const onLogout = async () => {
    try {
      await handleLogout();
      toast({
        title: language === 'ar' ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
        description: language === 'ar' 
          ? "تم تسجيل خروجك من النظام" 
          : "You have been logged out of the system",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: language === 'ar' ? "خطأ في تسجيل الخروج" : "Logout Error",
        description: language === 'ar' 
          ? "حدث خطأ أثناء تسجيل الخروج" 
          : "There was an error logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-64 h-screen bg-[#0E292C] text-white flex flex-col">
      <div className="p-6">
        {loading ? (
          <Skeleton className="h-8 w-40 bg-gray-700" />
        ) : (
          <h1 className="text-2xl font-bold text-white">
            {companyName || "Company"}
          </h1>
        )}
      </div>
      
      <div className="p-4 flex items-center gap-2 border-b border-gray-700">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {user && (
            <CompanyLogo 
              userId={user.id}
              fullName={user.email || companyName || "Company"}
              logoUrl={user.user_metadata?.company_logo_url}
            />
          )}
        </div>
        <div className="ml-2">
          <p className="text-sm text-white font-medium truncate max-w-[120px]">
            {user?.email}
          </p>
          <p className="text-xs text-gray-400">
            {language === 'ar' ? 'صاحب عمل' : 'Employer'}
          </p>
        </div>
        <div className="ml-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onLogout}
            className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">
              {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </span>
          </Button>
        </div>
      </div>
      
      <nav className="mt-6 flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#1A3B3F] transition-colors",
                  location.pathname === item.href && "bg-[#1A3B3F]"
                )}
              >
                {item.icon}
                <span>{language === "ar" ? item.labelAr : item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default EmployerSidebar;
