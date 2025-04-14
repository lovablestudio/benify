
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RecentTransactionData, SpendingTimeframe } from "./types/employee-spending-types";
import { getInitials, formatDate } from "./utils/employee-spending-utils";

interface RecentTransactionsTableProps {
  data: RecentTransactionData[];
  timeframe: SpendingTimeframe;
}

const RecentTransactionsTable = ({ data, timeframe }: RecentTransactionsTableProps) => {
  const { language } = useLanguage();

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">{language === 'ar' ? 'الموظف' : 'Employee'}</TableHead>
            <TableHead>{language === 'ar' ? 'القسم' : 'Department'}</TableHead>
            <TableHead>{language === 'ar' ? 'الوصف' : 'Description'}</TableHead>
            <TableHead>{language === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
            <TableHead>
              <Button variant="ghost" className="font-medium flex gap-1 items-center p-0 h-auto">
                {language === 'ar' ? 'المبلغ' : 'Amount'}
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#0E292C] text-white text-xs">
                    {getInitials(row.name)}
                  </AvatarFallback>
                </Avatar>
                <span>{row.name}</span>
              </TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{formatDate(row.date)}</TableCell>
              <TableCell className="font-medium">${row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentTransactionsTable;
