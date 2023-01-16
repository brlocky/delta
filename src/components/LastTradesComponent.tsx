import React, { useState } from "react";
import { ByBitTradeBTCType } from "../types";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { NumericFormat } from "react-number-format";

interface LastTradesRowProps {
  row: ByBitTradeBTCType;
}

const LastTradesRow = (props: LastTradesRowProps) => {
  const { row } = props;
  const contracts = row.size;
  const units = Number((contracts * 0.001).toFixed(3));
  let amount = Number((units * row.price).toFixed(0));

  let classStrong = 50;
  if (amount > 100) {
    classStrong = 200;
  }
  if (amount > 500) {
    classStrong = 300;
  }
  if (amount > 1000) {
    classStrong = 400;
  }
  if (amount > 10000) {
    classStrong = 600;
  }

  let className = "bg-lime";
  if (row.side === "Sell") {
    amount = 0 - amount;
    className = "bg-orange";
  }

  className += "-" + classStrong;

  return (
    <li key={row.trade_id} className={className}>
      <div className="ml-2">
        <span className="text-sm font-medium text-gray-900">
          <NumericFormat
            value={amount}
            prefix={"$"}
            displayType="text"
            allowNegative
            allowLeadingZeros
            thousandSeparator=","
          />
        </span>
        <span className="text-sm font-small text-gray-900 float-right">
          {units} BTC
        </span>
      </div>
    </li>
  );
};

interface LastTradesComponentProps {
  data: ByBitTradeBTCType[];
}

export const LastTradesComponent = (props: LastTradesComponentProps) => {
  const [filterAmount, setFilterAmount] = useState<number>(0);

  const updateFilter = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilterAmount(Number(e.currentTarget.value));
  };

  const filterData = (data: ByBitTradeBTCType[], qty:number) => {
    return data.filter((e) => {
      if (e.size >= qty) {
        return e;
      }
      return null;
    });
  };

  const { data } = props;
  const last: string = data[0]?.price.toString() || "-";

  return (
    <div>
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <CurrencyDollarIcon
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        ${last}
        <select onChange={updateFilter} value={filterAmount}>
          <option value="0"> &gte; 0</option>
          <option value="0.001"> &gte; 0.001</option>
          <option value="0.01"> &gte; 0.01</option>
          <option value="0.1"> &gte; 0.1</option>
          <option value="1"> &gte; 1</option>
          <option value="5"> &gte; 5</option>
          <option value="10"> &gte; 10</option>
        </select>
      </div>
      <ul className="divide-y divide-gray-200">
        {filterData(data, filterAmount).map((d) => (
          <LastTradesRow row={d} />
        ))}
      </ul>
    </div>
  );
};
