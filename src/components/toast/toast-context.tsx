import { ToastState } from "@react-stately/toast";
import { createContext } from "react";

export const ToastContext = createContext<
  | {
      state: Omit<ToastState<React.ReactNode>, "add"> & {
        add: (
          content: React.ReactNode,
          options: { timeout?: number; type: "danger" | "success" }
        ) => void;
      };
    }
  | undefined
>(undefined);
