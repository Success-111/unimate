import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@unimate_token';

export async function setAuthToken(token: string) {
  try { await AsyncStorage.setItem(KEY, token); } catch (e) { console.warn(e); }
}

export async function getAuthToken() {
  try { return await AsyncStorage.getItem(KEY); } catch (e) { console.warn(e); return null; }
}

export async function clearAuthToken() {
  try { await AsyncStorage.removeItem(KEY); } catch (e) { console.warn(e); }
}
