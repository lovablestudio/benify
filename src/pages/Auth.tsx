
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForms } from "@/components/auth/AuthForms";

const Auth = () => {
  return (
    <AuthCard role="employee">
      <AuthForms role="employee" />
    </AuthCard>
  );
};

export default Auth;

