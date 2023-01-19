import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ByBitTradeBTCType, CandleClusterType } from "../../types";

// Define a type for the slice state
interface DataState {
  candles: CandleClusterType[];
  lastTrades: ByBitTradeBTCType[];
  delta: number[];
}

// Define the initial state using that type
const initialState: DataState = {
  candles: [],
  lastTrades: [],
  delta: [],
};

export const dataSlice = createSlice({
  name: "data-slice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCandle: (state, action: PayloadAction<CandleClusterType>) => {
      const payload = { ...action.payload };
      const index = state.candles.findIndex((r) => r.time === payload.time);
      if (index === -1) {
        state.candles = [...state.candles, payload];
      } else {
        state.candles.splice(index, 1, payload);
      }
    },
    addLastTrade: (state, action: PayloadAction<ByBitTradeBTCType[]>) => {
      const payload = [...action.payload];

      payload.forEach((p) => {
        const { price, size, side } = p;
        const currentDelta = state.delta[price] || 0;
        // Ensure we don't lose type number to string
        const amount: number = side === "Sell" ? 0 - size : Math.abs(size);
        const newDelta = Number((currentDelta + amount).toFixed(2));
        state.delta[price] = newDelta;
      });

      state.lastTrades = [...payload, ...state.lastTrades].splice(0, 500);
    },
  },
});

export const { addCandle, addLastTrade } = dataSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const isData = (state: RootState) => !!state.data.data;
export const getCandles = (state: RootState) => state.data.candles;
export const getLastTrades = (state: RootState) => state.data.lastTrades;
export const getDelta = (state: RootState) => state.data.delta;

export default dataSlice.reducer;
