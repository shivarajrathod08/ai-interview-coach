import { useCallback, useState } from "react";

export const useForm = (initialValues = {}, validate = () => ({})) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(
    (onSubmit) => async (event) => {
      if (event && event.preventDefault) event.preventDefault();
      const validationErrors = validate(values) || {};
      setErrors(validationErrors);
      const hasErrors = Object.values(validationErrors).some(Boolean);
      if (hasErrors) return;

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate]
  );

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    setErrors,
  };
};
