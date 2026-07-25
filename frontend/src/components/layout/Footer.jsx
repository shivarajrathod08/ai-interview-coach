import { APP_NAME } from "../../constants/appConstants";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
      © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
    </footer>
  );
};

export default Footer;
