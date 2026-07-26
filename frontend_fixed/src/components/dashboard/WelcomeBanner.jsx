import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const WelcomeBanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-display text-xl font-bold">Welcome back, {firstName}.</h2>
        <p className="mt-1 text-sm text-primary-100">
          Ready to sharpen your next answer? Start a fresh mock interview.
        </p>
      </div>
      <Button
        variant="secondary"
        className="!border-white/40 !text-white hover:!bg-white/10 shrink-0"
        onClick={() => navigate(ROUTES.INTERVIEW_NEW)}
      >
        Start new interview
      </Button>
    </div>
  );
};

export default WelcomeBanner;
