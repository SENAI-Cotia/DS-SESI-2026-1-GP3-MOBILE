import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator, FlatList, Image, SafeAreaView,
    StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

interface Livro {
    id: string;
    titulo: string;
    autor: string;
    genero: string;
    capaUrl: string;
}

const API = 'http://10.92.199.16:3000';

export default function Pesquisa() {
    const router = useRouter();
    const [busca, setBusca] = useState('');
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        fetch(`${API}/livros`)
            .then(res => res.json())
            .then(data => setLivros(data))
            .catch(err => console.log(err))
            .finally(() => setCarregando(false));
    }, []);

    const resultados = useMemo(() => {
        return livros.filter(item =>
            item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
            item.autor.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca, livros]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F6FB" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back-outline" size={35} color="#000" />
                </TouchableOpacity>
                <Image source={require('../../assets/images/KOR logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.titulo}>Pesquisar</Text>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={18} color="#aaa" />
                <TextInput
                    style={styles.input}
                    placeholder="Buscar livros..."
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

            <View style={styles.info}>
                <Text style={styles.resultado}>{resultados.length} resultados</Text>
            </View>

            {carregando ? (
                <ActivityIndicator size="large" color="#1a3a5c" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={resultados}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.lista}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => router.push({ pathname: '/livro', params: { id: item.id } })}
                        >
                            <Image source={{ uri: item.capaUrl }} style={styles.imagem} />
                            <View style={styles.textos}>
                                <Text style={styles.nome} numberOfLines={1}>{item.titulo}</Text>
                                <Text style={styles.autor} numberOfLines={1}>{item.autor}</Text>
                                <Text style={styles.genero}>{item.genero}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#bbb" />
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View style={styles.vazio}>
                            <Ionicons name="search" size={55} color="#ddd" />
                            <Text style={styles.vazioTexto}>Nenhum livro encontrado</Text>
                        </View>
                    }
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
        marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#111',
    },
    info: {
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    resultado: {
        fontSize: 13,
        color: '#888',
    },
    lista: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
    },
    imagem: {
        width: 55,
        height: 80,
        borderRadius: 8,
        resizeMode: 'cover',
        backgroundColor: '#eee',
    },
    textos: {
        flex: 1,
        marginLeft: 14,
    },
    nome: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        marginBottom: 3,
    },
    autor: {
        fontSize: 13,
        color: '#555',
        marginBottom: 3,
    },
    genero: {
        fontSize: 12,
        color: '#888',
    },
    vazio: {
        alignItems: 'center',
        marginTop: 80,
        gap: 12,
    },
    vazioTexto: {
        fontSize: 14,
        color: '#aaa',
    },
});