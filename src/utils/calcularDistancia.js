// Função para calcular a distância entre dois pontos (latitude e longitude)
export function calcularDistancia(p1, p2) {
  // Converte graus para radianos
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371000; // raio da Terra em metros
  const dLat = toRad(p2.latitude - p1.latitude);
  const dLon = toRad(p2.longitude - p1.longitude);

  // Fórmula de Haversine
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(p1.latitude)) *
      Math.cos(toRad(p2.latitude)) *
      Math.sin(dLon / 2) ** 2;

  // Também faz parte da fórmula de Haversine
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Retorna a distância arredondada
  return Math.round(R * c);
}
