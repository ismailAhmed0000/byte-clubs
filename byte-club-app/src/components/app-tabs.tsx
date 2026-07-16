import { Ionicons } from "@expo/vector-icons";
import {
  Tabs,
  TabList,
  TabSlot,
  TabTrigger,
  type TabTriggerSlotProps,
} from "expo-router/ui";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ACTIVE_BG = "#D9814F";
const ACTIVE_COLOR = "#ffffff";
const INACTIVE_COLOR = "#8B7355";

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
            <TabButton icon="restaurant-outline" label="Recipes" />
          </TabTrigger>
          <TabTrigger name="cart" href="/cart" asChild>
            <TabButton icon="sparkles-outline" label="Premium" />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon="settings-outline" label="Settings" />
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
  return (
    <Pressable {...props} style={styles.tabButton}>
      <View style={[styles.tabInner, isFocused && styles.tabInnerActive]}>
        <Ionicons
          name={icon}
          size={20}
          color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
        <Text
          style={[
            styles.label,
            { color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR },
          ]}
          numberOfLines={1}
        >
          {label.toUpperCase()}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 999,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tabButton: {
    flex: 1,
  },
  tabInner: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 16,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  tabInnerActive: {
    backgroundColor: ACTIVE_BG,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  fab: {
    position: "absolute",
    bottom: 120,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: ACTIVE_BG,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
