
import { useEffect, useRef } from "react";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  
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

    const elements = footerRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="reveal-on-scroll">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-brand-500 rounded-md"></div>
              <span className="text-xl font-bold">Benify</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transforming employee benefits with flexible spending solutions that put your team in control.
            </p>
          </div>
          
          <div className="reveal-on-scroll">
            <h3 className="text-lg font-medium mb-5">Company</h3>
            <ul className="space-y-3">
              {["About", "Careers", "Blog", "Press", "Partners"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="reveal-on-scroll">
            <h3 className="text-lg font-medium mb-5">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Stay up to date with the latest features and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800 text-white border-0 rounded-l-md focus:ring-2 focus:ring-brand-500 focus:outline-none flex-grow"
              />
              <button className="bg-brand-500 px-4 rounded-r-md hover:bg-brand-600 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500" />
                <a href="mailto:info@ben-ify.com" className="text-gray-400 hover:text-white transition-colors">
                  info@ben-ify.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500" />
                <a href="tel:+966408905709" className="text-gray-400 hover:text-white transition-colors">
                  +966 40 890 5709
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 reveal-on-scroll">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Benify. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Cookies Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
