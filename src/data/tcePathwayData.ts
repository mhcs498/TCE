import { PathwayNode, PathwayConnection } from '../types/pathway';

export const TCE_NODES: PathwayNode[] = [
  {
    id: 'tce',
    label: 'TCE',
    shortDescription: 'Traumatismo Cranioencefálico inicial por energia cinética.',
    phase: 'primary',
    phaseName: 'Evento Mecânico Inicial',
    order: 1,
    column: 'center',
    badgeText: 'Instante t = 0',
    level: 0,
    physiologicalMechanism:
      'Impacto físico direto, aceleração, desaceleração súbita ou forças rotacionais aplicadas à calota craniana e encéfalo, convertendo energia cinética em deformação tecidual mecânica.',
    cellularDetails: [
      'Estiramento e ruptura mecânica de membranas axonais e corpos celulares.',
      'Cisalhamento mecânico de microcapilares e vénulas cerebrais.',
      'Despolarização mecânica imediata de canais iônicos sensíveis à deformação.'
    ],
    monitoring: [
      'Escala de Coma de Glasgow (ECG / GCS)',
      'Cinemática do trauma (queda de altura, colisão automobilística, projétil)',
      'Exame neurológico primário com avaliação pupilar (isocoria, fotorreatividade)'
    ],
    clinicalInterventions: [
      {
        title: 'Estabilização ABCDE no Pré-Hospitalar / Sala de Emergência',
        category: 'Hemodinâmica',
        description: 'Imobilização da coluna cervical, garantia de via aérea definitiva e prevenção mandatória de hipóxia e hipotensão arterial.',
        targetGoal: 'Evitar episódio único de PAS < 90 mmHg (ou PAM < 80 mmHg) e hipoxemia (SpO₂ < 90%).'
      }
    ],
    clinicalPearl:
      'Um único episódio de hipotensão arterial sistêmica (PAS < 90 mmHg) ou hipoxemia (PaO₂ < 60 mmHg) no pré-hospitalar duplica a mortalidade do paciente com TCE grave.',
    reversible: false,
    criticality: 'moderada'
  },
  {
    id: 'lesao_primaria',
    label: 'LESÃO CEREBRAL PRIMÁRIA',
    shortDescription: 'Dano tecidual mecânico estrutural imediato e irreversível.',
    phase: 'primary',
    phaseName: 'Fase Primária Estrutural',
    order: 2,
    column: 'center',
    badgeText: 'Irreversível',
    level: 1,
    physiologicalMechanism:
      'Compreende contusões corticais, lacerações parenquimatosas, hemorragias intracranianas (epidural, subdural, subaracnóidea traumática, intraparenquimatosa) e Lesão Axonal Difusa (LAD). Ocorre no momento do impacto e não pode ser revertida por tratamento farmacológico.',
    cellularDetails: [
      'Axonotmese mecânica e descontinuidade do citoesqueleto por estiramento dos neurofilamentos.',
      'Extravasamento sanguíneo local com formação de coágulos e liberação de hemoglobina/ferro livre.',
      'Ruptura focal da barreira hematoencefálica (BHE) nas áreas de contusão.'
    ],
    monitoring: [
      'Tomografia Computadorizada de Crânio (TC) sem contraste urgente (Classificação de Marshall e Rotterdam)',
      'Avaliação de desvio de linha média (> 5 mm tem indicação cirúrgica urgente)',
      'Status das cisternas da base (abertas, comprimidas ou apagadas)'
    ],
    clinicalInterventions: [
      {
        title: 'Descompressão Cirúrgica / Drenagem de Hematomas',
        category: 'Cirúrgico',
        description: 'Evacuação imediata de hematomas epidurais > 30 cm³ ou subdurais com espessura > 10 mm ou desvio de linha média > 5 mm.',
        targetGoal: 'Evacuação neurocirúrgica precoce (< 4 horas da admissão se lesão expansiva com efeito de massa).'
      }
    ],
    clinicalPearl:
      'A lesão primária estabelece o teto do prognóstico; toda a neurointensivologia subsequente é desenhada para conter a avalanche da lesão secundária.',
    reversible: false,
    criticality: 'alta'
  },
  {
    id: 'alteracao_vascular',
    label: 'ALTERAÇÃO VASCULAR',
    shortDescription: 'Perda da autorregulação miogênica cerebral e disfunção endotelial.',
    phase: 'vascular_edema',
    phaseName: 'Eixo Vascular & Hemodinâmico',
    order: 3,
    column: 'left',
    badgeText: 'Disfunção Miogênica',
    level: 2,
    physiologicalMechanism:
      'Em condições normais, o cérebro mantém o Fluxo Sanguíneo Cerebral (FSC) constante entre PAM de 50 e 150 mmHg. O TCE rompe essa autorregulação: os vasos cerebrais tornam-se tubos passivos que dilatam e colapsam dependendo da pressão arterial sistêmica.',
    cellularDetails: [
      'Disfunção do músculo liso arteriolar e perda da resposta endotelial ao óxido nítrico.',
      'Microtrombose capilar por ativação plaquetária e deposição de fibrina local.',
      'Vasoespasmo pós-traumático induzido por produtos de degradação da oxi-hemoglobina no espaço subaracnóideo.'
    ],
    monitoring: [
      'Doppler Transcraniano (DTC) diário: avaliação de Velocidade Média de Fluxo (Vm) e Índice de Pulsatilidade (IP > 1.2 indica alta resistência/PIC alta)',
      'Índice de Reatividade de Pressão (PRx) via monitorização multivariada contínua'
    ],
    clinicalInterventions: [
      {
        title: 'Manutenção da Pressão de Perfusão Cerebral (PPC Alvo)',
        category: 'Hemodinâmica',
        description: 'Uso titulado de vasopressores (Noradrenalina) e ressuscitação volêmica euvolêmica com Cristaloides isotônicos (Salina 0.9%). Proibição estrita de soluções hipotônicas como Ringer Lactato ou Soro Glicosado.',
        targetGoal: 'Manter PAM entre 80 e 90 mmHg visando PPC entre 60 e 70 mmHg.'
      }
    ],
    clinicalPearl:
      'Com a perda da autorregulação, quedas discretas da PAM causam colapso do FSC e isquemia; aumentos bruscos de PAM sem complacência extravasam plasma e pioram o edema cerebral.',
    reversible: true,
    criticality: 'alta'
  },
  {
    id: 'edema',
    label: 'EDEMA CEREBRAL',
    shortDescription: 'Acúmulo patológico de água: edema vasogênico e citotóxico.',
    phase: 'vascular_edema',
    phaseName: 'Eixo de Edema e Volume',
    order: 4,
    column: 'right',
    badgeText: 'Vasogênico + Citotóxico',
    level: 2,
    physiologicalMechanism:
      'Coexistência de Edema Citotóxico (acúmulo de água intracelular por falência energética e influxo de sódio em neurônios e astrócitos) e Edema Vasogênico (quebra das junções oclusivas da Barreira Hematoencefálica com extravasamento de plasma e proteínas para o interstício).',
    cellularDetails: [
      'Quebra das tight junctions (claudinas e ocludinas) mediada por metaloproteinases de matriz (MMP-9).',
      'Sobrecarga astrocitária através dos canais de aquaporina-4 (AQP4).',
      'Inchaço osmótico neuronal obrigatório após acúmulo de Na⁺ e Cl⁻.'
    ],
    monitoring: [
      'TC de Crânio com perda da diferenciação corticossubcortical e apagamento dos sulcos corticais',
      'Osmolaridade sérica plasmática e dosagem periódica de Sódio sérico (Na⁺)'
    ],
    clinicalInterventions: [
      {
        title: 'Osmoterapia com Solução Hipertônica ou Manitol',
        category: 'Osmoterapia',
        description: 'Administração em bolus de Salina Hipertônica 3% (250 a 500 mL) ou 20% (30 a 60 mL), ou Manitol 20% (0.5 a 1 g/kg IV em 20 min).',
        targetGoal: 'Criar gradiente osmótico transendotelial para extrair água do parênquima são; manter Na⁺ sérico 145-155 mEq/L e Osmolaridade < 320 mOsm/kg.'
      }
    ],
    clinicalPearl:
      'Corticosteroides (ex.: dexametasona) são PROIBIDOS no TCE (Estudo CRASH demonstrou aumento de mortalidade com uso de esteroides no TCE).',
    reversible: true,
    criticality: 'alta'
  },
  {
    id: 'queda_perfusao_vasc',
    label: '↓ Perfusão cerebral',
    shortDescription: 'Redução do débito vascular encefálico regional por desregulação.',
    phase: 'vascular_edema',
    phaseName: 'Disfunção do Fluxo',
    order: 5,
    column: 'left',
    badgeText: 'Oligemia Regional',
    level: 3,
    physiologicalMechanism:
      'A resistência microvascular alterada e o colapso dos leitos distais provocam oligemia cerebral precoce nas primeiras 24 horas após o TCE, reduzindo a entrega de oxigênio e substratos mesmo antes de elevações extremas da PIC.',
    cellularDetails: [
      'Diminuição da velocidade de cisalhamento endotelial favorecendo estase.',
      'Adesão leucocitária pós-isquêmica na microcirculação capilar (no-reflow phenomenon).'
    ],
    monitoring: [
      'Monitor de oxigenação tecidual cerebral (PbtO₂): alvo > 20 mmHg',
      'Saturação da Veia Jugular (SjvO₂): normal entre 55% e 75%'
    ],
    clinicalInterventions: [
      {
        title: 'Otimização Cardíaca & Hemodinâmica Global',
        category: 'Hemodinâmica',
        description: 'Garantir débito cardíaco adequado e hematócrito fisiológico (~30%) para otimizar a reologia e a viscosidade do sangue cerebral.',
        targetGoal: 'PbtO₂ sustentado > 20 mmHg e SjvO₂ > 60%.'
      }
    ],
    clinicalPearl:
      'Nas primeiras 24h de TCE, o FSC encontra-se frequentemente reduzido a menos de 50% do valor normal (hipoperfusão vulnerável).',
    reversible: true,
    criticality: 'alta'
  },
  {
    id: 'aumento_volume',
    label: '↑ Volume cerebral',
    shortDescription: 'Inchaço da massa encefálica ocupando o compartimento craniano inextensível.',
    phase: 'vascular_edema',
    phaseName: 'Efeito de Massa',
    order: 6,
    column: 'right',
    badgeText: 'Doutrina de Monro-Kellie',
    level: 3,
    physiologicalMechanism:
      'Segundo a Doutrina de Monro-Kellie, a cavidade craniana tem volume fixo (V_cérebro + V_sangue + V_líquor = Constante). O aumento do volume cerebral edematoso esgota inicialmente a compensação (deslocamento de líquor para o saco tecal e sangue venoso para o sistema jugular). Ao fim da complacência, qualquer acréscimo milimétrico de volume gera salto exponencial na pressão.',
    cellularDetails: [
      'Compressão do espaço extracelular intersticial.',
      'Obliteração física das cisternas periencefálicas e ventrículos laterais.'
    ],
    monitoring: [
      'Curva de Complacência Intracraniana (Análise morfológica da onda da PIC: P2 > P1 indica complacência esgotada)',
      'Escala tomográfica de Marshall (graus III e IV com cisternas apagadas)'
    ],
    clinicalInterventions: [
      {
        title: 'Posicionamento e Drenagem Venosa Cerebral',
        category: 'Ventilação',
        description: 'Manter cabeceira elevada a 30 graus com cabeça em posição neutra (sem rotação cervical ou colar cervical excessivamente apertado).',
        targetGoal: 'Facilitar a drenagem venosa pelas veias jugulares internas por gravidade.'
      }
    ],
    clinicalPearl:
      'Uma onda de PIC normal tem amplitude P1 > P2 > P3. Quando P2 ultrapassa P1, o cérebro perdeu sua complacência elástica.',
    reversible: true,
    criticality: 'alta'
  },
  {
    id: 'aumento_pic',
    label: '↑ PRESSÃO INTRACRANIANA',
    shortDescription: 'Hipertensão Intracraniana (HIC) patológica acima de 20-22 mmHg.',
    phase: 'hemodynamic',
    phaseName: 'Hipertensão Intracraniana',
    order: 7,
    column: 'center',
    badgeText: 'PIC > 22 mmHg',
    level: 4,
    physiologicalMechanism:
      'Atingimento da fase exponencial da curva volume-pressão de Monro-Kellie. A pressão intracraniana ultrapassa o limiar patológico de 22 mmHg (critério Brain Trauma Foundation), gerando compressão do leito vascular encefálico e risco iminente de deslocamento de estruturas neurais.',
    cellularDetails: [
      'Compressão transmural das arteríolas perfurantes e vénulas de drenagem.',
      'Bloqueio mecânico da reabsorção liquórica nas granulações aracnóideas.'
    ],
    monitoring: [
      'Cateter de derivação ventricular externa (DVE - padrão-ouro) ou cateter parenquimatoso de fibra óptica',
      'Monitorização contínua em tempo real da PIC em leito de UTI'
    ],
    clinicalInterventions: [
      {
        title: 'Drenagem Liquórica e Sedação Nível 1',
        category: 'Neuromonitorização',
        description: 'Drenagem terapêutica intermitente ou contínua de LCR via DVE (1-2 mL pode reduzir drasticamente a PIC), sedação e analgesia com Fentanil + Propofol/Midazolam.',
        targetGoal: 'Manter PIC estritamente abaixo de 20-22 mmHg de forma sustentada.'
      }
    ],
    clinicalPearl:
      'A indicação de monitorizar PIC é recomendada em todo paciente com TCE grave (Glasgow ≤ 8 após reanimação) com TC de crânio anormal.',
    reversible: true,
    criticality: 'alta'
  },
  {
    id: 'queda_perfusao',
    label: '↓ PERFUSÃO CEREBRAL',
    shortDescription: 'Queda crítica da Pressão de Perfusão Cerebral (PPC = PAM - PIC).',
    phase: 'hemodynamic',
    phaseName: 'Compromisso de Perfusão',
    order: 8,
    column: 'center',
    badgeText: 'PPC < 60 mmHg',
    level: 5,
    physiologicalMechanism:
      'A Pressão de Perfusão Cerebral é a força motriz que empurra o sangue pelo encéfalo, regida pela equação matemática PPC = PAM - PIC. Com a elevação maciça da PIC contra uma PAM fixa ou em queda, a PPC despenca abaixo do valor fisiológico mínimo (60 mmHg).',
    cellularDetails: [
      'Queda acentuada da velocidade de hemácias nos capilares corticais.',
      'Diminuição da pressão transmural de oxigenação tecidual.'
    ],
    monitoring: [
      'Linha Arterial Invasiva (PAI) nivelada no forame de Monro / meato acústico externo para cálculo de PAM exata',
      'Cálculo contínuo automatizado: PPC = PAM - PIC'
    ],
    clinicalInterventions: [
      {
        title: 'Suporte com Vasopressores e Otimização da PAM',
        category: 'Hemodinâmica',
        description: 'Titulação de Noradrenalina para elevar a PAM de modo que compense a PIC elevada, preservando a PPC.',
        targetGoal: 'Manter PPC entre 60 e 70 mmHg (evitar tanto PPC < 60 mmHg por risco isquêmico quanto PPC > 70 mmHg por risco de edema vasogênico/SDRA).'
      }
    ],
    clinicalPearl:
      'Nunca tente tratar hipertensão arterial em paciente com TCE agudo sem antes saber a PIC: essa hipertensão pode ser a resposta de Cushing tentando salvar o cérebro da isquemia!',
    reversible: true,
    criticality: 'critica'
  },
  {
    id: 'isquemia',
    label: 'ISQUEMIA',
    shortDescription: 'Hipoperfusão global ou regional abaixo do limiar de sobrevida tecidual.',
    phase: 'hemodynamic',
    phaseName: 'Isquemia Cerebral',
    order: 9,
    column: 'center',
    badgeText: 'FSC < 18 mL/100g/min',
    level: 6,
    physiologicalMechanism:
      'O Fluxo Sanguíneo Cerebral cai para a zona de penumbra isquêmica (< 18-20 mL/100g/min). Há privação severa de glicose e oxigênio para a síntese energética neuronal e glial, gerando parada da função sináptica.',
    cellularDetails: [
      'Cessação da atividade eletroencefalográfica espontânea para poupar energia.',
      'Ativação do metabolismo anaeróbio com acúmulo de ácido lático e queda do pH cerebral tecidual.'
    ],
    monitoring: [
      'Microdiálise cerebral: Relação Lactato/Piruvato (L/P > 40 confirma crise energética isquêmica)',
      'Glicose no microdialisado (< 0.8 mmol/L denota neuroglicopenia crítica)'
    ],
    clinicalInterventions: [
      {
        title: 'Manejo de Medidas de 2º Nível (Hiperventilação Leve / Curarização)',
        category: 'Ventilação',
        description: 'Bloqueio neuromuscular transitório para eliminar tremores e assincronia; hiperventilação leve e temporária (PaCO₂ 30-35 mmHg) APENAS como ponte emergencial se houver sinais de herniação.',
        targetGoal: 'Garantir fornecimento adequado de substrato metabólico e oxigênio.'
      }
    ],
    clinicalPearl:
      'A hiperventilação agressiva profilática (PaCO₂ < 30 mmHg) é proscrita: ela causa vasoconstrição cerebral intensa e precipita isquemia secundária severa.',
    reversible: true,
    criticality: 'critica'
  },
  {
    id: 'queda_oxigenacao',
    label: '↓ OXIGENAÇÃO',
    shortDescription: 'Hipóxia tecidual cerebral profunda e privação aeróbia.',
    phase: 'hemodynamic',
    phaseName: 'Hipóxia Tecidual',
    order: 10,
    column: 'center',
    badgeText: 'PbtO₂ < 15 mmHg',
    level: 7,
    physiologicalMechanism:
      'A baixa entrega de oxigênio pelo sangue e a incapacidade de difusão capilar geram hipóxia tecidual cerebral profunda. O parênquima cerebral não armazena oxigênio e depende exclusivamente da respiração aeróbia constante.',
    cellularDetails: [
      'Inibição da cadeia de transporte de elétrons na membrana mitocondrial interna.',
      'Estagnação do ciclo de Krebs com conversão massiva de piruvato em lactato.'
    ],
    monitoring: [
      'Cateter de oxigenação tecidual (Licox / Raumedic PbtO₂): limiar crítico < 15-20 mmHg',
      'Gasometria arterial seriada: garantir PaO₂ entre 80 e 120 mmHg e normocapnia (PaCO₂ 35-40 mmHg)'
    ],
    clinicalInterventions: [
      {
        title: 'Protocolo de Resgate de Oxigenação Cerebral (PbtO₂-Directed Therapy)',
        category: 'Ventilação',
        description: 'Ajuste de PEEP e FiO₂ na ventilação mecânica para elevar PaO₂ sistêmica; se PbtO₂ persistir < 20 mmHg, aumentar PPC alvo ou considerar transfusão de concentrado de hemácias se Hb < 9-10 g/dL.',
        targetGoal: 'Manter PbtO₂ > 20 mmHg em todas as circunstâncias.'
      }
    ],
    clinicalPearl:
      'O ensaio clínico BOOST-II e BOOST-3 demonstraram que guiar a terapia tanto pela PIC quanto pela PbtO₂ reduz episódios de hipóxia cerebral oculta e melhora desfechos neurológicos.',
    reversible: true,
    criticality: 'critica'
  },
  {
    id: 'disfuncao_celular',
    label: 'DISFUNÇÃO CELULAR',
    shortDescription: 'Falência bioenergética e esgotamento do ATP neuronal.',
    phase: 'cellular_metabolic',
    phaseName: 'Falência Energética',
    order: 11,
    column: 'center',
    badgeText: 'Depleção de ATP',
    level: 8,
    physiologicalMechanism:
      'Sem oxigênio e glicose, a fosforilação oxidativa cessa. Os estoques de ATP neuronal esgotam-se em minutos. As bombas iônicas dependentes de energia, principalmente a Na⁺/K⁺ ATPase, entram em colapso funcional completo.',
    cellularDetails: [
      'Colapso do gradiente eletroquímico transmembrana.',
      'Influxo maciço de Na⁺ e água com despolarização de membrana irreversível.',
      'Acidose intracelular profunda por acúmulo de H⁺ e lactato.'
    ],
    monitoring: [
      'Eletroencefalografia contínua (EEGc): identificação de crises epilépticas não convulsivas (CENC) e atenuação difusa da voltagem',
      'Monitorização metabólica por microdiálise (razão L/P)'
    ],
    clinicalInterventions: [
      {
        title: 'Profilaxia Anticonvulsivante & Controle Glicêmico',
        category: 'Neuroproteção',
        description: 'Administração profilática de Levetiracetam ou Fenitoína nas primeiras 7 semanas/dias para evitar crises epilépticas pós-traumáticas precoces; controle estrito de glicemia (140-180 mg/dL).',
        targetGoal: 'Evitar consumo metabólico explosivo adicional que agrave o déficit de ATP.'
      }
    ],
    clinicalPearl:
      'Uma única crise convulsiva pós-TCE quadruplica a demanda metabólica cerebral (CMRO₂) em um cérebro que já está sem oxigênio e sem ATP.',
    reversible: true,
    criticality: 'critica'
  },
  {
    id: 'lesao_mitocondrial',
    label: 'LESÃO MITOCONDRIAL',
    shortDescription: 'Abertura do poro mPTP e colapso respiratório da organela.',
    phase: 'cellular_metabolic',
    phaseName: 'Colapso Mitocondrial',
    order: 12,
    column: 'center',
    badgeText: 'Poro mPTP Aberto',
    level: 9,
    physiologicalMechanism:
      'A sobrecarga celular e o estresse levam à abertura do poro de transição de permeabilidade mitocondrial (mPTP). A organela perde o potencial de membrana (ΔΨm), incha, desacopla a cadeia respiratória e libera proteínas pró-apoptóticas no citosol.',
    cellularDetails: [
      'Extravasamento citosólico de Citocromo C e Fator Indutor de Apoptose (AIF).',
      'Interrupção irreversível da síntese residual de ATP.',
      'Produção desgovernada de elétrons desemparelhados pelo complexo I e III.'
    ],
    monitoring: [
      'Marcadores de estresse celular sistêmico e neurológico (S100B, Enolase Neurônio-Específica - NSE)'
    ],
    clinicalInterventions: [
      {
        title: 'Controle Térmico Estrito (Normotermia Guiada)',
        category: 'Neuroproteção',
        description: 'Prevenção ativa e tratamento agressivo de febre com dispositivo intravascular ou mantas térmicas com controle servo-mecanizado (temperatura alvo 36.0 - 37.0°C).',
        targetGoal: 'Cada aumento de 1°C na temperatura eleva o metabolismo cerebral e a degradação mitocondrial em 7 a 10%.'
      }
    ],
    clinicalPearl:
      'A hipertermia é um dos fatores isolados mais destrutivos na lesão secundária: manter normotermia rigorosa é mandatório no TCE.',
    reversible: false,
    criticality: 'critica'
  },
  {
    id: 'excitotoxicidade',
    label: 'EXCITOTOXICIDADE',
    shortDescription: 'Liberação massiva de Glutamato e superestimulação de receptores.',
    phase: 'cellular_metabolic',
    phaseName: 'Cascata de Excitotoxicidade',
    order: 13,
    column: 'center',
    badgeText: 'Glutamato Maciço',
    level: 10,
    physiologicalMechanism:
      'A despolarização prolongada dos terminais pré-sinápticos provoca liberação maciça de glutamato na fenda sináptica. Simultaneamente, os transportadores astrocitários de recaptação (GLT-1/EAAT2) invertem seu funcionamento devido à perda de gradiente de sódio, despejando mais glutamato.',
    cellularDetails: [
      'Ativação patológica e sustentada de receptores ionotrópicos NMDA, AMPA e cainato.',
      'Abertura descontrolada dos canais de cátions acoplados aos receptores.',
      'Transmissão excitatória tóxica propagando-se em ondas de despolarização cortical (cortical spreading depolarization).'
    ],
    monitoring: [
      'Microdiálise cerebral: dosagem de glutamato intersticial (normal < 5 μmol/L; no TCE pode passar de 50 μmol/L)',
      'Eletrocorticografia para detecção de despolarizações alastrastes (CSD)'
    ],
    clinicalInterventions: [
      {
        title: 'Sedação Neuroprotetora com Propofol / Barbitúricos',
        category: 'Neuroproteção',
        description: 'Potencialização da via inibitória GABAérgica para contrapor o excesso glutamatérgico; em HIC refratária extrema, indução de coma barbitúrico com Tiopental com monitorização de surto-supressão no EEG.',
        targetGoal: 'Diminuir a atividade sináptica e o consumo metabólico cerebral.'
      }
    ],
    clinicalPearl:
      'O coma barbitúrico suprime a atividade elétrica sináptica e o dano excitotóxico, mas exige suporte vasoativo pesado devido à hipotensão sistêmica induzida.',
    reversible: false,
    criticality: 'critica'
  },
  {
    id: 'aumento_calcio',
    label: 'Ca²⁺ intracelular ↑',
    shortDescription: 'Afluxo tóxico maciço de íons Cálcio para dentro da célula.',
    phase: 'cellular_metabolic',
    phaseName: 'Sobrecarga de Cálcio',
    order: 14,
    column: 'center',
    badgeText: 'Calpaínas & Caspases',
    level: 11,
    physiologicalMechanism:
      'O cálcio extracelular invade o neurônio pelos canais NMDA hiperativados e canais de cálcio voltagem-dependentes. O retículo endoplasmático e as mitocôndrias falham em sequestrá-lo, elevando a concentração citosólica de Ca²⁺ livre a níveis citotóxicos fatais.',
    cellularDetails: [
      'Ativação proteolítica de calpaínas (que degradam citoesqueleto, espectrina e microtúbulos).',
      'Ativação de fosfolipases A2 (liberação de ácido araquidônico e destruição de membranas lipídicas).',
      'Ativação da óxido nítrico sintase neuronal (nNOS) gerando NO em excesso.'
    ],
    monitoring: [
      'Níveis séricos de biomarcadores de degradação axonal (GFAP e UCH-L1)',
      'Monitorização clínica da profundidade do coma'
    ],
    clinicalInterventions: [
      {
        title: 'Evitar Alterações Eletrolíticas Graves e Bloqueio Sináptico',
        category: 'Hemodinâmica',
        description: 'Manejo rigoroso do equilíbrio iônico; prevenção de hipocalcemia iônica ou hipomagnesemia (o Magnésio é um bloqueador fisiológico natural do canal de cálcio NMDA).',
        targetGoal: 'Manter homeostase de cátions divalentes séricos.'
      }
    ],
    clinicalPearl:
      'O cálcio é o "gatilho de execução" da célula: uma vez que o afluxo ultrapassa a capacidade de tamponamento mitocondrial, a maquinaria de autodestruição é disparada.',
    reversible: false,
    criticality: 'fatal'
  },
  {
    id: 'aumento_radicais',
    label: 'RADICAIS LIVRES ↑',
    shortDescription: 'Explosão de estresse oxidativo e peroxidação lipídica.',
    phase: 'cellular_metabolic',
    phaseName: 'Estresse Oxidativo',
    order: 15,
    column: 'center',
    badgeText: 'ROS / Peroxidação',
    level: 12,
    physiologicalMechanism:
      'A combinação de cálcio elevado, ferro livre das hemorragias e mitocôndrias danificadas gera avalanche de Espécies Reativas de Oxigênio (ROS: ânion superóxido O₂⁻, peróxido de hidrogênio H₂O₂, radical hidroxila •OH) e Peroxinitrito (ONOO⁻). O cérebro é extremamente rico em lipídios polinsaturados e pobre em defesas antioxidantes enzimáticas.',
    cellularDetails: [
      'Peroxidação em cadeia dos ácidos graxos fosfolipídicos da membrana neuronal e astrocitária.',
      'Destruição de proteínas de transporte e quebra da integridade das organelas.',
      'Fragmentação do DNA nuclear e danos à matriz celular.'
    ],
    monitoring: [
      'Gasometria e lactatemia arterial',
      'Biomarcadores de estresse inflamatório sistêmico'
    ],
    clinicalInterventions: [
      {
        title: 'Prevenção de Hiperóxia Iatrogênica Excessiva',
        category: 'Ventilação',
        description: 'Ajuste de FiO₂ para manter PaO₂ entre 80 e 120 mmHg (ou SpO₂ 94-98%). Evitar hiperóxia severa não indicada (PaO₂ > 200-300 mmHg), pois a hiperóxia arterial descontrolada gera radicais livres adicionais no tecido reperfundido.',
        targetGoal: 'Evitar estresse oxidativo iatrogênico por hiperóxia.'
      }
    ],
    clinicalPearl:
      'Oxigênio em excesso também é tóxico: a hiperóxia arterial acarreta vasoconstrição cerebral e superprodução de radicais livres, agravando a lesão secundária.',
    reversible: false,
    criticality: 'fatal'
  },
  {
    id: 'morte_celular',
    label: 'MORTE CELULAR',
    shortDescription: 'Perda irreversível de neurônios, glia e células endoteliais.',
    phase: 'death_pathway',
    phaseName: 'Vias de Destruição Celular',
    order: 16,
    column: 'center',
    badgeText: 'Necrose vs Apoptose',
    level: 13,
    physiologicalMechanism:
      'O acúmulo de dano oxidativo, proteólise enzimática e esgotamento de ATP culmina na morte das células neurais e da neurovasculatura. O destino se bifurca em dois padrões morfológicos e bioquímicos fundamentais: necrose (morte catastrófica lítica) e apoptose (morte programada mediada por caspases).',
    cellularDetails: [
      'Destruição de redes sinápticas funcionais corticais e subcorticais.',
      'Liberação de DAMPs (padrões moleculares associados ao dano) estimulando a micróglia local.',
      'Infiltração de neutrófilos e monócitos amplificando a neuroinflamação estéril.'
    ],
    monitoring: [
      'TC de Crânio evolutiva: aparecimento de áreas hipodensas de infarto e necrose tecidual',
      'Ressonância Magnética com difusão (DWI) demonstrando restrição isquêmica irreversível'
    ],
    clinicalInterventions: [
      {
        title: 'Neurointensivismo Multimodal e Prevenção de Insultos Secundários',
        category: 'Neuromonitorização',
        description: 'Todas as medidas de proteção neurointensiva visam salvar o tecido na penumbra perilesional antes que cruze a fronteira da morte celular.',
        targetGoal: 'Confinar o volume da lesão ao mínimo indispensável.'
      }
    ],
    clinicalPearl:
      'Neurônios do sistema nervoso central de adultos não se regeneram: cada milímetro de parênquima que morre representa déficit neurológico permanente.',
    reversible: false,
    criticality: 'fatal'
  },
  {
    id: 'necrose',
    label: 'NECROSE',
    shortDescription: 'Lise celular violenta, ruptura da membrana e inflamação estéril.',
    phase: 'death_pathway',
    phaseName: 'Via Lítica / Inflamatória',
    order: 17,
    column: 'left',
    badgeText: 'Ruptura & Lise',
    level: 14,
    physiologicalMechanism:
      'Morte celular desregulada que ocorre no núcleo das áreas mais isquêmicas. A célula incha catastroficamente (oncode), a membrana plasmática rompe-se e derrama o conteúdo citosólico no interstício, deflagrando tempestade neuroinflamatória violenta.',
    cellularDetails: [
      'Liberação de HMGB1, ATP livre e DNA mitocondrial para o espaço extracelular.',
      'Ativação dos receptores Toll-like (TLR4) na micróglia com produção de IL-1β, IL-6 e TNF-α.',
      'Colapso direto e desintegração das paredes dos microcapilares.'
    ],
    monitoring: [
      'Proteína C Reativa (PCR) sérica e curva térmica (diagnóstico diferencial com sepse/pneumonia de aspiração)'
    ],
    clinicalInterventions: [
      {
        title: 'Manutenção de Profilaxias Gerais de Terapia Intensiva',
        category: 'Neuroproteção',
        description: 'Prevenção de infecções secundárias, aspiração pulmonar, controle hemodinâmico estrito e suporte metabólico.',
        targetGoal: 'Evitar síndrome de resposta inflamatória sistêmica (SIRS) descompensadora.'
      }
    ],
    clinicalPearl:
      'A necrose não é um evento silencioso: os debris celulares e toxinas derramados destroem os neurônios vizinhos que poderiam ter sobrevivido.',
    reversible: false,
    criticality: 'fatal'
  },
  {
    id: 'apoptose',
    label: 'APOPTOSE',
    shortDescription: 'Morte celular programada com ativação de caspases.',
    phase: 'death_pathway',
    phaseName: 'Via Programada',
    order: 18,
    column: 'right',
    badgeText: 'Caspase-3 Ativada',
    level: 14,
    physiologicalMechanism:
      'Ocorre predominantemente na penumbra isquêmica e pode perdurar por dias ou semanas após o TCE. Depende de ativação enzimática coordenada (caspase-9 via mitocôndria e caspase-8 via receptores de morte Fas/TNF), fragmentando o DNA em oligômeros organizados.',
    cellularDetails: [
      'Condensação da cromatina nuclear (picnose) e encolhimento celular.',
      'Clivagem de substratos vitais por Caspase-3 ativa.',
      'Formação de corpos apoptóticos fagocitados pela micróglia sem inflamação purulenta grosseira.'
    ],
    monitoring: [
      'Evolução neurológica a médio e longo prazo (GOS-E / Escala de Resultados de Glasgow Estendida)'
    ],
    clinicalInterventions: [
      {
        title: 'Janela de Neuroproteção Molecular (Em Pesquisa Clínica)',
        category: 'Neuroproteção',
        description: 'Intervenções precoces que diminuem estresse mitocondrial e apoptose celular tardia (como hipotermia controlada e agentes neuroprotetores em ensaios clínicos).',
        targetGoal: 'Interromper a cascata antes do engajamento do complexo do apoptossomo.'
      }
    ],
    clinicalPearl:
      'Diferente da necrose, a apoptose requer energia residual (ATP) para executar seu programa de morte; por isso ocorre preferencialmente na zona periférica de penumbra.',
    reversible: false,
    criticality: 'fatal'
  },
  {
    id: 'agravamento_edema',
    label: 'AGRAVAMENTO DO EDEMA',
    shortDescription: 'Destruição da barreira hematoencefálica e feedback positivo fatal.',
    phase: 'terminal',
    phaseName: 'Ciclo Vicioso / Descompensação',
    order: 19,
    column: 'center',
    badgeText: 'FEEDBACK POSITIVO',
    level: 15,
    physiologicalMechanism:
      'A lise celular necrótica e a tempestade de citocinas inflamatórias destroem os pés astrocitários e os vasos da BHE de forma extensa. O edema cerebral secundário torna-se maciço, gerando novo e colossal aumento de volume tecidual que realimenta a Hipertensão Intracraniana!',
    cellularDetails: [
      'Permeabilidade microvascular descontrolada com extravasamento contínuo de albumina e soro.',
      'Colapso total da regulação osmótica tecidual encefálica.',
      'Inchaço pan-hemisférico difuso.'
    ],
    monitoring: [
      'TC de Crânio de controle demonstrando apagamento completo dos sulcos, ventrículos colapsados e perda dos limites cinzenta-branca',
      'Refração total da PIC aos tratamentos de primeiro e segundo níveis'
    ],
    clinicalInterventions: [
      {
        title: 'Craniectomia Descompressiva de Resgate (Nível 3 BTF)',
        category: 'Cirúrgico',
        description: 'Remoção cirúrgica ampla de retalho ósseo (frontotemporoparietal unilateral de pelo menos 12x15 cm ou bifrontal) com duroplastia de expansão.',
        targetGoal: 'Romper a caixa rígida craniana de Monro-Kellie para evitar herniação iminente do tronco encefálico.'
      }
    ],
    clinicalPearl:
      'Este é o ponto em que o ciclo se torna autorreforçador: o edema gera mais HIC, que gera mais isquemia, que gera mais morte celular, que gera mais edema. Sem intervenção heroica, o desfecho é fatal.',
    reversible: false,
    criticality: 'fatal'
  },
  {
    id: 'aumento_severo_pic',
    label: '↑↑ PRESSÃO INTRACRANIANA',
    shortDescription: 'Hipertensão Intracraniana Refratária e colapso de perfusão.',
    phase: 'terminal',
    phaseName: 'HIC Extrema / Refratária',
    order: 20,
    column: 'center',
    badgeText: 'PIC > 35-40 mmHg',
    level: 16,
    physiologicalMechanism:
      'A PIC atinge valores extremos (frequentemente > 35-50 mmHg), aproximando-se da Pressão Arterial Média. A PPC cai para menos de 20-30 mmHg. Ocorre parada mecânica do influxo de sangue arterial para o encéfalo.',
    cellularDetails: [
      'Colapso completo da vasculatura cerebral por pressão externa superior à pressão intraluminal.',
      'Início da parada circulatória encefálica (tamponamento cerebral).'
    ],
    monitoring: [
      'Sinais clínicos da Tríade de Cushing: Hipertensão Arterial com aumento da pressão de pulso + Bradicardia acentuada + Alteração do padrão respiratório',
      'Doppler Transcraniano mostrando fluxo reverberante ou espículas sistólicas (parada circulatória)'
    ],
    clinicalInterventions: [
      {
        title: 'Medidas Extremas de Terceiro Nível / Protocolo de Resgate Cirúrgico',
        category: 'Cirúrgico',
        description: 'Craniectomia descompressiva imediata se elegível, ou indução de coma barbitúrico com monitorização de EEG até surto-supressão se PAM tolerar.',
        targetGoal: 'Descompressão física urgente.'
      }
    ],
    clinicalPearl:
      'A Tríade de Cushing é um sinal tardio pré-terminal: quando se manifesta plenamente, o tronco encefálico já está sofrendo compressão crítica.',
    reversible: false,
    criticality: 'fatal'
  },
  {
    id: 'herniacao',
    label: 'HERNIAÇÃO CEREBRAL',
    shortDescription: 'Deslocamento físico do parênquima através das aberturas durais.',
    phase: 'terminal',
    phaseName: 'Deslocamento Mecânico',
    order: 21,
    column: 'center',
    badgeText: 'Compressão de Tronco',
    level: 17,
    physiologicalMechanism:
      'Gradientes de pressão internos forçam o tecido cerebral edematoso a herniar-se através de compartimentos rígidos: Herniação Uncal (o uncus do lobo temporal comprime o III par craniano e o mesencéfalo), Herniação Central (transtentorial descendente), Herniação Subfalcina ou Herniação Tonsilar/Amigdaliana (amígdalas cerebelares comprimem o bulbo através do forame magno).',
    cellularDetails: [
      'Compressão do III nervo craniano (oculomotor) homolateral gerando midríase paralítica e arreativa.',
      'Compressão do pedúnculo cerebral contralateral (Fenômeno de Kernohan) ou homolateral gerando hemiplegia.',
      'Hemorragias de Duret secundárias no tronco encefálico por cisalhamento de vasos perfurantes basilares.'
    ],
    monitoring: [
      'Pupilas: anisocoria aguda com midríase fixa unilateral evoluindo para midríase bilateral paralítica',
      'Postura de descerebração (extensão) ou descorticação (flexão anômala)',
      'Perda de reflexos de tronco: oculocefálico, vestíbulo-ocular e corneano'
    ],
    clinicalInterventions: [
      {
        title: 'Medidas Hiperagudas de Resgate Máximo',
        category: 'Osmoterapia',
        description: 'Bolus imediato de Salina Hipertônica 20% (60 mL) ou Manitol a 20%, hiperventilação agressiva de resgate temporário enquanto o paciente é transportado diretamente para o centro cirúrgico para craniectomia de urgência.',
        targetGoal: 'Reverter o cone de pressão antes que a isquemia de tronco se torne irreversível.'
      }
    ],
    clinicalPearl:
      'Uma pupila dilatada e fixa no TCE não é apenas um sinal neurológico: é uma emergência cirúrgica de minutos. Se bilateral, a chance de sobrevivência cai drasticamente.',
    reversible: false,
    criticality: 'fatal'
  },
  {
    id: 'morte',
    label: 'MORTE',
    shortDescription: 'Morte encefálica por parada circulatória e colapso do centro vasomotor.',
    phase: 'terminal',
    phaseName: 'Óbito / Morte Encefálica',
    order: 22,
    column: 'center',
    badgeText: 'Morte Encefálica',
    level: 18,
    physiologicalMechanism:
      'Compressão isquêmica catastrófica e infarto hemorrágico do bulbo e ponte encefálica. Colapso completo do centro cardiorrespiratório bulbar, gerando apneia, hipotensão refratária neurogênica e parada circulatória encefálica confirmada.',
    cellularDetails: [
      'Necrose coagulativa pan-encefálica (respirator brain).',
      'Cessação total de qualquer consumo metabólico de oxigênio ou atividade bioelétrica.'
    ],
    monitoring: [
      'Protocolo oficial de Morte Encefálica (CFM - Resolução 2.173/17): dois exames clínicos por médicos diferentes com intervalo mínimo, teste de apneia positivo (PaCO₂ > 55 mmHg sem esforço respiratório) e exame comprobatório de ausência de fluxo ou atividade elétrica (Doppler Transcraniano, Arteriografia, Cintilografia ou EEG).'
    ],
    clinicalInterventions: [
      {
        title: 'Suporte Hemodinâmico para Manutenção de Potencial Doador de Órgãos',
        category: 'Hemodinâmica',
        description: 'Após confirmação formal de morte encefálica, se a família autorizar doação de órgãos: terapia hormonal (Levotiroxina, Corticoide, Insulina), reposição de Desmopressina (DDAVP) para diabetes insipidus e manutenção hemodinâmica vigorosa para viabilizar doação de múltiplos órgãos.',
        targetGoal: 'Salvar outras vidas através do transplante de órgãos vitais.'
      }
    ],
    clinicalPearl:
      'A morte encefálica no TCE é a consequência final da lesão secundária não contida. Todo o protocolo de neurotrauma existe para impedir que o paciente alcance este último degrau da cascata.',
    reversible: false,
    criticality: 'fatal'
  }
];

