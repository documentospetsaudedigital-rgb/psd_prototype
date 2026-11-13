# 04 - UC04: Realizar Atendimento Inicial na UBS

Type: task
Status: ready-for-agent
Blocked by: 00, 05, 07

## Contexto e Objetivo
Permitir ao Profissional da UBS registrar o acolhimento e atendimento inicial de um cidadão, buscando seu cadastro pelo identificador local/CPF, informando o motivo da consulta e relato clínico preliminar, e conectando o fluxo à triagem de risco (UC07) ou ao cadastro imediato (UC05) caso a pessoa ainda não esteja registrada.

## Histórias de Usuário
- **Como** Profissional da UBS, **quero** buscar um paciente pelo número de identificação ou nome, **para que** eu confirme seus dados e inicie o atendimento.
- **Como** Profissional da UBS, **quero** registrar o motivo da consulta e relato clínico, **para que** essas informações sirvam de subsídio direto para a triagem e eventual caso de matriciamento.

## Especificação da Interface (Telas e Componentes)
1. **Página de Atendimento Inicial (`/ubs/atendimento`):**
   - **Passo 1: Identificação do Paciente:**
     - Campo de busca: "Identificador Local ou Nome do Paciente".
     - Botão `[Consultar]`.
     - Se encontrado: card com dados do paciente (Nome completo, Data de Nascimento, Identificador local, Município de residência) e botão `[Confirmar Paciente]`.
     - Se não encontrado (FA04a / EP01): alerta em destaque "Paciente não localizado" com botão direto `[+ Cadastrar Novo Usuário do SUS]` que abre o modal/tela do UC05 e retoma o atendimento após o cadastro.
   - **Passo 2: Registro Clínico do Atendimento:**
     - Campo de texto: "Motivo do Atendimento" (obrigatório).
     - Área de texto (*Textarea*): "Relato Clínico Inicial e Queixa Principal" (obrigatório).
     - Botão `[Avançar para Triagem de Risco]` que aciona a interface do UC07.
   - Mensagens de validação visual caso campos obrigatórios não sejam preenchidos (FA06a).

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `usuarios_sus`, `casos_matriciamento`, `auth_session`.
2. **Métodos do Serviço (`atendimentoService.ts`):**
   - `buscarUsuarioSUS(termo: string): UsuarioSUS[]`
   - `iniciarAtendimento(pacienteId: string, motivo: string, relato: string): AtendimentoEmAndamento`
3. **Validações do Mock:**
   - Garantir que `pacienteId` pertença a um `usuario_sus` ativo.
   - Validar preenchimento obrigatório de motivo e relato.

## Regras de Negócio e Requisitos Relacionados
- **RF07:** Permitir ao Profissional da UBS cadastrar, consultar e alterar Usuários do SUS.
- **RF08:** Permitir ao Profissional da UBS registrar atendimento e classificação de risco.
- **RN01:** O atendimento deve estar estritamente vinculado a um cadastro de pessoa (Usuário do SUS).
- **RN02:** Motivo do atendimento e relato inicial são campos obrigatórios.
- **RN03:** A conclusão do atendimento depende da conclusão da triagem (UC07).

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA04 01:** Dado um cadastro de paciente localizado e campos preenchidos, quando UC07 (triagem) termina com sucesso, o sistema registra o atendimento e gera a identificação do atendimento.
- [ ] **CA04 02:** Quando a triagem não for concluída, o atendimento não é dado como concluído e os dados permanecem em rascunho.
- [ ] **CA04 03:** Quando o paciente não for localizado e o profissional concluir o cadastro via UC05 (EP01), o sistema retoma o atendimento automaticamente com o novo paciente selecionado.
