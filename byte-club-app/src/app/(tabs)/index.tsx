import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

// const folders = [
//   { id: "weeknight", name: "Weeknight", count: 6 },
//   { id: "baking", name: "Baking", count: 4 },
// ];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#EEF0EA]">
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            className="mt-2 text-3xl font-bold italic"
            style={{
              color: "#B4713F",
              fontFamily: Platform.select({
                ios: "Georgia",
                android: "serif",
                default: "serif",
              }),
            }}
          >
            Byte Club
          </Text>
          <Text className="flex-1 mt-2 text-sm font-bold text-black ">
            ismaeelahmed@20gmail.com
          </Text>
          <View className="mt-4 flex-row items-center gap-2 rounded-full bg-white px-5 py-2">
            <Ionicons name="search-outline" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search saved recipes..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-base italic text-black"
            />
          </View>

          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-black">Folders</Text>
            <Text className="text-sm text-neutral-500">See all</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
            contentContainerStyle={{ gap: 12 }}
          >
            <View className="h-24 w-28 items-center justify-center rounded-2xl bg-white">
              <Ionicons name="add" size={22} color="#6B7280" />
            </View>

            {/* {folders.map((folder) => (
              <View
                key={folder.id}
                className="h-24 w-32 justify-end rounded-2xl bg-[#DCE3D3] p-3"
              >
                <Text className="font-semibold text-black">{folder.name}</Text>
                <Text className="text-xs text-neutral-600">
                  {folder.count} recipes
                </Text>
              </View>
            ))} */}
          </ScrollView>

          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-black">
              Recently Added
            </Text>
            <Text className="text-sm text-neutral-500">See all</Text>
          </View>

          <View className="mt-3 gap-4">
            {/* {recentlyAdded.map((recipe) => (
              <View
                key={recipe.id}
                className="overflow-hidden rounded-2xl bg-white"
              >
                <View className="h-40 items-center justify-center bg-[#E3E6DE]">
                  <Text className="text-neutral-400">recipe photo</Text>
                </View>
                <View className="p-3">
                  <Text className="font-semibold text-black">
                    {recipe.title}
                  </Text>
                  <Text className="mt-0.5 text-sm text-neutral-500">
                    by {recipe.author} · {recipe.time}
                  </Text>
                </View>
              </View>
            ))} */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
