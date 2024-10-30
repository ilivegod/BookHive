import { Text, View } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <ThemedText onPress={() => router.push("/(home)")}>Home</ThemedText>
      </View>
    </View>
  );
}
