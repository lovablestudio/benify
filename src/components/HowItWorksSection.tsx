import React, { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const HowItWorksSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    stepsRef.current = stepsRef.current.slice(0, 4);
  }, []);

  useEffect(() => {
    const fetchPartnerLogos = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .storage
          .from('company_logos')
          .list();
        
        if (error) {
          console.error('Error fetching partner logos:', error);
          return;
        }
        
        if (data && data.length > 0) {
          const logoUrls = data.map(file => {
            const { data: urlData } = supabase
              .storage
              .from('company_logos')
              .getPublicUrl(file.name);
            return urlData.publicUrl;
          });
          setPartnerLogos(logoUrls);
        } else {
          const defaultLogo = "/lovable-uploads/ff281426-ee2d-427e-855b-d1846b808715.png";
          setPartnerLogos([defaultLogo]);
        }
      } catch (error) {
        console.error('Error in fetching logos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerLogos();
  }, []);

  return (
    <section id="how-it-works" className="py-16 md:py-24 overflow-hidden" ref={sectionRef}>
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16 max-w-xl mx-auto">
          <Badge variant="outline" className="mb-2 bg-brand-50 text-brand-700 border-brand-200">
            {t("how_it_works_heading")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("how_it_works_title")}</h2>
          <p className="text-muted-foreground text-lg">
            {t("how_it_works_description")}
          </p>
        </div>

        <div className="relative timeline-container">
          <div className="space-y-16">
            <div 
              ref={el => stepsRef.current[0] = el} 
              className="reveal-on-scroll"
            >
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-semibold mr-4">
                  01
                </div>
                <h3 className="text-2xl font-bold">{t("step_1_title")}</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                {t("step_1_description")}
              </p>
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                <div className="flex items-start">
                  <div className="min-w-6 mt-1">
                    <Check size={18} className="text-brand-500" />
                  </div>
                  <p className="text-sm text-gray-600 ml-2">
                    {t("step_1_bullet_1")}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    {t("benefits_budget")}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t("junior_employees")}</span>
                        <span className="font-medium">SAR 250 {t("per_month")}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-brand-500 rounded-full w-1/3"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t("mid_level")}</span>
                        <span className="font-medium">SAR 400 {t("per_month")}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-brand-500 rounded-full w-2/4"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t("senior_leadership")}</span>
                        <span className="font-medium">SAR 750 {t("per_month")}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-brand-500 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              ref={el => stepsRef.current[1] = el} 
              className="reveal-on-scroll"
            >
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-semibold mr-4">
                  02
                </div>
                <h3 className="text-2xl font-bold">{t("step_2_title")}</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                {t("step_2_description")}
              </p>
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 min-h-[300px]">
                <div className="flex items-start">
                  <div className="min-w-6 mt-1">
                    <Check size={18} className="text-brand-500" />
                  </div>
                  <p className="text-sm text-gray-600 ml-2">
                    {t("step_2_bullet_1")}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    {t("benefit_categories")}
                  </h4>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded p-3 text-center text-xs sm:text-sm">
                      {t("wellness")}
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-center text-xs sm:text-sm">
                      {t("learning")}
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-center text-xs sm:text-sm">
                      {t("family_care")}
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-center text-xs sm:text-sm">
                      {t("remote_work")}
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-center text-xs sm:text-sm">
                      {t("mental_health")}
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-center text-xs sm:text-sm">
                      {t("nutrition")}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col items-center border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-500 mb-2">{t("featured_partners")}</span>
                  {isLoading ? (
                    <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-3">
                      {partnerLogos.map((logo, index) => (
                        <img 
                          key={index}
                          src={logo} 
                          alt={`Partner Logo ${index + 1}`} 
                          className="h-5 object-contain"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div 
              ref={el => stepsRef.current[2] = el} 
              className="reveal-on-scroll"
            >
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-semibold mr-4">
                  03
                </div>
                <h3 className="text-2xl font-bold">{t("step_3_title")}</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                {t("step_3_description")}
              </p>
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                <div className="flex items-start">
                  <div className="min-w-6 mt-1">
                    <Check size={18} className="text-brand-500" />
                  </div>
                  <p className="text-sm text-gray-600 ml-2">
                    {t("step_3_bullet_1")}
                  </p>
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 text-white rounded-xl p-5 w-full max-w-[340px] shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-50"></div>
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-400 rounded-full opacity-50"></div>
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-600 rounded-full opacity-50"></div>
                    
                    <div className="relative">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-xs font-light opacity-70">{t("hero_employee_benefits")}</p>
                          <p className="text-lg font-bold">{t("hero_card_name")}</p>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="mb-1">
                          <p className="text-xs font-light opacity-70">{t("hero_cardholder_name")}</p>
                        </div>
                        <p className="text-base">ALEX MORGAN</p>
                      </div>
                      
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs font-light opacity-70">{t("hero_monthly_balance")}</p>
                          <p className="text-base">SAR 400</p>
                        </div>
                        <div>
                          <p className="text-xs font-light opacity-70">{t("hero_valid_thru")}</p>
                          <p className="text-base">09/25</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              ref={el => stepsRef.current[3] = el} 
              className="reveal-on-scroll"
            >
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-semibold mr-4">
                  04
                </div>
                <h3 className="text-2xl font-bold">{t("step_4_title")}</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                {t("step_4_description")}
              </p>
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                <div className="flex items-start">
                  <div className="min-w-6 mt-1">
                    <Check size={18} className="text-brand-500" />
                  </div>
                  <p className="text-sm text-gray-600 ml-2">
                    {t("step_4_bullet_1")}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    {t("recent_transactions")}
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{t("wellness_club")}</p>
                          <p className="text-xs text-gray-500">May 15, 2023</p>
                        </div>
                        <span className="font-semibold text-sm">-SAR 89.00</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{t("online_course")}</p>
                          <p className="text-xs text-gray-500">May 10, 2023</p>
                        </div>
                        <span className="font-semibold text-sm">-SAR 129.00</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{t("bookstore")}</p>
                          <p className="text-xs text-gray-500">May 3, 2023</p>
                        </div>
                        <span className="font-semibold text-sm">-SAR 42.50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
