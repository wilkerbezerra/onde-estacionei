import { Button } from "react-native-paper";

// Componente criado para ser utilizado como botão
export default function Botao({ children, mode = "contained", ...props }) {
  return (
    <Button
      mode={mode} // tipo do botão
      style={{
        marginBottom: 15,
        borderRadius: 30,
      }}
      contentStyle={{
        paddingVertical: 8,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
