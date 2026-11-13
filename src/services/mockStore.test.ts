import { describe, it, expect, beforeEach } from 'vitest';
import {
  getDB,
  saveDB,
  resetToSeedData,
  clearDB,
  getCurrentUser,
  setCurrentUser,
  exportDBAsJSON,
  importDBFromJSON,
  STORAGE_KEY,
} from './mockStore';

describe('mockStore Seam', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes localStorage with seed data when storage is empty', () => {
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    const db = getDB();
    expect(db).toBeDefined();
    expect(db.regioes.length).toBeGreaterThan(0);
    expect(db.unidades_saude.length).toBeGreaterThan(0);
    expect(db.usuarios_sistema.length).toBeGreaterThan(0);
    expect(db.casos_matriciamento.length).toBeGreaterThan(0);
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });

  it('contains users representing all required prototype roles', () => {
    const db = getDB();
    const perfis = db.usuarios_sistema.map((u) => u.perfil);
    expect(perfis).toContain('ADMINISTRADOR');
    expect(perfis).toContain('COORDENADOR_RAPS');
    expect(perfis).toContain('PROFISSIONAL_UBS');
    expect(perfis).toContain('PROFISSIONAL_REFERENCIA');
    expect(perfis).toContain('MATRICIADOR');
  });

  it('manages current user session via getCurrentUser and setCurrentUser', () => {
    const db = getDB();
    const firstUser = db.usuarios_sistema[0];

    setCurrentUser(firstUser.id);
    const currentUser = getCurrentUser();
    expect(currentUser).not.toBeNull();
    expect(currentUser?.id).toBe(firstUser.id);
    expect(currentUser?.nome).toBe(firstUser.nome);

    setCurrentUser(null);
    expect(getCurrentUser()).toBeNull();
  });

  it('persists changes with saveDB', () => {
    const db = getDB();
    const newRegiao = { id: 'reg-test-999', nome: 'Região de Teste', descricao: 'Desc' };
    db.regioes.push(newRegiao);
    saveDB(db);

    const reloadedDB = getDB();
    expect(reloadedDB.regioes.some((r) => r.id === 'reg-test-999')).toBe(true);
  });

  it('resets to factory seed data with resetToSeedData', () => {
    const db = getDB();
    db.regioes = [];
    saveDB(db);
    expect(getDB().regioes.length).toBe(0);

    const restored = resetToSeedData();
    expect(restored.regioes.length).toBeGreaterThan(0);
    expect(getDB().regioes.length).toBeGreaterThan(0);
  });

  it('exports and imports database state as JSON', () => {
    const db = getDB();
    const json = exportDBAsJSON();
    expect(typeof json).toBe('string');
    const parsed = JSON.parse(json);
    expect(parsed.regioes).toBeDefined();

    clearDB();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();

    const success = importDBFromJSON(json);
    expect(success).toBe(true);
    expect(getDB().regioes.length).toBe(db.regioes.length);
  });
});
