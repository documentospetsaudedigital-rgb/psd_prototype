# 12 - UC12: Editar Informações de Pré-Matriciamento

Type: task
Status: ready-for-agent
Blocked by: 00, 09

## Contexto e Objetivo
Permitir ao Matriciador e ao Profissional de Referência atualizar, complementar ou retificar anotações e avaliações preliminares registradas na etapa de pré-matriciamento de um caso, antes que a reunião formal seja realizada e concluída.

## Histórias de Usuário
- **Como** Matriciador, **quero** revisar e editar minhas anotações pré-matriciais de um caso, **para que** novas informações trazidas pela equipe da UBS antes da reunião fiquem registradas.
- **Como** Profissional de Referência, **quero** validar e ajustar as recomendações preliminares antes de fechar a pauta da reunião.

## Especificação da Interface (Telas e Componentes)
1. **Página de Edição de Pré-Matriciamento (`/equipe/casos/:id/pre-matriciamento/editar`):**
   - Cabeçalho com paciente, UBS de origem e data da solicitação.
   - Formulário com dados prévios carregados:
     - Dúvidas clínicas da UBS (somente leitura).
     - Notas de Análise Pré-Matricial (campo de texto editável com suporte a tópicos).
     - Necessidade de exames ou relatórios complementares (checkboxes/campo de texto).
     - Recomendação de Especialidades Participantes (Psiquiatria, Psicologia, Terapia Ocupacional, etc.).
   - Botão `[Salvar Alterações]` e botão `[Cancelar Edição]` (FA07a: preserva dados anteriores).
   - Bloqueio de edição com aviso visual caso o caso já esteja no estado `CONCLUIDO` ou `CANCELADO` (EX08a).

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `casos_matriciamento`, `documento_matriciamento`, `usuarios_sistema`.
2. **Métodos do Serviço (`preMatriciamentoService.ts`):**
   - `getDadosPreMatriciamento(casoId: string): DadosPreMatriciamento`
   - `atualizarPreMatriciamento(casoId: string, dadosAtualizados: Partial<DadosPreMatriciamento>, usuarioId: string): { success: boolean; error?: string }`
3. **Validações:**
   - Bloquear edição no mock se o usuário logado não for membro da equipe associada à região do caso (EX06a).
   - Registrar `atualizado_em` e `atualizado_por` no mock (RNF06).

## Regras de Negócio e Requisitos Relacionados
- **RF16 & RF17:** Casos enviados e disponíveis para consulta e complementação pela equipe regional.
- **RN03:** Equipe com Profissional de Referência e Matriciadores.
- **RNF03 & RNF06:** Validação de autorização no mock e registro obrigatório de autoria e timestamps.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA12 01:** Dado caso disponível no estado `SOLICITADO` ou `EM_PRE_MATRICIAMENTO` e profissional autorizado, quando dados válidos forem salvos, o sistema apresenta as informações atualizadas.
- [ ] **CA12 02:** Campos inválidos ou vazios obrigatórios não são gravados e inconsistências são indicadas na tela.
- [ ] **CA12 03:** Usuário sem perfil ou de outra região tem a edição bloqueada com alerta de acesso negado.
- [ ] **CA12 04:** Após salvamento bem-sucedido, o registro armazena a data/hora e o ID do usuário responsável pela edição.
- [ ] **CA12 05:** Ao cancelar antes de salvar, os dados originais são preservados integralmente.
