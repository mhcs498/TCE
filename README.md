# Cascata da Lesão Cerebral Secundária no TCE
**Autor:** Abdoulaye Marega — Residente em Neurocirurgia-HCN  
**Aplicação Interativa de Fisiopatologia, Neuromonitorização e Neurointensivismo**

---

## 1. Visão Geral

Esta aplicação é uma plataforma interativa de ensino médico e suporte à decisão fisiopatológica voltada ao **Traumatismo Cranioencefálico (TCE)**. O objetivo central é mapear de forma visual, dinâmica e clinicamente fundamentada a **cascata da lesão cerebral secundária**, permitindo que estudantes, residentes de neurocirurgia/neurologia e médicos intensivistas compreendam:

1. Como o dano mecânico primário deflagra processos bi-axiais (vasculares e edematosos).
2. O colapso da complacência intracraniana regido pela **Doutrina de Monro-Kellie**.
3. A queda crítica da **Pressão de Perfusão Cerebral** ($PPC = PAM - PIC$) e a penumbra isquêmica.
4. A falência bioenergética mitocondrial, a excitotoxicidade glutamatérgica e o afluxo letal de cálcio intracelular.
5. As vias de morte celular (**Necrose** e **Apoptose**) e o **Ciclo Vicioso de Retroalimentação Positiva** que conduz à herniação cerebral e óbito.
6. Os pontos exatos de interrupção terapêutica preconizados pelas diretrizes da **Brain Trauma Foundation (BTF)**.

---

## 2. Diagrama Estrutural da Cascata

```text
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
        AGRAVAMENTO DO EDEMA  ---> [LOOP DO CICLO VICIOSO PARA ↑ PIC]
                  ↓
       ↑↑ PRESSÃO INTRACRANIANA
                  ↓
              HERNIAÇÃO
                  ↓
                 MORTE
```

---

## 3. Fases Fisiopatológicas & Mecanismos

### Fase 1: Evento Mecânico & Lesão Primária
* **TCE (t = 0)**: Aplicação de forças mecânicas cinéticas (impacto direto, aceleração, desaceleração súbita e cisalhamento).
* **Lesão Cerebral Primária**: Contusões corticais, lacerações, hematomas intracranianos (epidural, subdural, intraparenquimatoso) e Lesão Axonal Difusa (LAD). Ocorre no instante do trauma e **não é passível de reversão farmacológica**; o foco assistencial é cirúrgico (quando há efeito de massa compressivo) e preventivo.

### Fase 2: O Desdobramento Bi-axial
* **Eixo Vascular (`Alteração Vascular` $\rightarrow$ `↓ Perfusão cerebral`)**:
  * Perda da autorregulação miogênica cerebral: os vasos perdem a capacidade de manter o FSC constante frente a variações da PAM.
  * Microtrombose capilar e vasoespasmo pós-traumático induzido por produtos de degradação da hemoglobina.
  * Oligemia cerebral regional nas primeiras 24 horas.
* **Eixo de Edema (`Edema` $\rightarrow$ `↑ Volume cerebral`)**:
  * Edema Citotóxico: falência das bombas iônicas com acúmulo intracelular de $Na^+$ e água.
  * Edema Vasogênico: quebra das *tight junctions* da Barreira Hematoencefálica (BHE) por metaloproteinases (MMP-9).
  * Ocupação do compartimento rígido craniano de Monro-Kellie.

### Fase 3: Crise Hemodinâmica & Hipóxia
* **↑ Pressão Intracraniana (PIC)**: Superação dos mecanismos compensatórios (drenagem de líquor e sangue venoso jugular), atingindo o limiar patológico de $PIC > 20-22\text{ mmHg}$.
* **↓ Perfusão Cerebral ($PPC = PAM - PIC$)**: Com a elevação da PIC, o gradiente motriz despenca abaixo do nível crítico de $60\text{ mmHg}$.
* **Isquemia & ↓ Oxigenação**: O FSC cai para valores de penumbra ($< 18\text{ mL}/100\text{g}/\text{min}$), acarretando hipóxia tecidual profunda com $PbtO_2 < 15-20\text{ mmHg}$.

