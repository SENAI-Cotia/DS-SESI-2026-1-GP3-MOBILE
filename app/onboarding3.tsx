import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
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
                    source={require("../assets/images/books.png")}
                    style={styles.books}
                />
            </View>


            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Descubra novos livros através do nosso app</Text>

                <Text style={styles.subtitle}>
                    Veja recomendações e encontre o que sua escola está lendo.</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/onboarding4")}>
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
        marginTop: 30,

    },
    logo: {
        width: 60,
        height: 60,
        alignSelf: "center",
        marginTop: 60
    },
    title: {
        color: "#fff",
        fontSize: 35,
        fontWeight: "bold",
        top: 20,
        marginLeft: 15
    },
    subtitle: {
        color: "#ddd",
        fontSize: 20,
        top: 40,
        marginLeft: 15

    },

    books: {
        width: 350,
        height: 300,
        alignSelf: "center",
        marginTop: 80
    },
    text: {
        color: "#ffff",
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#3f51b5",
        width: 60,
        height: 60,
        borderRadius: 70,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        left: 300,
        top: 130
    },
    arrow: {
        fontSize: 60,
        right: 40,

    },

    skip: {
        position: "absolute",
        bottom: 40,
        left: 20,
        marginBottom: 40,
    },
    textSkip: {
        color: "#fff",
        width: 40,


    },


})