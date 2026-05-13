import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const livros = [
    {
        id: '1',
        titulo: 'Eletrônica Básica',
        categoria: 'Tecnologia',
        imagem: require('../../assets/images/images.jpg'),
    },
    {
        id: '2',
        titulo: 'React Native',
        categoria: 'Programação',
        imagem: require('../../assets/images/images.jpg'),
    },
    {
        id: '3',
        titulo: 'Banco de Dados',
        categoria: 'Estudos',
        imagem: require('../../assets/images/images.jpg'),
    },
    {
        id: '4',
        titulo: 'UI Design',
        categoria: 'Design',
        imagem: require('../../assets/images/images.jpg'),
    },
];

export default function Pesquisa() {
    const router = useRouter();
    const [busca, setBusca] = useState('');

    const resultados = useMemo(() => {
        return livros.filter(item =>
            item.titulo.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F7F7F7" />

            <View style={styles.topo}>
                <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={24} color="#111" />
                </TouchableOpacity>

                <Text style={styles.titulo}>Pesquisar</Text>
            </View>

            <View style={styles.buscaArea}>
                <Ionicons name="search-outline" size={20} color="#888" />

                <TextInput
                    style={styles.input}
                    placeholder="Buscar livros..."
                    placeholderTextColor="#999"
                    value={busca}
                    onChangeText={setBusca}
                />

                {busca.length > 0 && (
                    <TouchableOpacity onPress={() => setBusca('')}>
                        <Ionicons name="close-outline" size={20} color="#888" />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.info}>
                <Text style={styles.resultado}>{resultados.length} resultados</Text>
            </View>

            <FlatList
                data={resultados}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.lista}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.8}
                        onPress={() => router.push('/livro')}
                    >
                        <Image source={item.imagem} style={styles.imagem} />

                        <View style={styles.textos}>
                            <Text style={styles.nome} numberOfLines={1}>
                                {item.titulo}
                            </Text>

                            <Text style={styles.categoria}>
                                {item.categoria}
                            </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.vazio}>
                        <Ionicons name="search" size={55} color="#D0D0D0" />
                        <Text style={styles.vazioTexto}>Nada encontrado</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: StatusBar.currentHeight || 0,
    },

    topo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 10,
        marginBottom: 20,
    },

    botaoVoltar: {
        marginRight: 14,
    },

    titulo: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111',
    },

    buscaArea: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECECEC',
        marginHorizontal: 18,
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 50,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#111',
    },

    info: {
        paddingHorizontal: 20,
        marginTop: 14,
        marginBottom: 8,
    },

    resultado: {
        fontSize: 13,
        color: '#777',
    },

    lista: {
        paddingHorizontal: 18,
        paddingBottom: 30,
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 12,
        marginBottom: 12,
    },

    imagem: {
        width: 70,
        height: 100,
        borderRadius: 12,
        resizeMode: 'cover',
    },

    textos: {
        flex: 1,
        marginLeft: 14,
    },

    nome: {
        fontSize: 17,
        fontWeight: '600',
        color: '#111',
        marginBottom: 4,
    },

    categoria: {
        fontSize: 13,
        color: '#777',
    },

    vazio: {
        alignItems: 'center',
        marginTop: 100,
    },

    vazioTexto: {
        marginTop: 12,
        fontSize: 15,
        color: '#999',
    },
});