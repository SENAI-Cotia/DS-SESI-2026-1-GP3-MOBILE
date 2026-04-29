import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Background } from "@react-navigation/elements";



export default function Onboarding() {
    return (
        <ImageBackground
            source={require("../assets/images/fundo1.png")}
            style={styles.Background}
        >
            <View style={styles.container}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.logo}
                />
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    Background: {
        flex: 1,
        width: 500,
        height: 890,
        marginTop: 50,
        marginBottom: -5,
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
        
    }
})

