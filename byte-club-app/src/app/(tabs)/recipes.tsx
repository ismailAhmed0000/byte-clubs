import { getRecipe, Recipe } from "@/services/recipe-api";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const filters = ["All", "Breakfast", "Dinner", "Dessert"];

export default function RecipesScreen() {
  const [recipes, setRecipe] = useState<Recipe[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    getRecipe()
      .then(setRecipe)
      .catch(() => {});
  });

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
            {recipes.map((recipe) => (
              <View
                key={recipe.ID}
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
                    {recipe.platform}
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
