import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function Favoritos() {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.setaButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.header}>

                <Image 
                    source={require("../assets/images/logo2.png")}
                    style={styles.logo}
                />

                <Text style={styles.title}>Favoritos</Text>

            </View>

            <TouchableOpacity style={styles.filterButton}>

                <Text style={styles.filterText}>
                    Filtrar por
                </Text>

                <Image
                    source={require("../assets/images/filtro.svg")}
                    style={styles.filterIcon}
                />

            </TouchableOpacity>

            <View style={styles.booksContainer}>
                <View style={styles.row}>
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                </View>

                <View style={styles.row}>
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                </View>

            </View>

        </View>
    );
}

function BookCard() {
    return (
        <View style={styles.bookCard}>

            <View>
                <Image
                    source={{
                        uri: "https://cdn.atenaeditora.com.br/atenaeditora/documentos/ebook_imagem/202208/a8a244dbe99cf56a358c16ddb17a1027a726a989.png",
                    }}
                    style={styles.livroImage}
                />

                <Text style={styles.coracao}>❤</Text>
            </View>


            <View style={styles.estrelasContainer}>

                <EvilIcons name="star" size={16} color="black" />
                <EvilIcons name="star" size={16} color="black" />
                <EvilIcons name="star" size={16} color="black" />
                <EvilIcons name="star" size={16} color="black" />
                <EvilIcons name="star" size={16} color="black" />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
    },

    setaButton: {
        marginTop: 45,
        marginLeft: 12,
    },

    header: {
        alignItems: "center",
        marginTop: -8,
    },

    logo: {
        width: 62,
        height: 62,
        resizeMode: "contain",
        marginBottom: 2,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
    },

    filterButton: {
        width: 115,
        height: 33,

        marginTop: 20,
        marginLeft: 20,

        backgroundColor: "#FFF",

        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 4,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    filterText: {
        fontSize: 14,
        color: "#666",
        marginRight: 5,
    },

    filterIcon: {
        width: 15,
        height: 15,
        resizeMode: "contain",
    },

    booksContainer: {
        marginTop: 15,
        paddingHorizontal: 6,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 24,
    },

    bookCard: {
        alignItems: "center",
    },

    livroImage: {
        width: 86,
        height: 126,
        borderRadius: 2,
    },

    coracao: {
        position: "absolute",
        top: -1,
        right: 3,
        color: "#d6565d",
        fontSize: 16,
    },

    estrelasContainer: {
        flexDirection: "row-reverse",
        marginTop: 3,
    },

});