import React, { useState } from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, SafeAreaView,
    TouchableOpacity, Modal, TextInput, Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const STATUS_OPTIONS = ['Não lido', 'Lendo', 'Lido', 'Abandonado'];

const reviews = [
    {
        id: '1',
        avatar: { uri: 'https://randomuser.me/api/portraits/men/32.jpg' },
        title: 'Engenharia Elétrica',
        rating: '4,8',
        text: 'Adorei ler este livro, contribuiu muito para o meu aprendizado, super indico para quem quer evoluir em sua carreira.',
        date: '27/04/2026',
        timeAgo: 'Há 2 dias',
    },
    {
        id: '2',
        avatar: { uri: 'https://randomuser.me/api/portraits/women/44.jpg' },
        title: 'Engenharia Elétrica',
        rating: '4,5',
        text: 'Muito bom! Recomendo para todos que querem aprender sobre o assunto.',
        date: '25/04/2026',
        timeAgo: 'Há 4 dias',
    },
];

export default function App() {
    const router = useRouter();

    const [status, setStatus] = useState('Lido');
    const [showStatusModal, setShowStatusModal] = useState(false);

    const [liked, setLiked] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [data, setData] = useState('00/00/0000');
    const [estrelas, setEstrelas] = useState(0);
    const [comentario, setComentario] = useState('');
    const [tempData, setTempData] = useState('');
    const [tempEstrelas, setTempEstrelas] = useState(0);
    const [tempComentario, setTempComentario] = useState('');

    const [showDadosModal, setShowDadosModal] = useState(false);

    function abrirEdicao() {
        setTempData(data);
        setTempEstrelas(estrelas);
        setTempComentario(comentario);
        setShowEditModal(true);
    }

    function salvarEdicao() {
        if (tempData != '') setData(tempData);
        setEstrelas(tempEstrelas);
        setComentario(tempComentario);
        setShowEditModal(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back-outline" size={28} color="#000" />
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require('../assets/images/KOR logo.png')} />
                    <View style={{ width: 28 }} />
                </View>

                <View style={styles.bookInfoContainer}>
                    <Image style={styles.bookImage} source={require('../assets/images/images.jpg')} />
                    <TouchableOpacity style={styles.heartButton} onPress={() => setLiked(!liked)}>
                        <Ionicons name={liked ? 'heart' : 'heart-outline'} size={22} color="#e24b4a" />
                    </TouchableOpacity>
                    <Text style={styles.bookTitle}>Engenharia Elétrica</Text>
                    <Text style={styles.bookAuthor}>autor</Text>
                </View>

                <TouchableOpacity style={styles.dropdown} onPress={() => setShowStatusModal(true)}>
                    <Text style={styles.dropdownText}>{status}</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="#000" />
                </TouchableOpacity>

                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => setShowDadosModal(true)}>
                        <Ionicons name="list-outline" size={20} color="#000" />
                        <Text style={styles.actionText}>Dados do livro</Text>
                    </TouchableOpacity>
                    <View style={styles.divisor} />
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="share-outline" size={20} color="#000" />
                        <Text style={styles.actionText}>Compartilhar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.leituraCard}>
                    <View style={styles.leituraHeader}>
                        <Text style={styles.leituraTitle}>Dados da sua leitura</Text>
                        <TouchableOpacity onPress={abrirEdicao}>
                            <Text style={styles.editarText}>editar</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.leituraData}>Lido em: {data}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <Ionicons
                                key={i}
                                name={i <= estrelas ? 'star' : 'star-outline'}
                                size={22}
                                color="#7ab8e0"
                            />
                        ))}
                    </View>
                    {comentario != '' && (
                        <Text style={styles.comentarioSalvo}>{comentario}</Text>
                    )}
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
                    <Text style={styles.sectionTitle}>Sobre o Livro</Text>
                    <Text style={styles.sobreText}>
                        Este livro é uma introdução abrangente à engenharia elétrica, cobrindo os princípios fundamentais, circuitos elétricos, eletrônica, sistemas de energia e muito mais.
                    </Text>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 16, marginBottom: 8 }}>
                    <Text style={styles.sectionTitle}>Avaliações Recentes</Text>
                </View>

                {reviews.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Image source={item.avatar} style={styles.avatar} />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardRating}>Avaliação: {item.rating}</Text>
                        <Text style={styles.cardText}>{item.text}</Text>
                        <Text style={styles.cardDate}>{item.date} - {item.timeAgo}</Text>
                    </View>
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Modal Status */}
            <Modal visible={showStatusModal} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={() => setShowStatusModal(false)}>
                    <View style={styles.statusBox}>
                        <Text style={styles.statusTitulo}>Status de leitura</Text>
                        {STATUS_OPTIONS.map(opcao => (
                            <TouchableOpacity
                                key={opcao}
                                style={styles.statusOpcao}
                                onPress={() => {
                                    setStatus(opcao);
                                    setShowStatusModal(false);
                                }}
                            >
                                <Text style={[styles.statusTexto, status === opcao && styles.statusTextoAtivo]}>
                                    {opcao}
                                </Text>
                                {status === opcao && (
                                    <Ionicons name="checkmark" size={18} color="#1a3a5c" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>

            {/* Modal Editar */}
            <Modal visible={showEditModal} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={() => setShowEditModal(false)}>
                    <Pressable style={styles.editBox} onPress={() => {}}>
                        <Text style={styles.editTitulo}>Editar leitura</Text>

                        <Text style={styles.editLabel}>Data de leitura</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="DD/MM/AAAA"
                            value={tempData}
                            onChangeText={setTempData}
                            keyboardType="numeric"
                            maxLength={10}
                        />

                        <Text style={styles.editLabel}>Sua avaliação</Text>
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

                        <Text style={styles.editLabel}>Comentário</Text>
                        <TextInput
                            style={[styles.input, styles.inputComentario]}
                            placeholder="Escreva o que achou do livro..."
                            value={tempComentario}
                            onChangeText={setTempComentario}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />

                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity
                                style={styles.botaoCancelar}
                                onPress={() => setShowEditModal(false)}
                            >
                                <Text style={{ color: '#555' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botaoSalvar} onPress={salvarEdicao}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>

            <Modal visible={showDadosModal} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={() => setShowDadosModal(false)}>
                    <Pressable style={styles.editBox} onPress={() => {}}>
                        <View style={styles.dadosHeader}>
                            <Text style={styles.editTitulo}>Dados do livro</Text>
                            <TouchableOpacity onPress={() => setShowDadosModal(false)}>
                                <Ionicons name="close" size={22} color="#888" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.dadosRow}>
                            <Text style={styles.dadosLabel}>Título</Text>
                            <Text style={styles.dadosValor}>Engenharia Elétrica</Text>
                        </View>
                        <View style={styles.dadosDivisor} />

                        <View style={styles.dadosRow}>
                            <Text style={styles.dadosLabel}>Autor</Text>
                            <Text style={styles.dadosValor}>Fulano de Tal</Text>
                        </View>
                        <View style={styles.dadosDivisor} />

                        <View style={styles.dadosRow}>
                            <Text style={styles.dadosLabel}>Editora</Text>
                            <Text style={styles.dadosValor}>Livraria Editora</Text>
                        </View>
                        <View style={styles.dadosDivisor} />

                        <View style={styles.dadosRow}>
                            <Text style={styles.dadosLabel}>Ano</Text>
                            <Text style={styles.dadosValor}>2024</Text>
                        </View>
                        <View style={styles.dadosDivisor} />

                        <View style={styles.dadosRow}>
                            <Text style={styles.dadosLabel}>Páginas</Text>
                            <Text style={styles.dadosValor}>320</Text>
                        </View>
                        <View style={styles.dadosDivisor} />

                        <View style={styles.dadosRow}>
                            <Text style={styles.dadosLabel}>ISBN</Text>
                            <Text style={styles.dadosValor}>978-3-16-148410-0</Text>
                        </View>
                        <View style={styles.dadosDivisor} />

                        <View style={styles.dadosRow}>
                            <Text style={styles.dadosLabel}>Gênero</Text>
                            <Text style={styles.dadosValor}>Técnico / Engenharia</Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.botaoSalvar, { marginTop: 20 }]}
                            onPress={() => setShowDadosModal(false)}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Fechar</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 15,
        height: 60,
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    bookInfoContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    bookImage: {
        width: 140,
        height: 190,
        borderRadius: 6,
        resizeMode: 'cover',
    },
    heartButton: {
        position: 'absolute',
        top: 16,
        right: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    bookTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
        marginTop: 12,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    dropdownText: {
        fontSize: 15,
        color: '#111',
    },
    actionsRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
    },
    divisor: {
        width: 1,
        backgroundColor: '#ddd',
    },
    actionText: {
        fontSize: 14,
        color: '#111',
    },
    leituraCard: {
        backgroundColor: '#1a3a5c',
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 10,
        padding: 16,
    },
    leituraHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    leituraTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#e8f4ff',
    },
    editarText: {
        fontSize: 13,
        color: '#7ab8e0',
    },
    leituraData: {
        fontSize: 13,
        color: '#7ab8e0',
    },
    comentarioSalvo: {
        fontSize: 13,
        color: '#b0d4f0',
        marginTop: 10,
        fontStyle: 'italic',
        lineHeight: 18,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 8,
    },
    sobreText: {
        fontSize: 13,
        color: '#444',
        lineHeight: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 30,
        padding: 16,
        paddingTop: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        position: 'absolute',
        top: -24,
        left: 16,
        borderWidth: 2,
        borderColor: '#fff',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111',
        marginTop: 26,
        marginBottom: 4,
    },
    cardRating: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    cardText: {
        fontSize: 13,
        color: '#333',
        lineHeight: 19,
        marginBottom: 8,
    },
    cardDate: {
        fontSize: 12,
        color: '#999',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: 260,
        overflow: 'hidden',
    },
    statusTitulo: {
        fontSize: 13,
        color: '#888',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    statusOpcao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    statusTexto: {
        fontSize: 15,
        color: '#333',
    },
    statusTextoAtivo: {
        fontWeight: 'bold',
        color: '#1a3a5c',
    },
    editBox: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 24,
        width: '88%',
    },
    editTitulo: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 20,
    },
    editLabel: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        color: '#111',
        marginBottom: 18,
    },
    inputComentario: {
        height: 100,
        marginBottom: 20,
    },
    botaoCancelar: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    botaoSalvar: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#1a3a5c',
        alignItems: 'center',
    },
    dadosHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    dadosRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    dadosLabel: {
        fontSize: 13,
        color: '#888',
    },
    dadosValor: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#111',
        maxWidth: '60%',
        textAlign: 'right',
    },
    dadosDivisor: {
        height: 1,
        backgroundColor: '#f0f0f0',
    },
});