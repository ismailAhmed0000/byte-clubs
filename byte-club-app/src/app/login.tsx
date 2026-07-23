import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle, Line, Path, Svg } from "react-native-svg";

import { TextField } from "@/components/text-field";
import { loginUser, registerUser } from "@/services/auth-api";
import { setAuthToken } from "@/services/token";

type Mode = "login" | "register";

const BG = "#F5EAD8";
const SURFACE = "#EBDDC5";
const TEXT = "#201E1D";
const ACCENT = "#C67139";
const ACCENT_700 = "#8C491A";
const ACCENT_200 = "#FFE1D0";
const ACCENT2_200 = "#E1EECC";
const NEUTRAL_100 = "#F9F4ED";
const NEUTRAL_800 = "#474238";
const DIVIDER = "rgba(32,30,29,0.16)";
const TEXT_60 = "rgba(32,30,29,0.6)";

const CAPRASIMO = "Caprasimo_400Regular";
const FIGTREE = "Figtree_400Regular";

function ForkMark() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M3 3v18" stroke={BG} strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M3 3c4 0 7 2 7 7s-3 7-7 7"
        stroke={BG}
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 3c-4 0-7 2-7 7s3 7 7 7"
        stroke={BG}
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function RingMark() {
  return (
    <Svg width={24} height={32} viewBox="0 0 26 34">
      <Path
        d="M4 14 A9 9 0 1 1 22 14"
        fill="none"
        stroke={NEUTRAL_800}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Line x1={4} y1={14} x2={4} y2={29} stroke={NEUTRAL_800} strokeWidth={2.5} strokeLinecap="round" />
      <Circle cx={4} cy={30} r={2} fill={NEUTRAL_800} />
    </Svg>
  );
}

function RuledLines() {
  return (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <View key={i} style={{ height: 38, borderBottomWidth: 1, borderColor: DIVIDER }} />
      ))}
    </View>
  );
}

