import { Path, Svg } from "react-native-svg";

export function ForkMark({ size = 22, color = "#F5EAD8" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 3v18" stroke={color} strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M3 3c4 0 7 2 7 7s-3 7-7 7"
        stroke={color}
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 3c-4 0-7 2-7 7s3 7 7 7"
        stroke={color}
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
