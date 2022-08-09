import React from "react";
import Button from "../Button";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { SnackbarProvider, useSnackbar } from "./SnackbarContext";

export type SnackbarType = "success" | "info" | "warning" | "error";

/**
 * @category Props
 */
export interface SnackbarProps {
  /**
   * Basicamente define o estilo da snackbar.
   * @default undefined
   */
  type?: SnackbarType | undefined;
  /**
   * Texto que vai ser exibido na snackbar.
   */
  message: string;
  /**
   * Mostar botão para fechar a snackbar.
   * @default false
   */
  showClose?: boolean;
  /**
   * Função para realizar ação completar no fechamento da snackbar.
   */
  onClose?: () => void;
}

export default function Snackbar({ type, message, showClose }: SnackbarProps) {
  return (
    <motion.div
      className="position absolute top-0 right-0 z-50 flex items-center rounded shadow-lg ring-1 ring-gray-100 bg-white m-2 px-6 h-11"
      initial={{ right: -300 }}
      animate={{ right: 0 }}
      exit={{ right: -500 }}
    >
      {type === "success" && (
        <CheckCircleIcon className="w-6 h-6 text-success" />
      )}
      {type === "info" && (
        <InformationCircleIcon className="w-6 h-6 text-info" />
      )}
      {type === "warning" && (
        <ExclamationIcon className="w-6 h-6 text-warning" />
      )}
      {type === "error" && (
        <ExclamationCircleIcon className="w-6 h-6 text-danger" />
      )}
      <span className="ml-2">{message}</span>
      {showClose && <Button icon={XIcon} rounded />}
    </motion.div>
  );
}

Snackbar.SnackbarProvider = SnackbarProvider;
Snackbar.useSnackbar = useSnackbar;

export { SnackbarProvider, useSnackbar };
