import { View } from "react-native";

import { DIVIDER } from "@/constants/palette";

export function RuledLines({ color = DIVIDER, count = 24 }: { color?: string; count?: number }) {
  return (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={{ height: 38, borderBottomWidth: 1, borderColor: color }} />
      ))}
    </View>
  );
}
