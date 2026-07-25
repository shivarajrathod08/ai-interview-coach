import { useNavigate } from "react-router-dom";
import { Card, Button } from "../common";
import { ROUTES } from "../../constants/routes";

const QuickActionPanel = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h3 className="font-display text-base font-semibold text-ink-light dark:text-ink-dark">
          Quick actions
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Jump straight into your next practice session.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={() => navigate(ROUTES.INTERVIEW_NEW)} fullWidth>
          New interview
        </Button>
        <Button variant="secondary" onClick={() => navigate(ROUTES.INTERVIEWS)} fullWidth>
          View all interviews
        </Button>
      </div>
    </Card>
  );
};

export default QuickActionPanel;
