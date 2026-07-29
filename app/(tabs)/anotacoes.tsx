import { api } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Livro {
    id: number;
    titulo: string;
    capaUrl?: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function Anotacoes() {
    const router = useRouter();
    const [busca, setBusca] = useState('');
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        api.get<Livro[]>('/livros')
            .then(res => setLivros(res.data))
            .catch(err => console.log(err))
            .finally(() => setCarregando(false));
    }, []);

    const filtrados = useMemo(() => {
        return livros.filter(item =>
            item.titulo.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca, livros]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F6FB" />

            <View style={styles.header}>
                <Image source={require('../../assets/images/KOR logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.titulo}>Anotações</Text>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={18} color="#aaa" />
                <TextInput
                    style={styles.input}
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

            <View style={styles.secaoHeader}>
                <Text style={styles.secaoTitulo}>Livros</Text>
                <Text style={styles.count}>{filtrados.length} Encontrados</Text>
            </View>

            {carregando ? (
                <ActivityIndicator size="large" color="#1a3a5c" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={filtrados}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.lista}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.card}
                            onPress={() =>
                                router.push({
                                    pathname: '/anotacao', // Redireciona para anotacao.tsx
                                    params: {
                                        id: item.id,
                                        titulo: item.titulo,
                                        capaUrl: item.capaUrl ?? ''
                                    }
                                })
                            }
                        >
                            {item.capaUrl ? (
                                <Image source={{ uri: item.capaUrl }} style={styles.imagem} />
                            ) : (
                                <View style={[styles.imagem, { justifyContent: 'center', alignItems: 'center' }]}>
                                    <Ionicons name="book-outline" size={32} color="#aaa" />
                                </View>
                            )}
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitulo} numberOfLines={1}>{item.titulo}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View style={styles.vazio}>
                            <Ionicons name="document-text-outline" size={50} color="#ccc" />
                            <Text style={styles.vazioTexto}>Nenhuma anotação encontrada</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F6FB', paddingTop: StatusBar.currentHeight || 0 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70, marginTop: 10 },
    logo: { width: 70, height: 70, resizeMode: 'contain' },
    titulo: { fontSize: 22, fontWeight: 'bold', color: '#111', textAlign: 'center', marginBottom: 16 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e5e5e5', paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3 },
    input: { flex: 1, marginLeft: 10, fontSize: 15, color: '#111' },
    secaoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
    secaoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#111' },
    count: { fontSize: 13, color: '#888' },
    lista: { paddingHorizontal: 16, paddingBottom: 30 },
    row: { justifyContent: 'space-between', marginBottom: 16 },
    card: { width: CARD_WIDTH, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: '#e5e5e5', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4 },
    imagem: { width: '100%', height: 180, resizeMode: 'cover', backgroundColor: '#eee' },
    cardContent: { padding: 10 },
    cardTitulo: { fontSize: 14, fontWeight: 'bold', color: '#111' },
    vazio: { alignItems: 'center', marginTop: 80, gap: 12 },
    vazioTexto: { fontSize: 14, color: '#aaa' },
});
