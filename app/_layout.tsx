import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Slot, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

function AuthGuard() {
    const { usuario, carregandoAuth } = useAuth();
    const router   = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (carregandoAuth) return;
        const publica = segments[0] === undefined || segments[0] === 'cadastro';
        if (!usuario && !publica) router.replace('/');
        else if (usuario && publica) router.replace('/inicial');
    }, [usuario, carregandoAuth, segments]);

    if (carregandoAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <ActivityIndicator size="large" color="#1a3a5c" />
            </View>
        );
    }
    return <Slot />;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <AuthGuard />
        </AuthProvider>
    );
}
