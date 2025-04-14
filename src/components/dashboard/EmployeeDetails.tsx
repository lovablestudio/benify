
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface EmployeeDetailsProps {
  fullName?: string | null;
  email?: string;
  position?: string;
  department?: string;
  salary?: number;
  joiningDate?: string;
  loading?: boolean;
}

const EmployeeDetails = ({
  fullName = "",
  email = "",
  position = "Employee",
  department = "General",
  salary = 0,
  joiningDate = "",
  loading = false
}: EmployeeDetailsProps) => {
  const { language } = useLanguage();
  
  if (loading) {
    return (
      <Card className="shadow-sm border rounded-xl overflow-hidden">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card className="shadow-sm border rounded-xl overflow-hidden">
      <CardHeader className="bg-gray-50 border-b pb-4">
        <CardTitle className="text-xl font-medium text-gray-800">
          {language === 'ar' ? 'تفاصيل الموظف' : 'Employee Details'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-gray-600 bg-gray-50/50 w-1/3">
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </TableCell>
              <TableCell>{fullName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-gray-600 bg-gray-50/50">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </TableCell>
              <TableCell className="font-mono text-sm">{email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-gray-600 bg-gray-50/50">
                {language === 'ar' ? 'المنصب' : 'Position'}
              </TableCell>
              <TableCell>{position}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-gray-600 bg-gray-50/50">
                {language === 'ar' ? 'القسم' : 'Department'}
              </TableCell>
              <TableCell>{department}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-gray-600 bg-gray-50/50">
                {language === 'ar' ? 'الراتب' : 'Salary'}
              </TableCell>
              <TableCell className="font-semibold">{formatCurrency(salary)}</TableCell>
            </TableRow>
            {joiningDate && (
              <TableRow>
                <TableCell className="font-medium text-gray-600 bg-gray-50/50">
                  {language === 'ar' ? 'تاريخ الانضمام' : 'Joining Date'}
                </TableCell>
                <TableCell>{formatDate(joiningDate)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
