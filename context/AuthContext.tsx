import { api, setOnUnauthorized, TOKEN_KEY } from '@/lib/api';
import { storage } from '@/lib/storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface UsuarioLogado {
    id: number;
    nome: string;
    email: string;
    cpf?: string;
    curso?: string;
    fotoUrl?: string;
    role?: string;
}

interface AuthContextData {
    usuario: UsuarioLogado | null;
    carregandoAuth: boolean;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const USER_KEY = 'kor_usuario';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario]           = useState<UsuarioLogado | null>(null);
    const [carregandoAuth, setCarregando] = useState(true);

    // Restaura sessão salva ao abrir o app
    useEffect(() => {
        (async () => {
            try {
                const token    = await storage.getItemAsync(TOKEN_KEY);
                const userJson = await storage.getItemAsync(USER_KEY);
                if (token && userJson) {
                    setUsuario(JSON.parse(userJson));
                }
            } catch {
                // ignora — usuário simplesmente não está logado
            } finally {
                setCarregando(false);
            }
        })();
    }, []);

    // Se qualquer chamada da API receber 401, desloga automaticamente
    useEffect(() => {
        setOnUnauthorized(() => {
            setUsuario(null);
            storage.deleteItemAsync(USER_KEY).catch(() => {});
        });
    }, []);

    const login = useCallback(async (email: string, senha: string) => {
        // POST /login retorna { token } OU { message, user } dependendo do fluxo do backend.
        const { data } = await api.post('/login', { email: email.trim(), senha });

        const token: string | undefined = data.token;
        const userInfo: { id: number; nome: string; role?: string } | undefined = data.user;

        if (!token && !userInfo) {
            throw new Error(data.error || 'Resposta de login inesperada');
        }

        if (token) {
            await storage.setItemAsync(TOKEN_KEY, token);
        }

        // Busca os dados completos do usuário via /alunos (já que /login não retorna tudo)
        const { data: alunos } = await api.get<UsuarioLogado[]>('/alunos');
        const encontrado = alunos.find(a => a.email === email.trim());

        if (!encontrado) {
            throw new Error('Usuário não encontrado em /alunos (pode ser uma conta ADMIN/bibliotecária)');
        }

        setUsuario(encontrado);
        await storage.setItemAsync(USER_KEY, JSON.stringify(encontrado));
    }, []);

    const logout = useCallback(async () => {
        setUsuario(null);
        await storage.deleteItemAsync(TOKEN_KEY);
        await storage.deleteItemAsync(USER_KEY);
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, carregandoAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
