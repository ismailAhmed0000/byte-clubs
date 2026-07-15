import { TextInput, TextInputProps } from "react-native";

export function TextField(props: TextInputProps) {
  return (
    <TextInput
      className="rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-base text-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
      placeholderTextColor="#9CA3AF"
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
    />
  );
}
