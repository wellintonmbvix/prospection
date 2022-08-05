import * as React from "react";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix" | "type"
> & {
  type?: "email" | "password" | "date" | "datatime-local" | "time";
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  error?: boolean;
  noStyle?: boolean;
};

export default function Input({
  className: userClassName,
  style,
  type,
  icon: Icon,
  error,
  noStyle,
  ...inputProps
}: InputProps) {
  const inputRef = React.useRef(null);

  const getClassName = (): string => {
    const className = new Array<string>();

    className.push("outline-none w-full transition-all ease-in duration-200 ");

    if (Icon) className.push("pl-8");

    if (noStyle) return className.join(" ");
    else
      className.push(
        "ring-0 ring-opacity-0 border border-gray-200 rounded h-9 py-1.5 pr-2"
      );

    if (error) className.push('bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500')

    return className.join(" ");
  };

  return (
    <div className={["relative mb-6", userClassName].join(' ')} style={style}>
      <div>
        {Icon && (
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <Icon />
          </div>
        )}
      </div>
      <input ref={inputRef} className={getClassName()} {...inputProps} />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Validação!</span>Campo vazio ou inválido</p>
      )}
    </div>
  );
}
