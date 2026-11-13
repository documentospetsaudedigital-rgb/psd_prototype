# Especificação Técnica do Protótipo de Validação
## Plataforma de Telematriciamento - PET-Saúde Digital

### 1. Finalidade e Contexto
Este protótipo tem como objetivo fornecer uma aplicação web interativa para validar, perante stakeholders, profissionais de saúde e gestores da RAPS (Rede de Atenção Psicossocial), os fluxos operacionais, telas, campos de entrada e regras de negócio descritos nos documentos de requisitos e casos de uso do projeto.

A aplicação é executada no navegador sem dependência de um backend em servidor nesta fase, simulando toda a lógica de persistência e regras de negócio através de uma camada de **mock em `localStorage`**.

---

### 2. Stack Tecnológica e Arquitetura do Frontend
- **Framework & Bundler:** Vite + React (TypeScript).
- **Estilização & UI:** Tailwind CSS + Lucide Icons + componentes acessíveis (Radix UI / Tailwind primitives).
- **Roteamento:** React Router ou navegação por estado com rotas amigáveis (`/login`, `/admin`, `/coordenador`, `/ubs`, `/equipe`, `/reuniao/:id`, `/relatorios`).
- **Gerenciamento de Estado & Mock:** Camada de serviços (`mockStore.ts`) que gerencia entidades no `localStorage`, com suporte a exportação, importação e restauração de dados sintéticos de demonstração (*Seed Data*).
- **Múltiplos Perfis / Impersonate:** Cabeçalho persistente (*Topbar*) com seletor rápido de ator ativo (Administrador, Coordenador, Profissional da UBS, Profissional de Referência, Matriciador) sem necessidade de refazer login durante sessões de demonstração com stakeholders.

---

### 3. Modelo de Dados do Mock (`localStorage`)
O mock em `localStorage` implementa fielmente as entidades especificadas na Seção 13 do documento de requisitos:

```typescript
// Chave raiz no localStorage: 'telematriciamento_db_v1'

interface DBState {
  regioes: Regiao[];
  unidades_saude: UnidadeSaude[];
  usuarios_sistema: UsuarioSistema[];
  usuarios_sus: UsuarioSUS[];
  equipes_matriciamento: EquipeMatriciamento[];
  equipes_membros: EquipeMembro[];
  casos_matriciamento: CasoMatriciamento[];
  documentos_matriciamento: DocumentoMatriciamento[];
  anexos_caso: AnexoCaso[];
  convidados: Convidado[];
  reunioes_matriciamento: ReuniaoMatriciamento[];
  links_temporarios: LinkTemporario[];
  encaminhamentos: Encaminhamento[];
  auth_session: {
    usuario_atual_id: string | null;
  };
}
```

#### Estados do Caso (`situacao`)
- `NA_FILA`: Caso cadastrado na UBS aguardando envio.
- `SOLICITADO`: Enviado para a Equipe de Matriciamento da Região.
- `EM_PRE_MATRICIAMENTO`: Equipe de Matriciamento analisando e complementando o documento.
- `REUNIAO_AGENDADA`: Reunião marcada com data/hora e pauta associada.
- `CONCLUIDO`: Decisões registradas no Documento e caso encerrado.
- `CANCELADO`: Caso cancelado mediante justificativa.

---

### 4. Mapa das Telas e Jornadas

1. **Acesso & Autenticação:**
   - `/login`: Formulário de login (UC01) com suporte a usuário/senha e atalhos para perfis de teste.
   - Componente global `ImpersonateBar`: barra no topo para alternar perfil ativo instantaneamente.
2. **Administração & Gestão de Rede:**
   - `/admin/regioes-unidades`: Gestão de Regiões, UBSs e CAPS (RF03, UC15).
   - `/admin/usuarios`: Gestão de Profissionais da UBS e Coordenadores da RAPS (RF04).
   - `/coordenador/referencias`: Associação de Profissionais de Referência às Regiões (UC02, RF05).
   - `/equipe/gestao`: Criação e composição da Equipe de Matriciamento com Matriciadores (UC15, RF06).
3. **Atenção Primária (UBS):**
   - `/ubs/atendimento`: Atendimento inicial de usuários SUS, consulta por prontuário/CPF (UC04).
   - `/ubs/usuarios-sus/novo`: Cadastro de novos usuários do SUS (UC05).
   - `/ubs/triagem`: Triagem do caso, motivo, relato e classificação de risco (UC07).
   - `/ubs/encaminhamento`: Encaminhamento para outros serviços da rede (UC10).
   - `/ubs/fila`: Fila de casos da UBS com reordenação manual (drag & drop ou botões subir/descer) (RF10, RF11, RN08).
   - `/ubs/casos/:id/solicitar`: Detalhes do caso, anexos (RF13), convidados (RF14) e envio para matriciamento (UC08, RF15).
