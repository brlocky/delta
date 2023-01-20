import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WSService } from "./services/ws-service";
import { ChartBarDataService } from "./services/data-service";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import axios from "axios";
import { ByBitKlineType, ByBitTradeBTCType, CandleClusterType } from "./types";
import moment from "moment";
import { addCandle } from "./redux/slices/data-slice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const url = "wss://stream.bybit.com/realtime";
const topic = "trade.BTCUSD";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
new WSService({ url, topic }).connect();
new ChartBarDataService({ store, time: 10 });

const from = moment().hour(-3).unix();
const klineUrl = `https://api.bybit.com/v2/public/kline/list?symbol=BTCUSD&interval=1&from=${from}`;
axios
  .get(klineUrl)
  .then((res) => {
    res.data.result.map((r: ByBitKlineType) => {
      const candle: CandleClusterType = {
        time: r.open_time,
        open: Number(r.open),
        close: Number(r.close),
        high: Number(r.high),
        low: Number(r.low),
        trades: [],
      };
      // console.log(candle);
      store.dispatch(addCandle(candle));
    });
  })
  .catch(console.error);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
