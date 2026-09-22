import React, { useState } from 'react';
import { Brain, AlertOctagon, TrendingUp, Info } from 'lucide-react';

export const MonroKellieModal: React.FC = () => {
  const [edemaVolume, setEdemaVolume] = useState<number>(30); // volume adicionado em mL (0 a 100)

  // Simulation of Monro-Kellie non-linear Volume-Pressure curve
  // PIC = baseline + (exponential curve after compensation threshold)
  const calculatePic = (vol: number) => {
    if (vol <= 35) {
      // Compensated phase: linear, very slow increase
      return Math.round(10 + (vol / 35) * 6); // 10 to 16 mmHg
    } else if (vol <= 60) {
      // Threshold phase: steeper slope
      const excess = vol - 35;
      return Math.round(16 + (excess / 25) * 12); // 16 to 28 mmHg
    } else {
      // Decompensated exponential phase
      const excess = vol - 60;
      return Math.min(65, Math.round(28 + Math.pow(excess / 10, 2) * 2.2));
    }
  };

  const simulatedPic = calculatePic(edemaVolume);

  // Status
  const getPhase = (vol: number) => {
    if (vol <= 35) {
      return {
        title: 'Fase Compensada (Complacência Alta)',
        description:
          'O encéfalo acomoda o edema/hematoma deslocando LCR para o saco dural espinhal e sangue venoso para as veias jugulares. A PIC permanece dentro da faixa normal (< 18-20 mmHg).',
        badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-700',
        waveP2: false
      };
    } else if (vol <= 60) {
      return {
        title: 'Fase de Transição (Complacência Reduzida)',
        description:
          'Os reservatórios de compensação (LCR e sangue venoso) estão quase totalmente esgotados. A morfologia da onda da PIC inverte: P2 torna-se maior que P1 (P2 > P1).',
        badge: 'bg-amber-950/80 text-amber-300 border-amber-700',
        waveP2: true
      };
    } else {
      return {
        title: 'Fase Descompensada (Curva Exponencial Crítica)',
        description:
          'A complacência cerebral é ZERO. Qualquer aumento infinitesimal de volume (tosse, febre, edema mínimo) gera salto desastroso da PIC, levando à herniação e óbito.',
        badge: 'bg-red-950/90 text-red-300 border-red-700 animate-pulse',
        waveP2: true
      };
    }
  };

  const currentPhase = getPhase(edemaVolume);

  // SVG points for volume-pressure curve
  const points: { x: number; y: number }[] = [];
  for (let v = 0; v <= 100; v += 5) {
    const p = calculatePic(v);
    // map v (0-100) to x (40-460)
    const x = 40 + (v / 100) * 420;
    // map p (10-65) to y (240-30)
    const y = 240 - ((p - 10) / 55) * 210;
    points.push({ x, y });
  }
  const pathD = points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');

  // Current point on curve
  const currentX = 40 + (edemaVolume / 100) * 420;
  const currentY = 240 - ((simulatedPic - 10) / 55) * 210;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
          <Brain className="w-4 h-4" />
          <span>Fisiologia Intracraniana Clássica</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Doutrina de Monro-Kellie & Curva Volume-Pressão
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          A calota craniana em adultos é uma caixa óssea rígida e inextensível de volume constante:
          <code className="mx-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300 font-mono text-xs">
            V_intracraniano = V_parênquima (80%) + V_sangue (10%) + V_LCR (10%)
          </code>
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Volume-Pressure Interactive Curve */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Curva de Complacência Intracraniana
            </h2>
            <span className={`text-xs font-mono px-2.5 py-0.5 rounded border ${currentPhase.badge}`}>
              PIC: {simulatedPic} mmHg
            </span>
          </div>

          {/* SVG Chart */}
          <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800">
            <svg viewBox="0 0 500 270" className="w-full h-auto overflow-visible">
              {/* Axes */}
              <line x1="40" y1="240" x2="480" y2="240" stroke="#334155" strokeWidth="1.5" />
              <line x1="40" y1="20" x2="40" y2="240" stroke="#334155" strokeWidth="1.5" />

              {/* Threshold line at PIC = 22 mmHg */}
              {/* 22 mmHg in y coordinate: 240 - ((22 - 10) / 55) * 210 = 240 - 45.8 = 194.2 */}
              <line
                x1="40"
                y1="194"
                x2="480"
                y2="194"
                stroke="#f43f5e"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text x="475" y="190" fill="#f43f5e" fontSize="10" textAnchor="end" fontFamily="monospace">
                Limiar Crítico BTF (22 mmHg)
              </text>

              {/* Grid labels */}
              <text x="35" y="244" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">10</text>
              <text x="35" y="198" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">22</text>
              <text x="35" y="130" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">40</text>
              <text x="35" y="35" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">65</text>

              <text x="40" y="258" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">0</text>
              <text x="187" y="258" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">35 mL</text>
              <text x="292" y="258" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">60 mL</text>
              <text x="460" y="258" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">100 mL</text>

              {/* The Curve */}
              <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="3" />

              {/* Current state indicator point */}
              <circle cx={currentX} cy={currentY} r="7" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
              <line
                x1={currentX}
                y1={currentY}
                x2={currentX}
                y2="240"
                stroke="#f43f5e"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Axis titles */}
              <text x="260" y="268" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Volume do Edema / Massa Adicionada (mL)
              </text>
              <text
                x="-130"
                y="15"
                fill="#94a3b8"
                fontSize="11"
                textAnchor="middle"
                fontWeight="bold"
                transform="rotate(-90)"
              >
                Pressão Intracraniana (mmHg)
              </text>
            </svg>
          </div>

          {/* Slider for volume */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-200">
                Acréscimo de Volume por Edema Cerebral / Hematoma
              </label>
              <span className="text-base font-bold font-mono text-amber-400">{edemaVolume} mL</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={edemaVolume}
              onChange={(e) => setEdemaVolume(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0 mL (Sem Edema)</span>
              <span>35 mL (Fim do LCR)</span>
              <span className="text-rose-400">60 mL (Exponencial)</span>
              <span>100 mL (Herniação)</span>
            </div>
          </div>
        </div>

        {/* Right: Explanatory Breakdown of Brain Compartments */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Estado Fisiológico Atual
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">{currentPhase.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              {currentPhase.description}
            </p>
          </div>

          {/* Compartment bars representation */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Distribuição dos Compartimentos Intracranianos
            </span>

            {/* Visual Bar */}
            <div className="h-9 w-full rounded-xl overflow-hidden flex border border-slate-800 text-[10px] font-mono font-bold text-center leading-9">
              <div
                style={{ width: `${Math.max(40, 80 - edemaVolume * 0.3)}%` }}
                className="bg-slate-700 text-slate-200 truncate px-1"
                title="Parênquima cerebral"
              >
                Cérebro (~80%)
              </div>
              <div
                style={{ width: `${Math.max(4, 10 - edemaVolume * 0.06)}%` }}
                className="bg-rose-800 text-rose-100 truncate px-1"
                title="Sangue arterial e venoso"
              >
                Sangue
              </div>
              <div
                style={{ width: `${Math.max(2, 10 - edemaVolume * 0.08)}%` }}
                className="bg-sky-700 text-sky-100 truncate px-1"
                title="Líquor cefalorraquidiano"
              >
                LCR
              </div>
              {edemaVolume > 0 && (
                <div
                  style={{ width: `${Math.min(45, edemaVolume * 0.45)}%` }}
                  className="bg-amber-600 text-white truncate px-1 animate-pulse"
                  title="Massa / Edema patológico"
                >
                  Edema +{edemaVolume}mL
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-slate-700" />
                <span>Parênquima (Neurônios/Glia)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-rose-800" />
                <span>Sangue (Arterial + Venoso)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-sky-700" />
                <span>LCR (Ventrículos e cisternas)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-amber-600" />
                <span className="text-amber-300 font-semibold">Edema Patológico</span>
              </div>
            </div>
          </div>

          {/* Clinical Implication Alert */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Por que a Drenagem de 2 mL Salva Vidas: </span>
              Na fase descompensada (lado íngreme da curva), a drenagem de apenas 2 a 3 mL de LCR via DVE ou
              a desidratação osmótica pelo Manitol pode derrubar a PIC de 35 para 18 mmHg!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
