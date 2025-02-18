import React from "react";
import { Input, InputProps } from "../input";

export interface TextFieldProps {
  label: React.ReactNode;
  error?: React.ReactNode;
  inputProps?: InputProps;
}

export const TextField = ({ label, error, inputProps }: TextFieldProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label className="block mb-1">{label}</label>

        <Input {...inputProps} />
      </div>
      {error && <p className="mt-2 text-xs text-danger ">{error}</p>}
    </div>
  );
};
