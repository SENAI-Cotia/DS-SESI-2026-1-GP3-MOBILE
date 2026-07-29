import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator, Image, Platform, SafeAreaView,
    ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

type Avaliacao = {
    id: number;
    nota: number;
    comentario?: string;
    createdAt?: string;
    usuarioId: number;
    livroId: number;
    usuario?: { id: number; nome: string; fotoUrl?: string };
    livro?:   { id: number; titulo: string; capaUrl?: string };
};

function formatData(iso?: string) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('pt-BR');
}
function timeAgo(iso?: string) {
    if (!iso) return '';
    const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (d === 0) return 'Hoje';
    if (d === 1) return 'Há 1 dia';
    return `Há ${d} dias`;
}
function saudacao() {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
}

export default function Feed() {
    const router      = useRouter();
    const { usuario } = useAuth();

    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
    const [loading, setLoading]       = useState(true);
    const [erro, setErro]             = useState<string | null>(null);

    useEffect(() => {
        api.get<Avaliacao[]>('/feed')
            .then(res => setAvaliacoes(res.data))
            .catch(() => setErro('Não foi possível carregar as avaliações.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F6FB" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <Image style={styles.logo} source={require('../../assets/images/KOR logo.png')} />
                </View>

                <View style={styles.bemVindoContainer}>
                    <Text style={styles.bemVindoTitle}>
                        {saudacao()}, {usuario?.nome?.split(' ')[0] ?? 'Leitor'}!
                    </Text>
                    <Text style={styles.bemVindoSubtitle}>Que tal continuar sua jornada de leitura?</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="people-outline" size={28} color="#000" />
                    <Text> Avaliações dos Usuários</Text>
                </View>

                {loading && <ActivityIndicator size="large" color="#3b5998" style={{ marginTop: 30 }} />}
                {!loading && erro && <Text style={styles.erroText}>{erro}</Text>}

                {!loading && !erro && avaliacoes.map(item => (
                    <View key={item.id} style={styles.card}>
                        <Image
                            source={{ uri: item.usuario?.fotoUrl ?? 'https://randomuser.me/api/portraits/men/32.jpg' }}
                            style={styles.Avatar}
                        />
                        <View style={styles.cardHeaderRow}>
                            <Text style={styles.nomeUsuario}>{item.usuario?.nome ?? 'Usuário'}</Text>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.dateText}>{formatData(item.createdAt)}</Text>
                                <Text style={styles.timeAgoText}>{timeAgo(item.createdAt)}</Text>
                            </View>
                        </View>
                        <View style={styles.cardBodyRow}>
                            <TouchableOpacity
                                onPress={() => item.livro?.id
                                    ? router.push({ pathname: '../livro', params: { id: item.livro.id } })
                                    : null
                                }
                            >
                                {item.livro?.capaUrl
                                    ? <Image source={{ uri: item.livro.capaUrl }} style={styles.cardImage} />
                                    : <Image source={require('../../assets/images/images.jpg')} style={styles.cardImage} />
                                }
                            </TouchableOpacity>
                            <View style={styles.cardTextContent}>
                                <Text style={styles.cardTitle}>{item.livro?.titulo ?? 'Livro'}</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingLabel}>Avaliação:</Text>
                                    <Ionicons name="star" size={14} color="#FFC107" style={styles.starIcon} />
                                    <Text style={styles.ratingValue}>{item.nota.toFixed(1).replace('.', ',')}</Text>
                                </View>
                                {item.comentario ? <Text style={styles.cardDescription}>{item.comentario}</Text> : null}
                            </View>
                        </View>
                    </View>
                ))}

                {!loading && !erro && avaliacoes.length === 0 && (
                    <Text style={styles.erroText}>Nenhuma avaliação encontrada.</Text>
                )}

                <View style={{ height: 120 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:        { flex: 1, backgroundColor: '#F4F6FB' },
    scrollContent:    { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 45 : 10 },
    header:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    logo:             { width: 40, height: 40 },
    bemVindoContainer:{ marginBottom: 20 },
    bemVindoTitle:    { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 2 },
    bemVindoSubtitle: { fontSize: 14, color: '#555' },
    searchContainer:  { flexDirection: 'row', alignItems: 'center', borderRadius: 25, height: 45, marginBottom: 15, marginTop: -10 },
    card:             { backgroundColor: '#FFF', borderWidth: 3, borderColor: '#3b5998', borderRadius: 15, marginBottom: 22, paddingHorizontal: 15, paddingBottom: 20, paddingTop: 35 },
    Avatar:           { width: 50, height: 50, borderRadius: 24, position: 'absolute', top: -25, left: 18, borderWidth: 2, borderColor: '#FFF', zIndex: 5 },
    cardHeaderRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
    nomeUsuario:      { fontSize: 15, fontWeight: 'bold', color: '#1a3a5c', flex: 1 },
    dateText:         { fontSize: 13, color: '#000' },
    timeAgoText:      { fontSize: 13, color: '#888' },
    cardBodyRow:      { flexDirection: 'row' },
    cardImage:        { width: 90, height: 135, borderRadius: 6, borderWidth: 2, borderColor: '#3E2723', marginRight: 15 },
    cardTextContent:  { flex: 1 },
    cardTitle:        { fontSize: 19, color: '#3b5998', marginBottom: 5, fontWeight: '500' },
    ratingContainer:  { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    ratingLabel:      { fontSize: 14, color: '#333', marginRight: 5 },
    starIcon:         { marginRight: 3 },
    ratingValue:      { fontSize: 14, fontWeight: 'bold', color: '#333' },
    cardDescription:  { fontSize: 14, color: '#333', lineHeight: 20 },
    erroText:         { textAlign: 'center', marginTop: 30, color: '#888', fontSize: 14 },
});
