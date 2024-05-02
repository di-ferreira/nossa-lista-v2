export interface iStorageServices {
  getItem: <T>(key: string) => Promise<T | null>;
  setItem: <T>(key: string, value: T) => Promise<void>;
  removeItem: <T>(key: string) => Promise<void>;
}

export let storageService: iStorageServices;

export function initializeStorageService(service: iStorageServices) {
  storageService = service;
}