### Fase 4: Cascata Bioquímica & Molecular Intracelular
* **Disfunção Celular**: Esgotamento do ATP neuronal; colapso da bomba $Na^+/K^+$ ATPase e acidose lática.
* **Lesão Mitocondrial**: Abertura do poro de transição de permeabilidade mitocondrial (mPTP), perda do potencial de membrana e extravasamento citosólico de Citocromo C.
* **Excitotoxicidade**: Despolarização anóxica com liberação massiva de Glutamato na fenda sináptica e inversão dos transportadores astrocitários de recaptação (GLT-1/EAAT2).
* **$\text{Ca}^{2+}$ Intracelular ↑**: Influxo maciço de íons cálcio via receptores NMDA/AMPA hiperativados, disparando calpaínas (proteólise do citoesqueleto), fosfolipases A2 e óxido nítrico sintase.
* **Radicais Livres ↑**: Explosão de Espécies Reativas de Oxigênio (ROS: $O_2^-$, $H_2O_2$, $\bullet OH$) e peroxinitrito, deflagrando peroxidação lipídica em cadeia das membranas neuronais.

### Fase 5: Vias de Morte Celular
* **Necrose**: Morte celular lítica e oncótica rápida com ruptura de membrana, extravasamento de DAMPs (HMGB1, DNA livre) e tempestade inflamatória aguda.
* **Apoptose**: Morte celular programada via ativação coordenada de caspases (caspase-9 e caspase-3), com condensação de cromatina e fragmentação do DNA na penumbra isquêmica.

### Fase 6: Ciclo Vicioso, Herniação & Desfecho Terminal
* **Agravamento do Edema**: A lise celular e mediadores inflamatórios destroem maciçamente mais capilares da BHE.
* **Loop do Ciclo Vicioso**: O edema secundário retroalimenta o aumento da PIC, fechando uma espiral mortal autorreforçadora.
* **↑↑ Pressão Intracraniana Refratária**: $PIC > 35-40\text{ mmHg}$ aproximando-se da PAM, com tamponamento vascular cerebral.
* **Herniação Cerebral**: Deslocamento físico de tecido através das tendas durais (herniação uncal com compressão do III par e mesencéfalo, herniação central ou amigdaliana no forame magno).
* **Morte Encefálica / Óbito**: Infarto hemorrágico e isquêmico do tronco encefálico (Hemorragias de Duret), colapso do centro cardiorrespiratório bulbar e parada circulatória encefálica.

---

## 4. Alvos Terapêuticos da Brain Trauma Foundation (BTF)

| Parâmetro | Meta Clínica Alvo | Conduta / Justificativa |
| :--- | :--- | :--- |
| **PPC (PAM - PIC)** | **60 a 70 mmHg** | Evitar PPC < 60 mmHg (isquemia) e PPC > 70 mmHg (edema vasogênico/SDRA). |
| **PIC** | **< 20 a 22 mmHg** | Tratar elevações sustentadas (> 5 min) para evitar herniação. |
| **PAM** | **≥ 80 a 90 mmHg** | Titulação de Noradrenalina; evitar qualquer episódio de PAS < 90 mmHg. |
| **$PbtO_2$ (Oxigenação Cerebral)** | **> 20 mmHg** | Ajuste ventilatório, otimização de PPC e suporte transfusional se Hb < 9 g/dL. |
| **Ventilação ($PaCO_2$)** | **35 a 40 mmHg (Normocapnia)** | Hiperventilação agressiva profilática ($PaCO_2 < 30$) é proscrita (vasoconstrição severa). |
| **Osmoterapia** | **Salina 3% ou Manitol 20%** | Alvo: $Na^+$ 145-155 mEq/L; Osmolaridade sérica < 320 mOsm/kg. |
| **Temperatura** | **36.0 a 37.0 °C (Normotermia)** | Cada 1°C acima de 37°C eleva o consumo metabólico cerebral ($CMRO_2$) em 7-10%. |
| **Posicionamento** | **Cabeceira a 30° centrada** | Otimização da drenagem venosa pelas veias jugulares internas por gravidade. |
| **Prevenção de Crises** | **Levetiracetam ou Fenitoína** | Profilaxia na 1ª semana pós-TCE grave para evitar crises epilépticas hipermetabólicas. |
| **Corticosteroides** | **CONTRAINDICADOS** | Dexametasona e metilprednisolona elevam mortalidade no TCE (Estudo CRASH). |
| **Cirurgia Descompressiva** | **Craniectomia Descompressiva** | Retalho amplo (≥ 12x15 cm) para HIC refratária de terceiro nível. |

