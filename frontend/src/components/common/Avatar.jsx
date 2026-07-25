const getInitials = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};

const Avatar = ({ name, size = "md" }) => {
  const sizeClasses = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary-500 font-display font-semibold text-white ${sizeClasses}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
