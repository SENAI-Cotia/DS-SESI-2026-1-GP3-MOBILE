import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useRouter } from "expo-router";

const reviews = [
    {
        id: '1',
        image: require('../../assets/images/images.jpg'),
        title: 'Engenharia Elétrica',
        rating: '4,0',
        text: 'Adorei ler este livro, contribuiu muito para o meu aprendizado, super indico para quem quer evoluir em sua carreira.',
        date: '27/04/2026',
        timeAgo: 'Há 2 dias'
    },
    {
        id: '2',
        image: require('../../assets/images/images.jpg'),
        title: 'Engenharia Elétrica',
        rating: '5,0',
        text: 'Adorei ler este livro, contribuiu muito para o meu aprendizado, super indico para quem quer evoluir em sua carreira.',
        date: '27/04/2026',
        timeAgo: 'Há 2 dias'
    },
];

export default function App() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F6FB" />

            <ScrollView contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                <View style={styles.header}>

                    <Image style={styles.logo} source={require('../../assets/images/KOR logo.png')} />

                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="notifications-outline" size={27} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.bemVindoContainer}>
                    <Text style={styles.bemVindoTitle}>Bom dia, Fulano!</Text>
                    <Text style={styles.bemVindoSubtitle}>Que tal continuar sua jornada de leitura?</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="people-outline" size={28} color="#000" />
                    <Text> Avalições dos Usuários</Text>
                </View>

                {reviews.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <TouchableOpacity onPress={() => router.push("../")} >
                            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg'}} style={styles.Avatar}/>
                        </TouchableOpacity>

                        <View style={styles.cardHeaderRow}>
                            <Text style={styles.dateText}>{item.date}</Text>
                            <Text style={styles.timeAgoText}>{item.timeAgo}</Text>
                        </View>

                        <View style={styles.cardBodyRow}>
                            <TouchableOpacity onPress={() => router.push("../livro")}>
                                <Image source={item.image} style={styles.cardImage} />
                            </TouchableOpacity>

                            <View style={styles.cardTextContent}>
                                <Text style={styles.cardTitle}>{item.title}</Text>

                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingLabel}>Avaliação:</Text>
                                    <Ionicons name="star" size={14} color="#FFC107" style={styles.starIcon} />
                                    <Text style={styles.ratingValue}>{item.rating}</Text>
                                </View>

                                <Text style={styles.cardDescription}>{item.text}</Text>
                            </View>
                        </View>

                    </View>
                ))}
                <View style={{ height: 120 }} />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FB',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 45 : 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    logo: {
        width: 40,
        height: 40,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 15,
    },
    bemVindoContainer: {
        marginBottom: 20,
    },
    bemVindoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    bemVindoSubtitle: {
        fontSize: 14,
        color: '#555',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        height: 45,
        marginBottom: 15,
        marginTop: -10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    sectionIconContainer: {
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#FFF',
        borderWidth: 3,
        borderColor: '#3b5998',
        borderRadius: 15,
        marginBottom: 22,
        paddingHorizontal: 15,
        paddingBottom: 20,
        paddingTop: 35,
    },
    Avatar: {
        width: 50,
        height: 50,
        borderRadius: 24,
        position: 'absolute',
        top: -55,
        left: 18,
        borderWidth: 2,
        borderColor: '#FFF',
        zIndex: 5,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dateText: {
        fontSize: 15,
        color: '#000',
    },
    timeAgoText: {
        fontSize: 15,
        color: '#333',
    },
    cardBodyRow: {
        flexDirection: 'row',
    },
    cardImage: {
        width: 90,
        height: 135,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#3E2723',
        marginRight: 15,
    },
    cardTextContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 19,
        color: '#3b5998',
        marginBottom: 5,
        fontWeight: '500',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ratingLabel: {
        fontSize: 14,
        color: '#333',
        marginRight: 5,
    },
    starIcon: {
        marginRight: 3,
    },
    ratingValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDescription: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
});