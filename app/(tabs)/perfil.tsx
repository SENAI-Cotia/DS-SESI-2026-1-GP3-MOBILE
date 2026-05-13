import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Perfil() {
    const router = useRouter();

    return (
        <SafeAreaView style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={style.header}>
                    <TouchableOpacity style={style.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back-outline" size={26} color="#000" />
                    </TouchableOpacity>
                    <Image style={style.logo} source={require('../../assets/images/KOR logo.png')} />
                </View>

                <View style={style.perfilCard}>
                    <View style={style.avatarWrapper}>
                        <Ionicons name="person-circle-outline" size={110} color="#333" />
                        <TouchableOpacity style={style.cameraButton}>
                            <Ionicons name="camera-outline" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={style.nomeUsuario}>Usuário</Text>
                    <Text style={style.emailUsuario}>usuario@email.com</Text>
                </View>

                <View style={style.grupo}>
                    <Text style={style.grupoLabel}>Minha Biblioteca</Text>
                    <TouchableOpacity style={style.item}>
                        <View style={style.itemIcone}>
                            <Ionicons name="heart-outline" size={22} color="#1a3a5c" />
                        </View>
                        <Text style={style.itemTexto}>Favoritos</Text>
                        <Ionicons name="chevron-forward" size={18} color="#bbb" />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.item}>
                        <View style={style.itemIcone}>
                            <Ionicons name="book-outline" size={22} color="#1a3a5c" />
                        </View>
                        <Text style={style.itemTexto}>Biblioteca</Text>
                        <Ionicons name="chevron-forward" size={18} color="#bbb" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.item, style.itemUltimo]}>
                        <View style={style.itemIcone}>
                            <Ionicons name="star-outline" size={22} color="#1a3a5c" />
                        </View>
                        <Text style={style.itemTexto}>Avaliações</Text>
                        <Ionicons name="chevron-forward" size={18} color="#bbb" />
                    </TouchableOpacity>
                </View>

                <View style={style.grupo}>
                    <Text style={style.grupoLabel}>Conta</Text>
                    <TouchableOpacity style={style.item}>
                        <View style={style.itemIcone}>
                            <Ionicons name="person-outline" size={22} color="#1a3a5c" />
                        </View>
                        <Text style={style.itemTexto}>Dados da Conta</Text>
                        <Ionicons name="chevron-forward" size={18} color="#bbb" />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.item}>
                        <View style={style.itemIcone}>
                            <Ionicons name="help-circle-outline" size={22} color="#1a3a5c" />
                        </View>
                        <Text style={style.itemTexto}>Suporte</Text>
                        <Ionicons name="chevron-forward" size={18} color="#bbb" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.item, style.itemUltimo]}>
                        <View style={style.itemIcone}>
                            <Ionicons name="chatbox-ellipses-outline" size={22} color="#1a3a5c" />
                        </View>
                        <Text style={style.itemTexto}>FAQ</Text>
                        <Ionicons name="chevron-forward" size={18} color="#bbb" />
                    </TouchableOpacity>
                </View>

                <View style={style.grupo}>
                    <TouchableOpacity style={[style.item, style.itemUltimo]}>
                        <View style={[style.itemIcone, style.itemIconeSair]}>
                            <Ionicons name="log-out-outline" size={22} color="#c0392b" />
                        </View>
                        <Text style={style.itemTextoSair}>Sair</Text>
                        <Ionicons name="chevron-forward" size={18} color="#e57373" />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 60 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        marginTop: 10,
    },
    backButton: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    perfilCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 20,
        borderRadius: 16,
        alignItems: 'center',
        paddingVertical: 28,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 12,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 4,
        right: -4,
        backgroundColor: '#1a3a5c',
        borderRadius: 20,
        padding: 6,
        borderWidth: 2,
        borderColor: '#fff',
    },
    nomeUsuario: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
    },
    emailUsuario: {
        fontSize: 13,
        color: '#888',
    },
    grupo: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    grupoLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#aaa',
        textTransform: 'uppercase',
        letterSpacing: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 6,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    itemUltimo: {
        borderBottomWidth: 0,
    },
    itemIcone: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#eef4fb',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    itemIconeSair: {
        backgroundColor: '#fdecea',
    },
    itemTexto: {
        flex: 1,
        fontSize: 15,
        color: '#222',
    },
    itemTextoSair: {
        flex: 1,
        fontSize: 15,
        color: '#c0392b',
        fontWeight: '600',
    },
});