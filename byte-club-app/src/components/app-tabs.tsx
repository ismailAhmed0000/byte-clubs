import { Ionicons } from "@expo/vector-icons";
import { Tabs, TabList, TabSlot, TabTrigger, type TabTriggerSlotProps } from "expo-router/ui";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ForkMark } from "@/components/fork-mark";
import { RingMark } from "@/components/ring-mark";
import { RuledLines } from "@/components/ruled-lines";
import {
  ACCENT,
  ACCENT_700,
  BG,
  CAPRASIMO,
  DIVIDER,
  FIGTREE,
  FIGTREE_SEMIBOLD,
  NEUTRAL_100,
  NEUTRAL_600,
  SURFACE,
  TEXT,
  TEXT_60,
} from "@/constants/palette";
import { extractRecipe, saveRecipe } from "@/services/recipe-api";

const BAR_TOP_PADDING = 14;
const BAR_ICON_ROW_HEIGHT = 68;

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  const [importVisible, setImportVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const barHeight = BAR_TOP_PADDING + BAR_ICON_ROW_HEIGHT + insets.bottom;

  async function handleRunExtractor() {
    setError(null);
    setSubmitting(true);
    try {
      const extracted = await extractRecipe(url);
      await saveRecipe({
        source_url: url,
        platform: url.includes("tiktok.com") ? "tiktok" : "instagram",
        title: extracted.title,
        ingredients: extracted.ingredients.join("\n"),
        instructions: extracted.instructions.join("\n"),
      });
      setImportVisible(false);
      setUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "could not extract recipe");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Tabs>
      <TabSlot />

      <TabList asChild>
        <View
          style={StyleSheet.flatten([
            styles.bar,
            { paddingTop: BAR_TOP_PADDING, paddingBottom: insets.bottom },
          ])}
        >
          <TabTrigger name="index" href="/" asChild>
            <TabButton kind="home" label="Home" />
          </TabTrigger>
          <TabTrigger name="recipes" href="/recipes" asChild>
            <TabButton kind="recipes" label="Recipes" />
          </TabTrigger>
          <TabTrigger name="cart" href="/cart" asChild>
            <TabButton kind="premium" label="Premium" />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton kind="settings" label="Settings" />
          </TabTrigger>
        </View>
      </TabList>

      <Pressable
        style={[styles.fab, { bottom: barHeight + 16 }]}
        onPress={() => setImportVisible(true)}
      >
        <Ionicons name="add" size={26} color={BG} />
      </Pressable>

      <Modal
        visible={importVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setImportVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "flex-end",
          }}
          onPress={() => setImportVisible(false)}
        >
          <Pressable style={{ paddingTop: 22 }} onPress={(e) => e.stopPropagation()}>
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
                position: "relative",
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

              <View
                style={{
                  position: "relative",
                  paddingTop: 12,
                  paddingHorizontal: 22,
                  paddingBottom: 22 + insets.bottom,
                }}
              >
                <RuledLines count={10} />

                <Text style={{ fontFamily: CAPRASIMO, fontSize: 22, color: TEXT }}>
                  Import from Socials
                </Text>
                <Text style={{ marginTop: 8, fontFamily: FIGTREE, fontSize: 15, lineHeight: 21, color: TEXT_60 }}>
                  Paste a TikTok or Instagram Reel link and we&apos;ll extract the
                  recipe using AI.
                </Text>

                <TextInput
                  placeholder="Paste a TikTok or Instagram Reel link"
                  placeholderTextColor={TEXT_60}
                  value={url}
                  onChangeText={setUrl}
                  style={{
                    marginTop: 18,
                    backgroundColor: SURFACE,
                    borderRadius: 999,
                    paddingHorizontal: 18,
                    paddingVertical: 14,
                    fontFamily: FIGTREE,
                    fontSize: 15,
                    color: TEXT,
                  }}
                />

                {error && (
                  <Text style={{ color: "#B3261E", fontFamily: FIGTREE, fontSize: 13, marginTop: 8 }}>
                    {error}
                  </Text>
                )}

                <Pressable
                  onPress={handleRunExtractor}
                  disabled={submitting || !url}
                  style={{
                    marginTop: 16,
                    height: 50,
                    borderRadius: 999,
                    backgroundColor: ACCENT,
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: submitting || !url ? 0.45 : 1,
                  }}
                >
                  <Text style={{ color: BG, fontFamily: CAPRASIMO, fontSize: 15 }}>
                    {submitting ? "Running..." : "Run extractor"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Tabs>
  );
}

type TabKind = "home" | "recipes" | "premium" | "settings";

const ICONS: Record<TabKind, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  home: { active: "home", inactive: "home-outline" },
  recipes: { active: "restaurant", inactive: "restaurant-outline" },
  premium: { active: "sparkles", inactive: "sparkles-outline" },
  settings: { active: "settings", inactive: "settings-outline" },
};

type TabButtonProps = TabTriggerSlotProps & {
  kind: TabKind;
  label: string;
};

function TabButton({ kind, label, isFocused, ...props }: TabButtonProps) {
  return (
    <Pressable {...props} style={styles.tabButton}>
      <View style={[styles.badge, isFocused && { backgroundColor: ACCENT }]}>
        {kind === "recipes" ? (
          <ForkMark size={22} color={isFocused ? BG : NEUTRAL_600} />
        ) : (
          <Ionicons
            name={isFocused ? ICONS[kind].active : ICONS[kind].inactive}
            size={24}
            color={isFocused ? BG : NEUTRAL_600}
          />
        )}
      </View>
      <Text
        style={{
          marginTop: 6,
          fontFamily: isFocused ? FIGTREE_SEMIBOLD : FIGTREE,
          fontSize: 13,
          color: isFocused ? TEXT : NEUTRAL_600,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: BG,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderTopColor: DIVIDER,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  badge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  fab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2E2B25",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
