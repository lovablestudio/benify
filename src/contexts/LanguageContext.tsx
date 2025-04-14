
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage, default to English
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage === "ar" ? "ar" : "en";
  });

  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("language", language);
    
    // Load appropriate translation file based on language
    const loadTranslations = async () => {
      const translationsModule = 
        language === "en" 
          ? await import("../translations/en.json") 
          : await import("../translations/ar.json");
      
      setTranslations(translationsModule.default);
      
      // Set document direction based on language
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    };

    loadTranslations();
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
