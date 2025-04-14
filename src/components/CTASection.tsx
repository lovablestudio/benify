
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import BookCallDialog from "./BookCallDialog";
import { CalendarDays } from "lucide-react";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  phone: z.string().min(5, {
    message: "Phone number must be at least 5 characters.",
  }),
  message: z.string().optional(),
});

const CTASection = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("form_submissions").insert([
        {
          name: values.name,
          email: values.email,
          company: values.company,
          phone: values.phone,
          message: values.message,
        },
      ]);

      if (error) throw error;

      toast({
        title: language === 'ar' ? "تم إرسال النموذج بنجاح!" : "Form submitted successfully!",
        description: language === 'ar' ? "سنتواصل معك قريبًا." : "We'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: language === 'ar' ? "حدث خطأ!" : "Something went wrong!",
        description: language === 'ar' ? "لم نتمكن من إرسال النموذج. يرجى المحاولة مرة أخرى." : "We couldn't submit your form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {language === 'ar' ? "جاهز للانضمام إلى منصة مزايا الموظفين؟" : "Ready to get started with the Employee Benefits Platform?"}
            </h2>
            <p className="text-lg opacity-90">
              {language === 'ar'
                ? "تواصل معنا اليوم واكتشف كيف يمكننا مساعدة شركتك في تقديم مزايا استثنائية للموظفين."
                : "Contact us today and discover how we can help your company deliver exceptional employee benefits."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="secondary" size="lg" className="font-semibold">
                <a href="#features">
                  {language === 'ar' ? "تعرف على المزيد" : "Learn More"}
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-semibold bg-white text-primary hover:bg-white/90"
                onClick={() => setIsDialogOpen(true)}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {language === 'ar' ? "جدولة مكالمة مجانية" : "Schedule a Free Call"}
              </Button>
            </div>
          </div>

          <div className="bg-white text-foreground p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">
              {language === 'ar' ? "تواصل معنا" : "Contact Us"}
            </h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {language === 'ar' ? "الاسم" : "Name"}
                </label>
                <Input
                  id="name"
                  placeholder={language === 'ar' ? "محمد القحطاني" : "Mohammed Al-Qahtani"}
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {language === 'ar' ? "البريد الإلكتروني" : "Email"}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === 'ar' ? "mohammed@alriyadh.sa" : "mohammed@alriyadh.sa"}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  {language === 'ar' ? "الشركة" : "Company"}
                </label>
                <Input
                  id="company"
                  placeholder={language === 'ar' ? "شركة الرياض للتقنية" : "Riyadh Tech Company"}
                  {...form.register("company")}
                />
                {form.formState.errors.company && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.company.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  {language === 'ar' ? "رقم الهاتف" : "Phone Number"}
                </label>
                <Input
                  id="phone"
                  placeholder={language === 'ar' ? "+966 5X XXX XXXX" : "+966 5X XXX XXXX"}
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  {language === 'ar' ? "الرسالة (اختياري)" : "Message (Optional)"}
                </label>
                <Textarea
                  id="message"
                  placeholder={language === 'ar' ? "نحن مهتمون بتوفير بطاقات مزايا لموظفينا البالغ عددهم 100 موظف..." : "We're interested in providing benefit cards for our 100 employees..."}
                  {...form.register("message")}
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (language === 'ar' ? "جارٍ الإرسال..." : "Submitting...")
                  : (language === 'ar' ? "إرسال" : "Submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <BookCallDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
};

export default CTASection;
