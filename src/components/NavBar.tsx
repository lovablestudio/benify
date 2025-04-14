
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If not on home page, navigate back to home with the section hash
  const getNavLink = (sectionId: string) => {
    return isHomePage ? `#${sectionId}` : `/#${sectionId}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-md"></div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-brand-700">
            Benify
          </span>
        </Link>

        <nav className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-8`}>
          <a
            href={getNavLink("features")}
            className="text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors"
          >
            {t("nav_features")}
          </a>
          <a
            href={getNavLink("how-it-works")}
            className="text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors"
          >
            {t("nav_how_it_works")}
          </a>
          <a
            href={getNavLink("testimonials")}
            className="text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors"
          >
            {t("nav_testimonials")}
          </a>
          <a
            href={getNavLink("contact")}
            className="text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors"
          >
            {t("nav_contact")}
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageToggle />
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              {t("nav_login")}
            </Button>
          </Link>
          <a href={getNavLink("contact")}>
            <Button size="sm">{t("nav_get_started")}</Button>
          </a>
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <LanguageToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href={getNavLink("features")}
              className="py-2 text-gray-700 hover:text-brand-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav_features")}
            </a>
            <a
              href={getNavLink("how-it-works")}
              className="py-2 text-gray-700 hover:text-brand-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav_how_it_works")}
            </a>
            <a
              href={getNavLink("testimonials")}
              className="py-2 text-gray-700 hover:text-brand-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav_testimonials")}
            </a>
            <a
              href={getNavLink("contact")}
              className="py-2 text-gray-700 hover:text-brand-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav_contact")}
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="justify-start w-full">
                  {t("nav_login")}
                </Button>
              </Link>
              <a href={getNavLink("contact")} onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">{t("nav_get_started")}</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
