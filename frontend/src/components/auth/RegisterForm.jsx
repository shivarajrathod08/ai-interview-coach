import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { Input, Button } from "../common";
import PasswordInput from "./PasswordInput";
import { isRequired, isValidEmail, isStrongPassword, passwordsMatch } from "../../utils/validators";
import { MESSAGES } from "../../constants/messages";
import { ROUTES } from "../../constants/routes";
import { parseApiError } from "../../utils/errorHandler";

const validate = (values) => ({
  name: !isRequired(values.name) ? MESSAGES.VALIDATION_REQUIRED : undefined,
  email: !isRequired(values.email)
    ? MESSAGES.VALIDATION_REQUIRED
    : !isValidEmail(values.email)
    ? MESSAGES.VALIDATION_EMAIL
    : undefined,
  password: !isRequired(values.password)
    ? MESSAGES.VALIDATION_REQUIRED
    : !isStrongPassword(values.password)
    ? MESSAGES.VALIDATION_PASSWORD
    : undefined,
  confirmPassword: !passwordsMatch(values.password, values.confirmPassword)
    ? "Passwords do not match."
    : undefined,
});

const RegisterForm = () => {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { values, errors, isSubmitting, handleChange, handleSubmit, setErrors } = useForm(
    { name: "", email: "", password: "", confirmPassword: "" },
    validate
  );

  const onSubmit = async (formValues) => {
    try {
      await register({
        fullName: formValues.name, // ✅ Changed from name to fullName
        email: formValues.email,
        password: formValues.password,
      });

      toast.success(MESSAGES.REGISTER_SUCCESS);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      const { message } = parseApiError(error);
      setErrors({ form: message || MESSAGES.REGISTER_FAILED });
      toast.error(message || MESSAGES.REGISTER_FAILED);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <Input
        label="Full name"
        name="name"
        placeholder="Jordan Lee"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="name"
      />
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
        autoComplete="new-password"
      />
      <PasswordInput
        label="Confirm password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        autoComplete="new-password"
      />
      {errors.form && <p className="text-sm text-accent-danger">{errors.form}</p>}
      <Button type="submit" isLoading={isSubmitting} fullWidth>
        Create account
      </Button>
    </form>
  );
};

export default RegisterForm;