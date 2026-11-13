import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { PlaceholderPage } from './pages/PlaceholderPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          
          {/* Atenção Básica (UBS) */}
          <Route
            path="ubs/fila"
            element={
              <PlaceholderPage
                title="Fila de Casos da UBS"
                ucCode="UC08"
                description="Visualização da fila de casos clínicos aguardando solicitação de telematriciamento, com suporte a reordenação manual por prioridade (▲/▼) e arrastar-e-soltar."
              />
            }
          />
          <Route
            path="ubs/atendimento"
            element={
              <PlaceholderPage
                title="Atendimento Inicial na UBS"
                ucCode="UC04"
                description="Busca rápida de cidadão por CPF, CNS ou prontuário e abertura de atendimento clínico na Atenção Primária."
              />
            }
          />
          <Route
            path="ubs/usuarios-sus/novo"
            element={
              <PlaceholderPage
                title="Cadastrar Usuário do SUS"
                ucCode="UC05"
                description="Formulário com validação de duplicidade por CPF e campos mínimos do cidadão para abertura do caso de matriciamento."
              />
            }
          />
          <Route
            path="ubs/triagem"
            element={
              <PlaceholderPage
                title="Triagem e Classificação de Risco"
                ucCode="UC07"
                description="Classificação em risco Baixo, Médio ou Alto, relato clínico da demanda e indicação para telematriciamento ou encaminhamento."
              />
            }
          />
          <Route
            path="ubs/encaminhamentos"
            element={
              <PlaceholderPage
                title="Encaminhamento para Outros Serviços"
                ucCode="UC10"
                description="Registro de direcionamento do usuário SUS para outros pontos da rede de saúde fora da rota de matriciamento especializado."
              />
            }
          />

          {/* Equipe de Matriciamento (RAPS / CAPS) */}
          <Route
            path="equipe/casos"
            element={
              <PlaceholderPage
                title="Painel de Casos da Região"
                ucCode="UC09"
                description="Listagem de casos solicitados pelas UBSs do território para análise pela Equipe de Matriciamento."
              />
            }
          />
          <Route
            path="equipe/pre-matriciamento"
            element={
              <PlaceholderPage
                title="Pré-matriciamento e Complementação"
                ucCode="UC12"
                description="Análise detalhada de prontuário, inclusão de anotações prévias e solicitação de informações complementares antes da reunião síncrona."
              />
            }
          />
          <Route
            path="equipe/agenda"
            element={
              <PlaceholderPage
                title="Agenda de Reuniões e Pauta"
                ucCode="UC16"
                description="Gestão de slots e datas de reuniões de matriciamento pelo Profissional de Referência, com alocação dos casos em pauta."
              />
            }
          />
          <Route
            path="reuniao/:id"
            element={
              <PlaceholderPage
                title="Sala de Reunião de Matriciamento"
                ucCode="UC14"
                description="Painel unificado com pauta de casos ativos, link para teleconferência externa (Meet/Jitsi), lista de presença e editor com lock exclusivo para o Relator."
              />
            }
          />

          {/* Coordenação RAPS */}
          <Route
            path="coordenador/referencias"
            element={
              <PlaceholderPage
                title="Atribuir Profissional de Referência"
                ucCode="UC02"
                description="Associação formal de médicos psiquiatras ou especialistas de referência às equipes e regiões de saúde."
              />
            }
          />
          <Route
            path="relatorios"
            element={
              <PlaceholderPage
                title="Relatório de Matriciamentos"
                ucCode="UC03"
                description="Filtros analíticos e geração de relatórios consolidados de matriciamentos realizados por região e período."
              />
            }
          />
          <Route
            path="coordenador/equipes"
            element={
              <PlaceholderPage
                title="Equipes e Regiões de Saúde"
                ucCode="UC15"
                description="Visão geral da estrutura de cobertura entre UBSs e CAPS no território da RAPS."
              />
            }
          />

          {/* Administração */}
          <Route
            path="admin/unidades"
            element={
              <PlaceholderPage
                title="Gestão de Unidades de Saúde"
                ucCode="UC15"
                description="Cadastro e parametrização de estabelecimentos de saúde (UBS e CAPS) vinculados a cada região territorial."
              />
            }
          />
          <Route
            path="admin/usuarios"
            element={
              <PlaceholderPage
                title="Gestão de Usuários do Sistema"
                ucCode="RF04"
                description="Administração de contas de acesso de profissionais e atribuição de perfis de sistema."
              />
            }
          />
          <Route
            path="admin/equipes"
            element={
              <PlaceholderPage
                title="Criar Equipe de Matriciamento"
                ucCode="UC15"
                description="Criação da equipe multiprofissional da RAPS vinculada ao CAPS e vinculação de membros matriciadores."
              />
            }
          />

          {/* Convidado / Links Temporários */}
          <Route
            path="acesso/:token"
            element={
              <PlaceholderPage
                title="Acesso de Convidado (Link Temporário)"
                ucCode="UC06"
                description="Visualização restrita ao caso correspondente para convidados externos autorizados sem necessidade de login formal."
              />
            }
          />
        </Route>

        {/* Login Formal */}
        <Route
          path="/login"
          element={
            <PlaceholderPage
              title="Autenticação e Login Formal"
              ucCode="UC01"
              description="Tela de acesso formal com formulário de login por e-mail/senha e atalhos rápidos para validação de perfis."
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
