import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function Onboarding3() {
    return (
        <ImageBackground
            source={require("../assets/images/fundo3.png")}
            style={styles.Background}
        >
            <View style={styles.container}>
                <Image
                    source={require("../assets/images/logo2.png")}
                    style={styles.logo}
                />
            </View>

            <View style={styles.container}>
                <Image
                    source={require("../assets/images/quadro.png")}
                    style={styles.quadro}
                />
            </View>

            <Text style={styles.subtitle}>
                Participe de desafios, rankings e clubes de leitura</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>




        </ImageBackground>

    );
}

const styles = StyleSheet.create({

    Background: {
        flex: 1,
        padding: 0,
        width: "100%",
        height: "100%"
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 60,
        height: 60,
        alignSelf: "center",
        marginTop: 60
    },
    subtitle: {
        color: "#ddd",
        fontSize: 20,
        top: 130,
        marginLeft: 17

    },

    quadro: {
        width: 400,
        height: 350,
        alignSelf: "center",
        marginTop: 130
    },
    button: {
        width: 240,
        height: 58,
        backgroundColor: "#3f51b5",
        borderRadius: 14,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 160,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "500",
        justifyContent: "center",
    },


})