export default function LoginScreen() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isLogin = mode === "login";
  const passwordsMatch = confirmPassword === password;
  const canSubmit =
    !submitting &&
    !!email &&
    !!password &&
    (isLogin || (!!name && !!confirmPassword && passwordsMatch));

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
  }

  async function handleLogin() {
    setError(null);
    setSubmitting(true);
    try {
      const { token } = await loginUser({ email, password });
      setAuthToken(token);
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not log in");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRegister() {
    setError(null);
    setSubmitting(true);
    try {
      await registerUser({ name, email, password });
      const { token } = await loginUser({ email, password });
      setAuthToken(token);
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSkip() {
    setAuthToken("dev-preview-token");
    router.replace("/");
  }

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View
            style={{ flex: 1, width: "100%", maxWidth: 480, alignSelf: "center", position: "relative" }}
          >
            <View
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 180,
                height: 180,
                borderRadius: 90,
                backgroundColor: ACCENT_200,
                opacity: 0.7,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 40,
                left: -40,
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: ACCENT2_200,
                opacity: 0.6,
              }}
            />

            {/* header */}
            <View style={{ paddingTop: 20, paddingHorizontal: 28 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 16,
                  backgroundColor: ACCENT,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                <ForkMark />
              </View>
              <Text style={{ fontFamily: "Caveat_700Bold", fontSize: 38, color: "#000", marginBottom: 4 }}>
                Byte Club
              </Text>
              <Text style={{ fontFamily: FIGTREE, fontSize: 13, color: TEXT_60 }}>
                Your recipes, written down.
              </Text>
            </View>

            {/* body */}
            <View style={{ flex: 1, paddingTop: 24, paddingHorizontal: 22, paddingBottom: 24 }}>
              <View style={{ flex: 1, position: "relative", paddingTop: 16 }}>
                <View
                  style={{
                    position: "absolute",
                    top: 22,
                    left: -6,
                    right: -10,
                    bottom: -8,
                    backgroundColor: ACCENT_700,
                    borderRadius: 28,
                    transform: [{ rotate: "1.2deg" }],
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    position: "relative",
                    backgroundColor: NEUTRAL_100,
                    borderRadius: 32,
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
                      paddingHorizontal: 20,
                      marginTop: -22,
                    }}
                  >
                    {Array.from({ length: 7 }).map((_, i) => (
                      <RingMark key={i} />
                    ))}
                  </View>

                  <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 22, paddingBottom: 22 }}>
                    {/* tab switcher */}
                    <View
                      style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: DIVIDER,
                        borderRadius: 999,
                        overflow: "hidden",
                        marginBottom: 18,
                      }}
                    >
                      <Pressable
                        onPress={() => switchMode("login")}
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          paddingVertical: 7,
                          backgroundColor: isLogin ? ACCENT : "transparent",
                        }}
                      >
                        <Text style={{ fontFamily: FIGTREE, fontSize: 13, color: isLogin ? BG : TEXT }}>
                          Log in
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => switchMode("register")}
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          paddingVertical: 7,
                          backgroundColor: !isLogin ? ACCENT : "transparent",
                        }}
                      >
                        <Text style={{ fontFamily: FIGTREE, fontSize: 13, color: !isLogin ? BG : TEXT }}>
                          Register
                        </Text>
                      </Pressable>
                    </View>

                    {/* ruled notebook area: fields sit on top of a repeating line backdrop */}
                    <View style={{ flex: 1, position: "relative" }}>
                      <RuledLines />

                      <View>
                        {!isLogin && (
                          <TextField
                            label="Name"
                            placeholder="Ada Lovelace"
                            autoCapitalize="words"
                            marginBottom={14}
                            value={name}
                            onChangeText={setName}
                          />
                        )}

                        <TextField
                          label="Email"
                          placeholder="you@example.com"
                          keyboardType="email-address"
                          marginBottom={14}
                          value={email}
                          onChangeText={setEmail}
                        />

                        <TextField
                          label="Password"
                          placeholder="••••••••"
                          secureTextEntry
                          marginBottom={isLogin ? 6 : 14}
                          value={password}
                          onChangeText={setPassword}
                        />

                        {!isLogin && (
                          <TextField
                            label="Confirm password"
                            placeholder="••••••••"
                            secureTextEntry
                            marginBottom={14}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                          />
                        )}

                        {isLogin && (
                          <Pressable style={{ alignSelf: "flex-start" }}>
                            <Text
                              style={{
                                fontFamily: CAPRASIMO,
                                fontSize: 12,
                                color: ACCENT,
                                marginBottom: 4,
                              }}
                            >
                              Forgot password?
                            </Text>
                          </Pressable>
                        )}

                        {!isLogin && confirmPassword.length > 0 && !passwordsMatch && (
                          <Text style={{ fontFamily: FIGTREE, fontSize: 12, color: "#B3261E" }}>
                            Passwords don&apos;t match
                          </Text>
                        )}

                        {error && (
                          <Text style={{ fontFamily: FIGTREE, fontSize: 12, color: "#B3261E" }}>
                            {error}
                          </Text>
                        )}
                      </View>
                    </View>

                    <Pressable
                      onPress={isLogin ? handleLogin : handleRegister}
                      disabled={!canSubmit}
                      style={{
                        height: 46,
                        borderRadius: 999,
                        backgroundColor: ACCENT,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 9,
                      }}
                    >
                      <Text style={{ fontFamily: CAPRASIMO, fontSize: 15, color: BG }}>
                        {submitting
                          ? isLogin
                            ? "Logging in…"
                            : "Creating account…"
                          : isLogin
                            ? "Log in"
                            : "Create account"}
                      </Text>
                    </Pressable>

                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 14 }}>
                      <Text style={{ fontFamily: FIGTREE, fontSize: 12, color: TEXT_60 }}>
                        {isLogin ? "New to Byte Club? " : "Already have an account? "}
                      </Text>
                      <Pressable onPress={() => switchMode(isLogin ? "register" : "login")}>
                        <Text style={{ fontFamily: FIGTREE, fontSize: 12, color: ACCENT }}>
                          {isLogin ? "Register" : "Log in"}
                        </Text>
                      </Pressable>
                    </View>

                    <Pressable onPress={handleSkip} style={{ alignSelf: "center", marginTop: 8 }}>
                      <Text style={{ fontFamily: FIGTREE, fontSize: 11, color: TEXT_60 }}>Skip login</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
