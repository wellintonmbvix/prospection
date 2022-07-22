import * as React from "react";
import { HiExclamationCircle } from "react-icons/hi";

export interface EmptyStateProps {
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  text?: string;
}

function EmptyState({
  icon: Icon = HiExclamationCircle,
  text = "Nenhum item encontrado",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center py-6 text-gray-400">
      <Icon className=" h-16 w-16" />
      <p className="mt-4 text-sm">{text}</p>
    </div>
  );
}

export default EmptyState;
