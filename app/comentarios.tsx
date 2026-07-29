import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

interface Livro {
    id: number;
    titulo: string;
}

interface Avaliacao {
    id: number;
    nota: number;
    comentario?: string;
    usuarioId: number;
    livroId: number;
    livro?: Livro;
}

export default function Comentarios() {
    const router       = useRouter();
    const { usuario }  = useAuth();

    const [lista, setLista]           = useState<Avaliacao[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const buscarComentarios = useCallback(() => {
        if (!usuario?.id) return;
        setCarregando(true);
        api.get<Avaliacao[]>('/feed')
            .then((res: { data: Avaliacao[] }) => setLista(res.data.filter(a => Number(a.usuarioId) === usuario.id)))
            .catch(err => console.error('Erro ao buscar comentários:', err))
            .finally(() => setCarregando(false));
    }, [usuario?.id]);

    useEffect(() => { buscarComentarios(); }, [buscarComentarios]);

    // ⚠️ Não há endpoint DELETE para /avaliacao na API atual.
    // Mantemos o botão de excluir no design, mas avisamos que a ação
    // não tem efeito real no servidor ainda.
    function apagarComentario(id: number) {
        Alert.alert(
            'Não disponível',
            'A API ainda não possui um endpoint para excluir avaliações (DELETE /avaliacao/:id).'
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back-outline" size={26} color="#000" />
                </TouchableOpacity>
                <Image style={styles.logo} source={require('../assets/images/KOR logo.png')} />
            </View>

            <Text style={styles.tituloPagina}>Meus Comentários</Text>

            {carregando ? (
                <ActivityIndicator size="large" color="#1a3a5c" style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={lista}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Ionicons name="chatbox-outline" size={40} color="#ccc" />
                            <Text style={styles.emptyText}>Nenhum comentário encontrado</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.cardComentario}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardLivroTitulo}>{item.livro?.titulo ?? 'Livro'}</Text>
                                <TouchableOpacity onPress={() => apagarComentario(item.id)}>
                                    <Ionicons name="trash-outline" size={18} color="#c0392b" />
                                </TouchableOpacity>
                            </View>
                            {item.comentario ? <Text style={styles.cardTexto}>{item.comentario}</Text> : null}
                        </View>
                    )}
                />
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F6FB' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70, marginTop: 10 },
    backButton: { position: 'absolute', left: 15, zIndex: 1 },
    logo: { width: 70, height: 70, resizeMode: 'contain' },
    tituloPagina: { fontSize: 22, fontWeight: 'bold', color: '#111', textAlign: 'center', marginBottom: 20 },
    cardComentario: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e5e5' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    cardLivroTitulo: { fontSize: 15, fontWeight: 'bold', color: '#1a3a5c' },
    cardTexto: { fontSize: 14, color: '#444', lineHeight: 20 },
    emptyState: { alignItems: 'center', marginTop: 60 },
    emptyText: { color: '#aaa', marginTop: 8, fontSize: 14 },
});
