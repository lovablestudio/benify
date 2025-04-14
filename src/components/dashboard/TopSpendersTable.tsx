
import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowUpDown, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TopSpenderData, SpendingTimeframe } from "./types/employee-spending-types";
import { getInitials } from "./utils/employee-spending-utils";

interface TopSpendersTableProps {
  data: TopSpenderData[];
  timeframe: SpendingTimeframe;
}

const TopSpendersTable = ({ data, timeframe }: TopSpendersTableProps) => {
  const { language } = useLanguage();

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">{language === 'ar' ? 'الموظف' : 'Employee'}</TableHead>
            <TableHead>{language === 'ar' ? 'القسم' : 'Department'}</TableHead>
            <TableHead>
              <Button variant="ghost" className="font-medium flex gap-1 items-center p-0 h-auto">
                {language === 'ar' ? 'المبلغ المنفق' : 'Amount Spent'}
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>{language === 'ar' ? 'نسبة البدل' : '% of Allowance'}</TableHead>
            <TableHead>{language === 'ar' ? 'اتجاه' : 'Trend'}</TableHead>
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
              <TableCell className="font-medium">${row.amount}</TableCell>
              <TableCell>{row.percentOfAllowance}%</TableCell>
              <TableCell>
                {row.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopSpendersTable;
