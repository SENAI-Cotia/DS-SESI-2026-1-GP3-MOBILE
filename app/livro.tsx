import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator, Alert, Image, Modal, Pressable, SafeAreaView,
    ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

interface Livro {
    id: number;
    titulo: string;
    capaUrl?: string;
    ano?: number;
    descricao?: string;
    autor: string;
    genero: string;
}

interface Avaliacao {
    id: number;
    nota: number;
    comentario?: string;
    createdAt?: string;
    usuarioId: number;
    livroId: number;
    usuario?: { id: number; nome: string; fotoUrl?: string };
}

function formatData(iso?: string) {
    if (!iso) return '00/00/0000';
    return new Date(iso).toLocaleDateString('pt-BR');
}

export default function LivroScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const livroId = Number(Array.isArray(id) ? id[0] : id);
    const { usuario } = useAuth();

    const [livro, setLivro] = useState<Livro | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    // Estado para guardar a avaliação feita pela conta logada
    const [minhaAvaliacao, setMinhaAvaliacao] = useState<Avaliacao | null>(null);
    
    // Estados temporários para a janela modal
    const [tempEstrelas, setTempEstrelas] = useState(0);
    const [tempComentario, setTempComentario] = useState('');

    const [reviews, setReviews] = useState<Avaliacao[]>([]);
    const [carregandoReviews, setCarregandoReviews] = useState(true);
    const [salvando, setSalvando] = useState(false);

    // 1. Carrega as informações do livro
    useEffect(() => {
        if (!livroId) return;
        api.get<Livro>(`/livros/${livroId}`)
            .then(res => setLivro(res.data))
            .catch(() => {})
            .finally(() => setCarregando(false));
    }, [livroId]);

    // 2. Busca todas as avaliações no feed e identifica a do usuário logado neste livro
    useEffect(() => {
        if (!livroId) return;
        setCarregandoReviews(true);
        api.get<Avaliacao[]>('/feed')
            .then(res => {
                const comentariosDoLivro = res.data.filter(a => Number(a.livroId) === livroId);
                setReviews(comentariosDoLivro);

                // Filtra para saber se a conta atual já avaliou
                if (usuario?.id) {
                    const avaliacaoDoUsuario = comentariosDoLivro.find(a => Number(a.usuarioId) === usuario.id);
                    if (avaliacaoDoUsuario) {
                        setMinhaAvaliacao(avaliacaoDoUsuario);
                    } else {
                        setMinhaAvaliacao(null);
                    }
                }
            })
            .catch(() => {})
            .finally(() => setCarregandoReviews(false));
    }, [livroId, usuario?.id]);

    function abrirEdicao() {
        setTempEstrelas(minhaAvaliacao ? minhaAvaliacao.nota : 0);
        setTempComentario(minhaAvaliacao ? (minhaAvaliacao.comentario || '') : '');
        setShowEditModal(true);
    }

    async function salvarEdicao() {
        if (!livro || !usuario?.id) {
            Alert.alert('Atenção', 'Você precisa estar logado para avaliar.');
            return;
        }

        if (tempEstrelas === 0 || tempComentario.trim() === '') {
            Alert.alert('Atenção', 'Preencha a nota e o comentário.');
            return;
        }

        setSalvando(true);
        try {
            const res = await api.post<Avaliacao>('/avaliacao', {
                nota: tempEstrelas,
                comentario: tempComentario.trim(),
                usuarioId: usuario.id,
                livroId: livro.id,
            });

            // Cria o objeto para atualização local com a data de hoje caso a API não retorne createdAt
            const novaAvaliacao: Avaliacao = {
                id: res.data?.id ?? Date.now(),
                nota: tempEstrelas,
                comentario: tempComentario.trim(),
                createdAt: res.data?.createdAt || new Date().toISOString(),
                usuarioId: usuario.id,
                livroId: livro.id,
                usuario: { id: usuario.id, nome: usuario.nome, fotoUrl: usuario.fotoUrl }
            };

            // Atualiza o card superior exclusivo do usuário logado
            setMinhaAvaliacao(novaAvaliacao);

            // Atualiza a lista pública de avaliações do livro
            setReviews(prev => {
                const filtrados = prev.filter(r => Number(r.usuarioId) !== usuario.id);
                return [novaAvaliacao, ...filtrados];
            });

            setShowEditModal(false);
        } catch (err: any) {
            Alert.alert('Erro', err.response?.data?.error || 'Não foi possível salvar a avaliação.');
        } finally {
            setSalvando(false);
        }
    }

    if (carregando) {
        return (
            <SafeAreaView style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#1a3a5c" />
            </SafeAreaView>
        );
    }

    if (!livro) return null;

    return (
        <SafeAreaView style={s.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={s.header}>
                    <TouchableOpacity style={s.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back-outline" size={35} color="#000" />
                    </TouchableOpacity>
                    <Image style={s.logo} source={require('../assets/images/KOR logo.png')} />
                </View>

                <View style={s.bookInfoContainer}>
                    <Image style={s.bookImage} source={livro.capaUrl ? { uri: livro.capaUrl } : require('../assets/images/images.jpg')} />
                    <Text style={s.bookTitle}>{livro.titulo}</Text>
                    <Text style={s.bookAuthor}>{livro.autor}</Text>
                </View>

                {/* ── CARD "DADOS DA SUA LEITURA" (Apenas para o usuário logado) ── */}
                <View style={s.leituraCard}>
                    <View style={s.leituraHeader}>
                        <Text style={s.leituraTitle}>Dados da sua leitura</Text>
                        <TouchableOpacity onPress={abrirEdicao}>
                            <Text style={s.editarText}>{minhaAvaliacao ? 'editar' : 'adicionar'}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={s.leituraData}>
                        Lido em: {minhaAvaliacao ? formatData(minhaAvaliacao.createdAt) : '00/00/0000'}
                    </Text>

                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <Ionicons
                                key={i}
                                name={i <= (minhaAvaliacao?.nota || 0) ? 'star' : 'star-outline'}
                                size={22}
                                color="#7ab8e0"
                            />
                        ))}
                    </View>

                    {minhaAvaliacao?.comentario ? (
                        <Text style={s.comentarioSalvo}>{minhaAvaliacao.comentario}</Text>
                    ) : null}
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
                    <Text style={s.sectionTitle}>Sobre o Livro</Text>
                    <Text style={s.sobreText}>{livro.descricao ?? 'Sem descrição.'}</Text>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 8 }}>
                    <Text style={s.sectionTitle}>Avaliações Recentes</Text>
                </View>

                {carregandoReviews ? (
                    <ActivityIndicator size="small" color="#1a3a5c" style={{ marginVertical: 16 }} />
                ) : reviews.length === 0 ? (
                    <Text style={s.semAvaliacoes}>Nenhuma avaliação ainda. Seja o primeiro!</Text>
                ) : (
                    reviews.map(item => (
                        <View key={item.id} style={s.card}>
                            <View style={s.cardHeaderRow}>
                                <Image
                                    source={{ uri: item.usuario?.fotoUrl ?? 'https://randomuser.me/api/portraits/men/32.jpg' }}
                                    style={s.avatar}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={s.cardTitle}>{item.usuario?.nome ?? 'Usuário'}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Ionicons
                                                key={i}
                                                name={i <= item.nota ? 'star' : 'star-outline'}
                                                size={14}
                                                color="#FFC107"
                                                style={{ marginRight: 1 }}
                                            />
                                        ))}
                                    </View>
                                </View>
                            </View>
                            {item.comentario ? <Text style={s.cardText}>{item.comentario}</Text> : null}
                        </View>
                    ))
                )}
                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Modal para Editar/Adicionar Avaliação */}
            <Modal visible={showEditModal} transparent animationType="fade">
                <Pressable style={s.overlay} onPress={() => setShowEditModal(false)}>
                    <Pressable style={s.editBox} onPress={() => {}}>
                        <Text style={s.editTitulo}>{minhaAvaliacao ? 'Editar leitura' : 'Adicionar leitura'}</Text>
                        <Text style={s.editLabel}>Sua avaliação</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 18 }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <TouchableOpacity key={i} onPress={() => setTempEstrelas(i)}>
                                    <Ionicons
                                        name={i <= tempEstrelas ? 'star' : 'star-outline'}
                                        size={32}
                                        color="#1a3a5c"
                                        style={{ marginRight: 6 }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={s.editLabel}>Comentário</Text>
                        <TextInput
                            style={[s.input, s.inputComentario]}
                            placeholder="Escreva o que achou do livro..."
                            value={tempComentario}
                            onChangeText={setTempComentario}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity style={s.botaoCancelar} onPress={() => setShowEditModal(false)}>
                                <Text style={{ color: '#555' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.botaoSalvar} onPress={salvarEdicao} disabled={salvando}>
                                {salvando ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F6FB' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70, marginTop: 10 },
    backButton: { position: 'absolute', left: 15, zIndex: 1 },
    logo: { width: 70, height: 70, resizeMode: 'contain' },
    bookInfoContainer: { alignItems: 'center', paddingVertical: 20 },
    bookImage: { width: 150, height: 210, borderRadius: 10, resizeMode: 'cover', backgroundColor: '#eee' },
    bookTitle: { fontSize: 22, fontWeight: 'bold', color: '#111', marginTop: 14, textAlign: 'center', paddingHorizontal: 20 },
    bookAuthor: { fontSize: 15, color: '#666', marginTop: 4 },
    leituraCard: { backgroundColor: '#1a3a5c', margin: 16, borderRadius: 12, padding: 16 },
    leituraHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    leituraTitle: { color: '#fff', fontWeight: 'bold' },
    editarText: { color: '#7ab8e0' },
    leituraData: { color: '#b0d4f0', marginTop: 10 },
    comentarioSalvo: { color: '#d0eaf8', marginTop: 10, fontStyle: 'italic', lineHeight: 18 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 8 },
    sobreText: { fontSize: 14, color: '#444', lineHeight: 22 },
    semAvaliacoes: { textAlign: 'center', color: '#aaa', fontSize: 14, marginVertical: 16, paddingHorizontal: 20 },
    card: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: 12, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e5e5' },
    cardHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
    avatar: { width: 44, height: 44, borderRadius: 22 },
    cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#1a3a5c' },
    cardText: { color: '#333', lineHeight: 20, fontSize: 14 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
    editBox: { width: '88%', backgroundColor: '#fff', borderRadius: 14, padding: 20 },
    editTitulo: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 15 },
    editLabel: { fontSize: 13, color: '#666', marginBottom: 6 },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: '#111', marginBottom: 18 },
    inputComentario: { height: 100, marginBottom: 20 },
    botaoCancelar: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
    botaoSalvar: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#1a3a5c', alignItems: 'center' },
});