# 16 - UC16: Gerenciar Agenda de Matriciamento e Concluir Caso

Type: task
Status: ready-for-agent
Blocked by: 00, 09

## Contexto e Objetivo
Permitir ao Profissional de Referência gerenciar os slots e disponibilidade na agenda da equipe (UC16), agendar reuniões síncronas de telematriciamento vinculando um ou múltiplos casos em pré-matriciamento à pauta (RF18, RF19, RN12, transição para `REUNIAO_AGENDADA`), e executar a conclusão formal do ciclo do caso (RF24, transição para `CONCLUIDO`) após o encerramento da discussão e registro das deliberações.

## Histórias de Usuário
- **Como** Profissional de Referência, **quero** abrir slots de horários na agenda da equipe e agendar reuniões incluindo os casos da região em pauta, **para que** os matriciadores e a equipe da UBS se reúnam com data e link estabelecidos.
- **Como** Profissional de Referência, **quero** concluir formalmente um caso de matriciamento após as decisões registradas, **para que** o caso finalize com sucesso no histórico clínico.

## Especificação da Interface (Telas e Componentes)
1. **Página de Agenda & Agendamento (`/equipe/agenda`):**
   - Calendário visual ou grade semanal/mensal com horários ocupados e disponíveis.
   - **Formulário de Abertura / Agendamento de Reunião:**
     - Data da reunião (validação: impede datas retroativas - RN01).
     - Horário de Início e Término.
     - Modalidade: `Online (Teleconferência)`, `Presencial`, `Híbrida` (RF19).
     - Link da Reunião Online (endereço eletrônico) ou Sala/Local físico (RF19).
     - Limite de casos por sessão.
     - **Seleção de Casos em Pauta (RN12):**
       - Lista de casos da região em estado `EM_PRE_MATRICIAMENTO`.
       - Checkboxes para selecionar quais casos serão discutidos nesta reunião específica.
     - Botão `[Agendar Reunião de Matriciamento]`.
2. **Fluxo de Conclusão do Caso (`/equipe/casos/:id/conclusao` ou botão na visualização do caso):**
   - Resumo do caso com paciente, histórico e visualização do Documento de Matriciamento preenchido.
   - Verificação de elegibilidade para conclusão:
     - Reunião deve ter sido realizada e o documento deve conter decisões registradas (RF24).
   - Campo para "Síntese Final do Fechamento / Encaminhamentos da RAPS".
   - Botão de ação primária com destaque: `[Concluir Matriciamento do Caso]`.
   - Modal de confirmação da conclusão.
   - Badge atualizado para `Concluído` (verde) no painel do caso.

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `reunioes_matriciamento`, `casos_matriciamento`, `documento_matriciamento`.
2. **Métodos do Serviço (`agendaConclusaoService.ts`):**
   - `agendarReuniao(dados: NovoAgendamentoInput, casosIds: string[]): ReuniaoMatriciamento`
   - `getAgendaPorEquipe(equipeId: string): ReuniaoMatriciamento[]`
   - `concluirCaso(casoId: string, sinteseFinal: string, referenciaId: string): { success: boolean; error?: string }`
3. **Validações:**
   - Ao agendar: atualizar os casos selecionados de `EM_PRE_MATRICIAMENTO` para `REUNIAO_AGENDADA` e atribuir `reuniao_id` (RN12).
   - Bloquear agendamento de data passada (CA16 03).
   - Ao concluir: atualizar `situacao` do caso para `CONCLUIDO`, garantindo que apenas o Profissional de Referência execute a conclusão (RF24).

## Regras de Negócio e Requisitos Relacionados
- **RF18 & RF19:** Permitir agendar reunião registrando modalidade, data, horário, local ou endereço eletrônico.
- **RF24:** Permitir ao Profissional de Referência concluir o caso após o registro das decisões.
- **RN01 (UC16):** O sistema não permite cadastrar horários com datas ou horas retroativas.
- **RN12:** Cada caso poderá ser associado a no máximo uma reunião; uma reunião poderá discutir vários casos.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA16 01:** Dado um horário válido e casos selecionados, ao salvar, a reunião fica agendada na grade e os casos passam para o estado `REUNIAO_AGENDADA`.
- [ ] **CA16 02:** Se uma reunião marcada for alterada, o sistema aciona o fluxo de comunicação de mudança (UC13).
- [ ] **CA16 03:** Se o profissional tentar salvar uma data que já passou, o sistema exibe erro e não grava o agendamento.
- [ ] Quando o Profissional de Referência confirma a conclusão do caso, a situação é gravada como `CONCLUIDO`, finalizando com sucesso o ciclo ponta a ponta do MVP (Seção 11).
