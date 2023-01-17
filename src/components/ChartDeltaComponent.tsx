import React from "react";
import { useAppSelector } from "../redux/store/hook";
import { getDelta, getLastTrades } from "../redux/slices/data-slice";
import { TitleComponent } from "./TitleComponent";
import { DeltaBarComponent } from "./DeltaBarComponent";

interface DeltaBarDto {
  value: number;
  delta: number;
  normalized: number;
}
const PRICE_TICK = 0.5;

export const ChartDeltaComponent = () => {
  const lastTrades = useAppSelector(getLastTrades);
  const delta = useAppSelector(getDelta);

  const getLadder = () => {
    let min = 0,
      max = 0,
      maxDelta = 0;

    delta.forEach((d, v) => {
      min = min === 0 || v < min ? v : min;
      max = v > max ? v : max;
      maxDelta = Math.abs(d) > maxDelta ? Math.abs(d) : maxDelta;
    });

    min -= PRICE_TICK;
    max += PRICE_TICK;

    const ladder: DeltaBarDto[] = [];
    let i = max;
    while (i >= min) {
      const deltaValue = delta[i] || 0;
      const normalized = Number(
        ((Math.abs(deltaValue) / maxDelta) * 100).toFixed(0)
      );
      ladder.push({
        value: i,
        delta: deltaValue,
        normalized,
      });
      i -= PRICE_TICK;
    }

    return ladder;
  };

  const ladder = getLadder();
  const currentPrice = lastTrades.length ? lastTrades[0].price : 0;
  return (
    <>
      <TitleComponent>Delta per Level</TitleComponent>

      {ladder.map((k) => {
        return (
          <div key={k.value}>
            <DeltaBarComponent
              value={k.value}
              normalized={k.normalized}
              delta={k.delta}
              selected={k.value === currentPrice}
            />
          </div>
        );
      })}
    </>
  );
};
