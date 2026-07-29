import { Platform } from 'react-native';

// expo-secure-store NÃO funciona no Expo Web (não existe Keychain/Keystore no browser).
// Este wrapper escolhe a implementação certa automaticamente:
// - Native (iOS/Android): expo-secure-store (criptografado)
// - Web: localStorage (sem criptografia, mas é o único storage persistente síncrono do browser)

async function getItemAsync(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    }
    const SecureStore = await import('expo-secure-store');
    return SecureStore.getItemAsync(key);
}

async function setItemAsync(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
        return;
    }
    const SecureStore = await import('expo-secure-store');
    await SecureStore.setItemAsync(key, value);
}

async function deleteItemAsync(key: string): Promise<void> {
    if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return;
    }
    const SecureStore = await import('expo-secure-store');
    await SecureStore.deleteItemAsync(key);
}

export const storage = { getItemAsync, setItemAsync, deleteItemAsync };
