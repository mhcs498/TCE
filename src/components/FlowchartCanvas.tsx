import React, { useState } from 'react';
import { PathwayNode } from '../types/pathway';
import { TCE_NODES } from '../data/tcePathwayData';
import {
  AlertTriangle,
  Flame,
  Zap,
  Activity,
  ChevronDown,
  ArrowRight,
  Info,
  ShieldCheck,
  RefreshCw,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

interface FlowchartCanvasProps {
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  activeStepId: string | null;
  showViciousCycle: boolean;
  onToggleViciousCycle: () => void;
  filterMode: 'all' | 'hemodynamic' | 'molecular' | 'interventions';
  setFilterMode: (mode: 'all' | 'hemodynamic' | 'molecular' | 'interventions') => void;
  highlightedCriticalNodes?: string[];
}

export const FlowchartCanvas: React.FC<FlowchartCanvasProps> = ({
  selectedNodeId,
  onSelectNode,
  activeStepId,
  showViciousCycle,
  onToggleViciousCycle,
  filterMode,
  setFilterMode,
  highlightedCriticalNodes = [],
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Helper to get node by ID
  const getNode = (id: string): PathwayNode => {
    const node = TCE_NODES.find((n) => n.id === id);
    if (!node) throw new Error(`Node not found: ${id}`);
    return node;
  };

  const isHighlighted = (nodeId: string) => {
    if (activeStepId === nodeId) return true;
    if (selectedNodeId === nodeId) return true;
    if (hoveredNodeId === nodeId) return true;
    if (highlightedCriticalNodes.includes(nodeId)) return true;
    return false;
  };

  const isDimmed = (node: PathwayNode) => {
    if (filterMode === 'hemodynamic') {
      return (
        node.phase !== 'hemodynamic' &&
        node.phase !== 'vascular_edema' &&
        node.id !== 'herniacao' &&
        node.id !== 'aumento_severo_pic'
      );
    }
    if (filterMode === 'molecular') {
      return node.phase !== 'cellular_metabolic' && node.phase !== 'death_pathway';
    }
    if (filterMode === 'interventions') {
      return node.clinicalInterventions.length === 0;
    }
    return false;
  };

  const getNodeColorClass = (node: PathwayNode) => {
    const active = isHighlighted(node.id);
    const dimmed = isDimmed(node);

    if (dimmed) {
      return 'opacity-30 border-slate-800 bg-slate-900/40 text-slate-500';
    }

    switch (node.phase) {
      case 'primary':
        return active
          ? 'border-amber-400 bg-amber-950/70 text-white shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
          : 'border-amber-700/60 bg-slate-900/90 text-amber-100 hover:border-amber-400/70';
      case 'vascular_edema':
        return active
          ? 'border-sky-400 bg-sky-950/70 text-white shadow-lg shadow-sky-500/20 ring-2 ring-sky-400/40'
          : 'border-sky-800/60 bg-slate-900/90 text-sky-100 hover:border-sky-400/70';
      case 'hemodynamic':
        return active
          ? 'border-rose-400 bg-rose-950/70 text-white shadow-lg shadow-rose-500/25 ring-2 ring-rose-400/40'
          : 'border-rose-800/60 bg-slate-900/90 text-rose-100 hover:border-rose-400/70';
      case 'cellular_metabolic':
        return active
          ? 'border-violet-400 bg-violet-950/70 text-white shadow-lg shadow-violet-500/25 ring-2 ring-violet-400/40'
          : 'border-violet-800/60 bg-slate-900/90 text-violet-100 hover:border-violet-400/70';
      case 'death_pathway':
        return active
          ? 'border-red-500 bg-red-950/80 text-white shadow-lg shadow-red-600/30 ring-2 ring-red-500/40'
          : 'border-red-800/60 bg-slate-900/90 text-red-100 hover:border-red-500/70';
      case 'terminal':
        return active
          ? 'border-crimson-500 bg-rose-950/90 text-white shadow-xl shadow-rose-600/40 ring-2 ring-rose-500'
          : 'border-rose-900/80 bg-slate-900/95 text-rose-200 hover:border-rose-500/80';
      default:
        return 'border-slate-800 bg-slate-900 text-slate-200';
    }
  };

  const getNodeIcon = (nodeId: string) => {
    switch (nodeId) {
      case 'tce':
      case 'lesao_primaria':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'alteracao_vascular':
      case 'queda_perfusao_vasc':
        return <Activity className="w-3.5 h-3.5 text-sky-400" />;
      case 'edema':
      case 'aumento_volume':
      case 'agravamento_edema':
        return <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />;
      case 'aumento_pic':
      case 'aumento_severo_pic':
        return <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />;
      case 'queda_perfusao':
      case 'isquemia':
      case 'queda_oxigenacao':
        return <Activity className="w-3.5 h-3.5 text-orange-400" />;
      case 'disfuncao_celular':
      case 'lesao_mitocondrial':
      case 'excitotoxicidade':
      case 'aumento_calcio':
      case 'aumento_radicais':
        return <Flame className="w-3.5 h-3.5 text-violet-400" />;
      case 'morte_celular':
      case 'necrose':
      case 'apoptose':
      case 'herniacao':
      case 'morte':
        return <AlertTriangle className="w-3.5 h-3.5 text-red-500" />;
      default:
        return <Info className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  // Node Component
  const RenderNodeBox = ({
    nodeId,
    widthClass = 'w-72 md:w-80',
    tag,
  }: {
    nodeId: string;
    widthClass?: string;
    tag?: string;
  }) => {
    const node = getNode(nodeId);
    const active = isHighlighted(nodeId);
    const hasInterventions = node.clinicalInterventions.length > 0;

    return (
      <div
        id={`node-${nodeId}`}
        onClick={() => onSelectNode(nodeId)}
        onMouseEnter={() => setHoveredNodeId(nodeId)}
        onMouseLeave={() => setHoveredNodeId(null)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectNode(nodeId);
          }
        }}
        className={`relative cursor-pointer transition-all duration-200 rounded-xl p-3.5 border ${getNodeColorClass(
          node
        )} ${widthClass} text-left select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400`}
      >
        {/* Top bar within node */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            {getNodeIcon(nodeId)}
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              {tag || node.phaseName}
            </span>
          </div>

          {node.badgeText && (
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                node.criticality === 'fatal' || node.criticality === 'critica'
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700/60'
              }`}
            >
              {node.badgeText}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="font-bold text-sm md:text-base tracking-tight leading-tight flex items-center justify-between">
          <span>{node.label}</span>
          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 shrink-0" />
        </div>

        {/* Short explanation */}
        <p className="text-xs text-slate-300/80 mt-1 line-clamp-2 leading-relaxed">
          {node.shortDescription}
        </p>

        {/* Bottom indicators */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            {hasInterventions ? (
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>{node.clinicalInterventions.length} Alvo BTF</span>
              </span>
            ) : (
              <span className="text-slate-500">Sem intervenção direta</span>
            )}
          </div>

          <span className="text-slate-500 group-hover:text-slate-300 transition-colors flex items-center gap-0.5">
            <Eye className="w-3 h-3" />
            <span>Detalhes</span>
          </span>
        </div>

        {/* Active Pulse Ring */}
        {active && (
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 opacity-30 blur-sm -z-10 animate-pulse" />
        )}
      </div>
    );
  };

  // Straight connector arrow
  const ArrowDown = ({ label }: { label?: string }) => (
    <div className="flex flex-col items-center justify-center py-1">
      <div className="w-0.5 h-6 bg-gradient-to-b from-slate-700 to-slate-500" />
      <ChevronDown className="w-4 h-4 text-slate-400 -mt-1" />
      {label && <span className="text-[10px] font-mono text-slate-400 mt-0.5">{label}</span>}
    </div>
  );

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Canvas Toolbars / Controls */}
      <div className="sticky top-14 z-30 w-full max-w-5xl px-4 py-2 mb-4 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Left: Filter tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800/80 text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos os Níveis
          </button>
          <button
            onClick={() => setFilterMode('hemodynamic')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              filterMode === 'hemodynamic'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hemodinâmica / PIC
          </button>
          <button
            onClick={() => setFilterMode('molecular')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              filterMode === 'molecular'
                ? 'bg-violet-950/80 text-violet-300 border border-violet-800/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bioquímica Celular
          </button>
          <button
            onClick={() => setFilterMode('interventions')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              filterMode === 'interventions'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pontos de Ação Médica
          </button>
        </div>

        {/* Right: Vicious Cycle switch & Zoom */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleViciousCycle}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
              showViciousCycle
                ? 'bg-rose-950/80 text-rose-300 border-rose-700 shadow-sm shadow-rose-950'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Destaca o feedback positivo em espiral de dano celular que perpetua a Hipertensão Intracraniana"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${showViciousCycle ? 'animate-spin text-rose-400' : ''}`}
            />
            <span>Ciclo Vicioso</span>
          </button>

          <div className="hidden sm:flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.1))}
              className="p-1 text-slate-400 hover:text-slate-200 rounded"
              title="Reduzir zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1.5 text-slate-400 tabular-nums">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.25, z + 0.1))}
              className="p-1 text-slate-400 hover:text-slate-200 rounded"
              title="Aumentar zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-slate-400 hover:text-slate-200 rounded"
              title="Ajustar 100%"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Flowchart Workspace */}
      <div
        className="w-full flex justify-center pb-24 overflow-x-auto transition-transform duration-150"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
      >
        <div className="relative flex flex-col items-center max-w-4xl w-full px-4">
          {/* ========================================================= */}
          {/* CICLO VICIOSO SVG OVERLAY PATH */}
          {/* ========================================================= */}
          {showViciousCycle && (
            <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
              <svg className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="viciousGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fb7185" stopOpacity="1" />
                  </linearGradient>
                  <marker
                    id="viciousArrow"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Left side arc looping from Agravamento do Edema (level 15) up to ↑ Pressão Intracraniana (level 4) */}
                <path
                  d="M 230 1820 C 20 1820, 20 530, 240 530"
                  fill="none"
                  stroke="url(#viciousGradient)"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                  markerEnd="url(#viciousArrow)"
                />
              </svg>

              {/* Floating label on loop arc */}
              <div
                className="absolute left-6 top-[1100px] -translate-y-1/2 bg-rose-950/95 border border-rose-500/80 px-3 py-2 rounded-lg shadow-xl shadow-rose-950 max-w-56 text-left pointer-events-auto cursor-pointer"
                onClick={() => onSelectNode('agravamento_edema')}
              >
                <div className="flex items-center gap-1.5 text-rose-300 font-bold text-xs uppercase tracking-wide">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-400" />
                  <span>Ciclo Vicioso Mortal</span>
                </div>
                <p className="text-[11px] text-rose-100/90 mt-1 leading-snug">
                  A morte celular agrava o edema e rompe mais BHE, elevando novamente a PIC e
                  gerando nova isquemia.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* LEVEL 0: TCE */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center">
            <RenderNodeBox nodeId="tce" tag="Início / Trauma" />
            <ArrowDown />
          </div>

          {/* ========================================================= */}
          {/* LEVEL 1: LESÃO CEREBRAL PRIMÁRIA */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center">
            <RenderNodeBox nodeId="lesao_primaria" />
          </div>

          {/* ========================================================= */}
          {/* BIFURCAÇÃO 1: SVG Fork to Alteração Vascular & Edema */}
          {/* ========================================================= */}
          <div className="w-full max-w-xl flex flex-col items-center my-1">
            <svg className="w-full h-10 overflow-visible" viewBox="0 0 400 40">
              <path
                d="M 200 0 L 200 16 L 80 16 L 80 36"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <path
                d="M 200 0 L 200 16 L 320 16 L 320 36"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <polygon points="76,34 84,34 80,40" fill="#94a3b8" />
              <polygon points="316,34 324,34 320,40" fill="#94a3b8" />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* LEVEL 2 & 3: TWO PARALLEL TRACKS */}
          {/* Left: ALTERAÇÃO VASCULAR -> ↓ Perfusão cerebral */}
          {/* Right: EDEMA -> ↑ Volume cerebral */}
          {/* ========================================================= */}
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
            {/* Left Track: Vascular */}
            <div className="flex flex-col items-center">
              <div className="text-[11px] font-mono uppercase text-sky-400 mb-1 tracking-wider text-center">
                Eixo 1: Vascular & Hemodinâmico
              </div>
              <RenderNodeBox nodeId="alteracao_vascular" widthClass="w-full" />
              <ArrowDown />
              <RenderNodeBox nodeId="queda_perfusao_vasc" widthClass="w-full" />
            </div>

            {/* Right Track: Edema / Monro-Kellie */}
            <div className="flex flex-col items-center">
              <div className="text-[11px] font-mono uppercase text-cyan-400 mb-1 tracking-wider text-center">
                Eixo 2: Edema & Efeito de Massa
              </div>
              <RenderNodeBox nodeId="edema" widthClass="w-full" />
              <ArrowDown />
              <RenderNodeBox nodeId="aumento_volume" widthClass="w-full" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* REJOIN 1: SVG Join back to ↑ PRESSÃO INTRACRANIANA */}
          {/* ========================================================= */}
          <div className="w-full max-w-xl flex flex-col items-center my-1">
            <svg className="w-full h-10 overflow-visible" viewBox="0 0 400 40">
              <path
                d="M 80 0 L 80 20 L 200 20 L 200 36"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <path
                d="M 320 0 L 320 20 L 200 20 L 200 36"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <polygon points="196,34 204,34 200,40" fill="#94a3b8" />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* CENTRAL CASCADE (LEVEL 4 to LEVEL 13) */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center w-full">
            {/* 4. ↑ PRESSÃO INTRACRANIANA */}
            <RenderNodeBox nodeId="aumento_pic" tag="Convergência de Pressão" />
            <ArrowDown />

            {/* 5. ↓ PERFUSÃO CEREBRAL */}
            <RenderNodeBox nodeId="queda_perfusao" tag="Equação PPC = PAM - PIC" />
            <ArrowDown />

            {/* 6. ISQUEMIA */}
            <RenderNodeBox nodeId="isquemia" tag="FSC Crítico" />
            <ArrowDown />

            {/* 7. ↓ OXIGENAÇÃO */}
            <RenderNodeBox nodeId="queda_oxigenacao" tag="Anóxia Tecidual" />
            <ArrowDown />

            {/* 8. DISFUNÇÃO CELULAR */}
            <RenderNodeBox nodeId="disfuncao_celular" tag="Falência de ATP" />
            <ArrowDown />

            {/* 9. LESÃO MITOCONDRIAL */}
            <RenderNodeBox nodeId="lesao_mitocondrial" tag="Poro mPTP" />
            <ArrowDown />

            {/* 10. EXCITOTOXICIDADE */}
            <RenderNodeBox nodeId="excitotoxicidade" tag="Excesso de Glutamato" />
            <ArrowDown />

            {/* 11. Ca²⁺ intracelular ↑ */}
            <RenderNodeBox nodeId="aumento_calcio" tag="Sobrecarga Citosólica" />
            <ArrowDown />

            {/* 12. RADICAIS LIVRES ↑ */}
            <RenderNodeBox nodeId="aumento_radicais" tag="Estresse Oxidativo" />
            <ArrowDown />

            {/* 13. MORTE CELULAR */}
            <RenderNodeBox nodeId="morte_celular" tag="Ponto de Ruptura Tecidual" />
          </div>

          {/* ========================================================= */}
          {/* BIFURCAÇÃO 2: NECROSE vs APOPTOSE */}
          {/* ========================================================= */}
          <div className="w-full max-w-xl flex flex-col items-center my-1">
            <svg className="w-full h-10 overflow-visible" viewBox="0 0 400 40">
              <path
                d="M 200 0 L 200 16 L 80 16 L 80 36"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <path
                d="M 200 0 L 200 16 L 320 16 L 320 36"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <polygon points="76,34 84,34 80,40" fill="#ef4444" />
              <polygon points="316,34 324,34 320,40" fill="#ef4444" />
            </svg>
          </div>

          {/* Two Pathways: Necrose (left) and Apoptose (right) */}
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
            <div className="flex flex-col items-center">
              <div className="text-[11px] font-mono uppercase text-red-400 mb-1 tracking-wider text-center">
                Morte Desordenada / Inflamatória
              </div>
              <RenderNodeBox nodeId="necrose" widthClass="w-full" />
            </div>

            <div className="flex flex-col items-center">
              <div className="text-[11px] font-mono uppercase text-rose-400 mb-1 tracking-wider text-center">
                Morte Programada / Caspases
              </div>
              <RenderNodeBox nodeId="apoptose" widthClass="w-full" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* REJOIN 2: Back to AGRAVAMENTO DO EDEMA */}
          {/* ========================================================= */}
          <div className="w-full max-w-xl flex flex-col items-center my-1">
            <svg className="w-full h-10 overflow-visible" viewBox="0 0 400 40">
              <path
                d="M 80 0 L 80 20 L 200 20 L 200 36"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <path
                d="M 320 0 L 320 20 L 200 20 L 200 36"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <polygon points="196,34 204,34 200,40" fill="#ef4444" />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* TERMINAL CASCADE: AGRAVAMENTO EDEMA -> ↑↑ PIC -> HERNIAÇÃO -> MORTE */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center w-full">
            {/* 15. AGRAVAMENTO DO EDEMA */}
            <div className="relative">
              <RenderNodeBox nodeId="agravamento_edema" tag="Ruptura Pan-Endotelial" />
              {showViciousCycle && (
                <div className="md:hidden mt-2 p-2 rounded bg-rose-950 border border-rose-600 text-[11px] text-rose-200">
                  ⚠️ <span className="font-bold">Ciclo Vicioso:</span> O agravamento do edema volta
                  a elevar a Pressão Intracraniana (↑ PIC), perpetuando a isquemia.
                </div>
              )}
            </div>
            <ArrowDown label="Refração Clínica" />

            {/* 16. ↑↑ PRESSÃO INTRACRANIANA */}
            <RenderNodeBox nodeId="aumento_severo_pic" tag="HIC Refratária / Maligna" />
            <ArrowDown label="Gradiente Transcompartimental" />

            {/* 17. HERNIAÇÃO */}
            <RenderNodeBox nodeId="herniacao" tag="Deslocamento Mecânico do Tronco" />
            <ArrowDown label="Parada Cardiorrespiratória" />

            {/* 18. MORTE */}
            <RenderNodeBox nodeId="morte" tag="Desfecho Terminal" />
          </div>
        </div>
      </div>
    </div>
  );
};
