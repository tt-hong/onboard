import { twMerge } from "tailwind-merge";

export const IconButton = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className={twMerge(
        "p-2 text-[20px] rounded-[8px] hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-gray-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
