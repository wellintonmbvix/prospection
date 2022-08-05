import * as React from "react";

export type FormItemProps = {
  className?: string;
  nameInput?: string;
  style?: React.CSSProperties;
  label?: string;
  orientation?: "vertical" | "horizontal";
  reverse?: boolean;
  error?: string;
  children: React.ReactNode | React.ReactNode[];
};

export default function Item({
  className,
  nameInput,
  style,
  label,
  orientation = "vertical",
  reverse,
  error,
  children,
}: FormItemProps) {
  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={nameInput}
        className={`${className !== undefined ? `${className}` : ""}flex flex-${
          orientation === "vertical" ? "col" : "row items-center justify-end"
        } ${reverse && "flex-row-reverse"} pb-5`}
        style={style}
      >
        <span
          className={
            reverse
              ? orientation === "vertical"
                ? "mt-1.5"
                : "ml-2"
              : orientation === "vertical"
              ? "mb-1.5"
              : "mr-2"
          }
        >
          {label}
        </span>
        {children}
      </label>
      <span
        className={`text-xs absolute bottom-0 text-danger-400 text-ellipsis transition-all duration-150 ease-in ${
          error ? "-translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        {error}
      </span>
    </div>
  );
}