---

## 5. Módulos e Recursos da Aplicação

1. **Fluxograma Visual Dinâmico**:
   * Layout SVG responsivo com conectores, bifurcações e convergências idênticas ao fluxo do mecanismo.
   * Filtros dinâmicos: *Todos os Níveis*, *Hemodinâmica / PIC*, *Bioquímica Celular*, *Pontos de Ação Médica*.
   * Toggle com destaque visual do **Ciclo Vicioso Mortal** (loop tracejado animado).
   * Controles de zoom in, zoom out e recentralização.

2. **Inspetor Clínico Lateral (Drawer)**:
   * Detalhamento de cada um dos 22 nós da cascata.
   * Abas de *Fisiopatologia & Mecanismo*, *Alvos de Intervenção BTF* e *Neuromonitorização*.
   * Pérolas médicas de neurocirurgia e neurointensivismo.

3. **Simulador Hemodinâmico de PPC ($PPC = PAM - PIC$)**:
   * Sliders de ajuste em tempo real para PAM (40-140 mmHg) e PIC (5-60 mmHg).
   * Classificação por faixas de risco (Ideal, Elevada, Penumbra Isquêmica, Isquemia Crítica e Parada Circulatória).
   * Presets clínicos rápidos: *Alvo Estável BTF*, *Hipotensão por Choque*, *Edema Maciço & HIC* e *Resposta de Cushing*.
   * Botão para destacar automaticamente no fluxograma os nós afetados pelo valor calculado de PPC.

4. **Simulador da Doutrina de Monro-Kellie & Curva Volume-Pressão**:
   * Slider interativo de acréscimo de volume por edema/hematoma (0 a 100 mL).
   * Gráfico vetorial interativo da curva de complacência demonstrando o salto exponencial na fase descompensada.
   * Gráfico de barras com a redistribuição dinâmica dos compartimentos (Parênquima 80%, Sangue 10%, LCR 10%, Edema).

5. **Casos Clínicos Interativos (Quiz)**:
   * Cenários baseados em pacientes reais de trauma com Escala de Coma de Glasgow, achados pupilares e PIC.
   * Justificativas pedagógicas completas para respostas corretas e incorretas.
   * Link direto entre o caso e o nó fisiopatológico correspondente.

6. **Modo Passo a Passo / Apresentação Automatizada**:
   * Reprodução automática com avanço temporizado e rolagem suave por cada etapa da cascata.
   * Barra de navegação inferior com avanço manual e indicador de fase.

7. **Guia de Estudo Completo (Exportação & Impressão)**:
   * Modal com texto formatado contendo resumo médico, metas BTF e detalhamento dos 22 passos para cópia rápida ou impressão.

---

## 6. Tecnologias Utilizadas

* **React 19** com **TypeScript**
* **Vite** para empacotamento ultrarrápido
* **Tailwind CSS v4** para estilização clínica moderna e acessível
* **Lucide React** para iconografia médica e de navegação
* **Motion** para microinterações fluidas

---

## 7. Como Executar Localmente

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Verificar tipagem e linting
npm run lint

# Compilar para produção
npm run build
```

---

*Aplicação desenvolvida para fins de educação médica continuada e treinamento em neurotrauma.*  
**Autoria: Abdoulaye Marega — Residente em Neurocirurgia-HCN**
