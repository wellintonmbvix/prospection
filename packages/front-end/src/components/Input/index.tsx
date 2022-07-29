import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  tipo: "email" | "password" | "text";
  isRequired?: boolean;
  isDisabled?: boolean;
  textoLabel: string;
  textoPlaceholder?: string;
}

function InputFloatingLabels({
  className: userClassName,
  tipo,
  isRequired = false,
  textoLabel,
  textoPlaceholder = " ",
  isDisabled = false,
}: InputProps) {
  const getClassName = (): string => {
    const className = new Array<string>();

    if (userClassName) className.push(userClassName);

    className.push(
      "block py-2.5 px-2 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    );

    if (isDisabled) className.push("bg-gray-100 dark:bg-gray-800 dark:placeholder-white cursor-not-allowed ");

    return className.join(" ");
  };

  return (
    <div className="relative z-0 mb-6 w-full group">
      <input
        type={tipo}
        name={`floating_${tipo}`}
        id={`floating_${tipo}`}
        className={getClassName()}
        placeholder={`${textoPlaceholder}`}
        required={isRequired}
        disabled={isDisabled}
      ></input>
      <label
        htmlFor={`floating_${tipo}`}
        className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >{`${textoLabel}`}</label>
    </div>
  );
}

export default InputFloatingLabels;
