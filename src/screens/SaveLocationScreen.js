import { StyleSheet, View, TextInput } from "react-native";
import { Text } from "react-native-paper";
import { useState, useEffect } from "react";

import Botao from "../components/Botao";
import CardInfo from "../components/CardInfo";

import { useSaveLocation } from "../hooks/useSaveLocation";

// Tela responsável por salvar a localização
export default function SaveLocationScreen() {
  const { location, loading, salvarLocalizacao, removerLocalizacaoSalva } =
    useSaveLocation();

  //Etados
  const [descricao, setDescricao] = useState("");

  // Preenche o input com a descrição salva
  useEffect(() => {
    if (location?.descricao) {
      setDescricao(location.descricao);
    }
  }, [location]);

  const handleSalvar = () => {
    if (!descricao) {
      alert("Informe o andar/setor!");
      return;
    }

    salvarLocalizacao(descricao);
    setDescricao("");
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Salvar Localização
      </Text>

      <Text style={styles.label}>Piso/Setor:</Text>

      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <CardInfo>
        Clique no botão abaixo para salvar a localização do seu veículo.
      </CardInfo>

      {/* Botão para salvar as coordenadas */}
      <Botao onPress={handleSalvar} disabled={loading || !!location}>
        {loading ? "Salvando..." : "Salvar"}
      </Botao>

      {/* Botão para remover as coordenadas salvas */}
      {location && (
        <Botao onPress={removerLocalizacaoSalva}>Remover Localização</Botao>
      )}

      {/* Mostra os dados salvos para o usuário */}
      {location && (
        <CardInfo>
          Localização Atual
          {"\n"}
          Latitude: {location.latitude}
          {"\n"}
          Longitude: {location.longitude}
          {"\n"}
          Piso/Setor: {location.descricao}
        </CardInfo>
      )}
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});
