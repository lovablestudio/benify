
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Benefit } from "@/components/dashboard/BenefitCard";

// Define form validation schema
export const benefitSchema = z.object({
  name: z.string().min(3, { message: "Benefit name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(3, { message: "Category must be at least 3 characters" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  icon_name: z.string().default("gift"),
  visibility: z.enum(["public", "private"]).default("private"),
});

export type BenefitFormValues = z.infer<typeof benefitSchema>;

export const useBenefitForm = (
  onSubmit: (benefit: Omit<Benefit, 'id'>) => Promise<boolean>,
  onOpenChange: (open: boolean) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BenefitFormValues>({
    resolver: zodResolver(benefitSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      icon_name: "gift",
      visibility: "private",
    }
  });

  const handleSubmit = async (values: BenefitFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Make sure all required properties are included
      const newBenefit: Omit<Benefit, 'id'> = {
        name: values.name,
        description: values.description,
        category: values.category,
        price: values.price,
        icon_name: values.icon_name,
        visibility: values.visibility,
        status: "active"
      };
      
      console.log("Submitting new benefit:", newBenefit);
      
      const success = await onSubmit(newBenefit);
      if (success) {
        form.reset();
        toast({
          title: "Success",
          description: "Benefit created successfully",
        });
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to create benefit",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    handleSubmit: form.handleSubmit(handleSubmit)
  };
};
