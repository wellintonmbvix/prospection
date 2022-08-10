import * as React from "react";
import { AnimatePresence } from "framer-motion";
import Snackbar, { SnackbarProps, SnackbarType } from ".";

interface SnackbarOptions {
  /**
   * Definir tempo de espera para ocultar o snackbar.
   * @default 2000
   */
  timeout?: number;
}

interface SnackContextProps {
  /**
   * Exibir um snackbar default, somente mensagem
   */
  show: (message: string, options?: SnackbarOptions) => void;
  /**
   * Exibir um snackbar de sucesso.
   */
  success: (message: string, options?: SnackbarOptions) => void;
  /**
   * Exibir um snackbar de infor.
   */
  info: (message: string, options?: SnackbarOptions) => void;
  /**
   * Exibir um snackbar de aviso
   */
  warning: (message: string, options?: SnackbarOptions) => void;
  /**
   * Exibir um snackbar de erro.
   */
  error: (message: string, options?: SnackbarOptions) => void;
}

// @ts-ignore
export const SnackbarContext = React.createContext<SnackContextProps>();

export function useSnackbar() {
  const context = React.useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error("O useSnackbar deve ser usado o com o <Snackbar />");
  }

  return context;
}

interface SnackbarProviderProps {
  /**
   * Definir tempo de espera para ocultar o snackbar
   * @default 2000
   */
  timeout?: number;
  /**
   * Onde a snackbar vai ser exibida
   */
  children: React.ReactNode | React.ReactNode[];
}

export function SnackbarProvider({
  timeout = 2000,
  children,
}: SnackbarProviderProps) {
  const [snack, setSnack] = React.useState<SnackbarProps>();

  function showSnackbar(
    message: string,
    type?: SnackbarType | undefined,
    options?: SnackbarOptions
  ) {
    setSnack({
      type,
      message,
    });

    setTimeout(() => {
      setSnack(undefined);
    }, options?.timeout || timeout);
  }

  const show = (message: string, options?: SnackbarOptions) =>
    showSnackbar(message, undefined, options)

  const success = (message: string, options?: SnackbarOptions) =>
    showSnackbar(message, 'success', options)

  const info = (message: string, options?: SnackbarOptions) =>
    showSnackbar(message, 'info', options)

  const warning = (message: string, options?: SnackbarOptions) =>
    showSnackbar(message, 'warning', options)

  const error = (message: string, options?: SnackbarOptions) =>
    showSnackbar(message, 'error', options)

  return (
    <SnackbarContext.Provider value={{ show, success, info, warning, error }}>
      <div className="relative h-full overflow-hidden">
        {children}
        <AnimatePresence>{snack && <Snackbar {...snack} />}</AnimatePresence>
      </div>
    </SnackbarContext.Provider>
  );
}
