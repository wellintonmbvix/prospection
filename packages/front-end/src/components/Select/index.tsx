import * as React from "react";

type Allowed = string | number;

type BaseProps<Value> = {
  value: Value;
  selectLabel?: string;
  onChange: (newValue: Value) => void;
  options: readonly Value[];
  mapOptionToLabel?: (option: Value) => Allowed;
  mapOptionToValue?: (option: Value) => Allowed;
};

type Props<Value> = Value extends Allowed
  ? BaseProps<Value>
  : Required<BaseProps<Value>>;

const isAllowed = (v: any): v is Allowed =>
  typeof v === "string" || typeof v === "number";

export default function Select<Value>({
  value,
  selectLabel,
  onChange,
  options,
  mapOptionToLabel,
  mapOptionToValue
}: Props<Value>) {
  const toLabel = (option: Value): Allowed => {
    if (mapOptionToLabel) {
      return mapOptionToLabel(option);
    }

    return isAllowed(option) ? option : String(option);
  };

  const toValue = (option: Value): Allowed => {
    if (mapOptionToValue) {
      return mapOptionToValue(option);
    }
    return isAllowed(option) ? option : String(option);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(options[e.target.selectedIndex]);
  };

  return (
    <div className="relative">
      <select 
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"        
        id="selected_floating"         
        value={toValue(value)} 
        onChange={handleChange}
        >
        {options?.map((value) => (
          <option value={toValue(value)} key={toValue(value)}>
            {toLabel(value)}
          </option>
        ))}        
      </select>
      <label htmlFor="selected_floating" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1">{selectLabel}</label>
    </div>
  );
}
