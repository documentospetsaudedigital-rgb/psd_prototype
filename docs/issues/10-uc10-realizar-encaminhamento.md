# 10 - UC10: Realizar Encaminhamento para Outros Serviços da Rede

Type: task
Status: ready-for-agent
Blocked by: 00, 07

## Contexto e Objetivo
Permitir que o Profissional da UBS encaminhe um usuário para outro nível de atenção, especialidade médica ou serviço da rede de saúde (ex: Emergência Psiquiátrica, Ambulatório de Especialidades, CAPS Direto, Centro de Convivência), nos casos em que a demanda não deve ser conduzida via telematriciamento.

## Histórias de Usuário
- **Como** Profissional da UBS, **quero** emitir uma guia de encaminhamento quando o caso exigir atendimento de urgência ou especialidade externa, **para que** o paciente seja direcionado com segurança e documentação formal.
- **Como** Profissional da UBS, **quero** visualizar o comprovante da guia gerada com opção de impressão, **para que** eu entregue uma cópia física ao paciente.

## Especificação da Interface (Telas e Componentes)
1. **Página de Encaminhamento (`/ubs/encaminhamento` ou modal a partir de `/ubs/triagem`):**
   - Dados do paciente (Nome, Data de Nascimento, Identificador local).
   - Dados da triagem de origem (Data, Profissional responsável).
   - **Formulário de Encaminhamento:**
     - Serviço / Especialidade de Destino (Select com opções cadastradas: *CAPS III 24h*, *Ambulatório de Saúde Mental*, *Hospital Geral / Emergência*, *Assistência Social / CRAS*, *Neurologia Adulto*).
     - Nível de Prioridade / Urgência: `Eletivo / Rotina`, `Prioritário`, `Urgência`.
     - Motivo Detalhado do Encaminhamento (campo de texto obrigatório).
     - Hipótese Diagnóstica / CID-10 sugerido (opcional).
   - Botão primário `[Confirmar e Emitir Guia]` e botão secundário `[Cancelar]`.
2. **Visualização da Guia Emitida (`/ubs/encaminhamento/:id/guia`):**
   - Layout formatado em estilo de documento oficial do SUS ("Guia de Encaminhamento e Referência").
   - Cabeçalho com identificação do paciente, unidade emitente, serviço de destino, motivo clínico e data/hora.
   - Botão `[Imprimir Guia]` (aciona impressão nativa do navegador formatada) e `[Voltar para Atendimentos]`.

## Especificação da Camada de Mock (`localStorage`)
1. **Entidade Envolvida:** `encaminhamentos` (id, usuario_sus_id, ubs_origem_id, servico_destino, urgencia, motivo, criado_por, criado_em).
2. **Métodos do Serviço (`encaminhamentoService.ts`):**
   - `emitirEncaminhamento(dados: EncaminhamentoInput): Encaminhamento`
   - `getEncaminhamentosPorUsuario(usuarioSusId: string): Encaminhamento[]`

## Regras de Negócio e Requisitos Relacionados
- **RN01:** Um encaminhamento só pode ser gerado se houver um registro de atendimento/triagem prévio associado.
- **RN02:** O serviço de destino escolhido deve constar na relação de serviços ativos da rede credenciada.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA10.01:** O sistema permite acessar a tela/modal de encaminhamento diretamente a partir da triagem de casos (UC07).
- [ ] **CA10.02:** O sistema gera o registro do encaminhamento visível no histórico do paciente contendo o motivo, urgência e destino, e disponibiliza a guia para visualização e impressão.
- [ ] Validação impede submissão sem preenchimento do serviço de destino ou motivo clínico (FE01).
