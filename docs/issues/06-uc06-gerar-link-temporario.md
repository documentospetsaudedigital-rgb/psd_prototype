# 06 - UC06: Gerar Link Temporário para Acesso Externo

Type: task
Status: ready-for-agent
Blocked by: 00

## Contexto e Objetivo
Permitir que profissionais autorizados gerem links temporários com tokens seguros de acesso para convidados externos ou participantes sem conta permanente no sistema, viabilizando o ingresso simplificado na reunião de matriciamento (UC14) ou visualização restrita de documento compartilhado.

## Histórias de Usuário
- **Como** Profissional da UBS ou Matriciador, **quero** gerar um link de acesso temporário com prazo de expiração para um convidado, **para que** ele possa acessar a reunião sem precisar de uma conta cadastrada no sistema.
- **Como** usuário convidado, **quero** acessar o link temporário e visualizar as informações autorizadas da reunião sem barreiras de autenticação complexas.

## Especificação da Interface (Telas e Componentes)
1. **Componente / Modal de Geração de Link Temporário:**
   - Pode ser acionado no detalhe do Caso, na pauta da Reunião ou na tela administrativa de links (`/links-temporarios`).
   - Seletor do Recurso Vinculado: Reunião de Matriciamento ou Caso Específico.
   - Campo "Nome do Convidado / Destinatário" e "Instituição / Contato".
   - Seletor de Validade: "2 horas", "24 horas", "48 horas", "Até o fim da reunião".
   - Botão `[Gerar Link de Acesso]`.
2. **Exibição do Link Gerado:**
   - Campo com URL formatada (ex: `https://telematriciamento.app/convidado?token=tok_8f93a1...`).
   - Botão `[Copiar Link]` com feedback de cópia ("Copiado para a área de transferência!").
   - Indicador de tempo restante de validade com badge visual (*Ativo*, *Expirado*).
   - Botão `[Revogar Link Imediatamente]`.
3. **Tela de Visualização do Convidado (`/convidado?token=...`):**
   - Interface simplificada identificando o convidado.
   - Exibe informações básicas da reunião: data, horário, pauta do caso e link da videochamada.

## Especificação da Camada de Mock (`localStorage`)
1. **Entidade Envolvida:** `links_temporarios` (id, recurso_tipo, recurso_id, token, criado_por, expira_em, ativo).
2. **Métodos do Serviço (`linkTemporarioService.ts`):**
   - `gerarLinkTemporario(recursoTipo: string, recursoId: string, validadeHoras: number, destinatario: string): LinkTemporario`
   - `validarToken(token: string): { valido: boolean; link?: LinkTemporario; motivo?: string }`
   - `revogarLink(linkId: string): void`

## Regras de Negócio e Requisitos Relacionados
- **RN05:** Usuário do SUS e Convidado não possuirão conta fixa de acesso no sistema.
- **RN06.01:** Somente usuários autenticados da equipe possuem permissão para gerar links temporários.
- **RN06.02:** O link gerado deve respeitar o prazo de validade configurado; após a expiração, o acesso deve ser bloqueado.

## Critérios de Aceitação (Documento de Casos de Uso)
- [ ] **CA06.01:** Quando um usuário autorizado solicitar a geração de um link para um caso ou reunião, o sistema gera o token e apresenta o link completo com botão de copiar.
- [ ] **CA06.02:** Quando um usuário sem permissão tentar acessar a ação, a interface bloqueia e exibe aviso informativo.
- [ ] Se o token for acessado após o prazo de expiração ou após revogação, o sistema exibe tela amigável informando que o link expirou.
