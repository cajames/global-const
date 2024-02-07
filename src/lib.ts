const GLOBALISE_KEY_PREFIX = "globalise__singleton__";
const fallbackGlobal = {};

const getGlobalObject = () => {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  return fallbackGlobal;
};

const validateInputs = (namespace: string, key: string) => {
  if (typeof namespace !== "string") {
    throw "Invalid namespace key";
  }
  if (typeof key !== "string") {
    throw "Invalid item key";
  }
};

const createGlobalisedKey = (namespace: string) => {
  return `${GLOBALISE_KEY_PREFIX}${namespace}`;
};

const getGlobalScopedObject = (namespace: string) => {
  const globalObject = getGlobalObject() as any;
  const GLOBALISE_KEY = createGlobalisedKey(namespace);
  // Initialise global object
  if (!globalObject[GLOBALISE_KEY] as any) {
    globalObject[GLOBALISE_KEY] = {};
  }
  return globalObject[GLOBALISE_KEY];
};

const getSingleton = <T>(namespace: string, key: string): T | undefined => {
  const scopedObject = getGlobalScopedObject(namespace);
  return (scopedObject[key] as T) || undefined;
};

const setSingleton = (namespace: string, key: string, value: any): void => {
  const scopedObject = getGlobalScopedObject(namespace);
  scopedObject[key] = value;
};

export const getGlobalisedValue = <T>(
  namespace: string,
  key: string,
  value: T
): T => {
  validateInputs(namespace, key);

  const existing = getSingleton<T>(namespace, key);
  if (existing !== undefined) {
    return existing;
  }

  setSingleton(namespace, key, value);
  return value;
};

export const clearGlobalNamespace = (namespace: string) => {
  const globalObject = getGlobalObject();
  const globalisedKey = createGlobalisedKey(namespace);
  if (globalObject[globalisedKey] !== undefined) {
    delete globalObject[globalisedKey];
  }
};
