import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();
    return (
        <ScrollView>
            <View>
                <Image style={style.logo} source={require('../../assets/images/KOR logo.png')} />
                <Text style={style.title}>Kingdom of Reading</Text>
                <View style={style.card}>
                    <View style={style.cardContent}>
                        <Text style={style.cardTitle}>*Titulo do livro*</Text>
                        <Text style={style.cardText}>*Usuario*</Text>
                    </View>
                    <View style={style.cardContent2}>
                        <Image style={style.cardImage} source={require('../../assets/images/mini_magick20231122-1-g461k5.png')} />
                        <Text style={style.cardText2}>*Estrelas*</Text>
                        <Text style={style.coment}>*Comentario*</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
const style = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        marginTop: 50,
        marginBottom: -5,
        alignSelf: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#fff",
        flex: 1,
        borderTopColor: "#d4d4d4",
        borderBottomColor: "#d4d4d4",
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        marginLeft: 4,
    },
    cardText: {
        fontSize: 16,
        paddingVertical: 4,
        marginRight: 10,
    },
    cardText2: {
        fontSize: 16,
        marginBottom: 5,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
    },
    cardContent2: {
        flexDirection: "row",
    },
    coment: {
        fontSize: 14,
        marginBottom: 5,
        marginLeft: 150,
    },
    cardImage: {
        marginBottom: 5,
        marginRight: 10,
        resizeMode: "contain",
        width: 150,
        height: 150,
    },


});