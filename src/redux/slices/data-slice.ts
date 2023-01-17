import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ByBitTradeBTCType, CandleBarType } from "../../types";

// Define a type for the slice state
interface DataState {
  candles: CandleBarType[];
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
    addDelta: (state, action: PayloadAction<ByBitTradeBTCType>) => {
      const { price, size, side } = { ...action.payload };
      const currentDelta = state.delta[price] || 0;
      // Ensure we don't lose type number to string
      const amount: number = side === "Sell" ? 0 - size : Math.abs(size);
      const newDelta = Number((currentDelta + amount).toFixed(2));
      state.delta[price] = newDelta;
    },
    addData: (state, action: PayloadAction<CandleBarType>) => {
      const payload = { ...action.payload };
      const index = state.candles.findIndex((r) => r.time === payload.time);
      if (index === -1) {
        state.candles = [...state.candles, payload];
      } else {
        state.candles.splice(index, 1, payload);
      }
    },
    addLastTrade: (state, action: PayloadAction<ByBitTradeBTCType>) => {
      const payload = { ...action.payload };
      state.lastTrades = [payload, ...state.lastTrades].splice(0,500);
    },
  },
});

export const { addDelta, addData, addLastTrade } = dataSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const isData = (state: RootState) => !!state.data.data;
export const getCandles = (state: RootState) => state.data.candles;
export const getLastTrades = (state: RootState) => state.data.lastTrades;
export const getDelta = (state: RootState) => state.data.delta;

export default dataSlice.reducer;
