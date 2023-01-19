import PubSub from "pubsub-js";
import moment from "moment";
import { ByBitTradeBTCType, CandleClusterType, TradeType } from "../types";
import { addCandle, addLastTrade } from "../redux/slices/data-slice";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

interface IChartBarDataServiceProps {
  store: ToolkitStore;
  time: number;
}

export class ChartBarDataService {
  protected lastPrice = -1;
  protected store: ToolkitStore;
  protected candle: CandleClusterType;
  protected delta: Map<number, number>;

  constructor(props: IChartBarDataServiceProps) {
    const { time, store } = props;
    this.store = store;

    this.delta = new Map();
    this.candle = this.openCandle();
    setInterval(() => {
      this.candle = this.openCandle();
    }, time * 1000 - new Date().getMilliseconds());

    PubSub.subscribe("ws-data", (message: string, data: ByBitTradeBTCType[]) => {
      this.store.dispatch(addLastTrade(data));
      this.updateCandle(data);
    });
  }

  private updateCandle(data: ByBitTradeBTCType[]) {
    const lastCandle = data[data.length-1];
    const { price: p, side, size } = lastCandle;
    const candle = this.candle;
    // init candle with current price
    if (candle.open === -1) {
      candle.open = candle.high = candle.low = p;
    }

    // Update high and low
    if (p > candle.high) {
      candle.high = p;
    } else {
      if (p < candle.low) {
        candle.low = p;
      }
    }

    candle.close = p;

    // update delta
    const amount = side === "Sell" ? 0 - size : Number(size);

    const currentAmount = this.delta.get(p) || 0;
    this.delta.set(p, Number((currentAmount + amount).toFixed(5)));

    // keep record of last price to update on candle close
    this.lastPrice = p;

    this.store.dispatch(addCandle(candle));
  }

  private openCandle() {
    const lastPrice = this.lastPrice;

    // Candle Close
    if (this.candle && this.candle.open > 0) {
      const trades: TradeType[] = [];
      // Add Delta
      this.delta.forEach((v, k) => {
        trades.push({
          price: k,
          delta: v,
        });
      });

      // Sort asc by price
      trades.sort((a, b) => b.price - a.price);
      this.candle.trades = trades;
      this.candle.endTime = moment().unix();
      this.store.dispatch(addCandle(this.candle));

      this.delta.clear();
    }

    const date = moment().unix();
    const candle = {
      time: date,
      open: lastPrice,
      close: lastPrice,
      high: lastPrice,
      low: lastPrice,
      startTime: date,
      endTime: date,
      trades: [],
    };

    if (lastPrice !== -1) {
      this.store.dispatch(addCandle(candle));
    }

    return candle;
  }
}
