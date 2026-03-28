// Importa navegação e tema
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";

// Importa as telas
import HomeScreen from "./src/screens/HomeScreen";
import SaveLocationScreen from "./src/screens/SaveLocationScreen";
import ViewLocationScreen from "./src/screens/ViewLocationScreen";

const Stack = createNativeStackNavigator();

// Tema personalizado do app
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6C4AB6", // Cor principal
    secondary: "#B39DDB",
    background: "#F5F5F5",
    surface: "#FFFFFF",
    onPrimary: "#FFFFFF",
    onSurface: "#1C1C1C",
  },
};

export default function App() {
  return (
    //Aplica o tema nos componentes
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#6C4AB6", // cor do topo
            },
            headerTintColor: "#fff", // cor dos textos/ícones
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
            headerTitleAlign: "center", // centraliza o título
            headerShadowVisible: false,
          }}
        >
          {/* Definição das telas */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Salvar" component={SaveLocationScreen} />
          <Stack.Screen name="Localizar" component={ViewLocationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
