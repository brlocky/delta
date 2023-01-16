import React from "react";

import { ChartComponent } from "./components/ChartComponent";
import { getCandles, getDelta, getLastTrades } from "./redux/slices/data-slice";
import { useAppSelector } from "./redux/store/hook";
import { LastTradesComponent } from "./components/LastTradesComponent";
import MainLayout from "./layouts/MainLayout";
import { ChartDeltaComponent } from "./components/ChartDeltaComponent";

export function App() {
  const candles = useAppSelector(getCandles);
  const lastTrades = useAppSelector(getLastTrades);
  const delta = useAppSelector(getDelta);

  // useEffect(() => {
  //   return () => {
  //   };
  // }, []);

  return (
    <MainLayout>
      <>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <ChartComponent data={candles} />
          </div>
          <div className="col-span-2">
            <ChartDeltaComponent data={delta} />
          </div>
          <div className="h-screen">
            <LastTradesComponent data={lastTrades} />
          </div>
        </div>
      </>
    </MainLayout>
  );
}

export default App;
