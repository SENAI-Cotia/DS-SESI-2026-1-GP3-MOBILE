import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter();

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
 <TouchableOpacity
        onPress={() => router.push("/login")}  >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/cadastro")}  >
        <Text>Cadastro</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/onboarding1")}  >
        <Text>Onboarding</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/onboarding2")}  >
        <Text>Onboarding2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/onboarding3")}  >
        <Text>Onboarding3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/onboarding4")}  >
        <Text>Onboarding4</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/onboarding5")}  >
        <Text>Onboarding5</Text>
      </TouchableOpacity>
    </View>
  );
}
