import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Onboarding2() {
    return (
        <ImageBackground
            source={require("../assets/images/fundo2.png")}
            style={styles.Background}
        >
            <View style={styles.container}>
                <Image
                    source={require("../assets/images/logo2.png")}
                    style={styles.logo}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>DESCUBRA,</Text>
                <Text style={styles.text}>AVALIE</Text>
                <Text style={styles.text}>E COMPARTILHE</Text>
                <Text style={styles.text}>LIVROS.</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/onboarding3")}>
                <AntDesign name="arrow-right" size={27} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.skip} onPress={() => router.push("/login")}>
                <Text style={styles.textSkip}>Skip</Text>
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

    textContainer: {
        marginTop: 90,
        padding: 20
    },
    logo: {
        width: 60,
        height: 60,
        display: "flex",
        justifyContent: "center",
        marginTop: 60

    },
    text: {
        color: "#ffff",
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#3f51b5",
        width: 80,
        height: 80,
        borderRadius: 70,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    arrow: {
        fontSize: 24,

    },

    skip: {
        position: "absolute",
        bottom: 20,
        left: 20,
        marginBottom: 40,
    },
    textSkip: {
        color: "#fff",
        width: 40,
    },


})