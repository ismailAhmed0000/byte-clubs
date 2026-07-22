import { extractRecipe, saveRecipe } from "@/services/recipe-api";
import { Ionicons } from "@expo/vector-icons";
import {
  Tabs,
  TabList,
  TabSlot,
  TabTrigger,
  type TabTriggerSlotProps,
} from "expo-router/ui";
import { use, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ACTIVE_BG = "#D9814F";
const ACTIVE_COLOR = "#ffffff";
const INACTIVE_COLOR = "#8B7355";

export default function AppTabs() {
  const [importVisible, setImportVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      <Pressable style={styles.fab} onPress={() => setImportVisible(true)}>
        <Ionicons name="add" size={26} color="#fff" />
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
          <Pressable
            style={{
              backgroundColor: "#F6EFE8",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 20,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              Import from Socials
            </Text>
            <Text style={{ marginTop: 6, color: "#6B7280" }}>
              Paste a TikTok or Instagram Reel link and we&apos;ll extract the
              recipe using AI.
            </Text>

            <TextInput
              placeholder="Paste a TikTok or Instagram Reel link"
              value={url}
              onChangeText={setUrl}
              style={{
                marginTop: 16,
                backgroundColor: "#fff",
                borderRadius: 999,
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            />

            {error && (
              <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>
            )}

            <Pressable
              onPress={handleRunExtractor}
              disabled={submitting || !url}
              style={{
                marginTop: 16,
                backgroundColor: ACTIVE_BG,
                borderRadius: 999,
                paddingVertical: 14,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                {submitting ? "Running..." : "Run extractor"}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
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
