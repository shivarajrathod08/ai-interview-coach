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
  { value: "ENTRY", label: "Entry level" },
  { value: "MID", label: "Mid level" },
  { value: "SENIOR", label: "Senior" },
  { value: "LEAD", label: "Lead / Staff" },
];

const INTERVIEW_TYPE_OPTIONS = [
  { value: "TECHNICAL", label: "Technical" },
  { value: "BEHAVIORAL", label: "Behavioral" },
  { value: "SYSTEM_DESIGN", label: "System design" },
  { value: "MIXED", label: "Mixed" },
];

const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 20;

const validate = (values) => {
  const count = Number(values.numberOfQuestions);
  return {
    jobRole: !isRequired(values.jobRole) ? MESSAGES.VALIDATION_REQUIRED : undefined,
    experienceLevel: !isRequired(values.experienceLevel) ? MESSAGES.VALIDATION_REQUIRED : undefined,
    interviewType: !isRequired(values.interviewType) ? MESSAGES.VALIDATION_REQUIRED : undefined,
    numberOfQuestions:
      !Number.isInteger(count) || count < MIN_QUESTIONS || count > MAX_QUESTIONS
        ? `Must be between ${MIN_QUESTIONS} and ${MAX_QUESTIONS}`
        : undefined,
  };
};

const InterviewCreateForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { jobRole: "", experienceLevel: "MID", interviewType: "TECHNICAL", numberOfQuestions: 5 },
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
        label="Target role"
        name="jobRole"
        placeholder="e.g. Java Backend Developer"
        value={values.jobRole}
        onChange={handleChange}
        error={errors.jobRole}
      />
      <Select
        label="Experience level"
        name="experienceLevel"
        options={EXPERIENCE_OPTIONS}
        value={values.experienceLevel}
        onChange={handleChange}
        error={errors.experienceLevel}
      />
      <Select
        label="Interview type"
        name="interviewType"
        options={INTERVIEW_TYPE_OPTIONS}
        value={values.interviewType}
        onChange={handleChange}
        error={errors.interviewType}
      />
      <Input
        label="Number of questions"
        name="numberOfQuestions"
        type="number"
        min={MIN_QUESTIONS}
        max={MAX_QUESTIONS}
        value={values.numberOfQuestions}
        onChange={handleChange}
        error={errors.numberOfQuestions}
      />
      <Button type="submit" isLoading={isSubmitting} fullWidth>
        Create interview
      </Button>
    </form>
  );
};

export default InterviewCreateForm;
