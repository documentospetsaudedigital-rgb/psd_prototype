# 11 - UC11: Editar Documento Compartilhado de Matriciamento

Type: task
Status: ready-for-agent
Blocked by: 00, 09

## Contexto e Objetivo
Permitir que os profissionais participantes da discussão clínica (Profissional da UBS, Profissional de Referência e Matriciadores) elaborem, consultem e atualizem o Documento de Matriciamento do caso, registrando colaborativamente o histórico da discussão, as orientações de cuidado, alterações de conduta e o Plano Terapêutico Singular (PTS).

## Histórias de Usuário
- **Como** participante da reunião (UBS ou Matriciador), **quero** editar as seções do documento do caso com as minhas anotações clínicas, **para que** o plano terapêutico contemple a visão multidisciplinar da equipe.
- **Como** relator da reunião, **quero** consolidar as decisões e encaminhamentos acordados, **para que** todos os profissionais tenham clareza das condutas assumidas.

## Especificação da Interface (Telas e Componentes)
1. **Painel do Documento de Matriciamento (`/casos/:id/documento` ou aba na Sala de Reunião):**
   - Cabeçalho com identificação do caso, paciente e status.
   - Metadados de auditoria visíveis no topo:
     - "Última alteração por: [Nome do Profissional - Perfil] em [Data/Hora]" (RNF06).
   - **Estrutura Modular do Documento (Campos Orientadores):**
     - 1. *Histórico e Queixa Principal da UBS* (preenchido no envio, consultável).
     - 2. *Avaliação Multiprofissional da Equipe de Matriciamento* (análise psiquiátrica, psicológica, social).
     - 3. *Plano Terapêutico Singular (PTS)* (metas de cuidado a curto e médio prazo).
     - 4. *Condutas Farmacológicas e Orientações Clínicas* (ajuste de dosagens, monitoramento de efeitos adversos).
     - 5. *Pactuações e Responsabilidades* (ações que competem à UBS e ações do CAPS/especialidade).
   - **Barra de Ferramentas do Editor:**
     - Botão `[Salvar Alterações]` com feedback imediato ("Documento salvo com sucesso!").
     - Indicador de estado de salvamento ("Todas as alterações salvas" / "Alterações não salvas").
     - Botão `[Pré-Visualizar Documento / Imprimir Ata]`.
     - Aviso informativo sobre concorrência (RN15): "A edição é sequencial; o salvamento mais recente substitui a versão anterior".

## Especificação da Camada de Mock (`localStorage`)
1. **Entidade Envolvida:** `documento_matriciamento` (id, caso_id, conteudo, atualizado_por, criado_em, atualizado_em).
2. **Métodos do Serviço (`documentoMatriciamentoService.ts`):**
   - `getDocumentoPorCaso(casoId: string): DocumentoMatriciamento`
   - `salvarDocumento(casoId: string, conteudo: string, usuarioId: string): DocumentoMatriciamento`
3. **Validações:**
   - Garantir a unicidade: existe apenas 1 documento por caso (RN11).
   - Atualizar automaticamente `atualizado_por` com o usuário ativo na sessão e `atualizado_em` com o timestamp atual.

## Regras de Negócio e Requisitos Relacionados
- **RF22:** Permitir aos profissionais participantes criar, consultar e editar o Documento de matriciamento.
- **RF23:** Permitir registrar decisões e encaminhamentos no Documento de matriciamento.
- **RN11:** Cada caso possuirá um único Documento de matriciamento.
- **RN15:** A edição do Documento não será simultânea; a última gravação válida substituirá o conteúdo anterior.
- **RNF06:** Registrar data de criação, data de alteração e usuário responsável.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA11 01:** O sistema assegura que o caso possua um documento de matriciamento ativo e acessível antes da conclusão do caso.
- [ ] **CA11 02:** O documento está diretamente associado ao caso correto e exibe campos essenciais para registro de condutas e deliberações.
- [ ] **CA11 03:** Profissionais de diferentes perfis participantes conseguem salvar edições no mesmo documento com atualização dos metadados de autoria.
