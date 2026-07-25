import { MESSAGES } from "../constants/messages";

export const parseApiError = (error) => {
  if (!error) {
    return { message: MESSAGES.GENERIC_ERROR, status: null, code: null };
  }

  if (error.response) {
    const { status, data } = error.response;
    const message =
      (data && (data.message || data.error || data.detail)) || MESSAGES.GENERIC_ERROR;
    return { message, status, code: data?.code || null };
  }

  if (error.request) {
    return { message: MESSAGES.NETWORK_ERROR, status: null, code: "NETWORK_ERROR" };
  }

  return { message: error.message || MESSAGES.GENERIC_ERROR, status: null, code: null };
};
