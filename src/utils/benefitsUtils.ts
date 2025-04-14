
import { LucideIcon, Heart, Book, Dumbbell, Brain, Users, Laptop, Utensils, Tv, Train, Coffee, Gift, Briefcase, Music } from "lucide-react";
import { Benefit } from "@/components/dashboard/BenefitCard";

export const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    heart: Heart,
    book: Book,
    dumbbell: Dumbbell,
    brain: Brain,
    users: Users,
    laptop: Laptop,
    utensils: Utensils,
    tv: Tv,
    train: Train,
    coffee: Coffee,
    gift: Gift,
    briefcase: Briefcase,
    music: Music
  };
  
  return iconMap[iconName.toLowerCase()] || Heart;
};

export const formatCurrency = (amount: number, language: string) => {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const groupBenefitsByCategory = (benefits: Benefit[]) => {
  return benefits.reduce((acc, benefit) => {
    if (!acc[benefit.category]) {
      acc[benefit.category] = [];
    }
    acc[benefit.category].push(benefit);
    return acc;
  }, {} as Record<string, Benefit[]>);
};
