import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { THEME_COLORS } from "./app/constants/colors";
import AppNavigation from "./app/navigation";
import { store } from "./app/redux/store";
import useFont from "./hooks/useFont";

export default function App() {
  const [isFontReady, setIsFontReady] = useState(false);

  useEffect(() => {
    LoadFonts();
  }, []);

  const LoadFonts = async () => {
    await useFont()
      .then((res) => {
        setIsFontReady(true);
      })
      .catch((error) => {
        console.log("Error fonts loading::::", error);
      });
  };

  if (!isFontReady) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={THEME_COLORS.PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppNavigation />
        <Toast />
      </View>
    </Provider>
  );
}
