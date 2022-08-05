import * as React from "react";

export interface CardProps extends React.InputHTMLAttributes<HTMLDivElement> {
  elevation?: "sm" | "base" | "md" | "lg" | "xl" | undefined;
}

export default function Card({
  className: userClassName,
  elevation,
  children,
  ...divProps
}: CardProps) {
  const getClassName = (): string => {
    const className = new Array<string>();

    if (userClassName) className.push(userClassName);

    switch (elevation) {
      case "sm":
        className.push("p-6 rounded-lg bg-gray-100 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm ring-1 ring-opacity-5 ring-gray-300");
        break;
      case "base":
        className.push("p-6 rounded-lg bg-gray-100 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow ring-1 ring-opacity-5 ring-gray-300");
        break;
      case "md":
        className.push("p-6 rounded-lg bg-gray-100 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-md ring-1 ring-opacity-5 ring-gray-300");
        break;
      case "lg":
        className.push("p-6 rounded-lg bg-gray-100 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-lg ring-1 ring-opacity-5 ring-gray-300");
        break;
      case "xl":
        className.push("p-6 rounded-lg bg-gray-100 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-xl ring-1 ring-opacity-5 ring-gray-300");
        break;
      default:
        className.push(
          "p-6 rounded-lg bg-gray-100 border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
        );
        break;
    }

    return className.join(" ");
  };
  return (
    <div className={getClassName()} {...divProps}>
      {children}
    </div>
  );
}
