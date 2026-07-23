import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PhotoPlaceholder } from "@/components/photo-placeholder";
import {
  ACCENT,
  ACCENT_200,
  ACCENT2_200,
  BG,
  CAPRASIMO,
  CAVEAT,
  FIGTREE,
  FIGTREE_SEMIBOLD,
  NEUTRAL_100,
  NEUTRAL_400,
  TEXT,
  TEXT_60,
} from "@/constants/palette";
import { getCurrentUser } from "@/services/auth-api";
import { getRecentRecipes, Recipe } from "@/services/recipe-api";

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text style={{ fontFamily: CAPRASIMO, fontSize: 21, color: TEXT }}>{title}</Text>
      <Text
        onPress={onSeeAll}
        style={{ fontFamily: FIGTREE, fontSize: 14, color: ACCENT, textDecorationLine: "underline" }}
      >
        See all
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [recentlyAdded, setRecentlyAdded] = useState<Recipe[]>([]);

  useEffect(() => {
    getCurrentUser()
      .then((user) => setEmail(user.email))
      .catch(() => {});
  }, []);

  useEffect(() => {
    getRecentRecipes(2)
      .then(setRecentlyAdded)
      .catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <View
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: ACCENT_200,
          opacity: 0.6,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 140,
          left: -50,
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: ACCENT2_200,
          opacity: 0.5,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 170 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontFamily: CAVEAT, fontSize: 36, color: ACCENT, marginTop: 8 }}>
            Byte Club
          </Text>
          <Text style={{ fontFamily: FIGTREE_SEMIBOLD, fontSize: 15, color: TEXT, marginTop: 2 }}>
            {email}
          </Text>

          <View
            style={{
              marginTop: 18,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              borderRadius: 999,
              backgroundColor: NEUTRAL_100,
              paddingHorizontal: 18,
              paddingVertical: 12,
            }}
          >
            <Ionicons name="search-outline" size={18} color={NEUTRAL_400} />
            <TextInput
              placeholder="Search saved recipes..."
              placeholderTextColor={TEXT_60}
              style={{ flex: 1, fontFamily: FIGTREE, fontSize: 15, color: TEXT }}
            />
          </View>

          <View style={{ marginTop: 26 }}>
            <SectionHeader title="Folders" />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 14 }}
            contentContainerStyle={{ gap: 14 }}
          >
            <View
              style={{
                height: 92,
                width: 92,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 24,
                borderWidth: 1.5,
                borderStyle: "dashed",
                borderColor: NEUTRAL_400,
                backgroundColor: NEUTRAL_100,
              }}
            >
              <Ionicons name="add" size={24} color={NEUTRAL_400} />
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

          <View style={{ marginTop: 26 }}>
            <SectionHeader title="Recently Added" />
          </View>

          <View style={{ marginTop: 14, gap: 18 }}>
            {recentlyAdded.map((recipe) => (
              <View
                key={recipe.ID}
                style={{
                  overflow: "hidden",
                  borderRadius: 28,
                  backgroundColor: NEUTRAL_100,
                  shadowColor: "#2E2B25",
                  shadowOpacity: 0.12,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 3,
                }}
              >
                <PhotoPlaceholder />
                <View style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
                  <Text style={{ fontFamily: CAPRASIMO, fontSize: 17, color: TEXT }}>
                    {recipe.title}
                  </Text>
                  <Text style={{ fontFamily: FIGTREE, fontSize: 13, color: TEXT_60, marginTop: 2 }}>
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
