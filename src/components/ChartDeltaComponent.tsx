import React from "react";
import { DeltaBarComponent } from "./DeltaBarComponent";
import { TitleComponent } from "./TitleComponent";
interface ChartDeltaComponentProps {
  data: number[];
}

export class ChartDeltaComponent extends React.Component<ChartDeltaComponentProps> {
  render() {
    let min = 0,
      max = 0,
      maxDelta = 0;

    this.props.data.forEach((d, v) => {
      min = min === 0 || v < min ? v : min;
      max = max === 0 || v > max ? v : max;
      maxDelta =
        maxDelta === 0 || Math.abs(d) > maxDelta ? Math.abs(d) : maxDelta;
    });

    const ladder = [];
    let i = max;
    while (i >= min) {
      const delta = this.props.data[i] || 0;
      const normalized = Number(
        ((Math.abs(delta) / maxDelta) * 100).toFixed(0)
      );
      ladder.push({
        value: i,
        delta,
        normalized,
      });
      i = i - 0.5;
    }

    return (
      <>
        <TitleComponent>Delta per Level</TitleComponent>

        {ladder.map((k) => {
          return (
            <>
              <DeltaBarComponent
                value={k.value}
                normalized={k.normalized}
                delta={k.delta}
              />
            </>
          );
        })}
      </>
    );
  }
}
