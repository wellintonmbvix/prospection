import * as React from "react";
import Dialog, { DialogProps } from "./";

type DialogConfig = Omit<DialogProps, "open" | "onClose">;

interface DialogContextProps {
  show: (config?: DialogConfig) => void;
}

// @ts-ignore
export const DialogContext = React.createContext<DialogContextProps>();

export function useDialog() {
  const context = React.useContext(DialogContext);

  if (context === undefined) {
    throw new Error("O useDialog deve ser usado com o <Dialog />");
  }
  return context;
}

interface DialogProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [open, setOpen] = React.useState<boolean>();
  const [config, setConfig] = React.useState<DialogProps>({} as DialogProps);

  function show(config?: DialogConfig) {
    if (config) {
      setConfig({
        ...config,
        onOk: () => {
          setOpen(false);

          if (config?.onOk) config.onOk();
        },
        onCancel: () => {
          setOpen(false);

          if (config?.onCancel) config.onCancel();
        },
      });

      setOpen(true);
    }
  }

  return (
    <DialogContext.Provider value={{ show }}>
      {children}
      {open && (
        <Dialog open={open} onClose={() => setOpen(false)} {...config} />
      )}
    </DialogContext.Provider>
  );
}
