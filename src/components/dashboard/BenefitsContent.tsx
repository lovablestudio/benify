
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import BenefitsTable from "./BenefitsTable";
import BenefitCreateDialog from "./BenefitCreateDialog";
import { useBenefits } from "@/hooks/useBenefits";
import { useToast } from "@/components/ui/use-toast";
import useEmployerDashboard from "@/hooks/useEmployerDashboard";
import { useAuth } from "@/hooks/useAuth";

const BenefitsContent = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Get employer's company info
  const { profile } = useEmployerDashboard(user?.id, null);
  const companyId = profile?.company || null;
  
  const { 
    benefits, 
    benefitsLoading, 
    benefitsError, 
    updateBenefitVisibility, 
    createBenefit,
    deleteBenefit
  } = useBenefits(true, companyId);

  useEffect(() => {
    if (benefitsError) {
      console.error("Benefits error in component:", benefitsError);
      toast({
        title: "Error loading benefits",
        description: "There was an issue accessing benefits. Please check your connection and permissions.",
        variant: "destructive",
      });
    }
  }, [benefitsError, toast]);

  const handleRefresh = () => {
    window.location.reload();
  };

  // Create a wrapper that matches the expected type
  const handleVisibilityChange = async (benefitId: string, visibility: string): Promise<void> => {
    await updateBenefitVisibility(benefitId, visibility);
  };

  const handleCreateBenefit = async (benefit: Omit<any, 'id'>) => {
    // Add company ID to the benefit if available
    if (companyId) {
      benefit.company_id = companyId;
    }
    return createBenefit(benefit);
  };

  return (
    <main className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {language === 'ar' ? 'المزايا المتاحة' : 'Available Benefits'}
          {companyId && <span className="ml-2 text-sm text-muted-foreground">
            ({language === 'ar' ? 'شركة:' : 'Company:'} {profile?.company})
          </span>}
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleRefresh}
            className="mr-2"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'تحديث' : 'Refresh'}
          </Button>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-[#0E292C] hover:bg-[#1A3B3F]"
          >
            <Plus className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إضافة ميزة جديدة' : 'Add New Benefit'}
          </Button>
        </div>
      </div>
      
      <Card className="border-none shadow-md bg-white">
        <CardContent className="p-0">
          <BenefitsTable 
            benefits={benefits} 
            isLoading={benefitsLoading}
            onVisibilityChange={handleVisibilityChange}
            onDelete={deleteBenefit}
          />
        </CardContent>
      </Card>

      <BenefitCreateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateBenefit}
      />
    </main>
  );
};

export default BenefitsContent;
