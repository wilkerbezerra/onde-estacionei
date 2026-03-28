import AsyncStorage from "@react-native-async-storage/async-storage";

// Salva a localização no armazenamento
export async function salvarLocalizacao(coords) {
  await AsyncStorage.setItem("localizacao", JSON.stringify(coords));
}

// Recupera a localização salva
export async function obterLocalizacao() {
  const data = await AsyncStorage.getItem("localizacao");
  return data ? JSON.parse(data) : null;
}

// Remove a localização salva
export async function removerLocalizacao() {
  await AsyncStorage.removeItem("localizacao");
}
