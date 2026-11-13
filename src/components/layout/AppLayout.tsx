import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ImpersonateBar } from './ImpersonateBar';
import { Sidebar } from './Sidebar';
import { MockSettingsModal } from './MockSettingsModal';
import { getCurrentUser, getDB, subscribeToStore } from '../../services/mockStore';
import { UsuarioSistema } from '../../types';
import { HeartPulse, Building, MapPin } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [currentUser, setCurrentUserState] = useState<UsuarioSistema | null>(() => getCurrentUser());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setCurrentUserState(getCurrentUser());
    });
    return unsubscribe;
  }, []);

  const db = getDB();
  const currentUnidade = currentUser?.unidade_id
    ? db.unidades_saude.find((u) => u.id === currentUser.unidade_id)
    : null;
  const currentRegiao = currentUser?.regiao_id
    ? db.regioes.find((r) => r.id === currentUser.regiao_id)
    : currentUnidade
    ? db.regioes.find((r) => r.id === currentUnidade.regiao_id)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-sus-bg font-sans">
      {/* Barra de Impersonate persistente */}
      <ImpersonateBar
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetMock={() => setIsSettingsOpen(true)}
      />

      {/* Header Institucional SUS / Telematriciamento */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-sus-blue text-white p-2 rounded-xl group-hover:bg-sus-navy transition-colors shadow-sm">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base leading-tight block">
                PET-Saúde Digital
              </span>
              <span className="text-xs text-sus-blue font-semibold uppercase tracking-wider block">
                Plataforma de Telematriciamento SUS
              </span>
            </div>
          </Link>
        </div>

        {/* Informações de Localização da Sessão Ativa */}
        <div className="flex items-center gap-4 text-xs text-slate-600">
          {currentUnidade && (
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-medium text-slate-800">{currentUnidade.nome}</span>
              <span className="text-slate-400">({currentUnidade.tipo})</span>
            </div>
          )}

          {currentRegiao && (
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium text-slate-800">{currentRegiao.nome}</span>
            </div>
          )}

          <div className="h-4 w-[1px] bg-slate-200" />

          <Link
            to="/login"
            className="text-xs text-sus-blue hover:text-sus-navy font-medium underline underline-offset-2"
          >
            Tela de Login (UC01)
          </Link>
        </div>
      </header>

      {/* Layout com Sidebar e Conteúdo Principal */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Modal de Gestão do Mock Store */}
      <MockSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