4. **Matriciamento Especializado (Equipe da Região):**
   - `/equipe/casos`: Painel de casos recebidos pela Equipe da Região (`SOLICITADO`, `EM_PRE_MATRICIAMENTO`) (RF16).
   - `/equipe/casos/:id/pre-matriciamento`: Análise do caso, revisão de anexos e edição prévia do documento de matriciamento (UC09, UC12, RF17).
   - `/equipe/agenda`: Grade e slots de horários do Profissional de Referência (UC16).
   - `/equipe/reunioes/agendar`: Seleção de data/slot, modalidade, link de vídeo e inclusão de casos na pauta (RF18, RF19, RF20, UC16).
   - `/equipe/agenda/comunicar-mudanca`: Notificação e ajuste de data/horário (UC13).
5. **Reunião & Deliberação:**
   - `/reuniao/:id`: Sala de Reunião com lista de casos em pauta, participantes logados/presentes, link de videoconferência externa e editor da ata/documento compartilhado (UC11, UC14, RF21, RF22, RF23).
   - `/equipe/casos/:id/conclusao`: Finalização do caso pelo Profissional de Referência (RF24).
6. **Módulos Transversais:**
   - `/links-temporarios`: Geração e consulta de links de acesso para convidados (UC06).
   - `/relatorios`: Geração e exportação de relatórios sintéticos de matriciamentos realizados (UC03).
   - Modal de Configurações do Mock: Botão "Resetar Dados / Recarregar Demonstração".

---

### 5. Relação das Fatias Verticais (Issues)

| # | Issue | Foco Vertical (Tela ao Mock) |
|---|---|---|
| **00** | `00-setup-shell-mock-store.md` | Estrutura Vite+React+Tailwind, store `localStorage`, seed data e barra de impersonate |
| **01** | `01-uc01-autenticacao-login.md` | Tela de login, validação de credenciais e proteção de rotas por perfil fixo |
| **02** | `02-uc02-atribuir-profissional-referencia.md` | Tela do Coordenador RAPS para vincular Profissional de Referência à Região |
| **03** | `03-uc03-gerar-relatorio-matriciamentos.md` | Tela de filtros, visualização e exportação de relatórios de casos matriciados |
| **04** | `04-uc04-realizar-atendimento-inicial.md` | Tela de atendimento inicial na UBS com busca do paciente e abertura de triagem |
| **05** | `05-uc05-cadastrar-usuario-sus.md` | Formulário e validação de duplicidade para cadastro de usuário do SUS |
| **06** | `06-uc06-gerar-link-temporario.md` | Interface para gerar e validar links temporários de acesso para convidados |
| **07** | `07-uc07-realizar-triagem-casos.md` | Formulário de triagem, relato clínico e classificação de risco (baixo, médio, alto) |
| **08** | `08-uc08-solicitar-matriciamento-fila-ubs.md` | Fila da UBS com reordenação manual, anexos, convidados e envio do caso |
| **09** | `09-uc09-realizar-pre-matriciamento.md` | Painel da Equipe de Matriciamento para analisar casos e abrir pré-matriciamento |
| **10** | `10-uc10-realizar-encaminhamento.md` | Formulário de encaminhamento para outros serviços de saúde fora do matriciamento |
| **11** | `11-uc11-editar-documento-matriciamento.md` | Editor do Documento textual compartilhado, com registro de decisões e salvamento |
| **12** | `12-uc12-editar-pre-matriciamento.md` | Tela de atualização e revisão dos dados do pré-matriciamento da equipe |
| **13** | `13-uc13-comunicar-mudanca-agenda.md` | Tela de reagendamento e simulação de notificações aos participantes da reunião |
| **14** | `14-uc14-participar-reuniao-matriciamento.md` | Tela da Sala da Reunião com pauta de casos, controle de presença e ata |
| **15** | `15-uc15-criar-equipe-matriciamento.md` | Cadastro de Regiões, Unidades e tela de criação da Equipe de Matriciamento |
| **16** | `16-uc16-gerenciar-agenda-concluir-caso.md` | Gestão de slots da agenda e fluxo de conclusão formal do caso matriciado |
