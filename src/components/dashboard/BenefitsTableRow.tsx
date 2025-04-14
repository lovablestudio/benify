
import { useLanguage } from "@/contexts/LanguageContext";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Benefit } from "@/components/dashboard/BenefitCard";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatCurrency } from "@/utils/benefitsUtils";
import { useState } from "react";

interface BenefitsTableRowProps {
  benefit: Benefit;
  onVisibilityChange: (benefitId: string, visibility: string) => Promise<void>;
  onDelete?: (benefitId: string) => Promise<boolean>;
}

const BenefitsTableRow = ({ 
  benefit, 
  onVisibilityChange,
  onDelete 
}: BenefitsTableRowProps) => {
  const { language } = useLanguage();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(benefit.id);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const isPublic = benefit.visibility === 'public';
  
  return (
    <TableRow key={benefit.id}>
      <TableCell className="font-medium">{benefit.name}</TableCell>
      <TableCell>{benefit.category}</TableCell>
      <TableCell>{formatCurrency(benefit.price, language)}</TableCell>
      <TableCell>
        <Badge 
          variant={isPublic ? "default" : "secondary"}
          className={isPublic ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {isPublic 
            ? (language === 'ar' ? 'مرئية' : 'Visible') 
            : (language === 'ar' ? 'مخفية' : 'Hidden')}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVisibilityChange(
              benefit.id, 
              isPublic ? 'private' : 'public'
            )}
          >
            {isPublic ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {language === 'ar' ? 'تأكيد الحذف' : 'Confirm Deletion'}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {language === 'ar' 
                      ? `هل أنت متأكد من رغبتك في حذف "${benefit.name}"؟ هذا الإجراء لا يمكن التراجع عنه.` 
                      : `Are you sure you want to delete "${benefit.name}"? This action cannot be undone.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {isDeleting 
                      ? (language === 'ar' ? 'جارٍ الحذف...' : 'Deleting...') 
                      : (language === 'ar' ? 'حذف' : 'Delete')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BenefitsTableRow;
