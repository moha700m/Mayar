import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { I18nManager, Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initMotionPreference } from '@/src/theme/motion';
import { colors } from '@/src/theme/tokens';

I18nManager.allowRTL(true);
initMotionPreference();

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.body.style.backgroundColor = colors.ink;
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.ink }}>
        <StatusBar style="light" />
        <Stack screenOptions={{ animation: 'fade', headerShown: false, contentStyle: { backgroundColor: colors.ink } }} />
      </View>
    </SafeAreaProvider>
  );
}
