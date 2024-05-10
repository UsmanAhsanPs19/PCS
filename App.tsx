import { useState } from 'react';
import AppNavigation from './app/navigation';
import useFont from './hooks/useFont';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { store } from './app/redux/store';

export default function App() {
  const [isFontReady, setIsFontReady] = useState(false);

  const LoadFonts = async () => {
    await useFont();
  };

  if (!isFontReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => setIsFontReady(true)}
        onError={(e) => {
          console.log("Error font loading:", e)
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigation />
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}
