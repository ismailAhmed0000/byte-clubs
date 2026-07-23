import { Text, TextInput, TextInputProps, View } from "react-native";

const TEXT = "#201E1D";
const SURFACE = "#EBDDC5";
const DIVIDER = "rgba(32,30,29,0.16)";

type Props = TextInputProps & {
  label?: string;
  marginBottom?: number;
};

export function TextField({ label, marginBottom = 0, ...props }: Props) {
  return (
    <View style={{ marginBottom }}>
      {label && (
        <Text style={{ fontSize: 12, marginBottom: 5, color: "rgba(32,30,29,0.7)" }}>
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor="rgba(32,30,29,0.45)"
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          minHeight: 36,
          paddingVertical: 6,
          paddingHorizontal: 14,
          fontSize: 14,
          color: TEXT,
          backgroundColor: SURFACE,
          borderWidth: 1,
          borderColor: DIVIDER,
          borderRadius: 999,
          fontFamily: "Figtree_400Regular",
        }}
        {...props}
      />
    </View>
  );
}
