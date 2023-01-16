import React from "react";
import { VictoryChart, VictoryBar } from "victory";
interface ChartDeltaComponentProps {
  data: number[];
}

export class ChartDeltaComponent extends React.Component<ChartDeltaComponentProps> {
  render() {
    let min = 0,
      max = 0,
      minKey = 0,
      maxKey = 0;

    this.props.data.forEach((d, v) => {
      min = min === 0 || v < min ? v : min;
      max = max === 0 || v > max ? v : max;
      minKey = minKey === 0 || d < minKey ? d : minKey;
      maxKey = maxKey === 0 || d > maxKey ? d : maxKey;
    });

    const med1 = (max - min) / 4;
    const med2 = (maxKey - minKey) / 4;
    min -= med1;
    max += med1;
    minKey -= med2;
    maxKey += med2;

    return (
      <>
        <VictoryChart domain={{ x: [min, max], y: [minKey, maxKey] }}>
          <VictoryBar
            horizontal
            style={{
              data: { fill: "#c43a31" },
            }}
            data={this.props.data}
            x="1"
            y="0"
          />
        </VictoryChart>
      </>
    );
  }
}
