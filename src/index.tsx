import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WSService } from "./services/ws-service";
import { ChartBarDataService } from "./services/data-service";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { ByBitTradeBTCType } from "./types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const url = "wss://stream.bybit.com/contract/usdt/public/v3";
// const topic = "publicTrade.BTCUSDT";

const url = "wss://stream.bybit.com/realtime";
const topic = "trade.BTCUSD";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
new WSService<ByBitTradeBTCType>({ url, topic });
new ChartBarDataService({ store, time: 1 });

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
