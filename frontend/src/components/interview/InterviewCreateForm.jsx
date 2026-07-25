import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useToast } from "../../hooks/useToast";
import { Input, Select, TextArea, Button } from "../common";
import { isRequired } from "../../utils/validators";
import * as interviewApi from "../../api/interviewApi";
import { buildInterviewSessionRoute } from "../../constants/routes";
import { MESSAGES } from "../../constants/messages";
import { parseApiError } from "../../utils/errorHandler";

const EXPERIENCE_OPTIONS = [
  { value: "ENTRY", label: "Entry level" },
  { value: "MID", label: "Mid level" },
  { value: "SENIOR", label: "Senior" },
  { value: "LEAD", label: "Lead / Staff" },
];

const validate = (values) => ({
  title: !isRequired(values.title) ? MESSAGES.VALIDATION_REQUIRED : undefined,
  role: !isRequired(values.role) ? MESSAGES.VALIDATION_REQUIRED : undefined,
});

const InterviewCreateForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { title: "", role: "", experienceLevel: "MID", focusAreas: "" },
    validate
  );

  const onSubmit = async (formValues) => {
    try {
      const payload = {
        title: formValues.title,
        role: formValues.role,
        experienceLevel: formValues.experienceLevel,
        focusAreas: formValues.focusAreas,
      };
      const created = await interviewApi.createInterview(payload);
      toast.success(MESSAGES.INTERVIEW_CREATED);
      navigate(buildInterviewSessionRoute(created.id));
    } catch (error) {
      const { message } = parseApiError(error);
      toast.error(message || MESSAGES.INTERVIEW_CREATE_FAILED);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <Input
        label="Interview title"
        name="title"
        placeholder="e.g. Backend Engineer Mock Round"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Input
        label="Target role"
        name="role"
        placeholder="e.g. Java Backend Developer"
        value={values.role}
        onChange={handleChange}
        error={errors.role}
      />
      <Select
        label="Experience level"
        name="experienceLevel"
        options={EXPERIENCE_OPTIONS}
        value={values.experienceLevel}
        onChange={handleChange}
      />
      <TextArea
        label="Focus areas (optional)"
        name="focusAreas"
        placeholder="e.g. System design, Spring Security, PostgreSQL performance"
        value={values.focusAreas}
        onChange={handleChange}
        rows={3}
      />
      <Button type="submit" isLoading={isSubmitting} fullWidth>
        Create interview
      </Button>
    </form>
  );
};

export default InterviewCreateForm;
