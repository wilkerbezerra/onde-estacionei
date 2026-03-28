import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useState } from "react";

// Mapa desativado por causa da API do Google Maps ser paga
// import MapView, { Marker } from "react-native-maps";

import Botao from "../components/Botao";
import CardInfo from "../components/CardInfo";

import { useLocation } from "../hooks/useLocation";

// Tela para visualizar localização salva e distância calculcada
export default function ViewLocationScreen() {
  const {
    savedLocation,
    currentLocation,
    distance,
    iniciarRastreamento,
    pararRastreamento,
  } = useLocation();

  const [rastreamentoAtivo, setRastreamentoAtivo] = useState(false);

  // Inicia o rastreamento
  const handleIniciar = async () => {
    try {
      await iniciarRastreamento();
      setRastreamentoAtivo(true);
    } catch (error) {
      console.log("Erro ao iniciar:", error);
    }
  };

  // Finaliza o rastreamento, mas sem apagar os dados
  const handleEncerrar = () => {
    pararRastreamento();
    setRastreamentoAtivo(false);
  };

  // Garante valores válidos, evitando aplicação "quebrar"
  const latitude = Number(currentLocation?.latitude || savedLocation?.latitude);
  const longitude = Number(
    currentLocation?.longitude || savedLocation?.longitude,
  );

  const coordenadasValidas =
    latitude && longitude && !isNaN(latitude) && !isNaN(longitude);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Ver Localização
      </Text>

      {/* Botão para iniciar o rastreamento*/}
      <Botao
        onPress={handleIniciar}
        disabled={rastreamentoAtivo || !savedLocation}
      >
        {rastreamentoAtivo ? "Rastreamento Ativo" : "Iniciar Rastreamento"}
      </Botao>

      {/* Botão encerrar o rastremanto */}
      {rastreamentoAtivo && (
        <Botao onPress={handleEncerrar}>Encerrar Rastreamento</Botao>
      )}

      {/* Mostra piso/setor quando preenchidos*/}
      {savedLocation?.descricao && rastreamentoAtivo && (
        <CardInfo>
          <Text style={styles.text}>
            📍 Local do veículo:
            {"\n"}
            <Text style={styles.bold}>{savedLocation.descricao}</Text>
          </Text>
        </CardInfo>
      )}

      {/* Mapa desabilitado (Api do Google Maps solicita cartão de Crédito) */}
      {/* {

      {rastreamentoAtivo && savedLocation && coordenadasValidas && (
        <MapView
          // provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(savedLocation.latitude),
              longitude: Number(savedLocation.longitude),
            }}
            title="Seu carro"
            description={savedLocation.descricao}
            pinColor="red"
          />

          {currentLocation?.latitude && currentLocation?.longitude && (
            <Marker
              coordinate={{
                latitude: Number(currentLocation.latitude),
                longitude: Number(currentLocation.longitude),
              }}
              title="Você"
              pinColor="blue"
            />
          )}
        </MapView>
      )}
} */}
      {/* Mostra a distância até o veículo */}
      {rastreamentoAtivo && distance !== null && (
        <CardInfo>
          <Text style={styles.text}>
            Distância até o veículo:
            <Text style={styles.bold}> {distance} metros</Text>
          </Text>
        </CardInfo>
      )}

      {/* Caso não tenha localização salva mostra o texto abaixo */}
      {!savedLocation && <CardInfo>Nenhuma localização salva ainda.</CardInfo>}
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: 350,
    marginTop: 20,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});
