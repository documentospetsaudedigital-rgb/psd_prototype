# 07 - UC07: Realizar Triagem de Casos e Classificação de Risco

Type: task
Status: ready-for-agent
Blocked by: 00, 05

## Contexto e Objetivo
Permitir ao Profissional da UBS realizar a triagem clínica de um caso durante o atendimento inicial, avaliando a complexidade e atribuindo a classificação de risco (Baixo, Médio ou Alto). A triagem determina a conduta clínica: casos de risco médio são direcionados para solicitação de telematriciamento (UC08), enquanto casos fora desse escopo seguem para conduta na própria UBS ou encaminhamento externo (UC10).

## Histórias de Usuário
- **Como** Profissional da UBS, **quero** classificar o nível de risco do caso com base no relato do paciente e critérios clínicos, **para que** eu defina o melhor encaminhamento na rede de saúde mental.
- **Como** Profissional da UBS, **quero** que o sistema me oriente claramente que casos de risco médio são os elegíveis para telematriciamento no MVP, **para que** o fluxo siga a regra RN07.

## Especificação da Interface (Telas e Componentes)
1. **Painel de Triagem (`/ubs/triagem` ou passo integrado em `/ubs/atendimento`):**
   - Dados do paciente em cabeçalho fixo (Nome, Idade, UBS de atendimento).
   - Resumo da queixa/relato registrado no atendimento inicial (UC04).
   - **Campos da Avaliação de Triagem:**
     - Sintomas e histórico prévio em saúde mental (checkboxes/tags rápidas).
     - Uso de medicação psicotrópica atual (Sim/Não e detalhes).
     - Situação de vulnerabilidade social / rede de apoio familiar.
   - **Seletor de Classificação de Risco (destaque visual):**
     - `[ ] Risco Baixo (Verde)`: Manejo na própria UBS / Atenção Primária.
     - `[x] Risco Médio (Amarelo)`: **Elegível para Telematriciamento com a RAPS (MVP)**.
     - `[ ] Risco Alto / Urgência (Vermelho)`: Encaminhamento para emergência psiquiátrica ou CAPS direto.
   - **Ações de Desfecho da Triagem:**
     - Se `Risco Médio`: Botão destacado `[Criar Caso e Enviar para a Fila de Matriciamento]` (aciona UC08).
     - Se `Risco Alto` ou `Baixo`: Botão `[Realizar Encaminhamento / Concluir Atendimento na UBS]` (aciona UC10).

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `casos_matriciamento`, `usuarios_sus`.
2. **Métodos do Serviço (`triagemService.ts`):**
   - `salvarTriagem(pacienteId: string, dadosTriagem: DadosTriagem): { casoId?: string; conduta: 'MATRICIAMENTO' | 'ENCAMINHAMENTO' | 'UBS' }`
3. **Validações:**
   - Se risco for `MEDIO`, criar registro em `casos_matriciamento` com `situacao: 'NA_FILA'`, calculando o próximo número de `ordem_fila` daquela UBS.

## Regras de Negócio e Requisitos Relacionados
- **RF08:** Permitir ao Profissional da UBS registrar atendimento e classificação de risco.
- **RF09:** Permitir criar caso de matriciamento para Usuário do SUS classificado como risco médio.
- **RN07:** Somente caso classificado como risco médio poderá ser enviado para matriciamento no MVP.
- **RN07.01 & RN07.02:** A triagem deve utilizar os dados do atendimento inicial e acionar o fluxo correspondente de desfecho.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA07.01:** O sistema permite registrar a avaliação de triagem associada aos dados do atendimento inicial do paciente.
- [ ] **CA07.02:** O sistema identifica o resultado: se classificado como risco médio, habilita o avanço para criação e solicitação de matriciamento; se outro risco, habilita o fluxo de encaminhamento ou conduta local.
- [ ] Caso classificado como risco médio é gravado no mock com estado `NA_FILA` vinculado à UBS do profissional.
