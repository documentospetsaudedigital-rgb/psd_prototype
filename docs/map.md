# Map: Protótipo da Plataforma de Telematriciamento (PET-Saúde Digital)

Mapa de navegação e esforço para desenvolvimento do protótipo de validação com stakeholders.

## Notes

- **Objetivo:** Construir um protótipo navegável completo (telas + mock local no `localStorage`) para validar fluxos com stakeholders antes da implementação do backend definitivo.
- **Stack:** Vite + React + TypeScript + Tailwind CSS + Lucide Icons + React Router.
- **Rastreabilidade:** Cada fatia vertical cobre da interface ao mock, espelhando os Casos de Uso (UC01 a UC16) e o Cenário de Aceite da Seção 11 do Documento de Requisitos.

## Decisions So Far

1. **Escopo:** Abrangência completa de todos os 16 casos de uso do documento oficial, integrando também o fluxo de ponta a ponta do MVP.
2. **Granularidade:** 1 fatia vertical por Caso de Uso (+ 1 fatia inicial para fundação do Shell/Mock).
3. **Persistência do Mock:** `localStorage` com carga inicial de dados sintéticos ricos (*Seed Data*) e funcionalidade de restauração instantânea para demonstrações.
4. **Perfis / Impersonate:** Suporte a login formal (UC01) e barra de alternância rápida de perfis (*Quick Switcher*) no topo para validações dinâmicas com usuários.
5. **Reunião de Matriciamento:** Painel unificado com visão de pauta, link para videochamada externa, check-in de presenças e edição do Documento/Ata com papel de Relator.
6. **Gravação Não Simultânea (RN15):** Trava explícita de edição no Documento de Matriciamento com indicador de posse e liberação voluntária ou forçada.

## Tickets & Frontier

| Ticket | Título | Issue | Tipo | Status | Bloqueado por |
|---|---|---|---|---|---|
| `00-setup-shell-mock-store` | Setup Shell, Mock Store e Barra de Perfis | #2 | task | ready-for-agent | - |
| `01-uc01-autenticacao-login` | UC01 - Realizar login e controle de acesso | #3 | task | blocked | #2 |
| `02-uc02-atribuir-profissional-referencia` | UC02 - Atribuir profissional de referência | #4 | task | blocked | #2, #17 |
| `03-uc03-gerar-relatorio-matriciamentos` | UC03 - Gerar relatório de matriciamentos | #5 | task | blocked | #2 |
| `04-uc04-realizar-atendimento-inicial` | UC04 - Realizar atendimento inicial na UBS | #6 | task | blocked | #2, #7, #9 |
| `05-uc05-cadastrar-usuario-sus` | UC05 - Cadastrar usuário do SUS | #7 | task | blocked | #2 |
| `06-uc06-gerar-link-temporario` | UC06 - Gerar link temporário | #8 | task | blocked | #2 |
| `07-uc07-realizar-triagem-casos` | UC07 - Realizar triagem de casos | #9 | task | blocked | #2, #7 |
| `08-uc08-solicitar-matriciamento-fila-ubs` | UC08 - Fila da UBS e solicitar matriciamento | #10 | task | blocked | #2, #9 |
| `09-uc09-realizar-pre-matriciamento` | UC09 - Realizar pré-matriciamento | #11 | task | blocked | #2, #10 |
| `10-uc10-realizar-encaminhamento` | UC10 - Realizar encaminhamento | #12 | task | blocked | #2, #9 |
| `11-uc11-editar-documento-matriciamento` | UC11 - Editar documento de matriciamento | #13 | task | blocked | #2, #11 |
| `12-uc12-editar-pre-matriciamento` | UC12 - Editar pré-matriciamento | #14 | task | blocked | #2, #11 |
| `13-uc13-comunicar-mudanca-agenda` | UC13 - Comunicar mudança de agenda | #15 | task | blocked | #2, #18 |
| `14-uc14-participar-reuniao-matriciamento` | UC14 - Participar de reunião de matriciamento | #16 | task | blocked | #2, #13, #18 |
| `15-uc15-criar-equipe-matriciamento` | UC15 - Cadastros base e criar equipe de matriciamento | #17 | task | blocked | #2 |
| `16-uc16-gerenciar-agenda-concluir-caso` | UC16 - Gerenciar agenda e concluir caso | #18 | task | blocked | #2, #11 |

## Frontier Ativa

- **Próxima fatia a executar:** #2 (`00-setup-shell-mock-store`)
