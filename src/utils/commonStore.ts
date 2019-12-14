import * as Store from "expo-secure-store";

export enum StoreKeys {
  token = "token"
}

const setItemAsync = async (key: StoreKeys, value: string) => {
  return Store.setItemAsync(key, value);
};
const getItemAsync = async (key: StoreKeys) => {
  return Store.getItemAsync(key);
};

const commonStore = {
  getItemAsync,
  setItemAsync
};

export default commonStore;
