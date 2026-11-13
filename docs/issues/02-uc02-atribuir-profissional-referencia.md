# 02 - UC02: Atribuir Profissional de Referência

Type: task
Status: ready-for-agent
Blocked by: 00, 15

## Contexto e Objetivo
Permitir ao Coordenador da RAPS gerenciar, associar ou alterar o Profissional de Referência responsável pela equipe/região e pelo acompanhamento contínuo dos casos de matriciamento, garantindo que cada região conte com um especialista líder responsável pela pauta e deliberações.

## Histórias de Usuário
- **Como** Coordenador da RAPS, **quero** listar as regiões/equipes e selecionar um Profissional de Referência cadastrado e elegível, **para que** ele assuma a liderança dos casos daquela região.
- **Como** Coordenador da RAPS, **quero** substituir um Profissional de Referência existente quando necessário, **para que** a equipe mantenha um responsável ativo sem perda de histórico.

## Especificação da Interface (Telas e Componentes)
1. **Painel do Coordenador da RAPS (`/coordenador/referencias`):**
   - Cabeçalho com dados da Região e status da Equipe de Matriciamento associada.
   - Tabela de Regiões com colunas: Região, CAPS Vinculado, Profissional de Referência Atual, Status da Equipe, Ações.
   - Botão de ação: `[Atribuir / Alterar Referência]`.
2. **Modal / Formulário de Atribuição:**
   - Exibição em destaque do profissional atualmente atribuído (se houver).
   - Seletor (*Select/Combobox*) listando profissionais de saúde elegíveis com perfil de "Profissional de Referência" ativos no sistema.
   - Botão "Confirmar Atribuição" e "Cancelar".
   - Alerta visual caso o usuário submeta sem escolher um profissional (FA03a).
   - Modal de confirmação ao substituir um profissional previamente vinculado (FA02a).

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `equipe_matriciamento`, `usuarios_sistema`.
2. **Métodos do Serviço (`coordenadorService.ts`):**
   - `getRegioesComReferencia(): Array<{ regiao: Regiao; equipe: EquipeMatriciamento; referencia: UsuarioSistema | null }>`
   - `getProfissionaisReferenciaDisponiveis(): UsuarioSistema[]`
   - `atribuirReferencia(equipeId: string, referenciaId: string): { success: boolean; error?: string }`
3. **Validações do Mock:**
   - Garantir que o profissional selecionado possua perfil `Profissional de Referência` e esteja ativo (`ativo === true`).
   - Atualizar o campo `referencia_id` na entidade `equipe_matriciamento`.

## Regras de Negócio e Requisitos Relacionados
- **RF05:** Permitir ao Coordenador cadastrar Profissionais de Referência e associá-los à Região.
- **RN02:** Cada Região possuirá uma única Equipe de matriciamento ativa no MVP.
- **RN03:** Cada Equipe possuirá um Profissional de Referência principal.
- **RN13:** Cadastros já utilizados serão inativados e mantidos no histórico, sem exclusão física.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA02 01 (Atribuição com sucesso):** Dado um Coordenador (RAPS) autenticado e uma região/equipe cadastrada, quando seleciona um Profissional de Referência ativo e confirma, então o sistema grava a associação no mock e exibe o novo responsável vinculado na tela.
- [ ] **CA02 02 (Tratamento de falha/invariância):** Caso ocorra qualquer erro de validação ou cancelamento, a atribuição anterior permanece intacta.
- [ ] **FA03a:** Caso tente submeter sem selecionar um profissional, exibir mensagem de aviso informando a obrigatoriedade.
