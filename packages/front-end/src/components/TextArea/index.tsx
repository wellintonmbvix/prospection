import * as React from 'react';

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement>{
    innerRef?: React.ForwardedRef<HTMLTextAreaElement>    
    error?: boolean;
    textPlaceholder?: string;
    textCaption?: string;
    nameComponent: string;
}


export default function TextArea({
    className: userClassName,
    error,
    textPlaceholder = " ",
    textCaption,
    nameComponent,
    ...textAreaProps
}: TextAreaProps) {
    
    const getClassName = (): string => {
        const className = new Array<string>()

        if (userClassName) className.push(userClassName)        

       if(!error) {
            className.push("block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500")
       } else {
            className.push("block p-2.5 w-full text-sm text-red-900 bg-transparent rounded-lg border border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500")
       }

        return className.join(" ")
    }
  return (
    <div className="relative">
        <textarea id={`${nameComponent}`} className={getClassName()} style={{ minHeight: "36px", ...textAreaProps.style}} placeholder={`${textPlaceholder}`}></textarea>
        <label htmlFor={`${nameComponent}`} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1">{textCaption}</label>
    </div>
  )
}
