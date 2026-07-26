import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import {
  IconsDashboard,
  IconsInterview,
} from "../../assets";

const NAV_ITEMS = [
  {
    to: ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: IconsDashboard,
  },
  {
    to: ROUTES.INTERVIEWS,
    label: "Interviews",
    icon: IconsInterview,
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Navigation
          </p>

          <nav className="mt-6 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary-500 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100 hover:text-primary-600 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={item.icon}
                      alt=""
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isActive ? "scale-110 brightness-0 invert" : ""
                      }`}
                    />

                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;