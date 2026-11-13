# 14 - UC14: Participar de Reunião de Matriciamento e Ambiente de Pauta

Type: task
Status: ready-for-agent
Blocked by: 00, 11, 16

## Contexto e Objetivo
Implementar a interface da "Sala da Reunião de Matriciamento", proporcionando um ambiente centralizado onde os participantes (Profissional da UBS, Matriciadores, Profissional de Referência e Convidados) realizam o check-in de presença, visualizam a pauta de casos em discussão, acessam o link da chamada externa (Meet/Jitsi) e editam a ata/documento compartilhado (UC11) com definição do papel contextual de Relator (RF20, RN06).

## Histórias de Usuário
- **Como** participante da reunião, **quero** acessar a Sala Virtual do encontro e marcar minha presença, **para que** minha participação conste na lista oficial do encontro.
- **Como** Profissional de Referência ou da UBS, **quero** designar o Relator da reunião, **para que** ele seja responsável por redigir a síntese das deliberações.
- **Como** membro da equipe, **quero** alternar entre os casos da pauta e editar o documento diretamente na sala, **para que** todas as decisões sejam registradas durante a sessão.

## Especificação da Interface (Telas e Componentes)
1. **Página da Sala de Reunião (`/reuniao/:id`):**
   - **Cabeçalho da Reunião:**
     - Data, horário, modalidade e link clicável: `[Abrir Sala de Videochamada Externa (Google Meet)]`.
     - Status da Reunião: Badge `Em Andamento` / `Agendada` / `Realizada`.
     - Painel do Relator: Badge indicando "Relator Atual: [Nome do Profissional]" + botão `[Alterar / Designar Relator]` (RF20).
     - Botão `[Finalizar Reunião]` (atualiza status para `REALIZADA` após validação de salvamento de atas).
   - **Coluna Lateral Esquerda: Painel de Participantes & Presença (RF21, CA14.01):**
     - Lista de participantes previstos (Profissionais da UBS, Matriciadores, Referência, Convidados).
     - Checkbox/Badge de status de presença: `[✓ Presente]` (marcado automaticamente para o usuário logado).
     - Botão para adicionar convidado de última hora ou copiar link temporário de acesso (UC06).
   - **Área Central: Pauta de Casos em Discussão (RN12):**
     - Seletor em abas ou lista lateral com os casos vinculados à reunião (`Caso #1: Paciente A`, `Caso #2: Paciente B`).
     - Visualização resumida da queixa e anexos do caso selecionado.
     - **Painel Integrado de Edição do Documento / Ata (UC11, RF22, RF23):**
       - Editor de texto da discussão do caso.
       - Botão `[Salvar Ata do Caso]`.

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `reunioes_matriciamento`, `casos_matriciamento`, `documento_matriciamento`, `usuarios_sistema`, `convidado`.
2. **Métodos do Serviço (`reuniaoService.ts`):**
   - `getDetalhesReuniao(reuniaoId: string): ReuniaoComPautaEParticipantes`
   - `registrarPresenca(reuniaoId: string, participanteId: string): void`
   - `definirRelator(reuniaoId: string, relatorId: string): void`
   - `finalizarReuniao(reuniaoId: string): { success: boolean; error?: string }`
3. **Validações:**
   - Para finalizar a reunião, verificar se ao menos um documento de caso foi preenchido e salvo (CA11 01).
   - O relator deve ser escolhido entre os profissionais participantes (RN06).

## Regras de Negócio e Requisitos Relacionados
- **RF20:** Permitir ao Profissional da UBS ou de Referência definir o relator antes ou durante a reunião.
- **RF21:** Apresentar os casos, profissionais, Usuário do SUS e Convidados relacionados à reunião.
- **RN06:** Relator será um papel atribuído a um profissional na reunião, e não um perfil permanente.
- **RN12:** Cada caso poderá ser associado a no máximo uma reunião; uma reunião poderá discutir vários casos.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA14.01:** O sistema permite que múltiplos perfis (UBS, Matriciador, Referência e Convidado) acessem a mesma sessão de reunião.
- [ ] **CA14.02:** O sistema gera o registro consolidado das anotações, atas dos casos discutidos e lista de presenças ao final do evento.
- [ ] Ao clicar em finalizar reunião, o status da reunião transita para concluído/realizado no mock.
