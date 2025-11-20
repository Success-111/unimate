import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="materials/index"
        options={{
          title: "Materials",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="quiz/index"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

      {/* 🚫 Hide nested screens from tab bar */}
      <Tabs.Screen
        name="materials/[courseCode]"
        options={{
          href: null, // hides this screen from appearing in tabs
        }}
      />

      <Tabs.Screen
        name="quiz/results"
        options={{
          href: null, // hides this screen from appearing in tabs
        }}
      />
    </Tabs>
  );
}
