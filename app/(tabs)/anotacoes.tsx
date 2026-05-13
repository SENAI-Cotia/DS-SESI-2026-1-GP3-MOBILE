import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 40) / 2;

const anotacoes = [
    { id: '1', titulo: 'Anotação_1', data: '5 de abr. de 2025', image: require('../../assets/images/images.jpg') },
    { id: '2', titulo: 'Anotação_2', data: '19 de set. de 2025', image: require('../../assets/images/images.jpg') },
    { id: '3', titulo: 'Anotação_3', data: '2 de jan.', image: require('../../assets/images/images.jpg') },
    { id: '4', titulo: 'Anotação_4', data: '8 de jan.', image: require('../../assets/images/images.jpg') },
];

export default function Anotacoes() {
    const router = useRouter();
    const [busca, setBusca] = useState('');

    const filtrados = useMemo(() => {
        return anotacoes.filter(item =>
            item.titulo.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca]);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push('/livro')}
        >
            <Image source={item.image} style={styles.cardImagem} />

            <View style={styles.cardContent}>
                <Text style={styles.cardTitulo} numberOfLines={1}>
                    {item.titulo}
                </Text>

                <Text style={styles.cardData}>
                    {item.data}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F6FB" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back-outline" size={26} color="#111" />
                </TouchableOpacity>

                <Image
                    style={styles.logo}
                    source={require('../../assets/images/KOR logo.png')}
                />
            </View>

            <Text style={styles.titulo}>Anotações</Text>

            <View style={styles.searchContainer}>
                <Ionicons
                    name="search-outline"
                    size={18}
                    color="#999"
                    style={{ marginRight: 8 }}
                />

                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    placeholderTextColor="#999"
                    value={busca}
                    onChangeText={setBusca}
                />

                {busca.length > 0 && (
                    <TouchableOpacity onPress={() => setBusca('')}>
                        <Ionicons name="close-circle" size={18} color="#999" />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.secaoHeader}>
                <Text style={styles.secaoTitulo}>Livros</Text>

                <Text style={styles.secaoCount}>
                    {filtrados.length} anotações
                </Text>
            </View>

            {filtrados.length === 0 ? (
                <View style={styles.vazio}>
                    <Ionicons
                        name="document-text-outline"
                        size={48}
                        color="#ccc"
                    />

                    <Text style={styles.vazioTexto}>
                        Nenhuma anotação encontrada
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filtrados}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FB',
        paddingTop: StatusBar.currentHeight || 0,
    },

    header: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },

    backButton: {
        position: 'absolute',
        left: 16,
    },

    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },

    titulo: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111',
        textAlign: 'center',
        marginBottom: 18,
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
        height: 50,
        marginBottom: 20,
    },

    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#111',
    },

    secaoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 14,
    },

    secaoTitulo: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },

    secaoCount: {
        fontSize: 13,
        color: '#777',
    },

    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },

    row: {
        justifyContent: 'space-between',
        marginBottom: 14,
    },

    card: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },

    cardImagem: {
        width: '100%',
        height: 140,
        resizeMode: 'cover',
    },

    cardContent: {
        padding: 10,
    },

    cardTitulo: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111',
    },

    cardData: {
        fontSize: 12,
        color: '#777',
        marginTop: 4,
    },

    vazio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
    },

    vazioTexto: {
        marginTop: 10,
        fontSize: 14,
        color: '#aaa',
    },
});