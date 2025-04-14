
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForms } from "@/components/auth/AuthForms";

const EmployerAuth = () => {
  return (
    <AuthCard role="employer">
      <AuthForms role="employer" />
    </AuthCard>
  );
};

export default EmployerAuth;

