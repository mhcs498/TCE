import React, { useState } from 'react';
import { CLINICAL_QUIZ_CASES, QuizCase } from '../data/tcePathwayData';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Activity } from 'lucide-react';

interface ClinicalQuizProps {
  onSelectNode: (nodeId: string) => void;
  onNavigateToFlowchart: () => void;
}

export const ClinicalQuiz: React.FC<ClinicalQuizProps> = ({
  onSelectNode,
  onNavigateToFlowchart,
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentCase = CLINICAL_QUIZ_CASES[currentCaseIndex];

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOptionIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) return;
    setHasSubmitted(true);
    if (currentCase.options[selectedOptionIndex].isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNextCase = () => {
    if (currentCaseIndex < CLINICAL_QUIZ_CASES.length - 1) {
      setCurrentCaseIndex((i) => i + 1);
      setSelectedOptionIndex(null);
      setHasSubmitted(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentCaseIndex(0);
    setSelectedOptionIndex(null);
    setHasSubmitted(false);
    setScore(0);
  };

  const handleJumpToNode = (nodeId: string) => {
    onSelectNode(nodeId);
    onNavigateToFlowchart();
  };

  const isQuizFinished = hasSubmitted && currentCaseIndex === CLINICAL_QUIZ_CASES.length - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
            <HelpCircle className="w-4 h-4" />
            <span>Casos Clínicos & Fixação Conceitual</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Desafios Práticos de Neurointensivismo
          </h1>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-slate-400">Progresso</span>
          <div className="text-sm font-bold font-mono text-emerald-400">
            Caso {currentCaseIndex + 1} de {CLINICAL_QUIZ_CASES.length}
          </div>
        </div>
      </div>

      {/* Case Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        {/* Scenario Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              {currentCase.title}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800/80 text-rose-300">
              Glasgow {currentCase.gcs} (TCE Grave)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-sm text-slate-200 leading-relaxed">
            {currentCase.patientScenario}
          </div>
        </div>

        {/* Question */}
        <div className="space-y-3 pt-2 border-t border-slate-800/80">
          <h3 className="text-base font-semibold text-white tracking-tight">
            {currentCase.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentCase.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              let optionStyle =
                'border-slate-800 bg-slate-950/50 hover:bg-slate-800/60 text-slate-300';

              if (isSelected) {
                optionStyle = 'border-sky-500 bg-sky-950/40 text-white ring-1 ring-sky-500/50';
              }

              if (hasSubmitted) {
                if (option.isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-100 ring-1 ring-emerald-500';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500';
                } else {
                  optionStyle = 'border-slate-800/60 bg-slate-950/30 text-slate-500 opacity-60';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-xs md:text-sm leading-relaxed flex items-start gap-3 ${optionStyle}`}
                >
                  <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1">{option.text}</div>
                  {hasSubmitted && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasSubmitted && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Area after submission */}
        {hasSubmitted && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentCase.options[selectedOptionIndex!].isCorrect ? (
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Resposta Correta
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    Resposta Incorreta
                  </span>
                )}
              </div>

              <button
                onClick={() => handleJumpToNode(currentCase.relatedNodeId)}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium transition-colors"
              >
                <span>Ver nó correspondente no fluxo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {currentCase.options[selectedOptionIndex!].explanation}
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400">
            Pontuação: <span className="text-emerald-400 font-bold">{score}</span> / {CLINICAL_QUIZ_CASES.length}
          </div>

          <div className="flex items-center gap-2">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIndex === null}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-xs transition-all shadow-md"
              >
                Confirmar Resposta
              </button>
            ) : isQuizFinished ? (
              <button
                onClick={handleRestartQuiz}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar Casos
              </button>
            ) : (
              <button
                onClick={handleNextCase}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Próximo Caso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
