import { FieldErrors, FieldValues } from "react-hook-form";

export function getFormErrorMessage<T extends FieldValues>(
  errors: FieldErrors<T>,
  key: keyof T
) {
  return errors[key] ? String(errors[key]?.message) : null;
}
