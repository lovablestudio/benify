
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data structure
type Employee = {
  id: string;
  full_name: string;
  department: string;
  position: string;
  salary: number;
  joining_date: string;
};

// Mock employee data
const mockEmployees: Employee[] = [
  {
    id: "1",
    full_name: "Mohammed Al-Qahtani",
    department: "Technology",
    position: "Software Engineer",
    salary: 15000,
    joining_date: "2022-03-15"
  },
  {
    id: "2",
    full_name: "Fatima Al-Saud",
    department: "Design",
    position: "UX Designer",
    salary: 14000,
    joining_date: "2021-11-10"
  },
  {
    id: "3",
    full_name: "Abdullah Al-Harbi",
    department: "Product",
    position: "Product Manager",
    salary: 18000,
    joining_date: "2022-01-05"
  },
  {
    id: "4",
    full_name: "Noura Al-Zahrani",
    department: "Marketing",
    position: "Marketing Specialist",
    salary: 13500,
    joining_date: "2022-04-20"
  },
  {
    id: "5",
    full_name: "Saad Al-Otaibi",
    department: "Data",
    position: "Data Analyst",
    salary: 16000,
    joining_date: "2021-10-01"
  },
  {
    id: "6",
    full_name: "Aisha Al-Ghamdi",
    department: "Human Resources",
    position: "HR Manager",
    salary: 17000,
    joining_date: "2021-08-15"
  },
  {
    id: "7",
    full_name: "Omar Al-Mutairi",
    department: "Technology",
    position: "Frontend Developer",
    salary: 15500,
    joining_date: "2022-02-10"
  },
  {
    id: "8",
    full_name: "Layla Al-Bashir",
    department: "Marketing",
    position: "Content Creator",
    salary: 13000,
    joining_date: "2022-05-12"
  },
  {
    id: "9",
    full_name: "Khalid Al-Dossary",
    department: "Technology",
    position: "Backend Developer",
    salary: 16500,
    joining_date: "2021-12-20"
  },
  {
    id: "10",
    full_name: "Hind Al-Sharif",
    department: "Finance",
    position: "Finance Analyst",
    salary: 14500,
    joining_date: "2022-01-25"
  }
];

const EmployeeSalaryTable = () => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  
  // Get unique departments for filter options
  const departments = useMemo(() => {
    const depts = mockEmployees.map(emp => emp.department);
    return Array.from(new Set(depts));
  }, []);
  
  // Filter employees based on search and department
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter(emp => {
      const matchesSearch = emp.full_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter;
      
      return matchesSearch && matchesDepartment;
    });
  }, [searchTerm, departmentFilter]);
  
  // Calculate total salary
  const totalSalary = useMemo(() => {
    return filteredEmployees.reduce((total, emp) => total + emp.salary, 0);
  }, [filteredEmployees]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={language === 'ar' ? "البحث عن موظف..." : "Search employees..."}
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? "كل الأقسام" : "All Departments"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === 'ar' ? "كل الأقسام" : "All Departments"}
              </SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'ar' ? "الموظف" : "Employee"}</TableHead>
              <TableHead>{language === 'ar' ? "القسم" : "Department"}</TableHead>
              <TableHead>{language === 'ar' ? "المنصب" : "Position"}</TableHead>
              <TableHead>{language === 'ar' ? "تاريخ التعيين" : "Joining Date"}</TableHead>
              <TableHead className="text-right">
                {language === 'ar' ? "الراتب" : "Salary"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.full_name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    {new Date(employee.joining_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${employee.salary.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {language === 'ar' ? "لا توجد نتائج" : "No results found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end p-4 border rounded-md bg-gray-50">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-gray-700" />
          <div>
            <p className="text-sm font-medium text-gray-500">
              {language === 'ar' ? "إجمالي الرواتب" : "Total Salaries"}
            </p>
            <p className="text-xl font-bold">${totalSalary.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalaryTable;
