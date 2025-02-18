import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const buttonStyles = tv({
  base: "inline-flex border border-transparent items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 cursor-pointer",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary:
        "border border-gray-300 bg-transparent text-base hover:bg-gray-50",
      danger: "bg-danger text-danger-foreground hover:bg-danger/90",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export const Button = ({
  children,
  className,
  type = "button",
  variant = "primary",
  isLoading,
  disabled = isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      data-loading={isLoading ? "true" : undefined}
      {...props}
      className={twMerge(
        buttonStyles({ variant }),
        "data-[loading=true]:opacity-75 data-[loading=true]:cursor-wait data-[loading=true]:pointer-events-auto",
        className
      )}
      type={type}
      disabled={disabled}
    >
      {children}
      {isLoading && (
        <svg
          className="mr-3 ml-1 size-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  );
};
