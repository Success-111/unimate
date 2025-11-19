import React from 'react';
import { Tabs } from 'expo-router';

/**
 * Tabs layout: defines bottom tab navigator and initial route group.
 */

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="materials/index" />
      <Tabs.Screen name="quiz/index" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
