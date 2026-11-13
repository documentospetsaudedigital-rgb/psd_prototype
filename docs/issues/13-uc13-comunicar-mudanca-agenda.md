# 13 - UC13: Comunicar Mudança de Agenda e Reagendamento

Type: task
Status: ready-for-agent
Blocked by: 00, 16

## Contexto e Objetivo
Permitir ao Profissional de Referência ou Matriciador reagendar uma reunião de matriciamento previamente marcada, alterando data, horário, modalidade ou link de videoconferência, gerando no protótipo o aviso/comunicação visual aos participantes envolvidos (Profissionais da UBS, Matriciadores e Convidados).

## Histórias de Usuário
- **Como** Profissional de Referência, **quero** alterar a data ou horário de uma reunião já agendada informando o motivo, **para que** os profissionais da UBS e matriciadores sejam formalmente comunicados da mudança.
- **Como** participante da reunião, **quero** visualizar um alerta de reagendamento no painel de casos, **para que** eu não compareça no horário incorreto.

## Especificação da Interface (Telas e Componentes)
1. **Modal / Tela de Reagendamento (`/equipe/reunioes/:id/reagendar`):**
   - Dados da reunião atual: Data atual, Horário atual, Modalidade e Casos em pauta.
   - **Formulário de Alteração de Agenda:**
     - Nova Data (não retroativa - RN01 do UC16).
     - Novo Horário de Início e Término.
     - Nova Modalidade (`Online`, `Presencial` ou `Híbrida`).
     - Novo Link da Reunião (ex: Google Meet / Jitsi) ou Local Físico.
     - Campo obrigatório: "Motivo da Alteração / Justificativa".
   - Checkbox: `[x] Notificar participantes por e-mail e na plataforma`.
   - Botão primário `[Confirmar Reagendamento e Notificar]` e `[Cancelar]`.
2. **Componente de Feedback e Registro de Notificação:**
   - Mensagem de sucesso na tela: *"Reunião reagendada com sucesso! Notificações enviadas aos 4 participantes vinculados."*
   - Histórico de alterações visível nos detalhes da reunião (Data anterior -> Nova data, Motivo, Usuário que alterou).

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `reunioes_matriciamento`, `casos_matriciamento`.
2. **Métodos do Serviço (`agendaService.ts`):**
   - `reagendarReuniao(reuniaoId: string, novosDados: ReagendamentoInput, usuarioId: string): { success: boolean; error?: string }`
3. **Validações:**
   - Impedir data no passado (EX16a).
   - Validar que a reunião existe e está com status `AGENDADA`.
   - Registrar no histórico interno da reunião os dados da mudança.

## Regras de Negócio e Requisitos Relacionados
- **RN02:** Alterações em horários de reuniões já agendadas exigem o registro e notificação aos participantes.
- **RN12:** Cada caso permanece vinculado a no máximo uma reunião.
- **RNF03 & RNF06:** Validação de autorização e registro de auditoria no mock.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA13 01:** Dado que o profissional acessa a reunião agendada e altera os dados válidos, o sistema atualiza a agenda e confirma a mudança aos participantes com sucesso.
- [ ] **CA13 02:** Se forem submetidas informações inválidas (ex: data retroativa ou horários inconsistentes), o sistema impede a gravação e preserva os dados originais.
- [ ] Os casos vinculados à reunião continuam refletindo a nova data no painel de acompanhamento da UBS.
