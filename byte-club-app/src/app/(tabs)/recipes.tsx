import { getRecipe, Recipe } from "@/services/recipe-api";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const filters = ["All", "Breakfast", "Dinner", "Dessert"];

export default function RecipesScreen() {
  const [recipes, setRecipe] = useState<Recipe[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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
          <Modal
            visible={!!selectedRecipe}
            animationType="slide"
            transparent
            onRequestClose={() => setSelectedRecipe(null)}
          >
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.4)",
                justifyContent: "flex-end",
              }}
              onPress={() => setSelectedRecipe(null)}
            >
              <Pressable
                style={{
                  backgroundColor: "#F6EFE8",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  padding: 20,
                  maxHeight: "80%",
                }}
                onPress={(e) => e.stopPropagation()}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={{ fontSize: 20, fontWeight: "700" }}>
                    {selectedRecipe?.title}
                  </Text>

                  <Text
                    style={{ marginTop: 16, fontSize: 16, fontWeight: "700" }}
                  >
                    Ingredients
                  </Text>
                  <Text style={{ marginTop: 4, color: "#374151" }}>
                    {selectedRecipe?.ingredients}
                  </Text>

                  <Text
                    style={{ marginTop: 16, fontSize: 16, fontWeight: "700" }}
                  >
                    Instructions
                  </Text>
                  <Text style={{ marginTop: 4, color: "#374151" }}>
                    {selectedRecipe?.instructions}
                  </Text>
                </ScrollView>
              </Pressable>
            </Pressable>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
