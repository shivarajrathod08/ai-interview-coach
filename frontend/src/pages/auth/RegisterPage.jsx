import { AuthCard, RegisterForm, AuthFooterLinks } from "../../components/auth";
import { ROUTES } from "../../constants/routes";

const RegisterPage = () => {
  return (
    <>
      <AuthCard title="Create your account" subtitle="Start practicing interviews with AI feedback.">
        <RegisterForm />
      </AuthCard>
      <AuthFooterLinks prompt="Already have an account?" linkLabel="Sign in" to={ROUTES.LOGIN} />
    </>
  );
};

export default RegisterPage;
