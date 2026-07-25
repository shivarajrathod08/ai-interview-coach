import { createContext, useCallback, useMemo, useState } from "react";

export const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startedAt] = useState(() => Date.now());

  const setAnswerForQuestion = useCallback((questionId, answerText) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerText }));
  }, []);

  const goToNextQuestion = useCallback((totalQuestions) => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  }, []);

  const goToPreviousQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const resetSession = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
  }, []);

  const value = useMemo(
    () => ({
      currentIndex,
      answers,
      startedAt,
      setAnswerForQuestion,
      goToNextQuestion,
      goToPreviousQuestion,
      resetSession,
    }),
    [currentIndex, answers, startedAt, setAnswerForQuestion, goToNextQuestion, goToPreviousQuestion, resetSession]
  );

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>;
};
