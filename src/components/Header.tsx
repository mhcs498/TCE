import React from 'react';
import { Activity, Play, Pause, RotateCcw, Stethoscope, BrainCircuit, HelpCircle, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'flowchart' | 'simulator' | 'monro_kellie' | 'quiz';
  setActiveTab: (tab: 'flowchart' | 'simulator' | 'monro_kellie' | 'quiz') => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  currentStepIndex: number;
  totalSteps: number;
  onOpenSummary: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isPlaying,
  onTogglePlay,
  onReset,
  currentStepIndex,
  totalSteps,
  onOpenSummary,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand title and Author attribution */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base md:text-lg tracking-tight text-white flex items-center gap-2">
              Cascata da Lesão Secundária no TCE
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="text-rose-400 font-medium">Abdoulaye Marega</span>
              <span>·</span>
              <span className="text-slate-300">Residente em Neurocirurgia-HCN</span>
            </div>
          </div>
        </div>

        {/* Zone 2: Clean navigation tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('flowchart')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'flowchart'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Fluxo da Cascata
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            Simulador PPC (PAM - PIC)
          </button>
          <button
            onClick={() => setActiveTab('monro_kellie')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'monro_kellie'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            Doutrina Monro-Kellie
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Casos Clínicos
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {activeTab === 'flowchart' && (
            <>
              <button
                onClick={onTogglePlay}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isPlaying
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm shadow-rose-900/30'
                }`}
                title={isPlaying ? 'Pausar animação da cascata' : 'Iniciar apresentação da cascata passo a passo'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span className="hidden sm:inline">{isPlaying ? 'Pausar Cascata' : 'Animar Cascata'}</span>
                {isPlaying && (
                  <span className="text-[10px] font-mono opacity-80">
                    ({currentStepIndex + 1}/{totalSteps})
                  </span>
                )}
              </button>

              <button
                onClick={onReset}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg border border-slate-800 transition-colors"
                title="Reiniciar visualização e desmarcar seleção"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          <button
            onClick={onOpenSummary}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/70 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="Abrir síntese didática completa para impressão ou cópia"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guia de Estudo</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden mt-2.5 pt-2 border-t border-slate-800/60 gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('flowchart')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'flowchart' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
          }`}
        >
          Fluxo
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'simulator' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400'
          }`}
        >
          Simulador PPC
        </button>
        <button
          onClick={() => setActiveTab('monro_kellie')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'monro_kellie' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
          }`}
        >
          Monro-Kellie
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'quiz' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
          }`}
        >
          Casos
        </button>
      </div>
    </header>
  );
};
