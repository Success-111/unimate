import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

/**
 * Root layout for the app/ folder — wraps pages with SafeArea & global providers.
 */

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="dark" />
      <Slot />
    </SafeAreaView>
  );
}
