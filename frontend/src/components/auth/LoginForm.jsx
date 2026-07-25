import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { Input, Button } from "../common";
import PasswordInput from "./PasswordInput";
import { isRequired, isValidEmail } from "../../utils/validators";
import { MESSAGES } from "../../constants/messages";
import { ROUTES } from "../../constants/routes";
import { parseApiError } from "../../utils/errorHandler";

const validate = (values) => ({
  email: !isRequired(values.email)
    ? MESSAGES.VALIDATION_REQUIRED
    : !isValidEmail(values.email)
    ? MESSAGES.VALIDATION_EMAIL
    : undefined,
  password: !isRequired(values.password) ? MESSAGES.VALIDATION_REQUIRED : undefined,
});

const LoginForm = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { values, errors, isSubmitting, handleChange, handleSubmit, setErrors } = useForm(
    { email: "", password: "" },
    validate
  );

  const onSubmit = async (formValues) => {
    try {
      await login(formValues);
      toast.success(MESSAGES.LOGIN_SUCCESS);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const { message } = parseApiError(error);
      setErrors({ form: message || MESSAGES.LOGIN_FAILED });
      toast.error(message || MESSAGES.LOGIN_FAILED);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />
      <PasswordInput
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
      />
      {errors.form && <p className="text-sm text-accent-danger">{errors.form}</p>}
      <Button type="submit" isLoading={isSubmitting} fullWidth>
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
