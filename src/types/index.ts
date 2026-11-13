export type PapelUsuario =
  | 'ADMINISTRADOR'
  | 'COORDENADOR_RAPS'
  | 'PROFISSIONAL_UBS'
  | 'PROFISSIONAL_REFERENCIA'
  | 'MATRICIADOR'
  | 'CONVIDADO';

export type TipoUnidade = 'UBS' | 'CAPS';

export type SituacaoCaso =
  | 'NA_FILA'
  | 'SOLICITADO'
  | 'EM_PRE_MATRICIAMENTO'
  | 'REUNIAO_AGENDADA'
  | 'CONCLUIDO'
  | 'CANCELADO';

export type ClassificacaoRisco = 'BAIXO' | 'MEDIO' | 'ALTO';

export type ModalidadeReuniao = 'ONLINE' | 'PRESENCIAL' | 'HIBRIDA';

export type StatusReuniao = 'AGENDADA' | 'EM_ANDAMENTO' | 'REALIZADA' | 'CANCELADA';

export interface Regiao {
  id: string;
  nome: string;
  descricao?: string;
}

export interface UnidadeSaude {
  id: string;
  regiao_id: string;
  nome: string;
  tipo: TipoUnidade;
  cnes?: string;
  endereco?: string;
}

export interface UsuarioSistema {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  perfil: PapelUsuario;
  unidade_id?: string;
  regiao_id?: string;
  cargo?: string;
  registro_profissional?: string;
}

export interface UsuarioSUS {
  id: string;
  nome: string;
  cpf?: string;
  cns?: string;
  data_nascimento: string;
  sexo: 'M' | 'F' | 'OUTRO';
  nome_mae?: string;
  telefone?: string;
  endereco?: string;
  ubs_referencia_id: string;
  prontuario_local: string;
}

export interface EquipeMatriciamento {
  id: string;
  regiao_id: string;
  caps_id: string;
  nome: string;
  ativa: boolean;
  profissional_referencia_id: string;
}

export interface EquipeMembro {
  id: string;
  equipe_id: string;
  usuario_id: string;
  papel: 'PROFISSIONAL_REFERENCIA' | 'MATRICIADOR';
  ativo: boolean;
}

export interface CasoMatriciamento {
  id: string;
  numero_caso: string;
  usuario_sus_id: string;
  ubs_id: string;
  regiao_id: string;
  equipe_matriciamento_id?: string;
  situacao: SituacaoCaso;
  classificacao_risco: ClassificacaoRisco;
  ordem_fila: number;
  motivo_demanda: string;
  resumo_clinico: string;
  data_criacao: string;
  data_solicitacao?: string;
  data_conclusao?: string;
  justificativa_cancelamento?: string;
  profissional_ubs_id: string;
}

export interface LockEdicao {
  em_edicao: boolean;
  usuario_id?: string;
  usuario_nome?: string;
  locked_at?: string;
}

export interface DocumentoMatriciamento {
  id: string;
  caso_id: string;
  conteudo_clinico: string;
  hipoteses_diagnosticas: string;
  plano_cuidado: string;
  deliberacoes: string;
  relator_usuario_id?: string;
  data_ultima_atualizacao: string;
  lock_edicao?: LockEdicao;
}

export interface AnexoCaso {
  id: string;
  caso_id: string;
  nome_arquivo: string;
  tipo_arquivo: string;
  tamanho_bytes: number;
  url_simulada: string;
  data_upload: string;
  usuario_id: string;
}

export interface Convidado {
  id: string;
  caso_id: string;
  nome: string;
  email: string;
  funcao?: string;
  instituicao?: string;
  data_convite: string;
}

export interface ParticipantePresenca {
  usuario_id: string;
  presente: boolean;
  checkin_at?: string;
}

export interface ReuniaoMatriciamento {
  id: string;
  equipe_matriciamento_id: string;
  data_hora_inicio: string;
  data_hora_fim: string;
  modalidade: ModalidadeReuniao;
  link_videoconferencia?: string;
  local_presencial?: string;
  status: StatusReuniao;
  relator_usuario_id?: string;
  casos_ids: string[];
  participantes_presenca: ParticipantePresenca[];
}

export interface LinkTemporario {
  id: string;
  caso_id: string;
  token: string;
  validade_fim: string;
  ativo: boolean;
  convidado_nome: string;
  criado_por_usuario_id: string;
}

export interface Encaminhamento {
  id: string;
  usuario_sus_id: string;
  caso_origem_id?: string;
  servico_destino: string;
  motivo: string;
  data_encaminhamento: string;
  profissional_id: string;
}

export interface AuthSession {
  usuario_atual_id: string | null;
}

export interface DBState {
  regioes: Regiao[];
  unidades_saude: UnidadeSaude[];
  usuarios_sistema: UsuarioSistema[];
  usuarios_sus: UsuarioSUS[];
  equipes_matriciamento: EquipeMatriciamento[];
  equipes_membros: EquipeMembro[];
  casos_matriciamento: CasoMatriciamento[];
  documentos_matriciamento: DocumentoMatriciamento[];
  anexos_caso: AnexoCaso[];
  convidados: Convidado[];
  reunioes_matriciamento: ReuniaoMatriciamento[];
  links_temporarios: LinkTemporario[];
  encaminhamentos: Encaminhamento[];
  auth_session: AuthSession;
}
