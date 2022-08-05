import * as React from "react";

export interface EmptyStateProps {
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  text?: string;
}

export default function EmptyState({icon: Icon, text = 'Nenhum item encontrado'}: EmptyStateProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center py-6 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <p className="mt-4 text-sm">{text}</p>        
    </div>
  );
}
