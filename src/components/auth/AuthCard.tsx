
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

interface AuthCardProps {
  role: 'employee' | 'employer';
  children: React.ReactNode;
}

export function AuthCard({ role, children }: AuthCardProps) {
  const { language } = useLanguage();
  const isEmployee = role === 'employee';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {language === 'ar' 
              ? (isEmployee ? 'منصة مزايا الموظفين' : 'بوابة أصحاب العمل')
              : (isEmployee ? 'Employee Benefits Platform' : 'Employer Portal')}
          </CardTitle>
          <CardDescription className="text-center">
            {language === 'ar'
              ? (isEmployee ? 'قم بتسجيل الدخول أو إنشاء حساب جديد' : 'قم بتسجيل الدخول أو إنشاء حساب صاحب عمل جديد')
              : (isEmployee ? 'Sign in or create a new account' : 'Sign in or create a new employer account')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Link 
            to={isEmployee ? "/employer-auth" : "/auth"}
            className="text-sm text-brand-500 hover:text-brand-600 transition-colors"
          >
            {language === 'ar'
              ? (isEmployee ? 'هل أنت صاحب عمل؟ انقر هنا للتسجيل أو تسجيل الدخول' : 'هل أنت موظف؟ انقر هنا للتسجيل أو تسجيل الدخول')
              : (isEmployee ? 'Are you an employer? Click here to sign up or login' : 'Are you an employee? Click here to sign up or login')}
          </Link>
          <p className="text-sm text-gray-500">
            {language === 'ar' 
              ? 'منصة مزايا الموظفين © 2025' 
              : 'Employee Benefits Platform © 2025'}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

