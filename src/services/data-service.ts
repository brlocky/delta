import PubSub from "pubsub-js";
import moment from "moment";
import { ByBitTradeBTCType, CandleBarType } from "../types";
import { addData, addDelta, addLastTrade } from "../redux/slices/data-slice";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

interface IChartBarDataServiceProps {
  store: ToolkitStore;
  time: number;
}

export class ChartBarDataService {
  protected lastPrice = 0;
  protected store: ToolkitStore;
  protected candle: CandleBarType;

  constructor(props: IChartBarDataServiceProps) {
    const { time, store } = props;
    this.store = store;

    setInterval(() => {
      this.candle = this.openCandle();
    }, time * 1000);

    this.candle = this.openCandle();
    PubSub.subscribe("ws-data", (message: string, data: ByBitTradeBTCType) => {
      this.store.dispatch(addLastTrade(data));
      this.store.dispatch(addDelta(data));
      this.updateCandle(data);
    });
  }

  private updateCandle(data: ByBitTradeBTCType) {
    const { price: p } = data;
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

    // keep record of last price to update on candle close
    this.lastPrice = p;

    this.store.dispatch(addData(candle));
  }

  private openCandle() {
    const date = moment().unix();
    const lastPrice = this.lastPrice || -1;
    const candle = {
      time: date,
      open: lastPrice,
      close: lastPrice,
      high: lastPrice,
      low: lastPrice,
    };

    if (lastPrice !== -1) {
      this.store.dispatch(addData(candle));
    }

    return candle;
  }
}
