import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const filters = ["All", "Breakfast", "Dinner", "Dessert"];

const savedRecipes = [
  { id: "1", title: "Miso Sheet-Pan Salmon", author: "Jonas Kade" },
  { id: "2", title: "Charred Broccoli Salad", author: "Priya N." },
  { id: "3", title: "Spiced Chickpea Stew", author: "Maya Lin" },
  { id: "4", title: "Lemon Herb Chicken", author: "Maya Lin" },
  { id: "5", title: "Caramelized Onion Pasta", author: "Jonas Kade" },
  { id: "6", title: "Roasted Tomato Soup", author: "Priya N." },
];

export default function RecipesScreen() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <View className="flex-1 bg-[#EEF0EA]">
      <SafeAreaView className="flex-1">
        <View className="px-5">
          <Text className="mt-2 text-3xl font-bold text-black">
            Saved Recipes
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4"
            contentContainerStyle={{ gap: 8 }}
          >
            {filters.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <Text
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-[#7C9473] text-white"
                      : "bg-white text-neutral-600"
                  }`}
                >
                  {filter}
                </Text>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {savedRecipes.map((recipe) => (
              <View
                key={recipe.id}
                className="w-[48%] overflow-hidden rounded-2xl bg-white"
              >
                <View className="h-28 items-center justify-center bg-[#E3E6DE]">
                  <Text className="text-neutral-400">photo</Text>
                </View>
                <View className="p-3">
                  <Text className="font-semibold text-black" numberOfLines={2}>
                    {recipe.title}
                  </Text>
                  <Text className="mt-0.5 text-sm text-neutral-500">
                    {recipe.author}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
