import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PhotoPlaceholder } from "@/components/photo-placeholder";
import {
  ACCENT_2,
  ACCENT2_200,
  BG,
  CAPRASIMO,
  DIVIDER,
  FIGTREE,
  NEUTRAL_100,
  TEXT,
  TEXT_60,
} from "@/constants/palette";
import { getRecipe, Recipe } from "@/services/recipe-api";

const filters = ["All", "Breakfast", "Dinner", "Dessert"];

export default function RecipesScreen() {
  const [recipes, setRecipe] = useState<Recipe[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    getRecipe()
      .then(setRecipe)
      .catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <View
        style={{
          position: "absolute",
          top: -40,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: ACCENT2_200,
          opacity: 0.55,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 22 }}>
          <Text style={{ fontFamily: CAPRASIMO, fontSize: 30, color: TEXT, marginTop: 6 }}>
            Saved Recipes
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 16 }}
            contentContainerStyle={{ gap: 10 }}
          >
            {filters.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={{
                    borderRadius: 999,
                    paddingHorizontal: 18,
                    paddingVertical: 10,
                    backgroundColor: isActive ? ACCENT_2 : NEUTRAL_100,
                    borderWidth: isActive ? 0 : 1,
                    borderColor: DIVIDER,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FIGTREE,
                      fontSize: 15,
                      color: isActive ? BG : TEXT,
                    }}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 22,
            paddingTop: 18,
            paddingBottom: 170,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 16 }}>
            {recipes.map((recipe) => (
              <Pressable
                key={recipe.ID}
                onPress={() => setSelectedRecipe(recipe)}
                style={{
                  width: "48%",
                  overflow: "hidden",
                  borderRadius: 24,
                  backgroundColor: NEUTRAL_100,
                  shadowColor: "#2E2B25",
                  shadowOpacity: 0.12,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 3,
                }}
              >
                <PhotoPlaceholder height={140} label="photo" />
                <View style={{ paddingHorizontal: 14, paddingVertical: 12 }}>
                  <Text
                    style={{ fontFamily: CAPRASIMO, fontSize: 15, lineHeight: 19, color: TEXT }}
                    numberOfLines={2}
                  >
                    {recipe.title}
                  </Text>
                  <Text style={{ fontFamily: FIGTREE, fontSize: 12, color: TEXT_60, marginTop: 4 }}>
                    {recipe.platform}
                  </Text>
                </View>
              </Pressable>
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
                  backgroundColor: NEUTRAL_100,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  padding: 20,
                  maxHeight: "80%",
                }}
                onPress={(e) => e.stopPropagation()}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={{ fontFamily: CAPRASIMO, fontSize: 20, color: TEXT }}>
                    {selectedRecipe?.title}
                  </Text>

                  <Text style={{ marginTop: 16, fontFamily: CAPRASIMO, fontSize: 16, color: TEXT }}>
                    Ingredients
                  </Text>
                  <Text style={{ marginTop: 4, fontFamily: FIGTREE, fontSize: 14, color: TEXT }}>
                    {selectedRecipe?.ingredients}
                  </Text>

                  <Text style={{ marginTop: 16, fontFamily: CAPRASIMO, fontSize: 16, color: TEXT }}>
                    Instructions
                  </Text>
                  <Text style={{ marginTop: 4, fontFamily: FIGTREE, fontSize: 14, color: TEXT }}>
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
