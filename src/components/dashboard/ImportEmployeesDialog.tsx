
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Info, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import useEmployerDashboard from "@/hooks/useEmployerDashboard";

interface ImportEmployeesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CrmType = "excel" | "csv" | "bamboohr" | "workday" | "zoho" | "paycom";

const ImportEmployeesDialog = ({ open, onOpenChange }: ImportEmployeesDialogProps) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const { profile } = useEmployerDashboard(user?.id, null);
  
  const [activeTab, setActiveTab] = useState<"file" | "api">("file");
  const [selectedCrm, setSelectedCrm] = useState<CrmType | "">("");
  const [apiKey, setApiKey] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [includeBalances, setIncludeBalances] = useState(true);
  const [step, setStep] = useState<1 | 2>(1);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const resetDialog = () => {
    setFile(null);
    setApiKey("");
    setSelectedCrm("");
    setStep(1);
    setActiveTab("file");
    setIsSubmitting(false);
  };
  
  const handleClose = () => {
    resetDialog();
    onOpenChange(false);
  };
  
  const handleContinue = () => {
    if (activeTab === "file" && !file) {
      toast({
        title: language === 'ar' ? "ملف مطلوب" : "File Required",
        description: language === 'ar' ? "الرجاء تحميل ملف أولاً." : "Please upload a file first.",
        variant: "destructive",
      });
      return;
    }
    
    if (activeTab === "api" && (!selectedCrm || !apiKey)) {
      toast({
        title: language === 'ar' ? "معلومات مطلوبة" : "Information Required",
        description: language === 'ar' ? "الرجاء تحديد نظام إدارة الموارد البشرية وإدخال مفتاح API." : "Please select an HR system and enter an API key.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(2);
  };
  
  const handleImport = async () => {
    if (!profile?.company) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "لم يتم العثور على معلومات الشركة." : "Company information not found.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would process the file or make API calls here
      // For now, we'll just simulate a delay and show a success message
      
      setTimeout(() => {
        toast({
          title: language === 'ar' ? "تم الاستيراد بنجاح" : "Import Successful",
          description: language === 'ar' 
            ? "تم استيراد بيانات الموظفين بنجاح. قد يستغرق ظهور التغييرات بضع دقائق." 
            : "Employee data has been successfully imported. Changes may take a few minutes to appear.",
        });
        
        handleClose();
        setIsSubmitting(false);
        
        // In a real implementation, we would refresh the employee list here
        window.location.reload(); // Simple reload for demonstration
      }, 2000);
      
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: language === 'ar' ? "فشل الاستيراد" : "Import Failed",
        description: language === 'ar' 
          ? "حدث خطأ أثناء استيراد بيانات الموظفين. الرجاء المحاولة مرة أخرى." 
          : "An error occurred while importing employee data. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'استيراد الموظفين' : 'Import Employees'}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? 'استيراد بيانات الموظفين من نظام إدارة الموارد البشرية أو ملف.' 
              : 'Import employee data from your HR system or a file.'}
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 && (
          <>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "file" | "api")} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">
                  <FileText className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'ملف' : 'File Upload'}
                </TabsTrigger>
                <TabsTrigger value="api">
                  <Info className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'نظام إدارة الموارد البشرية' : 'HR System'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="file" className="space-y-4 mt-4">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-4">
                    {language === 'ar' 
                      ? 'اسحب وأفلت ملف Excel أو CSV هنا، أو انقر للتصفح' 
                      : 'Drag and drop an Excel or CSV file here, or click to browse'}
                  </p>
                  <Input 
                    type="file" 
                    accept=".csv,.xlsx,.xls" 
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>
                        {language === 'ar' ? 'تصفح الملفات' : 'Browse Files'}
                      </span>
                    </Button>
                  </label>
                  {file && (
                    <p className="text-sm text-green-600 mt-4">
                      {language === 'ar' ? 'تم اختيار:' : 'Selected:'} {file.name}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-balances" 
                    checked={includeBalances} 
                    onCheckedChange={(checked) => setIncludeBalances(checked as boolean)}
                  />
                  <Label htmlFor="include-balances">
                    {language === 'ar' 
                      ? 'استيراد أرصدة الموظفين إذا كانت متوفرة' 
                      : 'Import employee balances if available'}
                  </Label>
                </div>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="crm-select">
                      {language === 'ar' ? 'اختر نظام إدارة الموارد البشرية' : 'Select HR System'}
                    </Label>
                    <Select value={selectedCrm} onValueChange={(value) => setSelectedCrm(value as CrmType)}>
                      <SelectTrigger id="crm-select">
                        <SelectValue placeholder={language === 'ar' ? 'اختر نظاماً' : 'Select a system'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bamboohr">BambooHR</SelectItem>
                        <SelectItem value="workday">Workday</SelectItem>
                        <SelectItem value="zoho">Zoho People</SelectItem>
                        <SelectItem value="paycom">Paycom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">
                      {language === 'ar' ? 'مفتاح API' : 'API Key'}
                    </Label>
                    <Input 
                      id="api-key" 
                      type="password" 
                      placeholder={language === 'ar' ? 'أدخل مفتاح API الخاص بك' : 'Enter your API key'} 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-balances-api" 
                      checked={includeBalances} 
                      onCheckedChange={(checked) => setIncludeBalances(checked as boolean)}
                    />
                    <Label htmlFor="include-balances-api">
                      {language === 'ar' 
                        ? 'استيراد أرصدة الموظفين إذا كانت متوفرة' 
                        : 'Import employee balances if available'}
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleContinue}>
                {language === 'ar' ? 'متابعة' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        )}
        
        {step === 2 && (
          <>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                <h3 className="font-semibold mb-2 text-amber-800">
                  {language === 'ar' ? 'معلومات مهمة' : 'Important Information'}
                </h3>
                <p className="text-sm">
                  {language === 'ar'
                    ? 'سيتم استيراد بيانات الموظفين إلى شركتك. هذه العملية:'
                    : 'Employee data will be imported to your company. This process:'}
                </p>
                <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                  <li>
                    {language === 'ar'
                      ? 'ستضيف موظفين جدد إلى نظامك'
                      : 'Will add new employees to your system'}
                  </li>
                  <li>
                    {language === 'ar'
                      ? 'لن تحذف أي موظفين حاليين'
                      : 'Will not delete any existing employees'}
                  </li>
                  <li>
                    {language === 'ar'
                      ? 'ستحدث معلومات الموظفين الموجودين بالفعل'
                      : 'Will update information for existing employees'}
                  </li>
                  {includeBalances && (
                    <li>
                      {language === 'ar'
                        ? 'ستستورد الأرصدة المتاحة'
                        : 'Will import available balances'}
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">
                  {language === 'ar' ? 'تفاصيل الاستيراد' : 'Import Details'}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">
                    {language === 'ar' ? 'طريقة الاستيراد:' : 'Import Method:'}
                  </div>
                  <div>
                    {activeTab === "file" 
                      ? (language === 'ar' ? 'ملف' : 'File Upload') 
                      : (language === 'ar' ? 'نظام إدارة الموارد البشرية' : 'HR System')}
                  </div>
                  
                  {activeTab === "file" && file && (
                    <>
                      <div className="text-gray-500">
                        {language === 'ar' ? 'الملف:' : 'File:'}
                      </div>
                      <div>{file.name}</div>
                    </>
                  )}
                  
                  {activeTab === "api" && selectedCrm && (
                    <>
                      <div className="text-gray-500">
                        {language === 'ar' ? 'نظام:' : 'System:'}
                      </div>
                      <div>{selectedCrm}</div>
                    </>
                  )}
                  
                  <div className="text-gray-500">
                    {language === 'ar' ? 'الشركة:' : 'Company:'}
                  </div>
                  <div>{profile?.company || '-'}</div>
                  
                  <div className="text-gray-500">
                    {language === 'ar' ? 'استيراد الأرصدة:' : 'Import Balances:'}
                  </div>
                  <div>
                    {includeBalances 
                      ? (language === 'ar' ? 'نعم' : 'Yes') 
                      : (language === 'ar' ? 'لا' : 'No')}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>
                {language === 'ar' ? 'رجوع' : 'Back'}
              </Button>
              <Button onClick={handleImport} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    {language === 'ar' ? 'جارٍ الاستيراد...' : 'Importing...'}
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    {language === 'ar' ? 'استيراد الموظفين' : 'Import Employees'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImportEmployeesDialog;
