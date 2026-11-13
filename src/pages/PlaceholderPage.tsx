import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layers, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  ucCode?: string;
  description?: string;
}

export const PlaceholderPage: React.FC<PlaceholderProps> = ({
  title,
  ucCode,
  description,
}) => {
  const location = useLocation();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {ucCode && (
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                {ucCode}
              </span>
            )}
            <span className="text-xs font-mono text-slate-400">{location.pathname}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        </div>

        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-sus-blue transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Painel</span>
        </Link>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
          <Layers className="w-5 h-5 text-sus-blue" />
          <span>Estrutura da Fatia Vertical Conectada</span>
        </div>
        <p className="text-slate-600 text-sm">
          {description ||
            'Esta rota está mapeada no Shell da Aplicação e conecta-se à camada unificada de mockStore. A interface visual e regras específicas de negócio serão incrementadas na respectiva fatia vertical.'}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs text-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Mock Store (localStorage) e Alternância de Perfis já ativos nesta tela.</span>
        </div>
      </div>
    </div>
  );
};
