import { Ionicons } from "@expo/vector-icons";
import {
  Tabs,
  TabList,
  TabSlot,
  TabTrigger,
  type TabTriggerSlotProps,
} from "expo-router/ui";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ACTIVE_COLOR = "#A0522D";
const INACTIVE_COLOR = "#B9AFA8";

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot />

      <TabList asChild>
        <View style={styles.bar}>
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon="home" label="Home" />
          </TabTrigger>
          <TabTrigger name="recipes" href="/recipes" asChild>
            <TabButton icon="book-outline" label="Recipes" />
          </TabTrigger>
          <TabTrigger name="cart" href="/cart" asChild>
            <TabButton icon="share-outline" label="Share" />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon="person-outline" label="Profile" />
          </TabTrigger>
        </View>
      </TabList>

      <Pressable style={styles.fab} onPress={() => {}}>
        <Ionicons name="add" size={26} color="#fff" />
      </Pressable>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

function TabButton({ icon, label, isFocused, ...props }: TabButtonProps) {
  const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;
  return (
    <Pressable {...props} style={styles.tabButton}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 84,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tabButton: {
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#C1694A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
