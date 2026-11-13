import React, { useEffect, useState } from 'react';
import {
  getCurrentUser,
  setCurrentUser,
  getDB,
  subscribeToStore,
} from '../../services/mockStore';
import { UsuarioSistema } from '../../types';
import { UserCheck, Database, RefreshCw } from 'lucide-react';

interface ImpersonateBarProps {
  onOpenSettings?: () => void;
  onResetMock?: () => void;
}

const perfilLabels: Record<string, { label: string; badgeColor: string }> = {
  ADMINISTRADOR: { label: 'Administrador', badgeColor: 'bg-purple-100 text-purple-800 border-purple-200' },
  COORDENADOR_RAPS: { label: 'Coordenadora RAPS', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  PROFISSIONAL_UBS: { label: 'Profissional UBS', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200' },
  PROFISSIONAL_REFERENCIA: { label: 'Prof. Referência', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  MATRICIADOR: { label: 'Matriciador', badgeColor: 'bg-teal-100 text-teal-800 border-teal-200' },
  CONVIDADO: { label: 'Convidado', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200' },
};

export const ImpersonateBar: React.FC<ImpersonateBarProps> = ({
  onOpenSettings,
  onResetMock,
}) => {
  const [currentUser, setLocalCurrentUser] = useState<UsuarioSistema | null>(() => getCurrentUser());
  const [usuarios, setUsuarios] = useState<UsuarioSistema[]>(() => getDB().usuarios_sistema);

  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setLocalCurrentUser(getCurrentUser());
      setUsuarios(getDB().usuarios_sistema);
    });
    return unsubscribe;
  }, []);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setCurrentUser(newId || null);
  };

  const currentPerfilInfo = currentUser
    ? perfilLabels[currentUser.perfil] || { label: currentUser.perfil, badgeColor: 'bg-slate-100 text-slate-800 border-slate-200' }
    : null;

  return (
    <div className="bg-slate-900 text-slate-100 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shadow-inner">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Modo Demonstração (Stakeholders)
        </span>
        <span className="text-slate-500">|</span>
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-400" />
          <span className="text-slate-300">Ator Ativo:</span>
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-white">{currentUser.nome}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${currentPerfilInfo?.badgeColor}`}
              >
                {currentPerfilInfo?.label}
              </span>
            </div>
          ) : (
            <span className="text-amber-400 italic">Nenhum usuário logado</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <label htmlFor="impersonate-select" className="text-slate-400">
            Alternar Perfil:
          </label>
          <select
            id="impersonate-select"
            data-testid="impersonate-select"
            value={currentUser?.id || ''}
            onChange={handleUserChange}
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome} ({perfilLabels[u.perfil]?.label || u.perfil})
              </option>
            ))}
          </select>
        </div>

        {onResetMock && (
          <button
            type="button"
            onClick={onResetMock}
            title="Resetar dados para o padrão de demonstração"
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Resetar</span>
          </button>
        )}

        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded transition-colors font-medium"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Dados do Mock</span>
          </button>
        )}
      </div>
    </div>
  );
};
