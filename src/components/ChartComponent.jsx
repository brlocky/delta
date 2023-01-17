import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import { TitleComponent } from "./TitleComponent";

let mainSeries = null;
export const ChartComponent = (props) => {
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
    mainSeries = chart.addCandlestickSeries();
    // Set the data for the Main Series
    // serie.setData([]);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(props.data));
    if (data.length === 0) {
      return;
    }
    const last = data[data.length - 1];
    mainSeries.update(last);
  }, [props.data]);

  return (
    <>
      <TitleComponent>Chart</TitleComponent>
      <div ref={chartContainerRef} />
    </>
  );
};

// const chart = createChart(document.body, { width: 400, height: 300 });
// const lineSeries = chart.addLineSeries();
// lineSeries.setData([
//     { time: '2019-04-11', value: 80.01 },
//     { time: '2019-04-12', value: 96.63 },
//     { time: '2019-04-13', value: 76.64 },
//     { time: '2019-04-14', value: 81.89 },
//     { time: '2019-04-15', value: 74.43 },
//     { time: '2019-04-16', value: 80.01 },
//     { time: '2019-04-17', value: 96.63 },
//     { time: '2019-04-18', value: 76.64 },
//     { time: '2019-04-19', value: 81.89 },
//     { time: '2019-04-20', value: 74.43 },
// ]);
