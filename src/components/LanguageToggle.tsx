
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleLanguage = (e: React.MouseEvent, lang: "en" | "ar") => {
    e.stopPropagation();
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-sm font-medium rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={t("toggle_language")}
      >
        <Globe className="w-4 h-4" />
        <span>{language === "en" ? "EN" : "AR"}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 min-w-32 z-50">
          <button
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              language === "en" ? "font-medium bg-gray-50 dark:bg-gray-800" : ""
            }`}
            onClick={(e) => toggleLanguage(e, "en")}
          >
            English
          </button>
          <button
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              language === "ar" ? "font-medium bg-gray-50 dark:bg-gray-800" : ""
            }`}
            onClick={(e) => toggleLanguage(e, "ar")}
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
