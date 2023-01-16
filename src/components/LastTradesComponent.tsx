import React from "react";
import { ByBitTradeBTCType } from "../types";

interface LastTradesComponentProps {
  data: ByBitTradeBTCType[];
}

export class LastTradesComponent extends React.Component<LastTradesComponentProps> {
  render() {
    const { data } = this.props;
    return (
      <div style={{ maxHeight: "300px", overflow: "hidden" }}>
        <ul className="divide-y divide-gray-200">
          {data.map((d) => (
            <li key={d.trade_id} className="py-4 flex">
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-900">{d.price}</p>
                <p className="text-sm text-gray-500">{d.size}</p>
                <p className="text-sm text-gray-500">
                  ${(d.size * 0.001 * d.price) / 1000}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
