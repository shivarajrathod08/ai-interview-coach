import { AuthCard, LoginForm, AuthFooterLinks } from "../../components/auth";
import { ROUTES } from "../../constants/routes";

const LoginPage = () => {
  return (
    <>
      <AuthCard title="Sign in" subtitle="Pick up your interview prep where you left off.">
        <LoginForm />
      </AuthCard>
      <AuthFooterLinks
        prompt="New here?"
        linkLabel="Create an account"
        to={ROUTES.REGISTER}
      />
    </>
  );
};

export default LoginPage;
