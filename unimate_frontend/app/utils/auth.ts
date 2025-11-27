import * as SecureStore from "expo-secure-store";

export async function saveTokens(access: string, refresh: string) {
  await SecureStore.setItemAsync("access", access);
  await SecureStore.setItemAsync("refresh", refresh);
}

export async function logout() {
  await SecureStore.deleteItemAsync("access");
  await SecureStore.deleteItemAsync("refresh");
}
