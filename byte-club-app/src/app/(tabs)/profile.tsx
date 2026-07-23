import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { setAuthToken } from "@/services/token";

function handleLogout() {
  setAuthToken(null);
  router.replace("/login");
}

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-[#EEF0EA]">
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 170 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="mt-2 text-3xl font-bold text-black">Profile</Text>

          <View className="mt-6 items-center rounded-2xl bg-white p-6">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-[#DCE3D3]">
              <Ionicons name="person" size={36} color="#6B7280" />
            </View>
            <Text className="mt-3 text-lg font-semibold text-black">
              Your Name
            </Text>
            <Text className="mt-0.5 text-sm text-neutral-500">
              you@example.com
            </Text>
          </View>

          <View className="mt-4 overflow-hidden rounded-2xl bg-white">
            <ProfileRow icon="settings-outline" label="Settings" />
            <ProfileRow icon="help-circle-outline" label="Help & Support" />
            <ProfileRow
              icon="information-circle-outline"
              label="About"
              isLast
            />
          </View>

          <Pressable
            onPress={handleLogout}
            className="mt-4 items-center rounded-2xl bg-white p-4 active:opacity-70"
          >
            <Text className="font-semibold text-red-500">Log out</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ProfileRow({
  icon,
  label,
  isLast,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isLast?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center gap-3 p-4 ${isLast ? "" : "border-b border-neutral-100"}`}
    >
      <Ionicons name={icon} size={20} color="#6B7280" />
      <Text className="flex-1 text-black">{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
    </View>
  );
}
