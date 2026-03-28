import { useState, useEffect } from "react";
import { Alert } from "react-native";

import { getCurrentLocation } from "../services/locationService";
import {
  salvarLocalizacao as salvarStorage,
  obterLocalizacao,
  removerLocalizacao,
} from "../services/storageService";

export function useSaveLocation() {
  //Estados
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carrega localização salva ao iniciar
  useEffect(() => {
    carregarLocalSalvo();
  }, []);

  const carregarLocalSalvo = async () => {
    try {
      const saved = await obterLocalizacao();
      if (saved) {
        setLocation(saved);
      }
    } catch (error) {
      console.log("Erro ao carregar localização salva:", error);
    }
  };

  //Método para salvar a localização
  const salvarLocalizacao = async (descricao) => {
    // Valida descrição
    if (!descricao || descricao.trim() === "") {
      Alert.alert("Informe o andar/setor!");
      return;
    }

    try {
      setLoading(true);

      const coords = await getCurrentLocation();

      const dados = {
        // Monta objeto com os dados
        latitude: coords.latitude,
        longitude: coords.longitude,
        descricao,
      };

      await salvarStorage(dados);
      setLocation(dados);

      Alert.alert("Localização salva com sucesso!");
    } catch (error) {
      Alert.alert("Erro ao obter localização");
    } finally {
      setLoading(false);
    }
  };

  // Remove a localização salva com confirmação
  const removerLocalizacaoSalva = async () => {
    Alert.alert("Remover localização", "Tem certeza que deseja apagar?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        onPress: async () => {
          try {
            await removerLocalizacao();
            setLocation(null);
            Alert.alert("Localização removida com sucesso!");
          } catch (error) {
            Alert.alert("Erro ao remover localização");
          }
        },
      },
    ]);
  };

  return {
    location,
    loading,
    salvarLocalizacao,
    removerLocalizacaoSalva,
  };
}
