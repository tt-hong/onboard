import {
  DialogProps,
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  ModalOverlay,
  ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const overlayStyles = tv({
  base: "fixed top-0 left-0 w-full h-full isolate z-20 bg-black/[15%] flex items-center justify-center p-4 text-center backdrop-filter backdrop-blur-sm",
  variants: {
    isEntering: {
      true: "animate-in fade-in duration-200 ease-out",
    },
    isExiting: {
      true: "animate-out fade-out duration-200 ease-in",
    },
  },
});

const modalStyles = tv({
  base: "w-full max-w-lg max-h-full rounded-2xl bg-white dark:bg-zinc-800/70 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas] text-left align-middle shadow-2xl bg-clip-padding border border-black/10 dark:border-white/10",
  variants: {
    isEntering: {
      true: "animate-in zoom-in-105 ease-out duration-200",
    },
    isExiting: {
      true: "animate-out zoom-out-95 ease-in duration-200",
    },
  },
});

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay {...props} className={overlayStyles}>
      <RACModal {...props} className={modalStyles} />
    </ModalOverlay>
  );
}

export function Dialog(props: DialogProps) {
  return (
    <Modal>
      <RACDialog
        {...props}
        className={twMerge(
          "outline-0 rounded-lg p-6 bg-white [[data-placement]>&]:p-4 max-h-[inherit] overflow-auto relative",
          props.className
        )}
      />
    </Modal>
  );
}
export const DialogTrigger = RACDialogTrigger;
