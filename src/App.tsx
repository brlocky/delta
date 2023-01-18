import React from "react";

import { ChartComponent } from "./components/ChartComponent";
import { LastTradesComponent } from "./components/LastTradesComponent";
import MainLayout from "./layouts/MainLayout";
import { ChartDeltaComponent } from "./components/ChartDeltaComponent";

export function App() {
  return (
    <MainLayout>
      <>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <ChartComponent />
          </div>
          <div className="col-span-2">
            <ChartDeltaComponent />
          </div>
          <div className="h-screen">
            <LastTradesComponent />
          </div>
        </div>
      </>
    </MainLayout>
  );
}

export default App;