export const TCE_CONNECTIONS: PathwayConnection[] = [
  { from: 'tce', to: 'lesao_primaria' },
  { from: 'lesao_primaria', to: 'alteracao_vascular' },
  { from: 'lesao_primaria', to: 'edema' },
  { from: 'alteracao_vascular', to: 'queda_perfusao_vasc' },
  { from: 'edema', to: 'aumento_volume' },
  { from: 'queda_perfusao_vasc', to: 'aumento_pic' },
  { from: 'aumento_volume', to: 'aumento_pic' },
  { from: 'aumento_pic', to: 'queda_perfusao' },
  { from: 'queda_perfusao', to: 'isquemia' },
  { from: 'isquemia', to: 'queda_oxigenacao' },
  { from: 'queda_oxigenacao', to: 'disfuncao_celular' },
  { from: 'disfuncao_celular', to: 'lesao_mitocondrial' },
  { from: 'lesao_mitocondrial', to: 'excitotoxicidade' },
  { from: 'excitotoxicidade', to: 'aumento_calcio' },
  { from: 'aumento_calcio', to: 'aumento_radicais' },
  { from: 'aumento_radicais', to: 'morte_celular' },
  { from: 'morte_celular', to: 'necrose' },
  { from: 'morte_celular', to: 'apoptose' },
  { from: 'necrose', to: 'agravamento_edema' },
  { from: 'apoptose', to: 'agravamento_edema' },
  { from: 'agravamento_edema', to: 'aumento_severo_pic' },
  { from: 'aumento_severo_pic', to: 'herniacao' },
  { from: 'herniacao', to: 'morte' },
  // Loop do Ciclo Vicioso (Feedback Positivo mortal):
  { from: 'agravamento_edema', to: 'aumento_pic', isViciousCycle: true, label: 'Ciclo Vicioso (Feedback Positivo)' }
];

