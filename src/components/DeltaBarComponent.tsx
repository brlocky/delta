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
    const color = delta > 0 ? "bg-green-500" : "bg-red-400";
    return `${color}`;
  };
  const getValueClassName = () => {
    const { selected } = props;
    const bgcolor = selected ? "bg-blue-200" : "";
    return `text-xs font-small text-gray-900 col-span-1 align-middle ${bgcolor}`;
  };

  return (
    <div className="grid grid-cols-8 h-4 truncate">
      <div className={getValueClassName()}>{value}</div>
      <div className="w-full mb-4 dark:bg-gray-300 align-middle col-span-7">
        <div className={getClassName()} style={{ width: normalized + "%" }}>
          <div className="text-xs font-small text-right text-gray-900">
            <NumericFormat
              thousandSeparator={"."}
              decimalSeparator=","
              value={delta}
              valueIsNumericString
              prefix="$"
              displayType="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
