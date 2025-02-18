import { twMerge } from "tailwind-merge";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isMultiline?: boolean;
  };

export const Input = ({
  className,
  isMultiline,

  ...inputProps
}: InputProps) => {
  const inputClassName =
    "border border-gray-200 flex h-10 w-full rounded-md bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

  const Component = isMultiline ? "textarea" : "input";

  return (
    <Component
      {...inputProps}
      className={twMerge(
        inputClassName,
        isMultiline && "resize-none h-auto",
        className
      )}
    />
  );
};
