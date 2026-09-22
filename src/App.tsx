import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { FlowchartCanvas } from './components/FlowchartCanvas';
import { NodeDetailDrawer } from './components/NodeDetailDrawer';
import { PpcCalculator } from './components/PpcCalculator';
import { MonroKellieModal } from './components/MonroKellieModal';
import { ClinicalQuiz } from './components/ClinicalQuiz';
import { ExportSummaryModal } from './components/ExportSummaryModal';
import { TCE_NODES } from './data/tcePathwayData';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Info,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'flowchart' | 'simulator' | 'monro_kellie' | 'quiz'>('flowchart');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showViciousCycle, setShowViciousCycle] = useState<boolean>(true);
  const [filterMode, setFilterMode] = useState<'all' | 'hemodynamic' | 'molecular' | 'interventions'>('all');
  const [highlightedCriticalNodes, setHighlightedCriticalNodes] = useState<string[]>([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play step by step animation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= TCE_NODES.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          const next = prev + 1;
          // Smooth scroll to next node
          const element = document.getElementById(`node-${TCE_NODES[next].id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return next;
        });
      }, 2500);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (activeTab !== 'flowchart') {
      setActiveTab('flowchart');
    }
    if (!isPlaying && currentStepIndex >= TCE_NODES.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setSelectedNodeId(null);
    setHighlightedCriticalNodes([]);
    setFilterMode('all');
  };

  const handleStepChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < TCE_NODES.length) {
      setCurrentStepIndex(newIndex);
      const targetNode = TCE_NODES[newIndex];
      const element = document.getElementById(`node-${targetNode.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleNavigateFromSimulator = (criticalNodeIds: string[]) => {
    setHighlightedCriticalNodes(criticalNodeIds);
    setActiveTab('flowchart');
    if (criticalNodeIds.length > 0) {
      const firstId = criticalNodeIds[0];
      setTimeout(() => {
        const element = document.getElementById(`node-${firstId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const activeStepNode = TCE_NODES[currentStepIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-rose-500/30 selection:text-rose-200">
      {/* 3-Zone Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onReset={handleReset}
        currentStepIndex={currentStepIndex}
        totalSteps={TCE_NODES.length}
        onOpenSummary={() => setIsSummaryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        {/* Tab 1: Flowchart */}
        {activeTab === 'flowchart' && (
          <div className="w-full flex flex-col items-center pt-4">
            {/* Context Notice / Hero Intro */}
            <div className="w-full max-w-5xl px-4 mb-4">
              <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Fisiopatologia do Neurotrauma</span>
                    </div>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">22 Etapas Fisiológicas</span>
                    <span className="text-slate-600">·</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80 normal-case font-sans font-medium text-[11px]">
                      Autor: <strong className="text-white">Abdoulaye Marega</strong> (Residente em Neurocirurgia-HCN)
                    </span>
                  </div>
                  <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">
                    Cascata da Lesão Cerebral Secundária no TCE
                  </h1>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    Da energia cinética inicial à desregulação vascular, edema e hipertensão intracraniana.
                    Clique em qualquer nó para abrir o painel de condutas BTF e mecanismos moleculares.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setShowViciousCycle(true);
                      const el = document.getElementById('node-agravamento_edema');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3 text-rose-400" />
                    <span>Ver Ciclo Vicioso</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('simulator')}
                    className="px-3 py-1.5 rounded-lg bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 border border-sky-800/60 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Zap className="w-3 h-3 text-sky-400" />
                    <span>Simular PPC</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Canvas */}
            <FlowchartCanvas
              selectedNodeId={selectedNodeId}
              onSelectNode={(id) => setSelectedNodeId(id)}
              activeStepId={isPlaying ? activeStepNode.id : null}
              showViciousCycle={showViciousCycle}
              onToggleViciousCycle={() => setShowViciousCycle(!showViciousCycle)}
              filterMode={filterMode}
              setFilterMode={setFilterMode}
              highlightedCriticalNodes={highlightedCriticalNodes}
            />

            {/* Bottom Floating Step Walkthrough Bar */}
            <div className="fixed bottom-4 z-40 max-w-2xl w-[92%] bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3">
              <button
                onClick={() => handleStepChange(currentStepIndex - 1)}
                disabled={currentStepIndex === 0}
                className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-slate-800 transition-colors"
                title="Etapa anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Middle step display */}
              <div
                className="flex-1 flex flex-col items-center text-center cursor-pointer select-none"
                onClick={() => setSelectedNodeId(activeStepNode.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Passo {currentStepIndex + 1} de {TCE_NODES.length}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-[10px] font-mono text-rose-400">
                    {activeStepNode.phaseName}
                  </span>
                </div>
                <div className="font-bold text-xs md:text-sm text-white truncate max-w-md">
                  {activeStepNode.label}
                </div>
              </div>

              <button
                onClick={handleTogglePlay}
                className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-lg transition-colors"
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={() => handleStepChange(currentStepIndex + 1)}
                disabled={currentStepIndex === TCE_NODES.length - 1}
                className="p-2 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-slate-800 transition-colors"
                title="Próxima etapa"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: PPC Simulator */}
        {activeTab === 'simulator' && (
          <PpcCalculator
            onNavigateToFlowchartWithHighlight={handleNavigateFromSimulator}
          />
        )}

        {/* Tab 3: Monro-Kellie */}
        {activeTab === 'monro_kellie' && <MonroKellieModal />}

        {/* Tab 4: Clinical Cases Quiz */}
        {activeTab === 'quiz' && (
          <ClinicalQuiz
            onSelectNode={(id) => setSelectedNodeId(id)}
            onNavigateToFlowchart={() => setActiveTab('flowchart')}
          />
        )}
      </main>

      {/* Node Detail Drawer / Inspector */}
      <NodeDetailDrawer
        nodeId={selectedNodeId}
        onClose={() => setSelectedNodeId(null)}
        onSelectNode={(id) => setSelectedNodeId(id)}
      />

      {/* Export Summary Modal */}
      <ExportSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />

      {/* Minimal Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500 font-normal">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Cascata Fisiopatológica da Lesão Secundária no Traumatismo Cranioencefálico</span>
          <span className="text-slate-400">
            Autor: <strong className="text-slate-200">Abdoulaye Marega</strong> · Residente em Neurocirurgia-HCN
          </span>
        </div>
      </footer>
    </div>
  );
}
