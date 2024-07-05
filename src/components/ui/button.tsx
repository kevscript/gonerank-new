import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  style = {},
  variant = "primary",
  ...restProps
}: ButtonProps) => {
  const variantStyles = {
    primary: "bg-blue-700 text-white hover:bg-blue-800",
    secondary: "bg-gray-200 text-blue-800 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 rounded transition-colors duration-300 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${variantStyles[variant]} ${className}`}
      style={style}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
