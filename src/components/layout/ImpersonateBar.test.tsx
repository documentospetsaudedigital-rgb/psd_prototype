import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImpersonateBar } from './ImpersonateBar';
import { getDB, setCurrentUser, getCurrentUser } from '../../services/mockStore';

describe('ImpersonateBar Seam', () => {
  beforeEach(() => {
    localStorage.clear();
    const db = getDB();
    setCurrentUser(db.usuarios_sistema[0].id);
  });

  it('renders current active user name and role badge', () => {
    render(<ImpersonateBar onOpenSettings={() => {}} />);
    const currentUser = getCurrentUser();
    expect(screen.getByText(currentUser!.nome)).toBeInTheDocument();
  });

  it('switches user when a different role is selected in the quick switcher', () => {
    render(<ImpersonateBar onOpenSettings={() => {}} />);
    const select = screen.getByTestId('impersonate-select') as HTMLSelectElement;

    const db = getDB();
    const refUser = db.usuarios_sistema.find((u) => u.perfil === 'PROFISSIONAL_REFERENCIA');
    expect(refUser).toBeDefined();

    fireEvent.change(select, { target: { value: refUser!.id } });
    expect(getCurrentUser()?.id).toBe(refUser!.id);
  });

  it('triggers onOpenSettings when Gerenciar Mock button is clicked', () => {
    let opened = false;
    render(<ImpersonateBar onOpenSettings={() => { opened = true; }} />);
    const settingsBtn = screen.getByRole('button', { name: /dados do mock/i });
    fireEvent.click(settingsBtn);
    expect(opened).toBe(true);
  });
});
