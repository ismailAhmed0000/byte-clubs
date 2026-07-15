import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TextField } from "@/components/text-field";
import { registerUser } from "@/services/auth-api";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = !submitting && !!name && !!email && !!password;

  async function handleRegister() {
    setError(null);
    setSubmitting(true);
    try {
      await registerUser({ name, email, password });
      router.replace("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <SafeAreaView className="w-full max-w-[800px] flex-1 justify-center gap-6 self-center px-6">
        <Text className="text-center text-3xl font-semibold text-black dark:text-white">
          Create account
        </Text>

        <View className="gap-4">
          <TextField
            placeholder="Name"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
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
            onPress={handleRegister}
            disabled={!canSubmit}
            className={`items-center rounded-xl py-3 ${canSubmit ? "bg-blue-500 active:opacity-80" : "bg-blue-300"}`}
          >
            <Text className="text-base font-semibold text-white">
              {submitting ? "Creating account…" : "Sign up"}
            </Text>
          </Pressable>
        </View>

        <Link href="/login" className="self-center">
          <Text className="text-sm text-blue-500">
            Already have an account? Log in
          </Text>
        </Link>
      </SafeAreaView>
    </View>
  );
}
