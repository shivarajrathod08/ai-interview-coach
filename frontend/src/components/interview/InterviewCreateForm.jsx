import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useToast } from "../../hooks/useToast";
import { Input, Select, Button } from "../common";
import { isRequired } from "../../utils/validators";
import * as interviewApi from "../../api/interviewApi";
import { buildInterviewSessionRoute } from "../../constants/routes";
import { MESSAGES } from "../../constants/messages";
import { parseApiError } from "../../utils/errorHandler";

const EXPERIENCE_OPTIONS = [
  { value: "FRESHER", label: "Fresher" },
  { value: "JUNIOR", label: "Junior" },
  { value: "MID", label: "Mid Level" },
  { value: "SENIOR", label: "Senior" },
];

const INTERVIEW_TYPE_OPTIONS = [
  { value: "TECHNICAL", label: "Technical" },
  { value: "HR", label: "HR" },
  { value: "MIXED", label: "Mixed" },
];

const QUESTION_OPTIONS = [
  { value: 5, label: "5 Questions" },
  { value: 10, label: "10 Questions" },
  { value: 15, label: "15 Questions" },
  { value: 20, label: "20 Questions" },
];

const validate = (values) => ({
  jobRole: !isRequired(values.jobRole)
    ? MESSAGES.VALIDATION_REQUIRED
    : undefined,
});

const InterviewCreateForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm(
    {
      jobRole: "",
      experienceLevel: "FRESHER",
      interviewType: "TECHNICAL",
      numberOfQuestions: 5,
    },
    validate
  );

  const onSubmit = async (formValues) => {
    try {
      const payload = {
        jobRole: formValues.jobRole,
        experienceLevel: formValues.experienceLevel,
        interviewType: formValues.interviewType,
        numberOfQuestions: Number(formValues.numberOfQuestions),
      };
      console.log("Payload being sent:", payload);
      const created = await interviewApi.createInterview(payload);

      toast.success(MESSAGES.INTERVIEW_CREATED);

      navigate(buildInterviewSessionRoute(created.id));
    } catch (error) {
      const { message } = parseApiError(error);
      toast.error(message || MESSAGES.INTERVIEW_CREATE_FAILED);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <Input
        label="Job Role"
        name="jobRole"
        placeholder="e.g. Java Backend Developer"
        value={values.jobRole}
        onChange={handleChange}
        error={errors.jobRole}
      />

      <Select
        label="Experience Level"
        name="experienceLevel"
        options={EXPERIENCE_OPTIONS}
        value={values.experienceLevel}
        onChange={handleChange}
      />

      <Select
        label="Interview Type"
        name="interviewType"
        options={INTERVIEW_TYPE_OPTIONS}
        value={values.interviewType}
        onChange={handleChange}
      />

      <Select
        label="Number of Questions"
        name="numberOfQuestions"
        options={QUESTION_OPTIONS}
        value={values.numberOfQuestions}
        onChange={handleChange}
      />

      <Button
        type="submit"
        isLoading={isSubmitting}
        fullWidth
      >
        Create Interview
      </Button>
    </form>
  );
};

export default InterviewCreateForm;