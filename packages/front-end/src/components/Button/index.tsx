import * as React from 'react';
import { Color } from "../types";

export interface ButtonProps extends Omit<
React.InputHTMLAttributes<HTMLButtonElement>,
'size' | 'prefix' | 'type'
> {
    color?: Color
    type?: 'button' | 'submit' | 'reset'
    rounded?: boolean
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
    children?: React.ReactNode | React.ReactNode[] | string
}

export default function Button({
    className: userClassName,
    color,
    rounded,
    icon: Icon,
    children,
    ...buttonProps
}: ButtonProps) {
    const getClassName = (): string => {
        const className = new Array<string>()

        if (userClassName) className.push(userClassName)

        className.push('max-w-min h-9 text-white focus:ring-1 focus:outline-none font-medium text-sm py-2.5 mr-2 mb-2 transition-all duration-150 ease-in-out uppercase')

        if (Icon) className.push('px-2')

        if (rounded) className.push('rounded-full')
        else className.push('rounded-lg')

        switch (color) {
            case 'primary':
                className.push('bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800')
                break
            case 'secondary':
                className.push('bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900')
                break
            case 'success':
                className.push('bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800')
                break
            case 'warning':
                className.push('bg-yellow-400 hover:bg-yellow-500 bg-yellow-400 hover:bg-yellow-500 dark:focus:ring-yellow-900')
                break
            case 'danger':
                className.push('bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900')
                break
        }

        return className.join(' ')
    }
  return (
    <button className={getClassName()} {...buttonProps}>
        {Icon && (
            <div className='flex items-center'>
                <Icon className='h-5 w-5' />
                {children && <span className='mx-1'>{children}</span>}
            </div>
        )}
        {!Icon && children}
    </button>
  )
}
