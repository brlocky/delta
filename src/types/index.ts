export type ByBitTradeType = {
  T: string;
  S: string;
  v: number;
  p: number;
};

export type ByBitTradeBTCType = {
  trade_id: string;
  timestamp: number;
  side: string;
  size: number;
  price: number;
};

export type CandleBarType = {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
};
