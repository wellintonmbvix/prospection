import * as React from "react";

interface CheckboxPros
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "prefix"
  > {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "info"
    | "warning"
    | "danger";
  textCaption: string;
  idCheckbox: string;
}

export default function Checkbox({
  className: userClassName,
  color,
  textCaption,
  idCheckbox,
  ...checkboxProps
}: CheckboxPros) {
  const getClassName = () => {
    const className = new Array<string>();

    if (userClassName) className.push(userClassName);

    className.push("w-4 h-4 rounded focus:ring-1");

    switch (color) {
      case "primary":
        className.push(
          "text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        );
        break;
      case "secondary":
        className.push(
          "text-slate-600 bg-gray-100 focus:ring-slate-500 dark:focus:ring-slate-600 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        );
        break;
      case "accent":
        className.push(
          "text-indigo-600 bg-gray-100 focus:ring-indigo-500 dark:focus:ring-indigo-600 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        );
        break;
      case "success":
        className.push(
          "text-green-600 bg-gray-100 focus:ring-green-500 dark:focus:ring-green-600 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        );
        break;
      case "info":
        className.push(
          "text-purple-600 bg-gray-100 focus:ring-purple-500 dark:focus:ring-purple-600 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        );
        break;
      case "warning":
        className.push(
          "text-yellow-600 bg-gray-100 focus:ring-yellow-500 dark:focus:ring-yellow-600 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        );
        break;
      case "danger":
        className.push(
          "text-red-600 bg-gray-100 focus:ring-red-500 dark:focus:ring-red-600 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        );
        break;
      default:
        className.push(
          "text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        );
        break;
    }

    return className.join(" ");
  };
  return (
    <div className="flex mt-4">
      <div className="flex items-center mr-4">
        <input
          name={`${idCheckbox}`}
          type="checkbox"
          className={getClassName()}
          {...checkboxProps}
        />
        <label
          htmlFor={`${idCheckbox}`}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {textCaption}
        </label>
      </div>
    </div>
  );
}
