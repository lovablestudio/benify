
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface BenefitVisibilityToggleProps {
  visibility: string;
  onChange: (checked: boolean) => Promise<void>;
}

const BenefitVisibilityToggle = ({ visibility, onChange }: BenefitVisibilityToggleProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isChecked, setIsChecked] = useState(visibility === 'public');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleChange = async (checked: boolean) => {
    setIsUpdating(true);
    
    try {
      setIsChecked(checked); // Optimistically update UI
      await onChange(checked);
      // Success is handled by the parent component via the onChange function
    } catch (error) {
      // Revert to original state if there's an error
      setIsChecked(visibility === 'public');
      console.error("Failed to toggle visibility:", error);
      toast({
        title: "Toggle Error",
        description: "Failed to update benefit visibility.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="flex items-center justify-between">
      <Switch
        checked={isChecked}
        onCheckedChange={handleChange}
        disabled={isUpdating}
      />
      <span className="ml-2 text-xs text-muted-foreground">
        {isChecked ? 
          (language === 'ar' ? 'عام' : 'Public') : 
          (language === 'ar' ? 'خاص' : 'Private')}
      </span>
    </div>
  );
};

export default BenefitVisibilityToggle;
