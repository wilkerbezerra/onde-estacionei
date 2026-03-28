import { useState, useRef, useEffect } from "react";
import { Alert } from "react-native";

import { obterLocalizacao } from "../services/storageService";
import { startWatchingLocation } from "../services/locationService";
import { calcularDistancia } from "../utils/calcularDistancia";

export function useLocation() {
  // Principais estados
  const [savedLocation, setSavedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  // Guarda a inscrição do rastreamento
  const locationSubscription = useRef(null);

  // Carrega ao iniciar a localização salva
  useEffect(() => {
    carregarLocalSalvo();
  }, []);

  const carregarLocalSalvo = async () => {
    try {
      const saved = await obterLocalizacao();

      if (saved) {
        setSavedLocation(saved);
      }
    } catch (error) {
      console.log("Erro ao carregar localização salva:", error);
    }
  };

  const iniciarRastreamento = async () => {
    try {
      let saved = savedLocation;

      // Verifica se existe ou não localização salva
      if (!saved) {
        saved = await obterLocalizacao();

        if (!saved) {
          Alert.alert("Nenhuma localização salva!");
          return;
        }

        setSavedLocation(saved);
      }

      // Inicia o rastreamento da localização
      locationSubscription.current = await startWatchingLocation((loc) => {
        try {
          const current = loc?.coords;

          // Evita erro com dados inválidos
          if (!current) {
            console.log("Localização inválida:", loc);
            return;
          }

          setCurrentLocation(current);

          // Calcula a distância com método específico ver pasta utils
          if (saved && current) {
            const dist = calcularDistancia(saved, current);
            setDistance(dist);
          }
        } catch (error) {
          console.log("Erro no rastreamento:", error);
        }
      });
    } catch (error) {
      Alert.alert("Erro ao iniciar rastreamento");
      console.log(error);
    }
  };

  // Encerra o rastreamento, mas não apaga a localização salva
  const pararRastreamento = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }

    setCurrentLocation(null);
    setDistance(null);
  };

  // Limpeza ao sair da tela
  useEffect(() => {
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  return {
    savedLocation,
    currentLocation,
    distance,
    iniciarRastreamento,
    pararRastreamento,
  };
}
