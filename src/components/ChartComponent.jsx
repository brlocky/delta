import { createChart, ColorType } from "lightweight-charts/lib/prod/src";
import React, { useEffect, useRef } from "react";
import { TitleComponent } from "./TitleComponent";
import { useAppSelector } from "../redux/store/hook";
import { getCandles } from "../redux/slices/data-slice";

let mainSeries = null;
export const ChartComponent = () => {
  const candles = useAppSelector(getCandles);

  const backgroundColor = "white";
  const lineColor = "#2962FF";
  const textColor = "black";
  const areaTopColor = "#2962FF";
  const areaBottomColor = "rgba(41, 98, 255, 0.28)";

  const chartContainerRef = useRef();
  // const [mainSeries, setMainSeries] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.7)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.7)",
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Create the Main Series (Candlesticks)
    mainSeries = chart.addClusterSeries();
    // mainSeries = chart.addCandlestickSeries();
    // Set the data for the Main Series

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  useEffect(() => {

    if (candles.length === 0) {
      return;
    }

    const data = JSON.parse(JSON.stringify(candles));

    const last = data[data.length - 1];
    mainSeries.update(last);
  }, [candles]);

  return (
    <>
      <TitleComponent>Chart</TitleComponent>
      <div ref={chartContainerRef} />
    </>
  );
};
