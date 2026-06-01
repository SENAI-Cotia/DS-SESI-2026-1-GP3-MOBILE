import {Image, ImageBackground, StyleSheet, Text,TouchableOpacity,View,} from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function OnBoarding() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding2");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/fundo1.png")}
      style={styles.Background}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo2.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>
          KINGDOM OF READING
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    Background: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 170,
        height: 170,
        marginBottom: 5,
        color: "rgb(255, 255, 255), 141, 141)"

    },
    title: {
        color: "#fff",
        fontSize: 18,
        letterSpacing: 1,
        fontWeight: "600",
        marginBottom: 20
    },
    button: {
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 12,
    },

    buttonText: {
        color: "#000",
        fontWeight: "700",
        fontSize: 16
    }
})


