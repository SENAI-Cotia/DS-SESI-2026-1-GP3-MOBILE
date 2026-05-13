import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";



export default function Index() {
    const router = useRouter();
    return (
        
        <View style={style.container}>

            <View style={style.card}>

                <Image source={require("../assets/images/KOR logo.png")} style={style.logo} />

                <Text style={style.Title}>Login</Text>


                <Text style={style.label}>E-mail ou CPF</Text>
                <TextInput style={style.input} placeholder="E-mail/CPF" placeholderTextColor="#999" />

                <Text style={style.label}>Senha</Text>
                <TextInput style={style.input} placeholder="Senha" placeholderTextColor="#999" secureTextEntry={true} />
                <TouchableOpacity>
                    <Text style={style.link}>Esqueci minha senha</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/inicial")}>
                    <View style={style.button}>
                        <Text style={style.textButton}>Entrar</Text>
                    </View>
                </TouchableOpacity>
                <Text style={style.labelCentral}>Não possui uma conta?<TouchableOpacity  onPress={() => router.push("/cadastro")}><Text style={style.linkCadastre}>Cadastre-se</Text></TouchableOpacity></Text>
            </View>
        </View>

    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3E579D",
    },
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 22,
        flex: 1,
        borderLeftWidth: 8,
        borderLeftColor: "#4A2B1E",
        borderRightWidth: 8,
        borderRightColor: "#4A2B1E",
    },
    Title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 50,
        textAlign: "center",
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 50,
        marginBottom: -5,
        alignSelf: "center",
    },
    textButton: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 12,
    },
    button:{
        backgroundColor: "#3E579D",
        borderRadius: 15,
        marginTop: 16,
        marginHorizontal: 18,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginLeft: 18,
    },
    labelCentral: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        backgroundColor: "#F9F9F9",
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        color: "#333",
        marginBottom: 17,
        marginLeft: 18,
        marginRight: 18,
    },
    link: {
        color: "#3b58ff",
        textAlign: "left",
        marginBottom: 15,
        marginLeft: 20,
        marginTop: -13,
        textDecorationLine: "underline",
    },
    linkCadastre: {
        color: "#3b58ff",
        textAlign: "left",
        marginBottom: 15,
        marginLeft: 5,
        textDecorationLine: "underline",
    },


})


