
import { Benefit } from "@/components/dashboard/BenefitCard";
import { Table } from "@/components/ui/table";
import BenefitsTableHeader from "./BenefitsTableHeader";
import BenefitsTableBody from "./BenefitsTableBody";
import BenefitsTableSkeleton from "./BenefitsTableSkeleton";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface BenefitsTableProps {
  benefits: Benefit[] | undefined;
  isLoading: boolean;
  onVisibilityChange: (benefitId: string, visibility: string) => Promise<void>;
  onDelete?: (benefitId: string) => Promise<boolean>;
}

const BenefitsTable = ({ benefits, isLoading, onVisibilityChange, onDelete }: BenefitsTableProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!benefits && !isLoading) {
      toast({
        title: "Error loading benefits",
        description: "There was an issue loading the benefits. This may be due to permission issues.",
        variant: "destructive",
      });
    }
  }, [benefits, isLoading, toast]);

  if (isLoading) {
    return <BenefitsTableSkeleton />;
  }

  // If benefits is undefined but we're not loading, show an error state
  if (!benefits) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-2">Failed to load benefits</p>
        <p className="text-sm text-muted-foreground">
          There was a problem loading the benefits. Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <BenefitsTableHeader />
      <BenefitsTableBody 
        benefits={benefits} 
        onVisibilityChange={onVisibilityChange} 
        onDelete={onDelete}
      />
    </Table>
  );
};

export default BenefitsTable;
