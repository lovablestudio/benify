
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthMode, loginSchema, employeeSignupSchema, employerSignupSchema, useAuthForm } from "@/hooks/useAuthForm";
import { useState } from "react";

interface AuthFormsProps {
  role: 'employee' | 'employer';
}

export function AuthForms({ role }: AuthFormsProps) {
  const { language } = useLanguage();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const { loading, error, handleLogin, handleSignup } = useAuthForm(role);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const signupForm = useForm({
    resolver: zodResolver(role === 'employee' ? employeeSignupSchema : employerSignupSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      ...(role === 'employer' && { companyName: "" })
    }
  });

  const onSignupSuccess = async (values: any) => {
    const success = await handleSignup(values);
    if (success) {
      setAuthMode("login");
    }
  };

  return (
    <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as AuthMode)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">
          {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
        </TabsTrigger>
        <TabsTrigger value="signup">
          {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'ar' ? 'كلمة المرور' : 'Password'}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading 
                ? (language === 'ar' ? 'جاري التحميل...' : 'Loading...') 
                : (language === 'ar' ? 'تسجيل الدخول' : 'Login')}
            </Button>
          </form>
        </Form>
      </TabsContent>
      
      <TabsContent value="signup">
        <Form {...signupForm}>
          <form onSubmit={signupForm.handleSubmit(onSignupSuccess)} className="space-y-4">
            <FormField
              control={signupForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {role === 'employer' && (
              <FormField
                control={signupForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? 'اسم الشركة' : 'Company Name'}</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'ar' ? 'كلمة المرور' : 'Password'}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading 
                ? (language === 'ar' ? 'جاري التحميل...' : 'Loading...') 
                : (language === 'ar' ? 'إنشاء حساب' : 'Sign Up')}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}

