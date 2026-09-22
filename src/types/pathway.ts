export type PathwayPhase =
  | 'primary'
  | 'vascular_edema'
  | 'hemodynamic'
  | 'cellular_metabolic'
  | 'death_pathway'
  | 'terminal';

export interface ClinicalIntervention {
  title: string;
  category: 'Ventilação' | 'Osmoterapia' | 'Hemodinâmica' | 'Cirúrgico' | 'Neuromonitorização' | 'Neuroproteção';
  description: string;
  targetGoal: string;
}

export interface PathwayNode {
  id: string;
  label: string;
  shortDescription: string;
  phase: PathwayPhase;
  phaseName: string;
  order: number;
  column?: 'center' | 'left' | 'right';
  badgeText?: string;
  level: number; // 0 to 14
  physiologicalMechanism: string;
  cellularDetails: string[];
  monitoring: string[];
  clinicalInterventions: ClinicalIntervention[];
  clinicalPearl: string;
  reversible: boolean;
  criticality: 'baixa' | 'moderada' | 'alta' | 'critica' | 'fatal';
}

export interface PathwayConnection {
  from: string;
  to: string;
  label?: string;
  isViciousCycle?: boolean;
}
