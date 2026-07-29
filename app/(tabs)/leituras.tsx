import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator, FlatList, Image, SafeAreaView,
    ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

// Model Leitura do schema Prisma com livro incluído
interface LeituraComLivro {
    id: number;
    status: string;
    progresso?: number;
    usuarioId: number;
    livroId: number;
    livro: {
        id: number;
        titulo: string;
        capaUrl?: string;
        autor: string;
        ano?: number;
    };
}

export default function Leituras() {
    const router      = useRouter();
    const { usuario } = useAuth();

    const [leituras, setLeituras]     = useState<LeituraComLivro[]>([]);
    const [carregando, setCarregando] = useState(true);

    const [abertos, setAbertos] = useState<Record<string, boolean>>({
        concluidos:  false,
        lendo:       false,
        nao_lido:    false,
    });

    // Busca leituras do usuário logado com os dados do livro
    // GET /leituras?usuarioId=X  (ver backend/leituras.ts)
    const buscarLeituras = useCallback(async () => {
        if (!usuario?.id) return;
        setCarregando(true);
        try {
            const res = await fetch(`${API}/leituras?usuarioId=${usuario.id}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const dados: LeituraComLivro[] = await res.json();
            setLeituras(dados);
        } catch (err) {
            console.error('Erro ao carregar leituras:', err);
        } finally {
            setCarregando(false);
        }
    }, [usuario?.id]);

    // Recarrega sempre que o usuário volta para esta tela
    useFocusEffect(buscarLeituras);

    function toggleSecao(id: string) {
        setAbertos(prev => ({ ...prev, [id]: !prev[id] }));
    }

    // Agrupa por status (valor salvo no banco)
    const secoes = [
        { id: 'concluidos',  titulo: 'Concluídos',    livros: leituras.filter(l => l.status === 'concluidos')  },
        { id: 'lendo',       titulo: 'Lendo',          livros: leituras.filter(l => l.status === 'lendo')       },
        { id: 'nao_lido',    titulo: 'Ler Mais Tarde', livros: leituras.filter(l => l.status === 'nao_lido')    },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image style={styles.logo} source={require('../../assets/images/KOR logo.png')} />
                </View>

                <Text style={styles.titulo}>Leituras</Text>

                {carregando ? (
                    <ActivityIndicator size="large" color="#1a3a5c" style={{ marginTop: 20 }} />
                ) : (
                    secoes.map(secao => (
                        <View key={secao.id} style={styles.secao}>
                            <TouchableOpacity style={styles.secaoHeader} onPress={() => toggleSecao(secao.id)}>
                                <View style={styles.secaoHeaderLeft}>
                                    <Text style={styles.secaoTitulo}>{secao.titulo}</Text>
                                    {secao.livros.length > 0 && (
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeTexto}>{secao.livros.length}</Text>
                                        </View>
                                    )}
                                </View>
                                <Ionicons
                                    name={abertos[secao.id] ? 'chevron-up' : 'chevron-down'}
                                    size={22} color="#333"
                                />
                            </TouchableOpacity>

                            {abertos[secao.id] && (
                                secao.livros.length > 0 ? (
                                    <FlatList
                                        data={secao.livros}
                                        keyExtractor={item => item.id.toString()}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 14 }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.livroCard}
                                                onPress={() => router.push({ pathname: '/livro', params: { id: item.livro.id } })}
                                            >
                                                {item.livro.capaUrl ? (
                                                    <Image source={{ uri: item.livro.capaUrl }} style={styles.livroImagem} />
                                                ) : (
                                                    <View style={[styles.livroImagem, { backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }]}>
                                                        <Ionicons name="book-outline" size={32} color="#aaa" />
                                                    </View>
                                                )}
                                                <Text style={styles.livroTitulo} numberOfLines={2}>
                                                    {item.livro.titulo}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                ) : (
                                    <View style={styles.vazio}>
                                        <Ionicons name="book-outline" size={32} color="#ccc" />
                                        <Text style={styles.vazioTexto}>Nenhum livro aqui ainda</Text>
                                    </View>
                                )
                            )}
                        </View>
                    ))
                )}

                {!carregando && leituras.length === 0 && (
                    <Text style={styles.vazioGeral}>
                        Você ainda não adicionou nenhum livro.{'\n'}
                        Explore e defina o status de um livro para ele aparecer aqui!
                    </Text>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F6FB' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70, marginTop: 10 },
    logo: { width: 70, height: 70, resizeMode: 'contain' },
    titulo: { fontSize: 22, fontWeight: 'bold', color: '#111', textAlign: 'center', marginBottom: 16 },
    secao: { backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: '#e5e5e5', overflow: 'hidden' },
    secaoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
    secaoHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    secaoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#111' },
    badge: { backgroundColor: '#1a3a5c', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 },
    badgeTexto: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
    livroCard: { marginRight: 12, alignItems: 'center', width: 82 },
    livroImagem: { width: 82, height: 118, borderRadius: 8, resizeMode: 'cover', marginBottom: 6, backgroundColor: '#eee' },
    livroTitulo: { fontSize: 11, color: '#555', textAlign: 'center', maxWidth: 82, lineHeight: 14 },
    vazio: { alignItems: 'center', paddingVertical: 24, gap: 8 },
    vazioTexto: { fontSize: 13, color: '#bbb' },
    vazioGeral: { textAlign: 'center', color: '#aaa', fontSize: 13, marginTop: 20, paddingHorizontal: 32, lineHeight: 20 },
});