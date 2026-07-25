import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { TOAST_DURATION_MS, TOAST_TYPES } from "../constants/appConstants";

export const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const showToast = useCallback(
    (message, type = TOAST_TYPES.INFO) => {
      idCounter += 1;
      const id = idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = setTimeout(() => dismissToast(id), TOAST_DURATION_MS);
      return id;
    },
    [dismissToast]
  );

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      dismissToast,
      success: (message) => showToast(message, TOAST_TYPES.SUCCESS),
      error: (message) => showToast(message, TOAST_TYPES.ERROR),
      info: (message) => showToast(message, TOAST_TYPES.INFO),
      warning: (message) => showToast(message, TOAST_TYPES.WARNING),
    }),
    [toasts, showToast, dismissToast]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
