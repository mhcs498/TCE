import React, { useState } from 'react';
import { TCE_NODES } from '../data/tcePathwayData';
import { X, Copy, Check, Printer, FileText } from 'lucide-react';

interface ExportSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportSummaryModal: React.FC<ExportSummaryModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullText = `# CASO CLÍNICO & FISIOPATOLOGIA: LESÃO CEREBRAL SECUNDÁRIA NO TCE
# Autor: Abdoulaye Marega / Residente em Neurocirurgia-HCN

## FLUXOGRAMA ESQUEMÁTICO DA CASCATA

                  TCE
                  ↓
        LESÃO CEREBRAL PRIMÁRIA
                  ↓
       ┌──────────┴──────────┐
       ↓                     ↓
  ALTERAÇÃO VASCULAR      EDEMA
       ↓                     ↓
 ↓ Perfusão cerebral     ↑ Volume cerebral
       ↓                     ↓
       └──────────┬──────────┘
                  ↓
          ↑ PRESSÃO INTRACRANIANA
                  ↓
        ↓ PERFUSÃO CEREBRAL
                  ↓
             ISQUEMIA
                  ↓
           ↓ OXIGENAÇÃO
                  ↓
       DISFUNÇÃO CELULAR
                  ↓
      LESÃO MITOCONDRIAL
                  ↓
     EXCITOTOXICIDADE
                  ↓
       Ca²⁺ intracelular ↑
                  ↓
      RADICAIS LIVRES ↑
                  ↓
          MORTE CELULAR
          ┌───────┴───────┐
          ↓               ↓
       NECROSE         APOPTOSE
          │               │
          └───────┬───────┘
                  ↓
        AGRAVAMENTO DO EDEMA  ---> [CICLO VICIOSO PARA ↑ PIC]
                  ↓
       ↑↑ PRESSÃO INTRACRANIANA
                  ↓
              HERNIAÇÃO
                  ↓
                 MORTE

---

## METAS TERAPÊUTICAS CRÍTICAS (BRAIN TRAUMA FOUNDATION - BTF)
1. PRESSÃO DE PERFUSÃO CEREBRAL (PPC = PAM - PIC): Alvo 60 a 70 mmHg.
2. PRESSÃO INTRACRANIANA (PIC): Manter estritamente < 20-22 mmHg.
3. PRESSÃO ARTERIAL MÉDIA (PAM): Alvo 80 a 90 mmHg (evitar qualquer episódio de PAS < 90 mmHg).
4. OXIGENAÇÃO TECIDUAL CEREBRAL (PbtO₂): Manter > 20 mmHg (evitar hipoxemia com PaO₂ < 60 ou SpO₂ < 90%).
5. VENTILAÇÃO: Normocapnia (PaCO₂ 35 a 40 mmHg). A hiperventilação agressiva profilática é proscrita.
6. OSMOTERAPIA: Salina Hipertônica 3% ou Manitol a 20%. Manter Sódio sérico 145-155 mEq/L e Osmolaridade < 320 mOsm/kg.
7. CONTROLE TÉRMICO: Normotermia rigorosa (36.0 - 37.0°C). Tratar febre imediatamente.
8. POSICIONAMENTO: Cabeceira elevada a 30° com cabeça centrada para otimizar drenagem jugular.
9. PREVENÇÃO DE CONVULSÕES: Levetiracetam ou Fenitoína nas primeiras 7 semanas/dias.
10. CONTRAINDICAÇÃO FORMAL: Corticosteroides (ex.: Dexametasona) são proibidos no TCE (Estudo CRASH).

---

## ETAPAS DETALHADAS DA CASCATA

${TCE_NODES.map(
  (n) => `### ${n.order}. ${n.label} (${n.phaseName})
- Mecanismo: ${n.physiologicalMechanism}
- Eventos Celulares:
  ${n.cellularDetails.map((c) => `* ${c}`).join('\n  ')}
- Monitorização: ${n.monitoring.join('; ')}
- Alvos & Condutas:
  ${
    n.clinicalInterventions.length > 0
      ? n.clinicalInterventions.map((i) => `* [${i.category}] ${i.title}: ${i.description} (Meta: ${i.targetGoal})`).join('\n  ')
      : '* Sem intervenção farmacológica direta; suporte e prevenção.'
  }
- Pérola Clínica: ${n.clinicalPearl}
`
).join('\n')}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-base text-white">
                Guia Completo da Cascata de Lesão Secundária no TCE
              </div>
              <div className="text-[11px] text-slate-400">
                Autor: <span className="text-rose-400 font-medium">Abdoulaye Marega</span> · Residente em Neurocirurgia-HCN
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/60">
          <pre className="whitespace-pre-wrap font-mono text-xs text-slate-300 select-text">
            {fullText}
          </pre>
        </div>
      </div>
    </div>
  );
};
