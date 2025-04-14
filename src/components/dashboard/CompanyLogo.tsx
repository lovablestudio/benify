
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CompanyLogoProps {
  userId: string;
  fullName: string;
  logoUrl?: string | null;
  onLogoUpdated?: (url: string) => void;
}

const CompanyLogo = ({ userId, fullName, logoUrl, onLogoUpdated }: CompanyLogoProps) => {
  const { language } = useLanguage();
  
  // Get initials for the avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Avatar className="h-full w-full border-2 border-white/30">
      <AvatarFallback className="bg-brand-700 text-white">
        {getInitials(fullName)}
      </AvatarFallback>
      <AvatarImage src={logoUrl || ""} alt={fullName} />
    </Avatar>
  );
};

export default CompanyLogo;
