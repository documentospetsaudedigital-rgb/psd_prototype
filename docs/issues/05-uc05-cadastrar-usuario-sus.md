# 05 - UC05: Cadastrar Usuário do SUS

Type: task
Status: ready-for-agent
Blocked by: 00

## Contexto e Objetivo
Implementar o formulário de cadastro de cidadão/paciente (Usuário do SUS) para a Atenção Primária, com validação de dados obrigatórios, verificação de consistência da data de nascimento, checagem de possíveis duplicidades cadastrais e retorno fluido ao fluxo de atendimento ou consulta.

## Histórias de Usuário
- **Como** Profissional da UBS, **quero** cadastrar um novo Usuário do SUS informando dados pessoais básicos, **para que** ele possa receber atendimento e acompanhamento na rede.
- **Como** Profissional da UBS, **quero** ser alertado caso já exista um paciente com nome e data de nascimento semelhantes, **para que** eu evite duplicidade de prontuários.

## Especificação da Interface (Telas e Componentes)
1. **Modal ou Tela de Cadastro de Usuário SUS (`/ubs/usuarios-sus/novo`):**
   - Campo "Nome Completo" (texto obrigatório).
   - Campo "Data de Nascimento" (date picker ou máscara DD/MM/AAAA obrigatório).
   - Campo "Município de Residência" (texto obrigatório).
   - Campo "Identificador Local / CNS / Prontuário" (código identificador).
   - Botão primário `[Salvar Cadastro]` e botão secundário `[Cancelar]`.
2. **Alertas e Validações na Interface:**
   - Mensagem de erro em vermelho sob os campos obrigatórios ausentes (FA03a).
   - Alerta visual caso a data de nascimento seja futura ou inválida.
   - **Card de Possível Duplicidade (FA03b):**
     - Se o mock identificar registro similar (mesmo nome ou mesmo identificador), exibe um aviso: *"Atenção: Já existe um cadastro correspondente: [Nome - Data de Nasc - ID]"*.
     - Botões no alerta: `[Usar Cadastro Existente]` (retoma o atendimento com o registro encontrado) ou `[Confirmar que é Outra Pessoa]` (prossegue com a criação).

## Especificação da Camada de Mock (`localStorage`)
1. **Entidade Envolvida:** `usuarios_sus`.
2. **Métodos do Serviço (`usuarioSusService.ts`):**
   - `cadastrarUsuarioSUS(dados: Omit<UsuarioSUS, 'id' | 'ativo'>): { success: boolean; usuario?: UsuarioSUS; error?: string; duplicado?: UsuarioSUS }`
   - `listarUsuariosSUS(): UsuarioSUS[]`
   - `verificarDuplicidade(nome: string, dataNasc: string): UsuarioSUS | null`
3. **Validações:**
   - Atribuir `id` único (UUID ou numérico autoincrementado) e `ativo: true`.
   - Persistir no array `usuarios_sus` do `localStorage`.

## Regras de Negócio e Requisitos Relacionados
- **RF07:** Permitir ao Profissional da UBS cadastrar, consultar e alterar Usuários do SUS.
- **RN05:** Usuário do SUS não possui conta de acesso ao sistema (apenas registro de dados clínicos).
- **RN EX05 01:** Os campos Nome Completo, Data de Nascimento e Município são obrigatórios; data de nascimento deve ser válida e não futura.
- **RN EX05 02:** Verificação de possíveis cadastros duplicados antes da confirmação.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA05 01:** Com dados válidos e sem duplicidade, ao confirmar o cadastro o profissional recebe a identificação da pessoa e o sistema retoma o fluxo de atendimento (UC04).
- [ ] **CA05 02:** Com campo obrigatório ausente ou data de nascimento futura/inválida, o sistema indica a correção nos campos e não confirma o cadastro.
- [ ] **CA05 03:** Ao selecionar uma pessoa já cadastrada no aviso de duplicidade, o sistema reaproveita o registro existente sem criar um segundo registro.
- [ ] **CA05 04:** Ao cancelar antes da gravação, nenhum registro é criado e o sistema retorna à tela anterior.
