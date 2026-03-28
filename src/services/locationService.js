import * as Location from "expo-location";

// Captura a localização do usuário
export async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();

  // Verifica se a permissão foi concedida ou não
  if (status !== "granted") {
    throw new Error("Permissão negada");
  }

  const loc = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced, //Precisão média
  });
  return loc.coords;
}

// Inicia o rastreamento contínuo da localização
export async function startWatchingLocation(callback) {
  let { status } = await Location.requestForegroundPermissionsAsync();

  // Verifica permissão
  if (status !== "granted") {
    throw new Error("Permissão negada");
  }

  return await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High, //alta precisão
      timeInterval: 2000, // atualiza a cada 2 segundos
      distanceInterval: 1, // ou atualiza a cada 1 metro
      // outros parâmetros que estou testando
      // accuracy: Location.Accuracy.Balanced,
      // timeInterval: 3000,
      // distanceInterval: 5,
    },
    callback,
  );
}
