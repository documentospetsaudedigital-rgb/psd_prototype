import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockSettingsModal } from './MockSettingsModal';
import { getDB, saveDB } from '../../services/mockStore';

describe('MockSettingsModal Seam', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders database record counts and entities summary', () => {
    render(<MockSettingsModal isOpen={true} onClose={() => {}} />);
    const db = getDB();
    expect(screen.getByText(/Gerenciamento do Mock Local/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${db.casos_matriciamento.length} casos`, 'i'))).toBeInTheDocument();
  });

  it('restores default seed data when restore button is clicked', () => {
    const db = getDB();
    db.casos_matriciamento = [];
    saveDB(db);
    expect(getDB().casos_matriciamento.length).toBe(0);

    render(<MockSettingsModal isOpen={true} onClose={() => {}} />);
    const resetBtn = screen.getByRole('button', { name: /Restaurar Dados Padrão/i });
    fireEvent.click(resetBtn);

    expect(getDB().casos_matriciamento.length).toBeGreaterThan(0);
  });
});
