import { Outlet } from "react-router-dom";
import { APP_NAME } from "../../constants/appConstants";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-light dark:bg-surface-dark px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="font-display text-2xl font-bold text-ink-light dark:text-ink-dark">
            {APP_NAME}
          </span>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Practice interviews. Sharpen your answers. Walk in ready.
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
