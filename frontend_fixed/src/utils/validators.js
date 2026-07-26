export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  return String(value).trim().length > 0;
};

export const isValidEmail = (value) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(String(value).trim());
};

export const isStrongPassword = (value) => {
  return typeof value === "string" && value.length >= 8;
};

export const minLength = (value, length) => {
  return typeof value === "string" && value.trim().length >= length;
};

export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};
