import { Card } from "../common";

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <Card className="shadow-elevated">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-ink-light dark:text-ink-dark">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </Card>
  );
};

export default AuthCard;
