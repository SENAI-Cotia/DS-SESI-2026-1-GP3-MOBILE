import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter();

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <TouchableOpacity
        onPress={() => router.push("/login")}  >
        <Text>Open Modal</Text>
      </TouchableOpacity>
    </View>
  );
}
