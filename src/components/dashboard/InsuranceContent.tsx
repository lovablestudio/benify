import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Users, DollarSign } from "lucide-react";

const InsuranceContent = () => {
  const { language } = useLanguage();

  // Mock data for insurance policy details
  const insurancePolicy = {
    provider: "Global Health Insurance",
    policyNumber: "GHI-123456789",
    coveragePeriod: "January 1, 2025 - December 31, 2025",
    yearlyPremium: 120000,
    employeesCovered: 48,
    costPerEmployee: 2500,
    renewalDate: "December 31, 2025",
  };

  // Mock data for insurance benefits
  const insuranceBenefits = [
    { 
      category: "Medical", 
      coverageLimit: "$1,000,000", 
      description: "Comprehensive medical coverage including hospitalization, surgeries, and doctor consultations",
      included: true 
    },
    { 
      category: "Dental", 
      coverageLimit: "$5,000/year", 
      description: "Dental check-ups, fillings, root canals, and major dental procedures",
      included: true 
    },
    { 
      category: "Vision", 
      coverageLimit: "$1,000/year", 
      description: "Eye examinations, prescription glasses, and contact lenses",
      included: true 
    },
    { 
      category: "Mental Health", 
      coverageLimit: "$3,000/year", 
      description: "Psychotherapy, counseling sessions, and psychiatric consultations",
      included: true 
    },
    { 
      category: "Maternity", 
      coverageLimit: "$10,000/pregnancy", 
      description: "Prenatal care, delivery, and postnatal care",
      included: true 
    },
    { 
      category: "Life Insurance", 
      coverageLimit: "3x Annual Salary", 
      description: "Life insurance coverage in case of employee's death",
      included: true 
    },
    { 
      category: "Disability", 
      coverageLimit: "60% of salary", 
      description: "Short-term and long-term disability benefits",
      included: true 
    },
    { 
      category: "Wellness Programs", 
      coverageLimit: "$500/year", 
      description: "Gym memberships, wellness classes, and health screenings",
      included: false 
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              {language === 'ar' ? 'إجمالي قسط التأمين' : 'Total Premium'}
            </CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${insurancePolicy.yearlyPremium.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'ar' ? 'سنوياً' : 'per year'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              {language === 'ar' ? 'الموظفين المشمولين' : 'Employees Covered'}
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insurancePolicy.employeesCovered}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'ar' 
                ? `${insurancePolicy.costPerEmployee.toLocaleString()} $ لكل موظف` 
                : `$${insurancePolicy.costPerEmployee.toLocaleString()} per employee`}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              {language === 'ar' ? 'تاريخ التجديد' : 'Renewal Date'}
            </CardTitle>
            <Shield className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insurancePolicy.renewalDate}</div>
            <p className="text-xs text-muted-foreground">
              {language === 'ar' ? 'المتبقي: 45 يوم' : 'Remaining: 45 days'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Policy Details */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'تفاصيل بوليصة التأمين' : 'Insurance Policy Details'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' 
              ? 'المعلومات الحالية عن خطة التأمين الخاصة بشركتك' 
              : 'Current information about your company insurance plan'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'مزود التأمين' : 'Insurance Provider'}
              </p>
              <p>{insurancePolicy.provider}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'رقم البوليصة' : 'Policy Number'}
              </p>
              <p>{insurancePolicy.policyNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'فترة التغطية' : 'Coverage Period'}
              </p>
              <p>{insurancePolicy.coveragePeriod}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'القسط السنوي' : 'Yearly Premium'}
              </p>
              <p>${insurancePolicy.yearlyPremium.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coverage Details */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'تفاصيل التغطية التأمينية' : 'Coverage Details'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' 
              ? 'المزايا المشمولة في خطة تأمين الموظفين الخاصة بك' 
              : 'Benefits included in your employee insurance plan'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </TableHead>
                <TableHead>
                  {language === 'ar' ? 'حد التغطية' : 'Coverage Limit'}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {language === 'ar' ? 'الوصف' : 'Description'}
                </TableHead>
                <TableHead className="text-right">
                  {language === 'ar' ? 'مشمول' : 'Included'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insuranceBenefits.map((benefit, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{benefit.category}</TableCell>
                  <TableCell>{benefit.coverageLimit}</TableCell>
                  <TableCell className="hidden md:table-cell">{benefit.description}</TableCell>
                  <TableCell className="text-right">
                    {benefit.included ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        {language === 'ar' ? 'نعم' : 'Yes'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                        {language === 'ar' ? 'لا' : 'No'}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceContent;
