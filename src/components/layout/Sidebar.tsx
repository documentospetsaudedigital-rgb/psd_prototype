import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  getCurrentUser,
  subscribeToStore,
} from '../../services/mockStore';
import { UsuarioSistema } from '../../types';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ClipboardList,
  Calendar,
  Video,
  FileText,
  Settings,
  Share2,
  Building2,
  FolderKanban,
  FileCheck,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [currentUser, setLocalCurrentUser] = useState<UsuarioSistema | null>(() => getCurrentUser());

  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setLocalCurrentUser(getCurrentUser());
    });
    return unsubscribe;
  }, []);

  const perfil = currentUser?.perfil;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-sus-blue text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 shadow-sm min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
            Navegação Principal
          </span>
          <nav className="space-y-1">
            <NavLink to="/" end className={linkClass}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Painel Geral</span>
            </NavLink>
          </nav>
        </div>

        {/* Módulo UBS (Atenção Básica) */}
        {perfil === 'PROFISSIONAL_UBS' && (
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
              Atenção Primária (UBS)
            </span>
            <nav className="space-y-1">
              <NavLink to="/ubs/fila" className={linkClass}>
                <ClipboardList className="w-4 h-4 text-blue-600" />
                <span>Fila da UBS</span>
              </NavLink>
              <NavLink to="/ubs/atendimento" className={linkClass}>
                <Users className="w-4 h-4 text-blue-600" />
                <span>Atendimento Inicial</span>
              </NavLink>
              <NavLink to="/ubs/usuarios-sus/novo" className={linkClass}>
                <UserPlus className="w-4 h-4 text-blue-600" />
                <span>Cadastrar Usuário SUS</span>
              </NavLink>
              <NavLink to="/ubs/triagem" className={linkClass}>
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Triagem de Casos</span>
              </NavLink>
              <NavLink to="/ubs/encaminhamentos" className={linkClass}>
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Encaminhamentos</span>
              </NavLink>
            </nav>
          </div>
        )}

        {/* Módulo Equipe de Matriciamento (CAPS / RAPS) */}
        {(perfil === 'PROFISSIONAL_REFERENCIA' || perfil === 'MATRICIADOR') && (
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
              Equipe de Matriciamento
            </span>
            <nav className="space-y-1">
              <NavLink to="/equipe/casos" className={linkClass}>
                <FolderKanban className="w-4 h-4 text-emerald-600" />
                <span>Casos da Equipe</span>
              </NavLink>
              <NavLink to="/equipe/pre-matriciamento" className={linkClass}>
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Pré-matriciamento</span>
              </NavLink>
              <NavLink to="/equipe/agenda" className={linkClass}>
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Agenda de Reuniões</span>
              </NavLink>
              <NavLink to="/reuniao/reuniao-1" className={linkClass}>
                <Video className="w-4 h-4 text-teal-600" />
                <span>Sala de Reunião</span>
              </NavLink>
            </nav>
          </div>
        )}

        {/* Módulo Coordenador RAPS */}
        {perfil === 'COORDENADOR_RAPS' && (
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
              Coordenação RAPS
            </span>
            <nav className="space-y-1">
              <NavLink to="/coordenador/referencias" className={linkClass}>
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Atribuir Referência</span>
              </NavLink>
              <NavLink to="/relatorios" className={linkClass}>
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Relatório de Matriciamentos</span>
              </NavLink>
              <NavLink to="/coordenador/equipes" className={linkClass}>
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Equipes e Regiões</span>
              </NavLink>
            </nav>
          </div>
        )}

        {/* Módulo Administrador */}
        {perfil === 'ADMINISTRADOR' && (
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
              Administração do Sistema
            </span>
            <nav className="space-y-1">
              <NavLink to="/admin/unidades" className={linkClass}>
                <Building2 className="w-4 h-4 text-purple-600" />
                <span>Gestão de Unidades</span>
              </NavLink>
              <NavLink to="/admin/usuarios" className={linkClass}>
                <Users className="w-4 h-4 text-purple-600" />
                <span>Gestão de Usuários</span>
              </NavLink>
              <NavLink to="/admin/equipes" className={linkClass}>
                <Settings className="w-4 h-4 text-purple-600" />
                <span>Equipes de Matriciamento</span>
              </NavLink>
            </nav>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-400">
        <p className="font-semibold text-slate-600">PET-Saúde Digital</p>
        <p>Telematriciamento APS / RAPS</p>
      </div>
    </aside>
  );
};
