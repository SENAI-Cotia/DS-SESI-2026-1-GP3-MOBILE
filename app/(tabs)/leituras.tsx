import React, { useState } from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView,
    SafeAreaView, TouchableOpacity, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const livros = [
    { id: '1', image: require('../../assets/images/images.jpg'), data: '5 de abr. de 2025' },
    { id: '2', image: require('../../assets/images/images.jpg'), data: '5 de abr. de 2025' },
    { id: '3', image: require('../../assets/images/images.jpg'), data: '5 de abr. de 2025' },
    { id: '4', image: require('../../assets/images/images.jpg'), data: '5 de abr. de 2025' },
];

type Secao = {
    id: string;
    titulo: string;
    livros: typeof livros;
};

const secoes: Secao[] = [
    { id: 'concluidos', titulo: 'Concluídos', livros: livros },
    { id: 'lendo', titulo: 'Lendo', livros: livros },
    { id: 'tarde', titulo: 'Ler Mais Tarde', livros: [] },
];

type AbertosState = {
    [key: string]: boolean;
};

export default function Leituras() {
    const router = useRouter();

    const [abertos, setAbertos] = useState<AbertosState>({
        concluidos: true,
        lendo: true,
        tarde: false,
    });

    function toggleSecao(id: string) {
        setAbertos(prev => ({ ...prev, [id]: !prev[id] }));
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={style.header}>
                    <TouchableOpacity style={style.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back-outline" size={35} color="#000" />
                    </TouchableOpacity>
                    <Image style={style.logo} source={require('../../assets/images/KOR logo.png')} />
                </View>

                <Text style={style.titulo}>Leituras</Text>

                {secoes.map(secao => (
                    <View key={secao.id} style={style.secao}>

                        <TouchableOpacity
                            style={style.secaoHeader}
                            onPress={() => toggleSecao(secao.id)}
                        >
                            <Text style={style.secaoTitulo}>{secao.titulo}</Text>
                            <Ionicons
                                name={abertos[secao.id] ? 'chevron-up' : 'chevron-down'}
                                size={22}
                                color="#333"
                            />
                        </TouchableOpacity>

                        {abertos[secao.id] && (
                            secao.livros.length > 0 ? (
                                <FlatList
                                    data={secao.livros}
                                    keyExtractor={item => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    scrollEnabled={true}
                                    contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 14 }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={style.livroCard}
                                            onPress={() => router.push('../livro')}
                                        >
                                            <Image source={item.image} style={style.livroImagem} />
                                            <Text style={style.livroData}>{item.data}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            ) : (
                                <View style={style.vazio}>
                                    <Ionicons name="book-outline" size={32} color="#ccc" />
                                    <Text style={style.vazioTexto}>Nenhum livro aqui ainda</Text>
                                </View>
                            )
                        )}
                    </View>
                ))}

                <View style={{ height: 40 }} />
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
        height: 80,
        marginTop: 15,
    },
    backButton: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    logo: {
        width: 80,
        height: 80,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        textAlign: 'center',
        marginBottom: 16,
    },
    secao: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        overflow: 'hidden',
    },
    secaoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    secaoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    livroCard: {
        marginRight: 10,
        alignItems: 'center',
    },
    livroImagem: {
        width: 80,
        height: 110,
        borderRadius: 6,
        resizeMode: 'cover',
        marginBottom: 6,
    },
    livroData: {
        fontSize: 11,
        color: '#888',
        textAlign: 'center',
        maxWidth: 80,
    },
    vazio: {
        alignItems: 'center',
        paddingVertical: 24,
        gap: 8,
    },
    vazioTexto: {
        fontSize: 13,
        color: '#bbb',
    },
});