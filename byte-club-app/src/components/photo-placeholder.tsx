import { Text, View } from "react-native";
import { Defs, Pattern, Rect, Svg } from "react-native-svg";

import { FIGTREE, NEUTRAL_200, NEUTRAL_300 } from "@/constants/palette";

export function PhotoPlaceholder({
  height = 260,
  label = "recipe photo",
}: {
  height?: number;
  label?: string;
}) {
  return (
    <View style={{ height }}>
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern
            id="diagonalStripes"
            patternUnits="userSpaceOnUse"
            width={16}
            height={16}
            patternTransform="rotate(45)"
          >
            <Rect width={16} height={16} fill={NEUTRAL_200} />
            <Rect width={8} height={16} fill={NEUTRAL_300} />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#diagonalStripes)" />
      </Svg>
      <Text
        style={{
          position: "absolute",
          alignSelf: "center",
          top: "50%",
          marginTop: -8,
          fontFamily: FIGTREE,
          fontSize: 13,
          letterSpacing: 1,
          color: "rgba(32,30,29,0.45)",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
