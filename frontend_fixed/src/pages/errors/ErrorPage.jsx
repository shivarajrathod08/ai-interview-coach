import { Link } from "react-router-dom";
import { Button } from "../../components/common";
import { ROUTES } from "../../constants/routes";

const ErrorPage = ({ message }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-light dark:bg-surface-dark px-4 text-center">
      <span className="font-display text-6xl font-bold text-accent-danger">500</span>
      <h1 className="font-display text-xl font-semibold text-ink-light dark:text-ink-dark">
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {message || "An unexpected error occurred. Please try again."}
      </p>
      <Link to={ROUTES.DASHBOARD}>
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
