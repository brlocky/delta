import React from "react";
import { NumericFormat } from "react-number-format";

interface DeltaBarComponentProps {
  value: number;
  delta: number;
  normalized: number;
  selected: boolean;
}

export const DeltaBarComponent = (props: DeltaBarComponentProps) => {
  const { value, delta, normalized } = props;
  const getClassName = () => {
    const color = delta > 0 ? "dark:bg-green-500" : "dark:bg-orange-500";
    return `bg-blue-600 h-1.5 rounded-full ${color}`;
  };
  const getValueClassName = () => {
    const { selected} = props;
    const bgcolor = selected ? "bg-green-500" : '';
    return `text-xs font-small text-gray-900 col-span-1 ${bgcolor}`;
  };
  return (
    <div className="grid grid-cols-8">
      <span className={getValueClassName()}>
        {value}
      </span>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700 col-span-7">
        <div className={getClassName()} style={{ width: normalized + "%" }}>
          <span className="text-xs font-small text-gray-900">
            <NumericFormat
              thousandSeparator={"."}
              decimalSeparator=","
              value={delta}
              valueIsNumericString
              prefix="$"
              displayType="text"
            />
          </span>
        </div>
      </div>
    </div>
  );
};
