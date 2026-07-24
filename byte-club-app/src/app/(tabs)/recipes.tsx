import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { RingMark } from "@/components/ring-mark";
import {
  ACCENT_2,
  ACCENT_700,
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

function splitLines(value: string | undefined) {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function DetailRow({ text, last }: { text: string; last?: boolean }) {
  return (
    <Text
      style={{
        fontFamily: FIGTREE,
        fontSize: 14,
        lineHeight: 19,
        color: TEXT,
        paddingVertical: 9,
        borderBottomWidth: last ? 0 : 1,
        borderColor: DIVIDER,
      }}
    >
      {text}
    </Text>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <Text
      style={{
        marginTop: 14,
        fontFamily: CAPRASIMO,
        fontSize: 16,
        color: TEXT,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: DIVIDER,
      }}
    >
      {children}
    </Text>
  );
}

const filters = ["All", "Breakfast", "Dinner", "Dessert"];

export default function RecipesScreen() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const sheetHeight = Math.round(windowHeight * 0.7);
  const [recipes, setRecipe] = useState<Recipe[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const ingredientLines = splitLines(selectedRecipe?.ingredients);
  const instructionLines = splitLines(selectedRecipe?.instructions);

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
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              {/* backdrop is a sibling behind the sheet, not a wrapping parent, so it
                  never intercepts touches that land on the sheet — no stopPropagation
                  needed, and the ScrollView below is free to claim its own drag gestures */}
              <Pressable
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
                onPress={() => setSelectedRecipe(null)}
              />

              <View style={{ height: sheetHeight, paddingTop: 22 }}>
                {/* russet sheet peeking out behind the card */}
                <View
                  style={{
                    position: "absolute",
                    top: 20,
                    left: -6,
                    right: -10,
                    bottom: 0,
                    backgroundColor: ACCENT_700,
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28,
                    transform: [{ rotate: "1deg" }],
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    minHeight: 0,
                    backgroundColor: NEUTRAL_100,
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    overflow: "hidden",
                    shadowColor: "#2E2B25",
                    shadowOpacity: 0.22,
                    shadowRadius: 16,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 8,
                  }}
                >
                  {/* binder holes, pulled up so only the pin-tips peek over the top edge */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 24,
                      marginTop: -22,
                    }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <RingMark key={i} />
                    ))}
                  </View>

                  <ScrollView
                    style={{ flex: 1, minHeight: 0 }}
                    contentContainerStyle={{
                      paddingTop: 12,
                      paddingHorizontal: 22,
                      paddingBottom: 22 + insets.bottom,
                    }}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                  >
                    <Text
                      style={{
                        fontFamily: CAPRASIMO,
                        fontSize: 19,
                        lineHeight: 23,
                        color: TEXT,
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        borderColor: DIVIDER,
                      }}
                    >
                      {selectedRecipe?.title}
                    </Text>

                    <SectionTitle>Ingredients</SectionTitle>
                    {ingredientLines.map((line, i) => (
                      <DetailRow key={i} text={line} last={i === ingredientLines.length - 1} />
                    ))}

                    <SectionTitle>Instructions</SectionTitle>
                    {instructionLines.map((line, i) => (
                      <DetailRow key={i} text={line} last={i === instructionLines.length - 1} />
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
