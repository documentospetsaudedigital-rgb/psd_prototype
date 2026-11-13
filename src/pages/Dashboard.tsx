import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getDB,
  getCurrentUser,
  subscribeToStore,
} from '../services/mockStore';
import { UsuarioSistema } from '../types';
import {
  ClipboardList,
  FolderKanban,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UsuarioSistema | null>(() => getCurrentUser());
  const [db, setDb] = useState(() => getDB());

  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setCurrentUser(getCurrentUser());
      setDb(getDB());
    });
    return unsubscribe;
  }, []);

  const casos = db.casos_matriciamento;
  const countNaFila = casos.filter((c) => c.situacao === 'NA_FILA').length;
  const countSolicitados = casos.filter((c) => c.situacao === 'SOLICITADO').length;
  const countPreMatriciamento = casos.filter((c) => c.situacao === 'EM_PRE_MATRICIAMENTO').length;
  const countAgendados = casos.filter((c) => c.situacao === 'REUNIAO_AGENDADA').length;
  const countConcluidos = casos.filter((c) => c.situacao === 'CONCLUIDO').length;

  return (
    <div className="space-y-6">
      {/* Banner de Boas-vindas */}
      <div className="bg-gradient-to-r from-sus-navy to-sus-blue text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ambiente de Validação com Stakeholders - SUS</span>
          </div>
          <h1 className="text-2xl font-bold">
            Olá, {currentUser ? currentUser.nome : 'Visitante'}
          </h1>
          <p className="text-blue-100 text-sm mt-1 max-w-2xl">
            Bem-vindo à plataforma de Telematriciamento. Você está logado no perfil{' '}
            <strong className="text-white underline">{currentUser?.perfil || 'Não definido'}</strong>.
            Use a barra superior para alternar entre diferentes atores da rede em tempo real.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-xs flex flex-col gap-1 min-w-[200px]">
          <span className="text-blue-200 font-medium">Sessão Ativa:</span>
          <span className="font-bold text-white text-sm">{currentUser?.cargo || 'Profissional da Saúde'}</span>
          <span className="text-blue-100">{currentUser?.email}</span>
        </div>
      </div>

      {/* Cartões de Status dos Casos de Matriciamento */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Panorama dos Casos na Rede
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Na Fila UBS</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{countNaFila}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Aguardando envio</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Solicitados</span>
              <ClipboardList className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{countSolicitados}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Recebidos na Região</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Pré-matriciamento</span>
              <FolderKanban className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-indigo-600">{countPreMatriciamento}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Em análise prévia</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Reunião Agendada</span>
              <Calendar className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">{countAgendados}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Pauta confirmada</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Concluídos</span>
              <CheckCircle2 className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-2xl font-bold text-slate-700">{countConcluidos}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">PTS pactuado</span>
          </div>
        </div>
      </div>

      {/* Ações Rápidas por Perfil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-sus-blue" />
            <span>Ações Recomendadas para o seu Perfil</span>
          </h3>

          <div className="space-y-2">
            {currentUser?.perfil === 'PROFISSIONAL_UBS' && (
              <>
                <Link
                  to="/ubs/fila"
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 border border-blue-100 transition-colors group"
                >
                  <div>
                    <span className="font-semibold text-sm text-slate-900 block group-hover:text-blue-700">
                      Gerenciar Fila de Casos da UBS
                    </span>
                    <span className="text-xs text-slate-500">
                      Reordenar prioridades e solicitar matriciamento à equipe
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/ubs/usuarios-sus/novo"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors group"
                >
                  <div>
                    <span className="font-semibold text-sm text-slate-900 block">
                      Cadastrar Novo Usuário SUS (UC05)
                    </span>
                    <span className="text-xs text-slate-500">
                      Entrada rápida com validação de duplicidade
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}

            {(currentUser?.perfil === 'PROFISSIONAL_REFERENCIA' || currentUser?.perfil === 'MATRICIADOR') && (
              <>
                <Link
                  to="/equipe/casos"
                  className="flex items-center justify-between p-3 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 transition-colors group"
                >
                  <div>
                    <span className="font-semibold text-sm text-slate-900 block group-hover:text-emerald-700">
                      Painel de Casos Recebidos da Região
                    </span>
                    <span className="text-xs text-slate-500">
                      Avaliar solicitações e iniciar pré-matriciamento
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/reuniao/reuniao-1"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors group"
                >
                  <div>
                    <span className="font-semibold text-sm text-slate-900 block">
                      Acessar Sala de Reunião de Matriciamento (UC14)
                    </span>
                    <span className="text-xs text-slate-500">
                      Videoconferência, check-in e editor compartilhado do documento
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}

            {currentUser?.perfil === 'COORDENADOR_RAPS' && (
              <Link
                to="/coordenador/referencias"
                className="flex items-center justify-between p-3 rounded-lg bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 transition-colors group"
              >
                <div>
                  <span className="font-semibold text-sm text-slate-900 block group-hover:text-indigo-700">
                    Atribuir Profissional de Referência (UC02)
                  </span>
                  <span className="text-xs text-slate-500">
                    Vincular psiquiatras ou especialistas de referência às regiões de saúde
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            {currentUser?.perfil === 'ADMINISTRADOR' && (
              <Link
                to="/admin/unidades"
                className="flex items-center justify-between p-3 rounded-lg bg-purple-50/50 hover:bg-purple-50 border border-purple-100 transition-colors group"
              >
                <div>
                  <span className="font-semibold text-sm text-slate-900 block group-hover:text-purple-700">
                    Gestão de Regiões e Unidades (RF03 / UC15)
                  </span>
                  <span className="text-xs text-slate-500">
                    Cadastrar e configurar UBSs e CAPS no território
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Informações da Rede */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Building className="w-4 h-4 text-sus-blue" />
            <span>Unidades Conectadas ao Território</span>
          </h3>

          <div className="space-y-2">
            {db.unidades_saude.map((u) => {
              const regiao = db.regioes.find((r) => r.id === u.regiao_id);
              return (
                <div
                  key={u.id}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <span className="font-medium text-slate-800 text-xs block">{u.nome}</span>
                    <span className="text-[11px] text-slate-400">
                      {regiao?.nome} • CNES: {u.cnes || 'N/A'}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      u.tipo === 'UBS'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {u.tipo}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
