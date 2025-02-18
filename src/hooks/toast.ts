import { ToastContext } from "@/components/toast";
import { useContext } from "react";

export function useToast() {
  const context = useContext(ToastContext);
  return context?.state;
}
