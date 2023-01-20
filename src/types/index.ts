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

export type TradeType = {
  price: number;
  delta: number;
};

export type CandleClusterType = {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
  trades: TradeType[];
};

export type ByBitKlineType = {
  open_time: number;
  close: number;
  high: number;
  low: number;
  open: number;
  symbol: string;
  volume: number;
  turnover: number;
};
