import React, { useState } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface PpcCalculatorProps {
  onNavigateToFlowchartWithHighlight: (criticalNodeIds: string[]) => void;
}

export const PpcCalculator: React.FC<PpcCalculatorProps> = ({
  onNavigateToFlowchartWithHighlight,
}) => {
  const [pam, setPam] = useState<number>(85); // Pressão Arterial Média (mmHg)
  const [pic, setPic] = useState<number>(15); // Pressão Intracraniana (mmHg)

  // Calculation: PPC = PAM - PIC
  const ppc = pam - pic;

  const getPpcStatus = (value: number) => {
    if (value >= 60 && value <= 70) {
      return {
        level: 'ideal',
        label: 'PPC Ideal (Alvo BTF 60-70 mmHg)',
        description: 'Faixa segura de perfusão. Preserva o fluxo sanguíneo microvascular cerebral sem risco de hiperperfusão ou extravasamento capilar.',
        color: 'text-emerald-400',
        badgeBg: 'bg-emerald-950/80 border-emerald-800 text-emerald-300',
        criticalNodes: []
      };
    }
    if (value > 70) {
      return {
        level: 'high',
        label: 'PPC Elevada (> 70 mmHg)',
        description: 'Perfusão mantida, porém PPC excessiva (> 70-80 mmHg) em cérebros com barreira hematoencefálica rota aumenta o edema vasogênico e o risco de lesão pulmonar aguda (SDRA).',
        color: 'text-sky-400',
        badgeBg: 'bg-sky-950/80 border-sky-800 text-sky-300',
        criticalNodes: ['edema', 'agravamento_edema']
      };
    }
    if (value >= 50 && value < 60) {
      return {
        level: 'warning',
        label: 'Zona de Penumbra Isquêmica (50-59 mmHg)',
        description: 'Queda do fluxo microvascular abaixo do consumo metabólico de oxigênio. Início de recrutamento de metabolismo anaeróbio e acúmulo de lactato cerebral.',
        color: 'text-amber-400',
        badgeBg: 'bg-amber-950/80 border-amber-800 text-amber-300',
        criticalNodes: ['queda_perfusao', 'isquemia', 'queda_oxigenacao']
      };
    }
    if (value >= 30 && value < 50) {
      return {
        level: 'critical',
        label: 'Isquemia Crítica Severa (30-49 mmHg)',
        description: 'Falência energética neuronal grave. Esgotamento maciço de ATP, abertura de canais de cálcio e morte neuronal em larga escala.',
        color: 'text-rose-400',
        badgeBg: 'bg-rose-950/80 border-rose-800 text-rose-300',
        criticalNodes: ['queda_perfusao', 'isquemia', 'queda_oxigenacao', 'disfuncao_celular', 'lesao_mitocondrial', 'excitotoxicidade', 'aumento_calcio']
      };
    }
    return {
      level: 'fatal',
      label: 'Parada Circulatória Encefálica (< 30 mmHg)',
      description: 'A pressão intracraniana se iguala à pressão de perfusão. Interrupção do fluxo carotídeo e basilar, colapso de tronco e morte encefálica.',
      color: 'text-red-500',
      badgeBg: 'bg-red-950 border-red-700 text-red-300',
      criticalNodes: ['queda_perfusao', 'isquemia', 'aumento_severo_pic', 'herniacao', 'morte']
    };
  };

  const status = getPpcStatus(ppc);

  const applyPreset = (presetPam: number, presetPic: number) => {
    setPam(presetPam);
    setPic(presetPic);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Title / Intro */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
          <Activity className="w-4 h-4" />
          <span>Fisiologia Hemodinâmica Cerebral</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Simulador de Pressão de Perfusão Cerebral (PPC)
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          A Pressão de Perfusão Cerebral é a força gradiente que empurra o sangue com glicose e oxigênio
          pela microvasculatura do encéfalo. Ela é diretamente governada pela fórmula:{' '}
          <code className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-rose-300 font-mono font-semibold">
            PPC = PAM - PIC
          </code>
        </p>
      </div>

      {/* Main Grid: Sliders & Live Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sliders Column */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
            Controle de Parâmetros Hemodinâmicos
          </h2>

          {/* PAM Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
                <span>Pressão Arterial Média (PAM)</span>
                <span className="text-xs text-slate-500 font-normal">[PA Sistólica / Diastólica]</span>
              </label>
              <div className="text-right">
                <span className="text-xl font-bold font-mono tabular-nums text-sky-400">{pam}</span>
                <span className="text-xs font-mono text-slate-500 ml-1">mmHg</span>
              </div>
            </div>
            <input
              type="range"
              min="40"
              max="140"
              step="1"
              value={pam}
              onChange={(e) => setPam(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>40 mmHg (Choque Grave)</span>
              <span>85-90 mmHg (Meta BTF)</span>
              <span>140 mmHg (Hipertensão Grave)</span>
            </div>
          </div>

          {/* PIC Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
                <span>Pressão Intracraniana (PIC)</span>
                <span className="text-xs text-slate-500 font-normal">[Cateter DVE / Parenquimatoso]</span>
              </label>
              <div className="text-right">
                <span
                  className={`text-xl font-bold font-mono tabular-nums ${
                    pic > 22 ? 'text-rose-400' : 'text-slate-300'
                  }`}
                >
                  {pic}
                </span>
                <span className="text-xs font-mono text-slate-500 ml-1">mmHg</span>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={pic}
              onChange={(e) => setPic(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>5-15 mmHg (Normal)</span>
              <span className="text-rose-400">22 mmHg (Limiar BTF)</span>
              <span>60 mmHg (Tamponamento)</span>
            </div>
          </div>

          {/* Presets */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400">
              Cenários Clínicos Típicos no TCE:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => applyPreset(85, 12)}
                className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all text-xs"
              >
                <div className="font-semibold text-emerald-400">1. Alvo Estável BTF</div>
                <div className="text-slate-400 text-[11px]">PAM 85, PIC 12 → PPC 73 mmHg</div>
              </button>

              <button
                onClick={() => applyPreset(60, 18)}
                className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all text-xs"
              >
                <div className="font-semibold text-amber-400">2. Hipotensão Sistêmica (Choque)</div>
                <div className="text-slate-400 text-[11px]">PAM 60, PIC 18 → PPC 42 mmHg</div>
              </button>

              <button
                onClick={() => applyPreset(85, 34)}
                className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all text-xs"
              >
                <div className="font-semibold text-rose-400">3. Edema Maciço & HIC</div>
                <div className="text-slate-400 text-[11px]">PAM 85, PIC 34 → PPC 51 mmHg</div>
              </button>

              <button
                onClick={() => applyPreset(125, 42)}
                className="p-2.5 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all text-xs"
              >
                <div className="font-semibold text-purple-400">4. Resposta de Cushing</div>
                <div className="text-slate-400 text-[11px]">PAM 125, PIC 42 → PPC 83 mmHg</div>
              </button>
            </div>
          </div>
        </div>

        {/* Live Result Gauge Column */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Pressão de Perfusão Cerebral Calculada
            </span>

            {/* Big Readout */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-mono text-slate-400">PPC = {pam} - {pic}</span>
              <div className="text-5xl md:text-6xl font-black font-mono tracking-tight my-2">
                <span className={status.color}>{ppc}</span>
                <span className="text-base text-slate-500 font-mono ml-2">mmHg</span>
              </div>
              <div className={`mt-2 text-xs font-mono px-3 py-1 rounded-full border ${status.badgeBg}`}>
                {status.label}
              </div>
            </div>

            {/* Explanation card */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {status.description}
            </div>
          </div>

          {/* Action to connect to flowchart */}
          {status.criticalNodes.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigateToFlowchartWithHighlight(status.criticalNodes)}
                className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-950 transition-all"
              >
                <span>Ver Nós Afetados no Fluxograma</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-1.5">
                Destaca os {status.criticalNodes.length} nós de isquemia disparados por este valor de PPC
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Clinical Guidance Box */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Meta Alvo: PPC 60 - 70 mmHg
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A Brain Trauma Foundation recomenda manter a PPC estritamente entre 60 e 70 mmHg. Valores &lt; 60 aumentam isquemia; valores &gt; 70 não melhoram prognóstico e causam edema pulmonar.
          </p>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-rose-400 mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Perigo: Tratar a PA sem Saber a PIC
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Se o paciente tem PIC de 35 mmHg e PA de 160/90 (PAM 113), a PPC é 78 mmHg. Reduzir bruscamente a PAM para 75 mmHg fará a PPC despencar para 40 mmHg, causando infarto isquêmico imediato!
          </p>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-sky-400 mb-1 flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            Tríade de Cushing
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hipertensão com aumento da pressão de pulso + Bradicardia + Respiração irregular. É a última tentativa autônoma do centro vasomotor bulbar de vencer a HIC antes da herniação fatal.
          </p>
        </div>
      </div>
    </div>
  );
};
