import * as React from 'react'

export interface DividerProps {
    text?: string;
    textPosition?: 'right' | 'center' | 'left'
    textSize?: 'sm' | 'base' | 'lg'
    textWeight?: 'normal' | 'medium' | 'bold'
}

export default function Divider({ text, textPosition, textSize, textWeight}: DividerProps) {
    const getClassName = (): string => {
        const className = new Array<string>()

        switch (textSize) {
            case 'sm':
                className.push('text-sm')
                break
            case 'base':
                className.push('text-base')
                break
            case 'lg':
                className.push('text-lg')
        }

        switch (textWeight) {
            case 'medium':
                className.push('font-medium')
                break
            case 'normal':
                className.push('font-normal')
                break
            case 'bold':
                className.push('font-bold')
                break
            default:
                className.push('font-bold')
                break
        }

        switch (textPosition) {
            case 'left':
                className.push('left-4')
                break
            case 'center':
                className.push('inset-x-4')
                break
            case 'right':
                className.push('right-4')
                break
            default:
                className.push('left-4')
                break
        }
        
        return className.join(' ')
    }
  return (
    <div className="relative flex justify-center items-center">
        <hr className="flex-1 my-6 border-t" />
        {text && <span className={getClassName()}>{text}</span>}
    </div>
  )
}
