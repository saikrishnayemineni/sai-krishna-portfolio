import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-zinc-100 text-zinc-950 hover:bg-white",
  secondary: "border border-zinc-800 bg-zinc-900/50 text-zinc-200 hover:bg-zinc-800/70",
  ghost: "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`focus-ring rounded-xl px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
