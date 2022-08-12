import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type ModalProps = {
  open?: boolean;
  title?: string;
  message?: string;
  actions?: React.ReactNode;
  actionsPosition?: "left" | "center" | "right";
  onClose?: () => void;
  children?: React.ReactNode;
};

export default function Modal({
  open = false,
  title,
  message,
  actions,
  actionsPosition = "right",
  onClose,
  children,
}: ModalProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(open);

  const positions = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function closeModal() {
    setIsOpen(false);
    if (onClose) onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { type: "spring", stiffness: 300 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          className="fixed inset-0 z-[9999] backdrop-blur-lg backdrop-brightness-50 backdrop-opacity-50 flex items-center justify-center"
          onClick={() => closeModal()}
        >
          <motion.div
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left text-gray-500 dark:text-gray-200 align-middle transition-all transform bg-white shadow-xl rounded-lg dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="mb-2">{title}</header>
            {message || children}
            {actions && (
              <div
                className={`flex ${positions[actionsPosition]} mt-4 space-x-2`}
              >
                {actions}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
