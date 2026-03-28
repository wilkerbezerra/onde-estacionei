import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Botao from "../components/Botao";

// Tela principal
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Onde Estacionei
      </Text>

      <Botao onPress={() => navigation.navigate("Salvar")}>
        Salvar Localização
      </Botao>

      <Botao mode="outlined" onPress={() => navigation.navigate("Localizar")}>
        Localizar Veículo
      </Botao>

      <StatusBar style="auto" />
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
});
