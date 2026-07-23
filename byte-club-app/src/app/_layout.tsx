import { Caprasimo_400Regular, useFonts as useCaprasimoFonts } from "@expo-google-fonts/caprasimo";
import { Caveat_700Bold, useFonts as useCaveatFonts } from "@expo-google-fonts/caveat";
import { Figtree_400Regular, Figtree_600SemiBold, useFonts as useFigtreeFonts } from "@expo-google-fonts/figtree";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useSyncExternalStore } from "react";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { getAuthToken, subscribeAuthToken } from "@/services/token";

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const token = useSyncExternalStore(subscribeAuthToken, getAuthToken, getAuthToken);
  const [caveatLoaded] = useCaveatFonts({ Caveat_700Bold });
  const [caprasimoLoaded] = useCaprasimoFonts({ Caprasimo_400Regular });
  const [figtreeLoaded] = useFigtreeFonts({ Figtree_400Regular, Figtree_600SemiBold });

  if (!caveatLoaded || !caprasimoLoaded || !figtreeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!token}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>

        <Stack.Protected guard={!token}>
          <Stack.Screen name="login" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
