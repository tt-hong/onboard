export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select = ({ children, ...props }: SelectProps) => {
  return (
    <select
      className="h-10 border border-gray-200 flex w-full rounded-md bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      {...props}
    >
      {children}
    </select>
  );
};
