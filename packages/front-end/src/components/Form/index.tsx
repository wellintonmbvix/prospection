import * as React from 'react'
import Item from "./Item"

export type FormProps = Omit<React.InputHTMLAttributes<HTMLFormElement>,'size' | 'type'>

export default function Form({ className, ...formProps}: FormProps) {
  return (
    <form 
    className={`${className !== undefined ? `${className} ` : ''}flex flex-col`}
    autoComplete="off"
    {...formProps}
    />
  )
}

Form.Item = Item

export { Item }