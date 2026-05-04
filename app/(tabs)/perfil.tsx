
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export default function Index() {
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Ionicons style={style.icon} name="chevron-back-outline" size={35} color="#000" />
                <Image style={style.logo} source={require('../../assets/images/KOR logo.png')} />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 125,
    },
});