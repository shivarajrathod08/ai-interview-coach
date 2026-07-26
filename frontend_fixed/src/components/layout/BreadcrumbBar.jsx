import { Link } from "react-router-dom";

const BreadcrumbBar = ({ items = [] }) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-slate-400">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-primary-500">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-ink-light dark:text-ink-dark" : ""}>{item.label}</span>
            )}
            {!isLast && <span>/</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadcrumbBar;
