import * as React from "react";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix" | "type"
> & {
  type?: "text" | "email" | "password" | "date" | "datatime-local" | "time";
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  error?: boolean;
  noStyle?: boolean;
  labelInput: string;
};

export default function Input({
  className: userClassName,
  style,
  type,
  icon: Icon,
  error,
  noStyle,
  labelInput,
  ...inputProps
}: InputProps) {
  return (
    <div className="relative" style={style}>
      {!error && (
        <>
        <input type={type} id="floating_outlined" {...inputProps} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1">{labelInput}</label></>
      )}
      {error && (
        <>
          <input type={type} id="outlined_error" aria-describedby="outlined_error_help" {...inputProps} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " />
          <label htmlFor="outlined_error" className="absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">{labelInput}</label>
        </>
      )}
    </div>
  );
}
