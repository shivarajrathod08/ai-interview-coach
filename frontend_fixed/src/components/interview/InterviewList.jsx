import InterviewCard from "./InterviewCard";
import { EmptyState, Button } from "../common";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const InterviewList = ({ interviews = [] }) => {
  const navigate = useNavigate();

  if (interviews.length === 0) {
    return (
      <EmptyState
        title="No interviews match your filters"
        description="Try adjusting your search, or start a brand new mock interview."
        action={<Button onClick={() => navigate(ROUTES.INTERVIEW_NEW)}>New interview</Button>}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {interviews.map((interview) => (
        <InterviewCard key={interview.id} interview={interview} />
      ))}
    </div>
  );
};

export default InterviewList;
