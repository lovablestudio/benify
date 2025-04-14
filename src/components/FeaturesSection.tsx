
import { useEffect, useRef } from "react";
import { CreditCard, Briefcase, Users, Shield, Heart, Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const features = [
    {
      icon: CreditCard,
      title: t("feature_1_title"),
      description: t("feature_1_description")
    },
    {
      icon: Heart,
      title: t("feature_2_title"),
      description: t("feature_2_description")
    },
    {
      icon: Briefcase,
      title: t("feature_3_title"),
      description: t("feature_3_description")
    },
    {
      icon: Users,
      title: t("feature_4_title"),
      description: t("feature_4_description")
    },
    {
      icon: Shield,
      title: t("feature_5_title"),
      description: t("feature_5_description")
    },
    {
      icon: Gift,
      title: t("feature_6_title"),
      description: t("feature_6_description")
    }
  ];
  
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

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-12 md:py-20 bg-white"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-brand-700 bg-brand-100 rounded-full reveal-on-scroll">
            {t("features_heading")}
          </span>
          <h2 className="mb-6 text-gray-900 reveal-on-scroll">{t("features_title")}</h2>
          <p className="text-gray-600 reveal-on-scroll">
            {t("features_description")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 reveal-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