export interface QuizCase {
  id: string;
  title: string;
  patientScenario: string;
  gcs: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  relatedNodeId: string;
}

export const CLINICAL_QUIZ_CASES: QuizCase[] = [
  {
    id: 'case_1',
    title: 'Caso 1: A Importância da PAM e PPC',
    patientScenario:
      'Homem de 24 anos, vítima de colisão moto x anteparo, admitido em sala de trauma com ECG = 7 (Ocular 1, Verbal 2, Motor 4). Intubado na cena. Durante a admissão, PA = 85/50 mmHg (PAM ≈ 62 mmHg). TC de crânio mostra contusão temporal esquerda e desvio de linha média de 2 mm. Cateter intraparenquimatoso revela PIC = 24 mmHg.',
    gcs: 7,
    question: 'Qual é a Pressão de Perfusão Cerebral (PPC) atual deste paciente e qual a conduta imediata mandatória?',
    options: [
      {
        text: 'PPC = 38 mmHg. Iniciar vasopressor (Noradrenalina) e ressuscitação com cristaloides isotônicos para elevar a PAM e restaurar PPC ≥ 60 mmHg.',
        isCorrect: true,
        explanation:
          'Correto! PPC = PAM - PIC = 62 - 24 = 38 mmHg. Este valor está em faixa de isquemia crítica (< 50-60 mmHg). O paciente sofrerá infarto secundário se a pressão de perfusão não for restabelecida imediatamente com elevação da PAM.'
      },
      {
        text: 'PPC = 62 mmHg. A prioridade é iniciar hiperventilação agressiva para reduzir a PaCO₂ para 25 mmHg.',
        isCorrect: false,
        explanation:
          'Incorreto. A PPC é PAM menos PIC (62 - 24 = 38 mmHg). Além disso, hiperventilar para PaCO₂ < 30 mmHg causaria vasoconstrição cerebral severa e pioraria catastroficamente a isquemia!'
      },
      {
        text: 'PPC = 86 mmHg. Deve-se iniciar anti-hipertensivo intravenoso para evitar transformação hemorrágica.',
        isCorrect: false,
        explanation:
          'Incorreto. O paciente está francamente hipotenso (PAM 62) e com PPC crítica de 38 mmHg. Administrar anti-hipertensivo levaria à parada de fluxo encefálico e morte celular acelerada.'
      }
    ],
    relatedNodeId: 'queda_perfusao'
  },
  {
    id: 'case_2',
    title: 'Caso 2: A Pupila Anisocórica e a Herniação',
    patientScenario:
      'Mulher de 35 anos em pós-operatório de drenagem parcial de hematoma subdural. No leito de UTI, a enfermeira nota que a pupila direita tornou-se midriática (6 mm) e fotorreagente lenta, com postura de descerebração no hemicorpo esquerdo. A monitorização da PIC disparou para 36 mmHg.',
    gcs: 4,
    question: 'Qual o mecanismo anatômico e a conduta de resgate hiperagudo?',
    options: [
      {
        text: 'Herniação do Uncus do lobo temporal comprimindo o III nervo craniano e o mesencéfalo. Conduta: Bolus imediato de Salina Hipertônica 20% ou Manitol e contato cirúrgico urgente.',
        isCorrect: true,
        explanation:
          'Exato! A midríase unilateral ipsilateral com déficit motor contralateral reflete herniação transtentorial/uncal com compressão das fibras parassimpáticas do nervo oculomotor e do pedúnculo cerebral. Exige osmoterapia em bólus de emergência e descompressão neurocirúrgica.'
      },
      {
        text: 'Herniação amigdaliana pelo forame magno comprimindo a medula cervical. Conduta: Punção lombar imediata para alívio liquórico.',
        isCorrect: false,
        explanation:
          'Incorreto e perigoso! A punção lombar na presença de hipertensão intracraniana e lesão expansiva é estritamente contraindicada, pois cria gradiente craniocaudal que acelera a herniação mortal.'
      },
      {
        text: 'Acidente vascular encefálico isquêmico embólico da artéria oftálmica. Conduta: Trombolítico intravenoso.',
        isCorrect: false,
        explanation:
          'Incorreto. No pós-operatório de TCE grave, a anisocoria súbita com PIC de 36 mmHg é sinal inequívoco de herniação uncal expansiva. Trombolítico é absolutamente proibido.'
      }
    ],
    relatedNodeId: 'herniacao'
  },
  {
    id: 'case_3',
    title: 'Caso 3: Excitotoxicidade e Calma Elétrica',
    patientScenario:
      'Paciente masculino com TCE grave apresenta episódio súbito de crise convulsiva tônico-clônica generalizada na UTI, durando 3 minutos. Após o término, o PbtO₂ que estava em 23 mmHg caiu abruptamente para 11 mmHg e a PIC subiu de 16 para 28 mmHg.',
    gcs: 6,
    question: 'Por que a convulsão precipita tão violentamente a cascata da lesão secundária?',
    options: [
      {
        text: 'Porque dispara despolarizações massivas com liberação extrema de Glutamato, sobrecarga de Ca²⁺ intracelular e explosão na demanda de ATP e oxigênio em um tecido hipoxemiado.',
        isCorrect: true,
        explanation:
          'Correto! As convulsões pós-traumáticas provocam disparo neuronal síncrono descontrolado. Isso esgota o ATP residual, satura a capacidade mitocondrial, libera ondas de glutamato excitotóxico e agrava a hipóxia tecidual (queda do PbtO₂ para 11 mmHg).'
      },
      {
        text: 'Porque as convulsões provocam vasoconstrição primária das grandes artérias do polígono de Willis.',
        isCorrect: false,
        explanation:
          'Incorreto. As convulsões elevam o metabolismo cerebral de forma exponencial (CMRO₂), gerando mismatch crítico entre oferta e demanda de oxigênio.'
      }
    ],
    relatedNodeId: 'excitotoxicidade'
  }
];
