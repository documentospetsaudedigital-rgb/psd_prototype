# 08 - UC08: Fila da UBS e Solicitação de Matriciamento

Type: task
Status: ready-for-agent
Blocked by: 00, 07

## Contexto e Objetivo
Permitir ao Profissional da UBS gerenciar a fila interna de casos aguardando envio da sua unidade, reordenar as prioridades manualmente (subir/descer na fila), complementar a descrição clínica do caso, incluir anexos (PDF/JPEG) e convidados, e efetuar o envio formal do caso para a Equipe de Matriciamento da Região (transição de `NA_FILA` para `SOLICITADO`).

## Histórias de Usuário
- **Como** Profissional da UBS, **quero** visualizar a lista de casos pendentes da minha unidade e reordená-los para cima ou para baixo, **para que** os casos mais urgentes tenham prioridade na fila de envio.
- **Como** Profissional da UBS, **quero** anexar exames/relatórios em PDF ou fotos em JPEG e adicionar convidados, **para que** os matriciadores tenham o histórico completo antes da reunião.
- **Como** Profissional da UBS, **quero** clicar em "Enviar para Matriciamento", **para que** o caso seja despachado para a Equipe de Matriciamento ativa da minha Região.

## Especificação da Interface (Telas e Componentes)
1. **Página da Fila da UBS (`/ubs/fila`):**
   - Título da UBS ativa (ex: "Fila de Matriciamento - UBS Vila Esperança").
   - Tabela/Lista dos casos com estado `NA_FILA`:
     - Coluna "Posição na Fila": Badge numérico (`#1`, `#2`, ...).
     - Coluna "Ações de Reordenação": Botões com ícones `[↑ Subir]` e `[↓ Descer]` (ou suporte a arrastar e soltar - *drag and drop*).
     - Coluna "Paciente": Nome do Usuário SUS e idade.
     - Coluna "Queixa / Descrição": Resumo da triagem.
     - Coluna "Data de Criação": Formatada DD/MM/AAAA.
     - Coluna "Status": Badge `Na Fila`.
     - Coluna "Ações": Botão `[Preparar e Enviar]`.
2. **Tela / Modal de Preparação do Envio (`/ubs/casos/:id/solicitar`):**
   - Dados do paciente e motivo da solicitação.
   - Campo editável: "Descrição Detalhada para Matriciamento / Dúvidas Clínicas".
   - **Área de Anexos (RF13, RN14):**
     - Botão `[Selecionar Arquivo PDF ou JPEG]`.
     - Validação de formato (rejeita arquivos que não sejam `.pdf`, `.jpg`, `.jpeg`).
     - Lista de anexos já adicionados com tamanho, nome original, miniatura e botão de remover.
     - Simulação de upload salvando em base64/metadados no mock local.
   - **Seção de Convidados (RF14):**
     - Lista de convidados adicionados.
     - Formulário para adicionar: Nome, Contato (email/telefone), Instituição (ex: CRAS, CAPS Infantil).
   - Botão de ação primária: `[Enviar Caso para a Equipe da Região]` (com modal de confirmação).

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `casos_matriciamento`, `anexo_caso`, `convidado`, `equipe_matriciamento`, `unidade_saude`.
2. **Métodos do Serviço (`filaUbsService.ts`):**
   - `getCasosFilaUbs(ubsId: string): CasoMatriciamento[]`
   - `reordenarFila(ubsId: string, casoId: string, direcao: 'UP' | 'DOWN'): void`
   - `adicionarAnexo(casoId: string, arquivo: { nome: string; tipo: string; tamanho: number; base64: string }): AnexoCaso`
   - `adicionarConvidado(casoId: string, convidado: { nome: string; contato: string; instituicao: string }): Convidado`
   - `enviarCasoParaEquipe(casoId: string): { success: boolean; equipeDestinoId: string }`
3. **Validações:**
   - Ao enviar o caso: identificar a `regiao_id` da UBS e encontrar a `equipe_matriciamento` ativa daquela região (RN10).
   - Alterar `situacao` de `NA_FILA` para `SOLICITADO`.

## Regras de Negócio e Requisitos Relacionados
- **RF10:** Apresentar os casos não enviados na fila da respectiva UBS.
- **RF11:** Permitir ao Profissional da UBS mover casos para cima ou para baixo na fila.
- **RF12:** Permitir ao Profissional da UBS registrar descrição inicial e pré-matriciamento.
- **RF13 & RN14:** Anexos restritos a arquivos PDF e JPEG dentro de limite de tamanho configurado.
- **RF14:** Permitir cadastrar convidados para o caso.
- **RF15 & RN10:** O caso será encaminhado automaticamente à Equipe ativa da Região da UBS.
- **RN08 & RN09:** Fila ordenada por `ordem_fila` e data de criação; o profissional só reordena casos de sua própria UBS.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA07.01 / CA08.01:** O sistema apresenta os casos da UBS na fila e permite registrar a solicitação de matriciamento.
- [ ] **CA07.02 / CA08.02:** O envio com sucesso atualiza a situação do caso para `SOLICITADO` e o vincula à Equipe ativa da Região.
- [ ] Ao clicar em subir/descer na fila, a numeração `ordem_fila` é recalculada e refletida imediatamente na listagem.
- [ ] Validação de anexos impede envio de formatos não suportados (ex: `.exe`, `.docx`) com mensagem de erro clara.
