
import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  date: z.date({
    required_error: "Please select a date for your call.",
  }),
  time: z.string({
    required_error: "Please select a time for your call.",
  }),
  message: z.string().optional(),
});

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

type BookCallDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const BookCallDialog = ({ open, onOpenChange }: BookCallDialogProps) => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Combine date and time
      const selectedDateTime = new Date(values.date);
      const [hours, minutes] = values.time.split(':').map(Number);
      selectedDateTime.setHours(hours, minutes);
      
      const { error } = await supabase.from("call_bookings").insert([
        {
          name: values.name,
          email: values.email,
          company: values.company,
          phone: values.phone,
          selected_date: selectedDateTime.toISOString(),
          message: values.message,
        },
      ]);

      if (error) throw error;

      toast({
        title: language === 'ar' ? "تم جدولة المكالمة بنجاح!" : "Call scheduled successfully!",
        description: language === 'ar' ? "سنرسل لك تأكيدًا عبر البريد الإلكتروني." : "We'll send you a confirmation email.",
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error booking call:", error);
      toast({
        variant: "destructive",
        title: language === 'ar' ? "حدث خطأ!" : "Something went wrong!",
        description: language === 'ar' ? "لم نتمكن من جدولة المكالمة. يرجى المحاولة مرة أخرى." : "We couldn't schedule your call. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable past dates
  const disabledDays = { before: new Date() };
  
  // Disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? "جدولة مكالمة مجانية" : "Schedule a Free Call"}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? "حدد تاريخًا ووقتًا مناسبين لك للتحدث مع أحد مستشارينا." 
              : "Choose a date and time that works for you to speak with one of our consultants."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? "الاسم" : "Name"}</FormLabel>
                    <FormControl>
                      <Input placeholder={language === 'ar' ? "محمد القحطاني" : "Mohammed Al-Qahtani"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? "البريد الإلكتروني" : "Email"}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? "الشركة" : "Company"}</FormLabel>
                    <FormControl>
                      <Input placeholder={language === 'ar' ? "شركة الرياض للتقنية" : "Riyadh Tech Company"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? "رقم الهاتف" : "Phone Number"}</FormLabel>
                    <FormControl>
                      <Input placeholder="+966 5X XXX XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{language === 'ar' ? "التاريخ" : "Date"}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{language === 'ar' ? "اختر تاريخًا" : "Pick a date"}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => isWeekend(date) || date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'ar' ? "الوقت" : "Time"}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'ar' ? "اختر وقتًا" : "Select a time"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time} {language === 'ar' ? '' : ''}
                            <Clock className="ml-2 h-4 w-4 inline-block" />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'ar' ? "الرسالة (اختياري)" : "Message (Optional)"}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={language === 'ar' 
                        ? "لدينا أسئلة حول كيفية تنفيذ البرنامج في شركتنا..." 
                        : "We have questions about implementing the program in our company..."
                      } 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting 
                  ? (language === 'ar' ? "جارٍ الحجز..." : "Booking...") 
                  : (language === 'ar' ? "جدولة المكالمة" : "Schedule Call")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookCallDialog;
