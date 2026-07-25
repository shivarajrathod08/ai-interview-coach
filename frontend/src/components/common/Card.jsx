const Card = ({ children, className = "", padded = true, ...rest }) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-card ${
        padded ? "p-5 sm:p-6" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
