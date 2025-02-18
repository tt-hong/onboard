import { AriaToastRegionProps, useToastRegion } from "@react-aria/toast";
import { ToastState } from "@react-stately/toast";
import React, { useEffect } from "react";
import type { AriaToastProps } from "@react-aria/toast";
import { useToast } from "@react-aria/toast";
import { tv } from "tailwind-variants";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
}

const toastStyles = tv({
  base: "border p-4 bg-blue-500 rounded-md shadow-md text-white",
  variants: {
    type: {
      default: "bg-blue-500",
      danger: "bg-red-500",
      success: "bg-green-500",
    },
  },
});

function Toast<T extends React.ReactNode>({ state, ...props }: ToastProps<T>) {
  const ref = React.useRef(null);
  const { toastProps, titleProps } = useToast(props, state, ref);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (props.toast.timeout && (props.toast.timer as any)?.remaining === 0) {
      state.remove(props.toast.key);
    }
  }, [props.toast, state]);

  const type =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((props.toast as any).type as "danger" | "success" | undefined) ||
    "default";

  return (
    <div {...toastProps} ref={ref} className={toastStyles({ type })}>
      <div {...titleProps}>{props.toast.content}</div>
    </div>
  );
}

export function ToastRegion<T extends React.ReactNode>({
  state,
  ...props
}: ToastRegionProps<T>) {
  const ref = React.useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);
  return (
    <div
      {...regionProps}
      ref={ref}
      className="fixed right-4 top-4 flex flex-col gap-2 z-50"
    >
      {state.visibleToasts.map((toast) => (
        <Toast state={state} key={toast.key} toast={toast} />
      ))}
    </div>
  );
}
