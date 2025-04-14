
import { useEffect, useRef } from "react";
import Button from "./Button";
import { ArrowRight, CreditCard, Music, Monitor, Dumbbell, Heart, Smartphone, Flag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "./ui/badge";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const elements = heroRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-transparent z-0"></div>
      
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-60 -left-40 w-96 h-96 bg-brand-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium text-brand-700 bg-brand-100 rounded-full reveal-on-scroll">
            {t("hero_tagline")}
          </span>
          
          <h1 className="mb-6 font-bold text-gray-900 reveal-on-scroll">
            {t("hero_title")}<br />
            <span className="text-brand-600">{t("hero_title_highlight")}</span>
          </h1>
          
          <p className="mb-6 text-lg md:text-xl text-gray-600 max-w-3xl reveal-on-scroll">
            {t("hero_description")}
          </p>
          
          <div className="mb-10 flex items-center justify-center gap-2 reveal-on-scroll">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium">
              <Flag className="w-4 h-4 text-green-600" />
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              {language === 'ar' ? "متوافق مع أنظمة المملكة العربية السعودية" : "Compliant with Saudi Arabia regulations"}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 reveal-on-scroll">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t("hero_get_started")} <ArrowRight className={`ml-2 w-4 h-4 ${language === 'ar' ? 'transform rotate-180' : ''}`} />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t("hero_how_it_works")}
            </Button>
          </div>
          
          <div className="mt-16 w-full max-w-5xl reveal-on-scroll relative">
            <div className="absolute -top-8 -left-2 sm:left-16 transform -rotate-6 bg-white p-2 sm:p-3 rounded-lg shadow-lg z-20 animate-float scale-75 sm:scale-100">
              <Music className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600" />
              <span className="text-xs font-medium block mt-1 text-center">{t("music")}</span>
            </div>
            
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 transform rotate-3 bg-white p-2 sm:p-3 rounded-lg shadow-lg z-20 animate-float-delay-1 scale-75 sm:scale-100">
              <div className="flex flex-col items-center">
                <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600" />
                <span className="text-xs font-medium block mt-1 text-center">{t("streaming")}</span>
              </div>
            </div>
            
            <div className="absolute -top-6 right-6 sm:right-36 transform rotate-6 bg-white p-2 sm:p-3 rounded-lg shadow-lg z-20 animate-float-delay-2 scale-75 sm:scale-100">
              <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600" />
              <span className="text-xs font-medium block mt-1 text-center">{t("fitness")}</span>
            </div>
            
            <div className="absolute -bottom-4 -right-0 sm:right-20 transform -rotate-3 bg-white p-2 sm:p-3 rounded-lg shadow-lg z-20 animate-float-delay-3 scale-75 sm:scale-100">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600" />
              <span className="text-xs font-medium block mt-1 text-center">{t("health")}</span>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 transform rotate-3 bg-white p-2 sm:p-3 rounded-lg shadow-lg z-20 animate-float-delay-1 hidden sm:block">
              <div className="flex flex-col items-center">
                <Smartphone className="w-8 h-8 text-brand-600" />
                <span className="text-xs font-medium block mt-1 text-center">{t("mobile")}</span>
              </div>
            </div>
            
            <div className={`relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-brand-200/50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-800/20 mix-blend-overlay"></div>
              <div className="absolute inset-0 glass rounded-xl border border-white/20">
                <div className="absolute top-0 left-0 right-0 h-8 bg-white/90 flex items-center px-4">
                  <div className="flex space-x-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-10 flex justify-center items-center h-full">
                  <div className="perspective-card transform rotate-6 scale-90 sm:scale-110 shadow-2xl">
                    <div className="relative h-44 sm:h-56 w-72 sm:w-96 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400"></div>
                      
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 right-0 h-full w-full">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div 
                              key={i}
                              className="absolute bg-white/30 rounded-full"
                              style={{
                                width: `${Math.random() * 80 + 30}px`,
                                height: `${Math.random() * 80 + 30}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.5,
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-light opacity-80">{language === 'ar' ? "مزايا الموظفين - المملكة العربية السعودية" : "EMPLOYEE BENEFITS - KSA"}</p>
                            <p className="text-lg font-medium mt-1">Benify Card</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-brand-700 rounded-full"></div>
                            </div>
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white/60 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex space-x-2 sm:space-x-4 font-mono text-sm sm:text-lg tracking-wider">
                            <span>4581</span>
                            <span>****</span>
                            <span>****</span>
                            <span>7895</span>
                          </div>
                          
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs opacity-80">{t("hero_cardholder_name")}</p>
                              <p className="text-xs sm:text-base font-medium">NOURA AL QAHTANI</p>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-xs opacity-80">{t("hero_monthly_balance")}</p>
                              <p className="text-xs sm:text-base font-semibold flex items-center justify-end">
                                <span className="mr-1">SAR</span>
                                250.00
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <CreditCard className="w-4 h-4 sm:w-6 sm:h-6 text-white/70" />
                            <p className="text-xs opacity-80">{t("hero_valid_thru")} 05/28</p>
                          </div>
                        </div>
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

export default HeroSection;
