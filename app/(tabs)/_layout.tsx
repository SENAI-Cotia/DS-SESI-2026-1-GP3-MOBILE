import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#3E579D",
                borderTopColor: "#4A2B1E",
                borderTopWidth: 3,
                height: 70,
                paddingTop: 5,
                paddingBottom: 5,
            }
        }}>
            <Tabs.Screen
                name="inicial"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.tabPadrao, focused && styles.tabAtiva]}>
                            <Ionicons name="home-outline" size={24} color="#ffffff" />
                            <Text style={styles.textoPadrao}>Início</Text>
                        </View>
                    )
                }}
            />

            <Tabs.Screen
                name="pesquisar"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.tabPadrao, focused && styles.tabAtiva]}>
                            <Ionicons name="search-outline" size={24} color="#ffffff" />
                            <Text style={styles.textoPadrao}>Pesquisar</Text>
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="anotacoes"
                options={{
                    title: "",
                    tabBarIcon: () => (
                        <View style={styles.anotacoes}>
                            <Ionicons name="book" size={37} color="#3E579D" />
                            <Text style={styles.textAnotacoes}>Anotações</Text>
                        </View>
                    )
                }}
            />

            <Tabs.Screen
                name="leituras"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.tabPadrao, focused && styles.tabAtiva]}>
                            <Ionicons name="time-outline" size={24} color="#ffffff" />
                            <Text style={styles.textoPadrao}>Leituras</Text>
                        </View>
                    )
                }}
            />

            <Tabs.Screen
                name="perfil"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.tabPadrao, focused && styles.tabAtiva]}>
                            <Ionicons name="person-outline" size={24} color="#ffffff" />
                            <Text style={styles.textoPadrao}>Perfil</Text>
                        </View>
                    )
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabPadrao: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: -18,
    },
    tabAtiva: {
        backgroundColor: '#546DB3',
        width: 70,
        height: 65,
    },
    textoPadrao: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '700',
        marginTop: 4,
    },
    anotacoes: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: 100,
        height: 100,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: '#4A2B1E',
        top: -15,
        elevation: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    textAnotacoes: {
        fontSize: 13,
        fontWeight: '700',
        marginTop: -2,
        color: '#3E579D'
    },
});