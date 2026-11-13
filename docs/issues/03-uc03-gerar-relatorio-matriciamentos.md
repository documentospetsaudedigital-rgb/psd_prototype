# 03 - UC03: Gerar Relatório de Matriciamentos

Type: task
Status: ready-for-agent
Blocked by: 00

## Contexto e Objetivo
Permitir ao Coordenador da RAPS consultar estatísticas, filtrar e gerar relatórios analíticos dos casos de matriciamento registrados na plataforma (casos por região, por UBS, por situação, tempo de fila e reuniões realizadas), com opção de visualização interativa em tela e exportação simulada (PDF/impressão ou CSV).

## Histórias de Usuário
- **Como** Coordenador da RAPS, **quero** filtrar os atendimentos e matriciamentos por período, região e situação, **para que** eu possa avaliar os resultados da rede de telematriciamento.
- **Como** Coordenador da RAPS, **quero** visualizar um painel analítico com gráficos/tabelas e exportar o relatório, **para que** os dados possam ser apresentados na reunião de gestão.

## Especificação da Interface (Telas e Componentes)
1. **Painel de Relatórios (`/relatorios`):**
   - Barra de filtros:
     - Período (Data Inicial e Data Final).
     - Região (seletor com todas as regiões ou região específica).
     - UBS de origem (seletor).
     - Situação do caso (`Todos`, `NA_FILA`, `SOLICITADO`, `EM_PRE_MATRICIAMENTO`, `REUNIAO_AGENDADA`, `CONCLUIDO`).
   - Botão primário `[Gerar Relatório]` e botão secundário `[Limpar Filtros]`.
2. **Área de Exibição de Resultados:**
   - Cards de métricas rápidas no topo:
     - Total de Casos Triados.
     - Casos em Fila / Em Análise.
     - Casos com Reunião Agendada.
     - Casos Concluídos com Plano Terapêutico (PTS).
   - Tabela detalhada de casos correspondentes:
     - Identificador do Caso, Paciente (Usuário SUS), UBS de Origem, Risco, Data de Solicitação, Data da Reunião, Relator, Situação.
   - Estado vazio (*Empty State*) quando não houver registros nos filtros selecionados (FA03.01).
   - Botões de exportação: `[Exportar para CSV]` e `[Imprimir / Salvar em PDF]` (gera visão de impressão formatada).

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `casos_matriciamento`, `reunioes_matriciamento`, `unidades_saude`, `regioes`.
2. **Métodos do Serviço (`relatorioService.ts`):**
   - `filtrarMatriciamentos(filtros: FiltroRelatorio): CasoComDetalhes[]`
   - `gerarMetricasGerais(): ResumoMetricas`
   - `exportarCSV(dados: CasoComDetalhes[]): void`

## Regras de Negócio e Requisitos Relacionados
- **RN03.01:** O relatório deve ser gerado com base nos dados de matriciamentos registrados no sistema.
- **RN03.02:** Somente o Coordenador da RAPS (ou Administrador) tem permissão de acesso à geração de relatórios analíticos gerais.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA03.01:** Quando o coordenador selecionar os filtros e solicitar a geração, existindo registros disponíveis no mock, o sistema exibe a tabela analítica e disponibiliza os botões de exportação.
- [ ] **FA03.01:** Se não houver registros disponíveis no filtro informado, o sistema informa claramente que não foram localizados dados para o período/critério informado.
- [ ] O arquivo CSV gerado contém as colunas essenciais do caso e da reunião.
