import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
// Caso use expo-icons / lucide-react-native / vector-icons:
import { Ionicons } from "@expo/vector-icons"; 

interface Anotacao {
  id?: number;
  conteudo: string;
  usuarioId: string | number;
  livroId: number;
}

interface Props {
  livroId: number;
  usuarioId: string | number;
  onVoltar: () => void;
  apiBaseUrl: string; // Ex: "http://seu-ip:3000"
}

export default function TelaAnotacoesMobile({
  livroId,
  usuarioId,
  onVoltar,
  apiBaseUrl,
}: Props) {
  const [livro, setLivro] = useState<{ titulo: string } | null>(null);
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [novoConteudo, setNovoConteudo] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Busca as informações do livro selecionado
  useEffect(() => {
    async function carregarLivro() {
      try {
        const response = await fetch(`${apiBaseUrl}/livros/${livroId}`);
        if (response.ok) {
          const data = await response.json();
          setLivro(data);
        }
      } catch (error) {
        console.error("Erro ao buscar livro:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarLivro();
  }, [livroId]);

  // Envia a nova anotação para o backend existente (POST /livros/:id/anotacoes)
  const handleSalvarAnotacao = async () => {
    if (!novoConteudo.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${apiBaseUrl}/livros/${livroId}/anotacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conteudo: novoConteudo,
          usuarioId: usuarioId,
        }),
      });

      if (response.ok) {
        const novaAnotacaoCriada = await response.json();
        
        // Adiciona localmente na lista da tela
        setAnotacoes((prev) => [novaAnotacaoCriada, ...prev]);
        setNovoConteudo("");
        setMostrarForm(false);
      } else {
        alert("Erro ao salvar anotação.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Falha de conexão com o servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  // Exclusão local (já que não há rota de delete no backend)
  const handleDeletarLocal = (indexParaRemover: number) => {
    setAnotacoes((prev) => prev.filter((_, index) => index !== indexParaRemover));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* --- CABEÇALHO --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onVoltar}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Anotações</Text>

        <TouchableOpacity
          style={[styles.iconButton, styles.plusButton]}
          onPress={() => setMostrarForm(!mostrarForm)}
        >
          <Ionicons name={mostrarForm ? "close" : "add"} size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* --- INFOS DO LIVRO SELECIONADO --- */}
      {loading ? (
        <ActivityIndicator size="small" color="#000" style={{ marginVertical: 10 }} />
      ) : (
        <View style={styles.livroCard}>
          <Ionicons name="book-outline" size={20} color="#4F46E5" />
          <Text style={styles.livroTitulo} numberOfLines={1}>
            {livro ? livro.titulo : `Livro #${livroId}`}
          </Text>
        </View>
      )}

      {/* --- FORMULÁRIO DE NOVA ANOTAÇÃO --- */}
      {mostrarForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escreva sua anotação privada..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
            value={novoConteudo}
            onChangeText={setNovoConteudo}
          />
          <View style={styles.formButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setMostrarForm(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSalvarAnotacao}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.saveText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* --- LISTA DE ANOTAÇÕES DA SESSÃO --- */}
      <FlatList
        data={anotacoes}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="journal-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>Nenhuma anotação nesta sessão.</Text>
            <Text style={styles.emptySubtext}>
              Toque no botão "+" acima para adicionar.
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.anotacaoCard}>
            <Text style={styles.anotacaoTexto}>{item.conteudo}</Text>
            <TouchableOpacity
              onPress={() => handleDeletarLocal(index)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// --- ESTILOS VISUAIS (Seguindo o design da imagem enviada) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  plusButton: {
    backgroundColor: "#0F172A",
  },
  livroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  livroTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  input: {
    minHeight: 70,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#1E293B",
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancelText: {
    color: "#64748B",
    fontSize: 13,
  },
  saveButton: {
    backgroundColor: "#0F172A",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  anotacaoCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  anotacaoTexto: {
    fontSize: 14,
    color: "#334155",
    flex: 1,
    lineHeight: 20,
  },
  deleteButton: {
    paddingLeft: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },
  emptySubtext: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },
});