import React, { useState, useEffect } from 'react';
import {
  getDB,
  resetToSeedData,
  clearDB,
  exportDBAsJSON,
  importDBFromJSON,
  subscribeToStore,
} from '../../services/mockStore';
import { DBState } from '../../types';
import { X, RefreshCw, Download, Upload, Trash2, Database, CheckCircle2, AlertTriangle } from 'lucide-react';

interface MockSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MockSettingsModal: React.FC<MockSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [db, setDb] = useState<DBState>(() => getDB());
  const [importText, setImportText] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setFeedback(null);
      setImportText('');
      return;
    }
    const update = () => setDb(getDB());
    update();
    const unsubscribe = subscribeToStore(update);
    return unsubscribe;
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReset = () => {
    resetToSeedData();
    setFeedback({ type: 'success', message: 'Dados restaurados com sucesso para o padrão de demonstração!' });
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza de que deseja limpar todos os dados do mock no navegador?')) {
      clearDB();
      setFeedback({ type: 'success', message: 'Todos os registros do localStorage foram limpos.' });
    }
  };

  const handleExport = () => {
    const json = exportDBAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `psd_telematriciamento_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback({ type: 'success', message: 'Arquivo JSON de backup exportado com sucesso!' });
  };

  const handleImport = () => {
    if (!importText.trim()) {
      setFeedback({ type: 'error', message: 'Cole o conteúdo JSON antes de importar.' });
      return;
    }
    const success = importDBFromJSON(importText);
    if (success) {
      setFeedback({ type: 'success', message: 'Banco importado com sucesso!' });
      setImportText('');
    } else {
      setFeedback({ type: 'error', message: 'Formato de JSON inválido ou incompatível.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-base">Gerenciamento do Mock Local (Demonstração)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`px-6 py-3 text-sm flex items-center gap-2 border-b ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Estatísticas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Registros Atuais em Memória (localStorage)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                <span className="text-2xl font-bold text-slate-900 block">{db.regioes.length}</span>
                <span className="text-xs text-slate-500">Regiões</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                <span className="text-2xl font-bold text-blue-600 block">{db.unidades_saude.length}</span>
                <span className="text-xs text-slate-500">Unidades</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                <span className="text-2xl font-bold text-indigo-600 block">{db.usuarios_sistema.length}</span>
                <span className="text-xs text-slate-500">Usuários Sistema</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                <span className="text-2xl font-bold text-emerald-600 block">{db.casos_matriciamento.length}</span>
                <span className="text-xs text-slate-500">
                  {db.casos_matriciamento.length} Casos
                </span>
              </div>
            </div>
          </div>

          {/* Ações de Restauração */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ações Rápidas de Demonstração
            </h4>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Restaurar Dados Padrão (Seed)</span>
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Exportar Estado (JSON)</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Limpar Banco</span>
              </button>
            </div>
          </div>

          {/* Importação manual */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Importar Backup de Estado (JSON)
            </label>
            <textarea
              rows={3}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Cole aqui o conteúdo JSON exportado anteriormente..."
              className="w-full text-xs font-mono p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleImport}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Importar Dados</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
