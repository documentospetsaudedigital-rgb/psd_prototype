# 09 - UC09: Realizar Pré-Matriciamento e Análise pela Equipe

Type: task
Status: ready-for-agent
Blocked by: 00, 08

## Contexto e Objetivo
Permitir ao Profissional de Referência e aos Matriciadores acessar a lista de casos solicitados pelas UBSs de sua Região, iniciar a análise preliminar (transição para `EM_PRE_MATRICIAMENTO`), consultar o histórico, visualizar anexos clínicos e registrar as primeiras considerações no Documento de Matriciamento antes da realização da reunião síncrona.

## Histórias de Usuário
- **Como** Profissional de Referência ou Matriciador, **quero** visualizar a listagem de casos recebidos das UBSs da minha região, **para que** eu avalie a pertinência do apoio matricial.
- **Como** Matriciador, **quero** registrar notas preliminares de pré-matriciamento e recomendações iniciais no documento do caso, **para que** a discussão na reunião seja focada e eficiente.

## Especificação da Interface (Telas e Componentes)
1. **Painel de Casos da Equipe Regional (`/equipe/casos`):**
   - Abas por status:
     - `Recebidos / Solicitados` (`SOLICITADO`)
     - `Em Pré-Matriciamento` (`EM_PRE_MATRICIAMENTO`)
     - `Reunião Agendada` (`REUNIAO_AGENDADA`)
     - `Concluídos` (`CONCLUIDO`)
   - Tabela de casos recebidos com: Paciente, UBS Solicitante, Data de Solicitação, Anexos, Ações.
   - Botão de ação: `[Analisar Caso / Iniciar Pré-Matriciamento]`.
2. **Tela de Análise e Pré-Matriciamento (`/equipe/casos/:id/pre-matriciamento`):**
   - Painel esquerdo (Dados do Caso):
     - Resumo do paciente, relato da UBS, dúvidas da Atenção Primária.
     - Galeria de anexos com visualizador (abre modal com visualização de PDF simulado ou imagem JPEG).
     - Lista de convidados e contatos.
   - Painel direito (Pré-Matriciamento e Documento):
     - Editor de texto das considerações pré-matriciais do especialista.
     - Indicador da situação atual: transição automática de `SOLICITADO` para `EM_PRE_MATRICIAMENTO` no primeiro salvamento.
     - Botão `[Salvar Notas de Pré-Matriciamento]`.
     - Botão `[Aprovar para Agendamento de Reunião]` (habilita agendamento em UC16).
     - Opção de reclassificação/devolução caso o matriciamento não seja indicado (FA05a).

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `casos_matriciamento`, `documento_matriciamento`, `anexo_caso`, `usuarios_sistema`.
2. **Métodos do Serviço (`preMatriciamentoService.ts`):**
   - `getCasosPorEquipe(equipeId: string): CasoMatriciamento[]`
   - `iniciarPreMatriciamento(casoId: string, especialistaId: string): void`
   - `salvarNotasPreMatriciais(casoId: string, conteudo: string, autorId: string): DocumentoMatriciamento`

## Regras de Negócio e Requisitos Relacionados
- **RF16:** Apresentar ao Profissional de Referência e aos Matriciadores os casos enviados à Equipe.
- **RF17:** Permitir ao Profissional de Referência e aos Matriciadores complementar o Documento de matriciamento.
- **RN10:** A equipe visualiza apenas os casos de UBSs pertencentes à sua respectiva Região.
- **RN11:** Cada caso possuirá um único Documento de matriciamento.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA09 01:** O conteúdo da discussão e análise pré-matricial é registrado e persistido no Documento de Matriciamento do caso.
- [ ] O caso avança de status para `EM_PRE_MATRICIAMENTO` após a análise inicial da equipe.
- [ ] Anexos enviados pela UBS podem ser visualizados na interface do especialista.
