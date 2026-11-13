import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { getDB, setCurrentUser } from '../../services/mockStore';

describe('Sidebar Navigation Seam (RF02 - Perfil Fixo)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders UBS primary care links when current user is PROFISSIONAL_UBS', () => {
    const db = getDB();
    const ubsUser = db.usuarios_sistema.find((u) => u.perfil === 'PROFISSIONAL_UBS');
    setCurrentUser(ubsUser!.id);

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Fila da UBS/i)).toBeInTheDocument();
    expect(screen.getByText(/Atendimento Inicial/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastrar Usuário SUS/i)).toBeInTheDocument();

    // Must not show admin or coordinator links
    expect(screen.queryByText(/Atribuir Referência/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Gestão de Usuários/i)).not.toBeInTheDocument();
  });

  it('renders specialized care links when current user is PROFISSIONAL_REFERENCIA', () => {
    const db = getDB();
    const refUser = db.usuarios_sistema.find((u) => u.perfil === 'PROFISSIONAL_REFERENCIA');
    setCurrentUser(refUser!.id);

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Casos da Equipe/i)).toBeInTheDocument();
    expect(screen.getByText(/Agenda de Reuniões/i)).toBeInTheDocument();
    expect(screen.queryByText(/Fila da UBS/i)).not.toBeInTheDocument();
  });

  it('renders admin links when current user is ADMINISTRADOR', () => {
    const db = getDB();
    const adminUser = db.usuarios_sistema.find((u) => u.perfil === 'ADMINISTRADOR');
    setCurrentUser(adminUser!.id);

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Gestão de Unidades/i)).toBeInTheDocument();
    expect(screen.getByText(/Gestão de Usuários/i)).toBeInTheDocument();
  });
});
