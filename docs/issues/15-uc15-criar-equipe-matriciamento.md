# 15 - UC15: Cadastros Base e Criação da Equipe de Matriciamento

Type: task
Status: ready-for-agent
Blocked by: 00

## Contexto e Objetivo
Implementar os cadastros administrativos fundamentais da rede de saúde (Regiões, Unidades UBS e CAPS, e Usuários Profissionais gerenciados pelo Administrador - RF03, RF04) e a tela de estruturação e criação da Equipe de Matriciamento Regional pelo Profissional de Referência (UC15, RF06), com associação de membros matriciadores e cumprimento estrito da regra de equipe única por região (RN02).

## Histórias de Usuário
- **Como** Administrador do sistema, **quero** cadastrar Regiões, UBSs, CAPS e profissionais da rede, **para que** a infraestrutura territorial esteja configurada.
- **Como** Profissional de Referência, **quero** criar a Equipe de Matriciamento da minha Região e selecionar os Matriciadores membros, **para que** a equipe esteja ativa e habilitada a receber casos.

## Especificação da Interface (Telas e Componentes)
1. **Módulo Administrativo (`/admin/regioes-unidades` & `/admin/usuarios`):**
   - Cadastro de Região (Nome da Região).
   - Cadastro de Unidade de Saúde (Nome, Tipo: `UBS` ou `CAPS`, Região vinculada - RN01).
   - Cadastro de Profissionais (Nome, Email, Perfil fixo: Profissional UBS, Coordenador RAPS, Profissional de Referência, Matriciador; Unidade/Região associada).
2. **Tela de Criação de Equipe de Matriciamento (`/equipe/gestao` ou `/equipe/criar`):**
   - Indicação automática da Região e CAPS vinculado ao Profissional de Referência logado.
   - Campo "Nome da Equipe de Matriciamento" (ex: "Equipe Saúde Mental Norte I").
   - **Lista de Seleção de Matriciadores Disponíveis:**
     - Tabela/Checkboxes com os profissionais da região cadastrados com perfil "Matriciador".
     - Exibição de especialidades (Psiquiatria, Psicologia, Enfermagem, Assistência Social).
   - Botão primário `[Criar Equipe de Matriciamento]`.
   - **Validações na Interface:**
     - Alerta caso o nome da equipe ou nenhum membro seja selecionado (FA02).
     - Alerta impeditivo caso a Região já possua uma equipe de matriciamento ativa (FA01, RN02, CA15 02).
3. **Visualização da Equipe Ativa:**
   - Card com nome da equipe, Profissional de Referência responsável, lista de matriciadores ativos e botão para adicionar/remover membros.

## Especificação da Camada de Mock (`localStorage`)
1. **Entidades Envolvidas:** `regiao`, `unidade_saude`, `equipe_matriciamento`, `equipe_membro`, `usuarios_sistema`.
2. **Métodos do Serviço (`equipeService.ts`):**
   - `criarEquipe(dados: { nome: string; regiaoId: string; capsId: string; referenciaId: string; matriciadoresIds: string[] }): { success: boolean; equipe?: EquipeMatriciamento; error?: string }`
   - `getEquipeAtivaPorRegiao(regiaoId: string): EquipeMatriciamento | null`
   - `adicionarMembro(equipeId: string, matriciadorId: string): void`
   - `removerMembro(equipeId: string, matriciadorId: string): void`
3. **Validações:**
   - Rejeitar criação se `equipes_matriciamento.some(e => e.regiao_id === regiaoId && e.ativo === true)` (RN02).

## Regras de Negócio e Requisitos Relacionados
- **RF03:** Permitir ao Administrador gerenciar Regiões, UBS e CAPS.
- **RF04:** Permitir ao Administrador gerenciar Profissionais da UBS e Coordenadores.
- **RF06:** Permitir ao Profissional de Referência criar a Equipe e gerenciar Matriciadores.
- **RN01:** Cada UBS e CAPS pertencerá a uma Região.
- **RN02:** Cada Região possuirá uma única Equipe de matriciamento ativa no MVP.
- **RN03:** Cada Equipe tem um Profissional de Referência principal e vários Matriciadores.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA15 01:** Dado que o Profissional de Referência preenche o nome e associa matriciadores numa região sem equipe ativa, ao submeter, a equipe é criada no mock e exibida no sistema.
- [ ] **CA15 02:** Dado que a região já possui uma equipe ativa, quando se tenta cadastrar uma segunda equipe para a mesma região, o sistema impede a gravação respeitando a RN02.
- [ ] Os cadastros base criados pelo Administrador aparecem imediatamente nos seletores de unidades e profissionais.
