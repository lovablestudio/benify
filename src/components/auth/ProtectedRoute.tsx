
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: "employer" | "employee";
}

const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { loading, user, userRole } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      console.log("Protected route: No user found, will redirect to auth");
    }
  }, [loading, user]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    console.log("Protected route: Redirecting to auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check for role-specific access
  if (requireRole && userRole !== requireRole) {
    console.log(`Protected route: User has role ${userRole}, but ${requireRole} is required`);
    
    // If employer tries to access employee dashboard
    if (requireRole === "employee" && userRole === "employer") {
      return <Navigate to="/employer-dashboard" replace />;
    }
    
    // If employee tries to access employer dashboard
    if (requireRole === "employer" && userRole !== "employer") {
      return <Navigate to="/dashboard" replace />;
    }
    
    // Default fallback
    return <Navigate to="/auth" replace />;
  }

  // Render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
