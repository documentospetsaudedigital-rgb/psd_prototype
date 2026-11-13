# 00 - Setup Shell da Aplicação, Mock Store e Barra de Perfis

Type: task
Status: ready-for-agent
Blocked by: none

## Contexto e Objetivo
Criar a base técnica do protótipo em Vite + React + TypeScript + Tailwind CSS. Configurar o layout global (Shell), a camada de persistência em `localStorage` com dados sintéticos (*Seed Data*), a navegação por rotas e a barra de alternância rápida de perfis (*Quick Switcher / Impersonate*), permitindo que todas as fatias verticais subsequentes se conectem imediatamente a telas e dados simulados.

## Histórias de Usuário
- **Como** avaliador/apresentador do protótipo, **quero** alternar instantaneamente entre os perfis de Administrador, Coordenador, Profissional da UBS, Profissional de Referência e Matriciador, **para que** eu consiga demonstrar o fluxo completo aos stakeholders sem retrabalho de autenticação.
- **Como** usuário do protótipo, **quero** um botão para "Resetar Dados / Recarregar Demonstração", **para que** o protótipo possa retornar a um estado previsível e consistente a qualquer momento.

## Especificação da Interface (Telas e Componentes)
1. **Layout Shell (`AppLayout.tsx`):**
   - Cabeçalho superior (*Header*) com logo/identidade "PET-Saúde Digital - Telematriciamento".
   - Componente `ImpersonateBar` no topo com:
     - Avatar/badge do usuário atualmente logado.
     - Seletor suspenso com lista de perfis rápidos (Admin, Coordenador RAPS, Profissional UBS, Profissional Referência, Matriciador).
     - Botão "Resetar Mock / Restaurar Demonstração" com modal de confirmação.
   - Menu lateral de navegação contextual (sidebar) que exibe apenas as opções permitidas para o perfil ativo (RF02).
   - Área central de conteúdo com feedback visual de carregamento e mensagens de alerta/sucesso (*Toaster*).
2. **Modal de Gestão do Mock (`MockSettingsModal.tsx`):**
   - Exibe estatísticas de registros salvos no `localStorage` (total de regiões, unidades, usuários, casos, reuniões).
   - Botões: "Restaurar Dados Padrão", "Limpar Banco", "Exportar JSON" e "Importar JSON".

## Especificação da Camada de Mock (`localStorage`)
1. **Chave no `localStorage`:** `telematriciamento_db_v1`.
2. **Módulo `mockStore.ts`:**
   - Funções utilitárias: `getDB()`, `saveDB(state)`, `resetToSeedData()`, `clearDB()`.
   - Inicialização automática com *Seed Data* sintético se a chave estiver vazia.
   - **Seed Data mínimo:**
     - 1 Região ("Região Norte").
     - 2 Unidades de Saúde: "UBS Vila Esperança" e "CAPS II Norte".
     - Usuários para cada perfil:
       - `admin@saude.gov.br` (Perfil Administrador)
       - `coordenador@saude.gov.br` (Perfil Coordenador da RAPS)
       - `dr.carlos@ubs.gov.br` (Perfil Profissional da UBS)
       - `dra.marina@caps.gov.br` (Perfil Profissional de Referência)
       - `psicologa.aline@caps.gov.br` (Perfil Matriciador)
     - 2 Usuários do SUS pré-cadastrados (ex: "Maria Silva", "João Santos").
     - 1 Caso em cada estado chave (`NA_FILA`, `SOLICITADO`, `EM_PRE_MATRICIAMENTO`).

## Regras de Negócio e Requisitos Relacionados
- **RF02:** Restringir funcionalidades visíveis de acordo com o perfil fixo do usuário.
- **RN16:** O protótipo utilizará exclusivamente dados sintéticos.
- **RNF01:** Aplicação web responsiva e utilizável em navegadores modernos.
- **RNF08:** Possibilitar criação e restauração de cópia de demonstração.

## Critérios de Aceite da Fatia (DoD)
- [ ] Projeto configurado com Vite, React, TypeScript e Tailwind CSS compilando sem erros.
- [ ] `mockStore` persistindo dados em `localStorage` e carregando seed data inicial.
- [ ] Barra de impersonate permitindo trocar o usuário ativo sem travar a interface.
- [ ] Botão de restauração recarregando os dados sintéticos com sucesso.
