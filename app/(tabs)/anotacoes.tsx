import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const anotacoes = [
    { id: '1', titulo: 'Anotação_1', data: '5 de abr. de 2025', image: require('../../assets/images/images.jpg') },
    { id: '2', titulo: 'Anotação_2', data: '19 de set. de 2025', image: require('../../assets/images/images.jpg') },
    { id: '3', titulo: 'Anotação_3', data: '2 de jan.', image: require('../../assets/images/images.jpg') },
    { id: '4', titulo: 'Anotação_4', data: '8 de jan.', image: require('../../assets/images/images.jpg') },
];

export default function Anotacoes() {
    const router = useRouter();
    const [busca, setBusca] = useState('');

    const filtrados = anotacoes.filter(item =>
        item.titulo.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <SafeAreaView style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={style.header}>
                    <TouchableOpacity style={style.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back-outline" size={26} color="#000" />
                    </TouchableOpacity>
                    <Image style={style.logo} source={require('../../assets/images/KOR logo.png')} />
                </View>

                <Text style={style.titulo}>Anotações</Text>

                <View style={style.searchContainer}>
                    <Ionicons name="search-outline" size={18} color="#aaa" style={{ marginRight: 8 }} />
                    <TextInput
                        style={style.searchInput}
                        placeholder="Buscar..."
                        placeholderTextColor="#aaa"
                        value={busca}
                        onChangeText={setBusca}
                    />
                    {busca.length > 0 && (
                        <TouchableOpacity onPress={() => setBusca('')}>
                            <Ionicons name="close-circle" size={18} color="#aaa" />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={style.secaoHeader}>
                    <Text style={style.secaoTitulo}>Livros</Text>
                    <Text style={style.secaoCount}>{filtrados.length} anotações</Text>
                </View>

                {filtrados.length === 0 ? (
                    <View style={style.vazio}>
                        <Ionicons name="document-text-outline" size={48} color="#ccc" />
                        <Text style={style.vazioTexto}>Nenhuma anotação encontrada</Text>
                    </View>
                ) : (
                    <View style={style.grid}>
                        {filtrados.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                style={style.card}
                                onPress={() => router.push('/livro')}
                            >
                                <Image source={item.image} style={style.cardImagem} />
                                <Text style={style.cardTitulo} numberOfLines={1}>{item.titulo}</Text>
                                <Text style={style.cardData}>{item.data}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

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
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        textAlign: 'center',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#111',
    },
    secaoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    secaoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    secaoCount: {
        fontSize: 13,
        color: '#888',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        gap: 12,
    },
    card: {
        width: '46%',
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    cardImagem: {
        resizeMode: 'cover',
    },
    cardTitulo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111',
        paddingHorizontal: 10,
        paddingTop: 8,
    },
    cardData: {
        fontSize: 12,
        color: '#888',
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginTop: 2,
    },
    vazio: {
        alignItems: 'center',
        paddingVertical: 60,
        gap: 12,
    },
    vazioTexto: {
        fontSize: 14,
        color: '#bbb',
    },
});