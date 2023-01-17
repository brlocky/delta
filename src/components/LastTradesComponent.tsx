import React, { useState } from "react";
import { ByBitTradeBTCType } from "../types";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { NumericFormat } from "react-number-format";
import { TitleComponent } from "./TitleComponent";
import { getLastTrades } from "../redux/slices/data-slice";
import { useAppSelector } from "../redux/store/hook";

interface LastTradesRowProps {
  row: ByBitTradeBTCType;
}

const LastTradesRow = (props: LastTradesRowProps) => {
  const { row } = props;
  let amount = row.size;

  let className = "bg-lime-200";
  if (row.side === "Sell") {
    amount = 0 - amount;
    className = "bg-orange-200";
  }

  const btc = (row.size / row.price).toFixed(5);
  return (
    <li key={row.trade_id} className={className}>
      <p>
        <span className="text-xs font-small text-gray-900">{row.price}</span>
        <span className="ml-2 text-sm font-small text-gray-900">
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
          {btc} BTC
        </span>
      </p>
    </li>
  );
};

export const LastTradesComponent = () => {
  const [filterAmount, setFilterAmount] = useState<number>(1);
  const lastTrades = useAppSelector(getLastTrades);

  const updateFilter = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilterAmount(Number(e.currentTarget.value));
  };

  const filterData = (data: ByBitTradeBTCType[]) => {
    return data.filter((e) => {
      if (e.size >= filterAmount) {
        return e;
      }
      return null;
    });
  };

  const last: string = lastTrades[0]?.price.toString() || "-";

  return (
    <div>
      <TitleComponent>Last Trades</TitleComponent>
      <div className="mt-2 grid grid-cols-2">
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <CurrencyDollarIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <NumericFormat
            decimalSeparator=","
            value={last}
            valueIsNumericString
            displayType="text"
          />
        </div>
        <select
          onChange={updateFilter}
          value={filterAmount}
          className="float-right text-sm text-gray-400"
        >
          <option value="0"> Filter</option>
          <option value="100">100</option>
          <option value="1000">1000</option>
          <option value="10000"> 10000</option>
        </select>
      </div>
      <ul className="divide-y divide-gray-200">
        {filterData(lastTrades).map((d) => (
          <div key={d.trade_id}>
            <LastTradesRow row={d} />
          </div>
        ))}
      </ul>
    </div>
  );
};
