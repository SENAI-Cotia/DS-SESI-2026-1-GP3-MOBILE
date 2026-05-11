import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function Index() {
    return (
        <SafeAreaView style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.header}>
                    <Ionicons style={style.icon} name="chevron-back-outline" size={35} color="#000" />
                    <Image style={style.logo} source={require('../../assets/images/KOR logo.png')} />
                </View>
                <View style={style.block}>
                    <View style={style.content}>
                        <Ionicons style={style.iconPerfil} name="person-circle-outline" size={165} color="#000000" />
                        <TouchableOpacity style={style.iconCamera}>
                            <Ionicons name="camera-outline" size={35} color="#ffffff" />
                        </TouchableOpacity>
                        <Text style={style.text}>Usuario</Text>
                    </View>
                </View>

                <TouchableOpacity style={style.content2}>
                    <Ionicons style={style.icontransparent} name="heart-outline" size={45} color="#000" />
                    <Ionicons style={style.icon2} name="heart-outline" size={34} color="#000" />
                    <Text style={style.text2}>Favorito</Text>
                    <View style={style.iconMask}></View>
                </TouchableOpacity>

                <TouchableOpacity style={style.content2}>
                    <Ionicons style={style.icontransparent} name="book-outline" size={45} color="#000" />
                    <Ionicons style={style.icon2} name="book-outline" size={34} color="#000" />
                    <Text style={style.text2}>Biblioteca</Text>
                    <View style={style.iconMask}></View>
                </TouchableOpacity>

                <TouchableOpacity style={style.content2}>
                    <Ionicons style={style.icontransparent} name="star-outline" size={45} color="#000" />
                    <Ionicons style={style.icon2} name="star-outline" size={34} color="#000" />
                    <Text style={style.text2}>Avaliações</Text>
                    <View style={style.iconMask}></View>
                </TouchableOpacity>


                <View style={style.container2}>
                    <TouchableOpacity style={style.content2}>
                        <Ionicons style={style.icontransparent} name="person-outline" size={45} color="#000" />
                        <Ionicons style={style.icon2} name="person-outline" size={34} color="#000" />
                        <Text style={style.text2}>Dados da Conta</Text>
                        <View style={style.iconMask}></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.content2}>
                        <Ionicons style={style.icontransparent} name="help-outline" size={45} color="#000" />
                        <Ionicons style={style.icon2} name="help-outline" size={34} color="#000" />
                        <Text style={style.text2}>Suporte</Text>
                        <View style={style.iconMask}></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.content2}>
                        <Ionicons style={style.icontransparent} name="chatbox-ellipses-outline" size={45} color="#000" />
                        <Ionicons style={style.icon2} name="chatbox-ellipses-outline" size={34} color="#000" />
                        <Text style={style.text2}>FAQ</Text>
                        <View style={style.iconMask}></View>
                    </TouchableOpacity>
                </View>


                <View style={style.container3}>
                    <TouchableOpacity style={style.content3}>
                        <Ionicons style={style.icontransparent} name="star-outline" size={45} color="#b30000" />
                        <Ionicons style={style.icon3} name="star-outline" size={34} color="#b30000" />
                        <Text style={style.exit}>Sair</Text>
                        <View style={style.iconMask}></View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 80,
        height: 80,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        marginTop: 15,
    },
    block: {
        marginBottom: 35,
    },
    icon: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    icon2: {
        position: 'absolute',
        zIndex: 2,
        top: 5,
        left: -12,
    },
    icon3: {
        position: 'absolute',
        zIndex: 2,
        top: 5,
        left: -12,
        color: '#b30000',
    },
    content: {
        justifyContent: 'center',
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#000',
        marginHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: 140,
        paddingBottom: 140,
    },
    iconPerfil: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 1,
        marginTop: -55,
    },
    iconCamera: {
        alignSelf: 'center',
        marginTop: 60,
        left: 35,
        backgroundColor: '#000000',
        borderRadius: 30,
        padding: 5,
        zIndex: 1,
    },
    content2: {
        justifyContent: 'center',
        height: 45,
        marginTop: 15,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#000',
        marginHorizontal: 20,
        zIndex: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content3: {
        justifyContent: 'center',
        height: 45,
        marginTop: 15,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#b30000',
        marginHorizontal: 20,
        zIndex: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconMask: {
        position: 'absolute',
        left: -52,
        top: -5,
        width: 50,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: '#F2F2F2',
    },
    text: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 140,
        fontSize: 33,
        fontWeight: 'bold',
    },
    text2: {
        position: 'absolute',
        left: 40,
        fontSize: 20,
    },
    exit: {
        position: 'absolute',
        left: 40,
        fontSize: 20,
        color: '#b30000',
    },
    icontransparent: {
        position: 'absolute',
        zIndex: 1,
        left: -12,
        opacity: 0.2,
    },
    container2: {
        marginTop: 30,
    },
    container3: {
        marginTop: 30,
        marginBottom: 50,
    },
});