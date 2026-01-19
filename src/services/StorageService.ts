import { StorageKeyEnum } from '@/const/enums/StorageKeyEnum.ts';

const appKey = StorageKeyEnum.APP;

const StorageService = {
  // ----------------------------------------------------------------------- Local Storage
  setLocalStorage<T>(key: string, value: T) {
    let appModel: any = localStorage.getItem(appKey);
    appModel = appModel ? JSON.parse(appModel) : {};
    appModel[key] = value;
    localStorage.setItem(appKey, JSON.stringify(appModel));
  },

  getLocalStorage<T>(key: string): T | null {
    const data = localStorage.getItem(appKey);

    if (!data) return null;

    try {
      const appModel: Record<string, T> = JSON.parse(data);
      return appModel[key] ?? null;
    } catch (error) {
      console.error('Error parsing LocalStorage', error);
      return null;
    }
  },

  clearLocalStorage() {
    localStorage.removeItem(appKey);
  },

  // ----------------------------------------------------------------------- Session Storage
  setSessionStorage<T>(key: string, value: T) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  getSessionStorage(key: string) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  removeSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  },

  clearSessionStorage() {
    sessionStorage.clear();
  },

  // ----------------------------------------------------------------------- Cookies
  setCookie<T>(name: string, value: T, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const stringValue = JSON.stringify(value);

    document.cookie = `${name}=${encodeURIComponent(stringValue)}; expires=${expires}; path=/`;
  },

  getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) return decodeURIComponent(cookieValue);
    }
    return null;
  },

  removeCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  },

  clearCookies() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const cookieName = cookie.split('=')[0];
      this.removeCookie(cookieName);
    }
  },
};

export default StorageService;
