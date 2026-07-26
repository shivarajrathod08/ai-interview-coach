import { InterviewProvider } from "../../context/InterviewContext";
import InterviewSessionPage from "./InterviewSessionPage";

const InterviewSessionPageWrapper = () => {
  return (
    <InterviewProvider>
      <InterviewSessionPage />
    </InterviewProvider>
  );
};

export default InterviewSessionPageWrapper;
