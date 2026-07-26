import { Link } from "react-router-dom";

const AuthFooterLinks = ({ prompt, linkLabel, to }) => {
  return (
    <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
      {prompt}{" "}
      <Link to={to} className="font-medium text-primary-500 hover:text-primary-600">
        {linkLabel}
      </Link>
    </p>
  );
};

export default AuthFooterLinks;
