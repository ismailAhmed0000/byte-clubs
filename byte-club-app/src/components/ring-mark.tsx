import { Circle, Line, Path, Svg } from "react-native-svg";

import { NEUTRAL_800 } from "@/constants/palette";

export function RingMark({ color = NEUTRAL_800 }: { color?: string }) {
  return (
    <Svg width={24} height={32} viewBox="0 0 26 34">
      <Path
        d="M4 14 A9 9 0 1 1 22 14"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Line x1={4} y1={14} x2={4} y2={29} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Circle cx={4} cy={30} r={2} fill={color} />
    </Svg>
  );
}
