import { Card, Text } from "react-native-paper";

// Componente criado para mostrar as informações no formato de card
export default function CardInfo({ children }) {
  return (
    <Card
      style={{
        marginVertical: 10,
        borderRadius: 15,
        elevation: 3,
        backgroundColor: "#F3EDF7",
      }}
    >
      <Card.Content>
        <Text style={{ fontSize: 16 }}>{children}</Text>
      </Card.Content>
    </Card>
  );
}
