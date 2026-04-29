import { Text, TextInput, StyleSheet, Image, View, TouchableOpacity } from "react-native";

export default function Cadastro() {
    
    return (

        <View style={style.container}>
            <View style={style.card}>

                <Image source={require("../assets/images/logo.png")} style={style.logo} />
                <Text style={style.title}>Cadastro</Text>

                <Text style={style.label}>CPF</Text>
                <TextInput placeholder="CPF" placeholderTextColor="#999" style={style.input} />

                <Text style={style.label}>Nome Completo</Text>
                <TextInput placeholder="Nome Completo" placeholderTextColor="#999" style={style.input} />

                <Text style={style.label}>E-mail</Text>
                <TextInput placeholder="E-mail" placeholderTextColor="#999" style={style.input} />

                <Text style={style.label}>Senha</Text>
                <TextInput placeholder="Senha" placeholderTextColor="#999" style={style.input} />

                <Text style={style.label}>Confirmar Senha</Text>
                <TextInput placeholder="Confirmar Senha" placeholderTextColor="#999" style={style.input} />

                <TouchableOpacity style={style.button}>
                    <Text style={style.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

        </View >

    )
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#3E579D",
        justifyContent: "center"
    },
    card: {
        backgroundColor: "#ffffff",
        marginHorizontal: 22,
        flex: 1,
        borderLeftColor: "#4A2B1E",
        borderRightColor: "#4A2B1E",
        borderLeftWidth: 8,
        borderRightWidth: 8
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 50,
        fontWeight: "bold"
    },
    captcha: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 20
    },
    button: {
        backgroundColor: "#3E579D",
        borderRadius: 15,
        marginTop: 16,
        marginHorizontal: 18,
        marginBottom: 20
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 12
    },
    loginText: {
        textAlign: "center",
        marginTop: 15
    },
    link: {
        color: "blue"
    },
    input: {
        backgroundColor: "#F9F9F9",
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 12,
        color: "#333",
        marginBottom: 17,
        fontSize: 16,
        marginLeft: 18,
        marginRight: 18,
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 50,
        marginBottom: -5,
        alignSelf: "center",
    },
    label: {
        fontSize: 16,
        marginLeft: 18,
        marginBottom: 5,
        fontWeight: "bold",
    },
    labelCentral: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",

    }
})




