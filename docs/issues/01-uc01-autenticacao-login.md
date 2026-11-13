# 01 - UC01: Realizar Login e Controle de Acesso por Perfil

Type: task
Status: ready-for-agent
Blocked by: 00

## Contexto e Objetivo
Implementar a tela formal de login e o fluxo de autenticação para profissionais de saúde do sistema, validando credenciais no mock local e garantindo que cada usuário seja direcionado à área correspondente ao seu perfil fixo (Administrador, Coordenador RAPS, Profissional UBS, Profissional de Referência, Matriciador).

## Histórias de Usuário
- **Como** profissional da rede de saúde, **quero** me autenticar informando usuário e senha, **para que** eu tenha acesso às funções permitidas pelo meu perfil fixo.
- **Como** avaliador do protótipo, **quero** botões de preenchimento rápido de credenciais na própria tela de login, **para que** eu consiga testar o acesso de cada perfil sem precisar digitar credenciais manualmente.

## Especificação da Interface (Telas e Componentes)
1. **Página de Login (`/login`):**
   - Card central moderno e limpo com identificação do PET-Saúde Digital.
   - Campo "Usuário / E-mail" (`email`) com validação de formato.
   - Campo "Senha" (`senha`) com alternância de visibilidade (ícone de olho).
   - Botão primário "Entrar na Plataforma".
   - **Card de Credenciais de Demonstração (Atalhos rápidos):**
     - Botões rápidos com 1 clique:
       - `[Entrar como Administrador]`
       - `[Entrar como Coordenador RAPS]`
       - `[Entrar como Profissional UBS]`
       - `[Entrar como Profissional Referência]`
       - `[Entrar como Matriciador]`
       - `[Simular Usuário Inativo]`
   - Mensagens de feedback visual:
     - Alerta de erro para campos não preenchidos (FA05a).
     - Alerta de erro para credenciais inválidas (EX06a).
     - Alerta informativo para contas desativadas (EX06b).
2. **Redirecionamento Pós-Login:**
   - Administrador -> `/admin/regioes-unidades`
   - Coordenador da RAPS -> `/coordenador/referencias`
   - Profissional da UBS -> `/ubs/fila`
   - Profissional de Referência -> `/equipe/casos`
   - Matriciador -> `/equipe/casos`

## Especificação da Camada de Mock (`localStorage`)
1. **Entidade no Mock:** `usuarios_sistema`.
2. **Métodos do Serviço (`authService.ts`):**
   - `login(email, senha): { success: boolean; usuario?: UsuarioSistema; error?: string }`
   - `logout(): void`
   - `getCurrentUser(): UsuarioSistema | null`
   - `setCurrentUser(usuarioId: string): void`
3. **Validações:**
   - Conferir se `ativo === true`. Se `false`, retornar erro de conta inativa.
   - Atualizar `auth_session.usuario_atual_id` no mock.

## Regras de Negócio e Requisitos Relacionados
- **RF01:** Permitir autenticação por usuário e senha.
- **RF02:** Restringir funcionalidades de acordo com o perfil fixo do usuário.
- **RN04:** Cada conta profissional possuirá um único perfil fixo.
- **RN05:** Usuário do SUS e Convidado não possuirão conta no MVP.
- **RNF03:** Validar autorização no serviço de mock para que rotas protegidas rejeitem acessos indevidos.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA01 01:** Dada conta ativa e credenciais válidas, quando o profissional solicitar login, então o sistema estabelecerá sessão autenticada e redirecionará para a tela inicial do perfil.
- [ ] **CA01 02:** Dadas credenciais inválidas, quando solicitar login, então o sistema recusará o acesso com mensagem de erro clara sem criar sessão.
- [ ] **CA01 03:** Dado campo obrigatório ausente, o sistema indicará a pendência nos campos e impedirá a autenticação.
- [ ] **CA01 04:** Dada conta inativa, quando solicitar login, então o sistema informará que a conta está inativa e recusará o acesso.
- [ ] **CA01 05:** Dado usuário autenticado, quando tentar acessar manualmente rota de outro perfil (ex: UBS tentando acessar Admin), o sistema exibirá aviso de acesso não autorizado e bloqueará a operação.
