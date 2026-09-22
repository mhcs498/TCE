import React, { useState } from 'react';
import { PathwayNode } from '../types/pathway';
import { TCE_NODES } from '../data/tcePathwayData';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Stethoscope,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Target,
  FileCheck2,
  Share2,
  Check
} from 'lucide-react';

interface NodeDetailDrawerProps {
  nodeId: string | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

export const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({
  nodeId,
  onClose,
  onSelectNode,
}) => {
  const [activeTab, setActiveTab] = useState<'fisiopatologia' | 'condutas' | 'monitorizacao'>('fisiopatologia');
  const [copied, setCopied] = useState(false);

  if (!nodeId) return null;

  const nodeIndex = TCE_NODES.findIndex((n) => n.id === nodeId);
  const node = TCE_NODES[nodeIndex];
  if (!node) return null;

  const prevNode = nodeIndex > 0 ? TCE_NODES[nodeIndex - 1] : null;
  const nextNode = nodeIndex < TCE_NODES.length - 1 ? TCE_NODES[nodeIndex + 1] : null;

  const handleCopySummary = () => {
    const text = `[Fisiopatologia TCE - ${node.label}]\nFase: ${node.phaseName}\nMecanismo: ${node.physiologicalMechanism}\nPérola Clínica: ${node.clinicalPearl}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCriticalityBadge = (crit: PathwayNode['criticality']) => {
    switch (crit) {
      case 'fatal':
        return <span className="text-xs font-mono text-red-400 bg-red-950/70 border border-red-800/60 px-2 py-0.5 rounded">Risco Fatal Iminente</span>;
      case 'critica':
        return <span className="text-xs font-mono text-orange-400 bg-orange-950/70 border border-orange-800/60 px-2 py-0.5 rounded">Zona Crítica Isquêmica</span>;
      case 'alta':
        return <span className="text-xs font-mono text-amber-400 bg-amber-950/70 border border-amber-800/60 px-2 py-0.5 rounded">Alto Risco Secundário</span>;
      default:
        return <span className="text-xs font-mono text-slate-300 bg-slate-800/70 border border-slate-700/60 px-2 py-0.5 rounded">Fase Inicial</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-250">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-800/90 bg-slate-950/80">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                Etapa {node.order} de {TCE_NODES.length}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">{node.phaseName}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
                title="Copiar resumo médico"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                title="Fechar painel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>{node.label}</span>
          </h2>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {getCriticalityBadge(node.criticality)}
            {node.reversible ? (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Potencialmente Reversível com Terapia Precoce
              </span>
            ) : (
              <span className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                Dano Tecidual Irreversível
              </span>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-800/90 bg-slate-950/40 text-xs font-medium">
          <button
            onClick={() => setActiveTab('fisiopatologia')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'fisiopatologia'
                ? 'border-rose-500 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            <span>Fisiopatologia & Mecanismo</span>
          </button>
          <button
            onClick={() => setActiveTab('condutas')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'condutas'
                ? 'border-emerald-500 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
            <span>Alvos de Intervenção BTF ({node.clinicalInterventions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('monitorizacao')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'monitorizacao'
                ? 'border-sky-500 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-sky-400" />
            <span>Neuromonitorização & Sinais</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Tab 1: Fisiopatologia */}
          {activeTab === 'fisiopatologia' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2">
                  Visão Geral do Processo
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {node.physiologicalMechanism}
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2.5">
                  Fenômenos Celulares e Vasculares Específicos
                </h3>
                <div className="space-y-2">
                  {node.cellularDetails.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/80 flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xs font-mono shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs md:text-sm text-slate-300 leading-relaxed">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pérola Clínica Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 to-amber-900/10 border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Pérola Clínica / Conceito Fundamental</span>
                </div>
                <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed">
                  {node.clinicalPearl}
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Condutas e Intervenções */}
          {activeTab === 'condutas' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span>Diretrizes Brain Trauma Foundation (BTF) & Neurointensivismo</span>
                <span className="font-mono">{node.clinicalInterventions.length} condutas listadas</span>
              </div>

              {node.clinicalInterventions.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-slate-950/50 border border-slate-800">
                  <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-300 font-medium">
                    Esta fase não possui intervenção terapêutica direta isolada.
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    O manejo deve concentrar-se nas etapas anteriores para evitar o alcance deste
                    estágio ou na paliação/diagnóstico de morte encefálica.
                  </p>
                </div>
              ) : (
                node.clinicalInterventions.map((intervention, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white tracking-tight">
                        {intervention.title}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 shrink-0">
                        {intervention.category}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {intervention.description}
                    </p>

                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-2">
                      <Target className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-emerald-200">
                        <span className="font-semibold text-emerald-300">Meta Alvo: </span>
                        {intervention.targetGoal}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Monitorização */}
          {activeTab === 'monitorizacao' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-slate-400 pb-2 border-b border-slate-800">
                Parâmetros Clínicos, Imagem e Neuromonitorização Multimodal
              </div>

              <div className="space-y-2.5">
                {node.monitoring.map((mon, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3"
                  >
                    <FileCheck2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      {mon}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar with Next / Prev */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          {prevNode ? (
            <button
              onClick={() => onSelectNode(prevNode.id)}
              className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="truncate max-w-[120px]">{prevNode.label}</span>
            </button>
          ) : (
            <div />
          )}

          <span className="text-xs font-mono text-slate-500">
            {nodeIndex + 1} / {TCE_NODES.length}
          </span>

          {nextNode ? (
            <button
              onClick={() => onSelectNode(nextNode.id)}
              className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span className="truncate max-w-[120px]">{nextNode.label}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
