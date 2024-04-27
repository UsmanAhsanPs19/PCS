import { useState } from 'react';
import AppNavigation from './app/navigation';
import useFont from './hooks/useFont';
import AppLoading from 'expo-app-loading';
import { SafeAreaView } from 'react-native';

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
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigation />
    </SafeAreaView>
  );
}
