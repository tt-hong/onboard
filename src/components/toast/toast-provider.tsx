import { useToastState } from "@react-stately/toast";
import React, { useCallback } from "react";
import { ToastRegion } from "./toast";
import { ToastContext } from "./toast-context";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const state = useToastState<React.ReactNode>({
    maxVisibleToasts: 5,
    hasExitAnimation: true,
  });

  const handleCustomToast = useCallback(
    (
      content: React.ReactNode,
      options: { timeout?: number; type: "danger" | "success" }
    ) => {
      state.add(content, {
        timeout: options.timeout || 5000,
        type: options.type,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    },
    [state]
  );

  return (
    <ToastContext.Provider
      value={{
        state: {
          ...state,
          add: handleCustomToast,
        },
      }}
    >
      {children}
      {state.visibleToasts.length > 0 && <ToastRegion state={state} />}
    </ToastContext.Provider>
  );
}
