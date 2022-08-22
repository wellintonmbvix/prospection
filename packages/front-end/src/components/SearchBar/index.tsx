import * as React from 'react';
import Input, { InputProps } from '../Input';

export interface SeachBarProps extends Omit<InputProps, "noStyle"> {
    actions?: React.ReactNode;
}

export default function SearchBar({
    placeholder = "Buscar",
    actions,
    ...inputProps
}: SeachBarProps) {
  return (
    <div className="h-10 pl-1.5 pr-3 flex items-center">
        <Input placeholder={placeholder} {...inputProps} noStyle />
        <div className="flex justify-center space-x-1 h-9">{actions}</div>
    </div>
  )
}
