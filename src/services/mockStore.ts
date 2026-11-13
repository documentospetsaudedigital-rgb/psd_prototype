import { DBState, UsuarioSistema } from '../types';
import { createSeedData } from './seedData';

export const STORAGE_KEY = 'telematriciamento_db_v1';

type Listener = () => void;
const listeners = new Set<Listener>();

export const subscribeToStore = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyListeners = () => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (err) {
      console.error('Error notifying mockStore listener:', err);
    }
  });
};

export const getDB = (): DBState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createSeedData();
      saveDB(initial);
      return initial;
    }
    const parsed = JSON.parse(raw) as DBState;
    if (!parsed || !Array.isArray(parsed.regioes) || !Array.isArray(parsed.casos_matriciamento)) {
      const fallback = createSeedData();
      saveDB(fallback);
      return fallback;
    }
    return parsed;
  } catch (err) {
    console.error('Failed reading from localStorage, reinitializing seed data:', err);
    const fallback = createSeedData();
    saveDB(fallback);
    return fallback;
  }
};

export const saveDB = (state: DBState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    notifyListeners();
  } catch (err) {
    console.error('Failed saving to localStorage:', err);
  }
};

export const resetToSeedData = (): DBState => {
  const seed = createSeedData();
  saveDB(seed);
  return seed;
};

export const clearDB = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  notifyListeners();
};

export const getCurrentUser = (): UsuarioSistema | null => {
  const db = getDB();
  const currentId = db.auth_session.usuario_atual_id;
  if (!currentId) return null;
  return db.usuarios_sistema.find((u) => u.id === currentId) || null;
};

export const setCurrentUser = (userId: string | null): void => {
  const db = getDB();
  db.auth_session.usuario_atual_id = userId;
  saveDB(db);
};

export const exportDBAsJSON = (): string => {
  const db = getDB();
  return JSON.stringify(db, null, 2);
};

export const importDBFromJSON = (jsonString: string): boolean => {
  try {
    const parsed = JSON.parse(jsonString) as DBState;
    if (
      parsed &&
      Array.isArray(parsed.regioes) &&
      Array.isArray(parsed.unidades_saude) &&
      Array.isArray(parsed.usuarios_sistema) &&
      Array.isArray(parsed.casos_matriciamento)
    ) {
      saveDB(parsed);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed parsing imported JSON:', err);
    return false;
  }
};
