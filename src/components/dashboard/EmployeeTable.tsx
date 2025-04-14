
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow }
from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency } from "@/utils/benefitsUtils";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: string;
  full_name: string;
  department: string;
  balance_amount?: number;
  email?: string;
}

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Get department count for color categorization
  const departmentColors: Record<string, string> = {};
  const departments = [...new Set(employees.map(e => e.department))];
  const colorClasses = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800", 
    "bg-purple-100 text-purple-800",
    "bg-yellow-100 text-yellow-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
    "bg-red-100 text-red-800",
    "bg-orange-100 text-orange-800"
  ];
  
  departments.forEach((dept, index) => {
    departmentColors[dept] = colorClasses[index % colorClasses.length];
  });

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employer-dashboard/employee/${employeeId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              {language === 'ar' ? 'الموظف' : 'Employee'}
            </TableHead>
            <TableHead className="w-[180px]">
              {language === 'ar' ? 'القسم' : 'Department'}
            </TableHead>
            <TableHead className="w-[220px]">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </TableHead>
            <TableHead className="text-right">
              {language === 'ar' ? 'الرصيد الحالي' : 'Current balance'}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow 
                key={employee.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleEmployeeClick(employee.id)}
              >
                <TableCell className="font-medium">
                  {employee.full_name || 'Unknown'}
                </TableCell>
                <TableCell>
                  {employee.department && (
                    <Badge variant="outline" className={`${departmentColors[employee.department] || 'bg-gray-100'} border-0`}>
                      {employee.department}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {employee.email || '-'}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(employee.balance_amount || 0, language)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                {language === 'ar' ? 'لا يوجد موظفين' : 'No employees found'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
