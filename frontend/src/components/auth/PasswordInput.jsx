import { useState } from "react";
import { Input } from "../common";

const PasswordInput = ({ label = "Password", name = "password", error, ...rest }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        label={label}
        name={name}
        type={isVisible ? "text" : "password"}
        error={error}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setIsVisible((prev) => !prev)}
        className="absolute right-3 top-[2.15rem] text-xs font-medium text-primary-500 hover:text-primary-600"
      >
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default PasswordInput;
