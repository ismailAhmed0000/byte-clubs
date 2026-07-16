import { TextField } from "@/components/text-field";
import { loginUser } from "@/services/auth-api";
import { setAuthToken } from "@/services/token";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = !submitting && !!email && !!password;

  async function handleLogin() {
    setError(null);
    setSubmitting(true);
    try {
      const { token } = await loginUser({ email, password });
      setAuthToken(token);
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "could not logi");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSkip() {
    setAuthToken("dev-preview-token");
    router.replace("/");
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <SafeAreaView className="w-full max-w-[800px] flex-1 justify-center gap-6 self-center px-6">
        <Text className="text-center text-3xl font-semibold text-black dark:text-white">
          Welcome back
        </Text>

        <View className="gap-4">
          <TextField
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextField
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error && <Text className="text-center text-red-500">{error}</Text>}

          <Pressable
            onPress={handleLogin}
            disabled={!canSubmit}
            className={`items-center rounded-xl py-3 ${canSubmit ? "bg-blue-500 active:opacity-80" : "bg-blue-300"}`}
          >
            <Text className="text-base font-semibold text-white">
              {submitting ? "Logging in......" : "Log in"}
            </Text>
          </Pressable>
        </View>

        <Link href="/register" className="self-center">
          <Text className="text-sm text-blue-500">
            Don&apos;t have an account? Sign up
          </Text>
        </Link>

        <Pressable onPress={handleSkip} className="self-center mt-4">
          <Text>Skip login</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
