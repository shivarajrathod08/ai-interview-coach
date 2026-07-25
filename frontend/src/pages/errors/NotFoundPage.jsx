import { Link } from "react-router-dom";
import { Button } from "../../components/common";
import { ROUTES } from "../../constants/routes";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-light dark:bg-surface-dark px-4 text-center">
      <span className="font-display text-6xl font-bold text-primary-500">404</span>
      <h1 className="font-display text-xl font-semibold text-ink-light dark:text-ink-dark">
        This page doesn't exist
      </h1>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for may have moved or never existed.
      </p>
      <Link to={ROUTES.DASHBOARD}>
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
