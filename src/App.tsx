
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import EmployerAuth from "./pages/EmployerAuth";
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import EmployerBenefitsPage from "./pages/EmployerBenefitsPage";
import EmployerInsightsPage from "./pages/EmployerInsightsPage";
import EmployerFinancePage from "./pages/EmployerFinancePage";
import EmployerInsurancePage from "./pages/EmployerInsurancePage";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/employer-auth" element={<EmployerAuth />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/employer-dashboard" element={
              <ProtectedRoute requireRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/employer-dashboard/employee/:id" element={
              <ProtectedRoute requireRole="employer">
                <EmployeeDetailsPage />
              </ProtectedRoute>
            } />
            <Route path="/employer-dashboard/benefits" element={
              <ProtectedRoute requireRole="employer">
                <EmployerBenefitsPage />
              </ProtectedRoute>
            } />
            <Route path="/employer-dashboard/insights" element={
              <ProtectedRoute requireRole="employer">
                <EmployerInsightsPage />
              </ProtectedRoute>
            } />
            <Route path="/employer-dashboard/finance" element={
              <ProtectedRoute requireRole="employer">
                <EmployerFinancePage />
              </ProtectedRoute>
            } />
            <Route path="/employer-dashboard/insurance" element={
              <ProtectedRoute requireRole="employer">
                <EmployerInsurancePage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
