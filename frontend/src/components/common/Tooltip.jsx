const Tooltip = ({ children, label }) => {
    return (
        <span className="group relative inline-flex">
            {children}
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink-light dark:bg-slate-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {label}
            </span>
        </span>
    );
};

export default Tooltip;
