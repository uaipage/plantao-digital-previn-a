export interface PatientCase {
  id: number;
  bed: string;
  name: string;
  age: number;
  diagnosis: string;
  sbar: {
    situation: string;
    background: string;
    assessment: string;
    recommendation: string;
  };
  scenario: string;
  enigmaTitle: string;
  options: { label: string; text: string }[];
  correctAnswer: number; // 0-indexed
  letter: string;
  letterIndex: number; // position in PREVINA (0-indexed)
  successMessage: string;
  wrongExplanations: string[];
  // Phase 2 Braden
  braden: {
    sensoryPerception: number;
    moisture: number;
    activity: number;
    mobility: number;
    nutrition: number;
    frictionShear: number;
    total: number;
    risk: string;
  };
  // Phase 3 Treatment
  lesionDescription: string;
  correctTreatments: string[];
  treatmentExplanation: string;
  nursingAction: string;
}

export const PASSWORD = "PREVINA";

export const patients: PatientCase[] = [
  {
    id: 201,
    bed: "Leito 201",
    name: "Joaquim Pereira",
    age: 77,
    diagnosis: "Pneumonia (PNM) + Insuficiência Respiratória Aguda (IRPA) - DPOC",
    sbar: {
      situation: "6ºDIH, admitido hoje, vindo da UTI, com quadro de Pneumonia + Insuficiência Respiratória Aguda.",
      background: "DM; DPOC. Ex-tabagista (8 anos/maço). Fratura de fêmur há 3 anos.",
      assessment: "Glasgow 13 (AO:3/RV:4/RM:6), PIF+. Acamado, força muscular grau IV em MMSS e grau III em MMII, dependência para mobilização, com dor (5/10). Cateter nasal de O2 a 2L/min; dispneia aos pequenos esforços, hemodinamicamente estável. Dieta pastosa VO com aceitação <50%. Evacuação pastosa 2x em 24h. Micção em fralda (uso de diurético). Lesão 3 cm na região auricular E com tecido necrótico seco. CVP em dorso de mão E (J20). Hiperglicêmico e afebril.",
      recommendation: "Vigilância infecciosa e respiratória. Analgesia CPM. Curativo na lesão auricular. Estimular aceitação da dieta. Monitorar balanço hídrico. Controle de glicemia. Meropenem 1g IV 8/8h (D6)."
    },
    scenario: "O Sr. Joaquim está \"escorregando\" na cama a todo momento. O queixo encostando no peito. O cateter nasal está esticado, pressionando a parte superior da orelha. A fralda está úmida.",
    enigmaTitle: "Enigma: Posicionamento de dispositivos (\"P\")",
    options: [
      { label: "A", text: "Coloca a cama em posição de trendelemburg, puxa o paciente pelas axilas de volta para o travesseiro, eleva a cabeceira a 90° para melhorar a respiração e reforça a fixação do cateter." },
      { label: "B", text: "Chama ajuda para reposicionar usando lençol móvel para evitar atrito, mantém cabeceira a 30-45°, eleva os membros inferiores para evitar deslizamento e protege as orelhas do atrito com o cateter com hidrocoloide ou gaze." },
      { label: "C", text: "Mantém o paciente na posição, priorizando a vontade dele, pois ele geme ao ser mobilizado. Troca a fralda, protege as orelhas do atrito com o cateter com hidrocoloide ou gaze, seguido da elevação da cabeceira à 45°." },
      { label: "D", text: "Reposiciona o paciente sobre o leito com uso de travessa, elevando a cabeceira a 45º, coloca almofadas d'água nos calcanhares para diminuir a pressão e usa fita microporosa para evitar a movimentação dos dispositivos." }
    ],
    correctAnswer: 1,
    letter: "P",
    letterIndex: 0,
    successMessage: "Excelente! A proteção da orelha cobre o P que diz respeito a diminuição da fricção e cisalhamento. A cabeceira não deve ser elevada em ângulo maior que 30-45°, se não houver contraindicação médica.",
    wrongExplanations: [
      "Atente-se em relação à fixação do cateter, se estiver muito apertado pode exercer grande pressão na pele e ocasionar lesões. O posicionamento à 90° não é recomendado para repouso prolongado por aumentar riscos de lesão por pressão.",
      "",
      "Ao priorizar a vontade do paciente, há aumento no risco para agravar o processo de recuperação, portanto é ideal conversar e tentar um consenso para a mobilização, evitando manter a mesma posição por tempo prolongado.",
      "É falso que o uso de almofadas d'água auxiliam na prevenção de lesões por pressão, pois podem ocasionar falha na redistribuição de pressão."
    ],
    braden: {
      sensoryPerception: 2,
      moisture: 3,
      activity: 1,
      mobility: 2,
      nutrition: 2,
      frictionShear: 1,
      total: 11,
      risk: "Risco Alto"
    },
    lesionDescription: "LPP Estágio 1 na região auricular E com tecido necrótico seco.",
    correctTreatments: ["Colagenase", "Hidrocolóide", "Filme Transparente"],
    treatmentExplanation: "Película protetora ou placa de hidrocoloide para proteção da região auricular e prevenção de progressão da lesão.",
    nursingAction: "Proteger orelhas do atrito com cateter nasal e reposicionar frequentemente."
  },
  {
    id: 202,
    bed: "Leito 202",
    name: "Lucinda Alves",
    age: 51,
    diagnosis: "Acidente Vascular Cerebral Isquêmico (AVCi)",
    sbar: {
      situation: "30ºDIH com quadro de Acidente Vascular Cerebral Isquêmico (AVCi).",
      background: "HAS, encontrada em domicílio com tempo de início dos sintomas indeterminado.",
      assessment: "Glasgow 13 (AO:4/RV:2/RM:6), PIF+. Acamada, hemiplegia à D, força muscular grau IV à E, dependência para mobilização, com sinais de dor. Em ar ambiente, hemodinamicamente estável. Disfagia, jejum no momento, aguarda RX para liberação de sonda para alimentação. Evacuação ausente nas 24h. Micção espontânea em fralda. Lesão 7 cm em região sacral, com esfacelos em centro e tecido de granulação ao redor, bordas irregulares, maceradas e sangrantes. Hipodermóclise em coxa D (J22). Normoglicêmica e afebril.",
      recommendation: "Analgesia CPM. Manter jejum até liberação da sonda. Curativo em região sacral. Mudança de decúbito frequente. Sem antibioticoterapia."
    },
    scenario: "Lucinda está em jejum prolongado aguardando confirmação do posicionamento da sonda por RX. A lesão sacral precisa de atenção urgente.",
    enigmaTitle: "Enigma: Avaliação de Risco e Nutrição (\"A\" e \"N\")",
    options: [
      { label: "A", text: "Risco Alto. Percepção sensorial alterada (pelo AVC), com mobilidade totalmente limitada. A nutrição não é urgente, visto que está adequada à situação clínica." },
      { label: "B", text: "Risco Moderado. Percepção sensorial limitada (pelo AVC), com mobilidade reduzida, preservada parcialmente. O início da dieta enteral é urgente, mesmo sem o RX de confirmação." },
      { label: "C", text: "Risco Alto. Percepção sensorial alterada (pelo AVC), com mobilidade totalmente limitada. A dieta, a partir da confirmação pelo RX, do posicionamento da sonda, é urgente, pois o jejum prolongado reduz a tolerância tecidual." },
      { label: "D", text: "Risco Baixo. Percepção sensorial afetada (pelo AVC), com mobilidade reduzida, preservada parcialmente, consegue se alimentar adequadamente." }
    ],
    correctAnswer: 2,
    letter: "R",
    letterIndex: 1,
    successMessage: "Exato! A Avaliação correta dispara o alerta, ela possui um Risco Alto para desenvolvimento ou agravamento da lesão por pressão. A Nutrição é o \"combustível\" para manter a pele íntegra. Pistas Coletadas: Letras R, E",
    wrongExplanations: [
      "Um paciente com desenvolvimento de lesão por pressão não deve ficar em jejum prolongado, pois, em pacientes críticos, prejudica a cicatrização e promove a evolução da ferida.",
      "Uma paciente acamada, dependente e com hemiplegia (FM 0) é classificada como Alto Risco pela Escala de Braden. Além disso, é necessário o RX para confirmar o posicionamento da sonda.",
      "",
      "Classificar como \"Risco Baixo\" ignora a realidade de uma paciente com AVCi crônico (30 dias de internação) e lesão cutânea já existente."
    ],
    braden: {
      sensoryPerception: 2,
      moisture: 2,
      activity: 1,
      mobility: 1,
      nutrition: 1,
      frictionShear: 1,
      total: 8,
      risk: "Risco Severo"
    },
    lesionDescription: "LPP Sacral Estágio 3 (perda total da espessura da pele), com esfacelos centrais e tecido de granulação ao redor.",
    correctTreatments: ["Papaína 10%", "Hidrofibra", "AGE (Ácidos Graxos Essenciais)", "Óxido de Zinco", "Soro Fisiológico"],
    treatmentExplanation: "Alginato de Cálcio ou Hidrofibra (devido às bordas sangrantes e necessidade de preenchimento) associado a curativo secundário absorvente.",
    nursingAction: "Mudança de decúbito rigorosa de 2h/2h, já que a paciente é totalmente imóvel."
  },
  {
    id: 203,
    bed: "Leito 203",
    name: "Maria Aparecida Soares",
    age: 64,
    diagnosis: "2° PO de hemicolectomia à D por CA de Cólon",
    sbar: {
      situation: "3ºDIH, 2° PO de hemicolectomia à D por CA de Cólon, com dreno de sucção em fossa ilíaca D.",
      background: "Anemia.",
      assessment: "Glasgow 14 (AO:3/RV:5/RM:6), PIF+. Deambula ocasionalmente, força muscular grau V, dependência parcial para movimentação, com dor (8/10). Em ar ambiente, hemodinamicamente estável. Dieta geral VO com aceitação.",
      recommendation: "Coletar 1 par de hemoculturas e swab do dreno. Iniciar antibioticoterapia imediatamente após coleta. Reavaliar a eficácia da bomba de PCA com a equipe médica. Realizar curativo em FO abdominal e inserção de dreno. Monitorar débito de dreno. Estimular aceitação da dieta."
    },
    scenario: "Ao entrar no quarto, você sente um cheiro característico. Maria está gemendo de dor (8/10). Ao levantar o lençol, a camisola está encharcada de suor e há vazamento de secreção sero-hemática do dreno Portovac, deixando a roupa de cama úmida.",
    enigmaTitle: "Enigma: Evitar a umidade (\"E\")",
    options: [
      { label: "A", text: "Controlar rigorosamente a umidade, realizando troca imediata da roupa de cama sempre que úmida, promovendo higiene adequada da pele com água morna e secagem cuidadosa, além de manter o leito limpo e seco." },
      { label: "B", text: "Posicionamento adequado do dreno Portovac, para evitar lesões por tração ou cisalhamento. Massagear as regiões de proeminências ósseas, se estiverem com hiperemia, para estimular a circulação." },
      { label: "C", text: "Verificar o posicionamento da paciente no leito e, se necessário, reposicionar rigorosamente a cada 3-4 horas. Trocar a roupa de cama e hidratar a pele do paciente." },
      { label: "D", text: "Como a paciente está com muita dor, controlar a umidade colocando mais lençóis no leito para absorção, não retirando os úmidos, evitando a movimentação excessiva e a fricção no leito." }
    ],
    correctAnswer: 0,
    letter: "E",
    letterIndex: 2,
    successMessage: "Perfeito! Evitar a fonte da umidade (curativo vazando e sudorese excessiva), e proteger a pele (barreira), evitando o uso de água quente e sabonete que podem ressecar a pele e aumentar o risco de lesão por pressão, é a essência do E.",
    wrongExplanations: [
      "",
      "O posicionamento do dreno para evitar fricção é uma ação adequada, mas massagear proeminências ósseas hiperemiadas é ineficaz e pode agravar mais o quadro.",
      "Uma escala com horários para mudança de decúbito deve ser utilizada, o posicionamento a exatamente 3-4 horas apresenta um tempo muito prolongado.",
      "Recomenda-se que retire os lençóis molhados e substitua por novos com a movimentação da paciente sendo realizada com lençol móvel e ajuda de pelo menos mais 2 pessoas da equipe."
    ],
    braden: {
      sensoryPerception: 3,
      moisture: 2,
      activity: 3,
      mobility: 3,
      nutrition: 2,
      frictionShear: 2,
      total: 15,
      risk: "Risco Leve"
    },
    lesionDescription: "Incisão abdominal com dreno Portovac apresentando vazamento de exsudato.",
    correctTreatments: ["Soro Fisiológico", "Alginato de Cálcio"],
    treatmentExplanation: "Curativo absorvente estéril trocado com frequência para evitar maceração da pele perilesional.",
    nursingAction: "Troca de camisolas e lençóis úmidos imediatamente para evitar umidade excessiva (fator de risco na Escala de Braden)."
  },
  {
    id: 204,
    bed: "Leito 204",
    name: "Otávio Araújo",
    age: 48,
    diagnosis: "Insuficiência Cardíaca Congestiva (ICC)",
    sbar: {
      situation: "1ºDIH, com quadro de Insuficiência Cardíaca Congestiva (ICC), com ortopneia severa (intolerância ao decúbito 0°).",
      background: "HAS, DM. Obesidade Grau III.",
      assessment: "Glasgow 15 (AO:4/RV:5/RM:6), PIF+. Permanece em cadeira, força muscular grau V em MMSS e grau IV em MMII, dependência parcial para movimentação, sem dor. Em ar ambiente, com uso de CN de O2 2L/min aos esforços, hemodinamicamente estável. Dieta hipossódica VO com aceitação.",
      recommendation: "Analgesia SN. Vigilância respiratória. Manter cabeceira elevada (Fowler/Semi-Fowler) ou cadeira para alívio da ortopneia. RH=1000ml/dia. Monitorar balanço hídrico. Estimular aceitação da dieta. Controle de glicemia. Sem antibioticoterapia."
    },
    scenario: "Você entra no quarto para visita de enfermagem no período noturno e observa que o paciente se encontra sentado na cadeira desde o plantão da tarde, após o almoço, dormindo.",
    enigmaTitle: "Enigma: Verificar superfície de suporte (\"V\")",
    options: [
      { label: "A", text: "Mantém o paciente na cadeira comum, sem necessidade de almofada, pois ele não sente dor e não há sinais visíveis de lesão." },
      { label: "B", text: "Verifica a superfície de suporte da cadeira, providenciando coxim/almofada de redistribuição de pressão (nunca do tipo \"roda\"/donut), reposiciona o paciente e institui alívio de pressão a cada 15 minutos, mantendo a cabeceira elevada devido à ortopneia." },
      { label: "C", text: "Coloca uma almofada tipo \"roda\" (donut) sob a região glútea para aliviar a pressão sacral enquanto ele permanece sentado." },
      { label: "D", text: "Transfere o paciente para o leito em decúbito dorsal horizontal para descansar a superfície de assento, sem considerar a ortopneia." }
    ],
    correctAnswer: 1,
    letter: "V",
    letterIndex: 3,
    successMessage: "Muito bem! Pacientes com mobilidade reduzida em cadeira precisam de uma superfície de suporte adequada (coxim de redistribuição de pressão), associada a alívio de pressão a cada 15 minutos. Almofadas tipo \"roda\" são contraindicadas por concentrarem pressão nas bordas.",
    wrongExplanations: [
      "Mesmo sem dor ou lesão visível, a ausência de uma superfície de suporte adequada é um fator de risco; a prevenção deve ser proativa.",
      "",
      "Almofadas tipo \"roda\"/donut são contraindicadas, pois concentram a pressão nas bordas e podem causar isquemia tecidual.",
      "O decúbito dorsal horizontal é contraindicado para pacientes com ortopneia severa como o Sr. Otávio."
    ],
    braden: {
      sensoryPerception: 4,
      moisture: 3,
      activity: 2,
      mobility: 2,
      nutrition: 2,
      frictionShear: 1,
      total: 14,
      risk: "Risco Moderado"
    },
    lesionDescription: "LPP Estágio 1 em região sacral com hiperemia que não embranquece.",
    correctTreatments: ["AGE (Ácidos Graxos Essenciais)", "Hidrocolóide"],
    treatmentExplanation: "Película Protetora sem ardor ou Placa de Hidrocoloide Extra Fino para redução do atrito.",
    nursingAction: "Manejo da anasarca e proteção da pele friável; uso de superfícies de suporte (colchão pneumático) devido ao peso elevado (IMC 42)."
  },
  {
    id: 205,
    bed: "Leito 205",
    name: "Manoel Silva",
    age: 76,
    diagnosis: "Fratura de fêmur D (aguarda cirurgia)",
    sbar: {
      situation: "2ºDIH, com quadro de Fratura de fêmur D (aguarda cirurgia amanhã) + Delirium Hipoativo.",
      background: "História de queda, durante à noite, por confusão. Hipertireoidismo. Emagrecido.",
      assessment: "Glasgow 12 (AO:3/RV:3/RM:6), PIF+. Acamado, força muscular com avaliação prejudicada, dependência para mobilização, com sinais de dor. Em ar ambiente, hemodinamicamente estável. Dieta pastosa VO com aceitação.",
      recommendation: "Puncionar novo CVP e iniciar SG5% 500ml 12/12h. Controle glicemia. Vigilância infecciosa e respiratória. Analgesia CPM. Aplicar creme barreira em região perineal nas trocas de fralda. Estimular aceitação da dieta. Sem antibioticoterapia. Jejum a partir da 0h."
    },
    scenario: "Sr. Manoel está confuso e muito magro (IMC 16). A perna direita tem uma tala posterior longa, do tornozelo até a região proximal da coxa (próxima ao trocânter), fixada com enfaixamento. O calcanhar esquerdo está em contato direto com o colchão.",
    enigmaTitle: "Enigma: Inspeção da pele (\"I\")",
    options: [
      { label: "A", text: "Olha apenas a região sacral. Como ele é magro, coloca três fraldas para \"acolchoar\" o bumbum." },
      { label: "B", text: "Realiza a Inspeção da pele sob a tala (buscando pontos de pressão do dispositivo) e eleva o calcanhar esquerdo com um travesseiro sob a panturrilha (\"flutuar o calcanhar\") para evitar LPP no calcâneo." },
      { label: "C", text: "Massageia vigorosamente os calcanhares e o sacro se estiverem hiperemiados, para melhorar a circulação." },
      { label: "D", text: "Realizar a inspeção de rotina 1 vez por semana e seguir o protocolo de reposicionamento do paciente a cada 3 horas." }
    ],
    correctAnswer: 1,
    letter: "I",
    letterIndex: 4,
    successMessage: "Muito bem! Pacientes caquéticos têm proeminências ósseas \"afiadas\". A Inspeção deve incluir áreas sob dispositivos (tala). Flutuar o calcanhar é mandatório (Calcanhares livres de pressão). Nota: Massagem em proeminência óssea é contraindicada!",
    wrongExplanations: [
      "Deve-se inspecionar todas as proeminências ósseas, inclusive sob dispositivos como talas e gesso, não apenas a região sacral. Empilhar fraldas não substitui superfícies de redistribuição de pressão adequadas.",
      "",
      "Massagem vigorosa em proeminências ósseas hiperemiadas é contraindicada, pois pode romper capilares e agravar a lesão.",
      "A inspeção da pele deve ser diária (ou mais frequente conforme risco), nunca semanal, especialmente em pacientes com dispositivos e proeminências ósseas."
    ],
    braden: {
      sensoryPerception: 2,
      moisture: 4,
      activity: 1,
      mobility: 1,
      nutrition: 1,
      frictionShear: 1,
      total: 10,
      risk: "Risco Alto"
    },
    lesionDescription: "Lesão Tissular Profunda (LTP) no calcâneo E.",
    correctTreatments: ["Soro Fisiológico", "Hidrocolóide"],
    treatmentExplanation: "Espuma de poliuretano com rebordo de silicone (calcâneo) para redistribuição de pressão.",
    nursingAction: "Uso de coxins para \"flutuar\" os calcanhares (elevação sem contato com a cama)."
  },
  {
    id: 206,
    bed: "Leito 206",
    name: "Antônia Ferreira",
    age: 82,
    diagnosis: "Síndrome de imobilidade (cadeira de rodas) / ITU",
    sbar: {
      situation: "15ºDIH com quadro de sepse de foco urinário.",
      background: "Demência. ITU de repetição. Síndrome de imobilidade (cadeira de rodas). Lesão sacral antiga desenvolvida na instituição de longa permanência para idosos.",
      assessment: "Glasgow 14 (AO:4/RV:4/RM:6), PIF+. Cadeirante, força muscular grau IV em MMSS e grau I em MMII, dependência para mobilização, sem dor (0). Em ar ambiente, hemodinamicamente estável. Dieta pastosa VO com aceitação >50%. Micção espontânea em fralda. Evacuação pastosa 1x em 24h. Lesão 5 cm em região sacral com tecido de granulação, bordas regulares, não exsudativa. Sem dispositivos. Normoglicêmica e afebril.",
      recommendation: "Alta programada para hoje. Plano de alta com orientação para os cuidadores: cuidados com lesão, fisioterapia motora, alimentação, analgesia e mobilização."
    },
    scenario: "Sra. Antônia está com alta programada, mas possui uma lesão de 5 cm na região sacral que deve garantir a cicatrização. Ela está estável e bem alimentada, mas a umidade da fralda é um fator de risco constante.",
    enigmaTitle: "Enigma: Reposicionamento (\"R\")",
    options: [
      { label: "A", text: "Orientar mudanças de decúbito a cada 4 horas durante o período noturno para não prejudicar o sono, priorizando a posição lateral a 90°, com uso de travesseiros." },
      { label: "B", text: "Recomendar reposicionamento conforme tolerância da paciente, priorizando o controle da dor e evitando mudanças frequentes para não comprometer o tecido de granulação." },
      { label: "C", text: "Manter a paciente em decúbito lateral alternado a cada 2 horas, com apoio de coxins, incentivando períodos prolongados em cadeira para estímulo funcional." },
      { label: "D", text: "Orientar reposicionamento regular e individualizado (em média a cada 2 horas no leito), evitando ângulo lateral de 90°, utilizando técnica com dois cuidadores e lençol móvel para reduzir cisalhamento, além de manejo rigoroso da umidade e inspeção cutânea sistemática." }
    ],
    correctAnswer: 3,
    letter: "N",
    letterIndex: 5,
    successMessage: "Excelente! No plano de alta deve sempre incluir orientação sobre cuidados para família e cuidadores. Puxar o paciente causa cisalhamento. O Reposicionamento eficaz e seguro deve ser feito com lençóis móveis e 2 ou mais pessoas.",
    wrongExplanations: [
      "Estabelece intervalo fixo e prolongado (4 horas) para paciente com LPP ativa. Decúbito lateral a 90° é contraindicado, devendo-se usar inclinação de 30°.",
      "Condicionar o reposicionamento apenas à tolerância dolorosa desconsidra que a prevenção depende da redução sistemática da pressão.",
      "Permanência prolongada em posição sentada aumenta pressão na região sacral em paciente com lesão ativa. Transferências com apenas um cuidador elevam o risco de cisalhamento.",
      ""
    ],
    braden: {
      sensoryPerception: 4,
      moisture: 3,
      activity: 1,
      mobility: 2,
      nutrition: 3,
      frictionShear: 1,
      total: 14,
      risk: "Risco Moderado"
    },
    lesionDescription: "LPP sacral antiga em fase de granulação (melhora clínica).",
    correctTreatments: ["Hidrogel", "Hidrocolóide", "PHMB (Polihexanida)"],
    treatmentExplanation: "Hidrogel ou Placa de Hidrocoloide para manter o meio úmido favorável à cicatrização.",
    nursingAction: "Orientações de alta para a família sobre manutenção dos cuidados e prevenção de novas lesões."
  }
];

// Letters collected per patient, based on each patient's `letter` field above.
// Password spelled: P-R-E-V-I-N-A
// P = Posicionamento (201 - Joaquim)
// R = Reposicionamento (202 - Lucinda)
// E = Evitar umidade (203 - Maria)
// V = Verificar superfície de suporte (204 - Otávio)
// I = Inspeção (205 - Manoel)
// N = Nutrição (206 - Antônia)
// A = Avaliação (202 - Lucinda também coleta esta letra)

export const LETTER_MAP: Record<number, string[]> = {
  201: ["P"],
  202: ["R", "A"],
  203: ["E"],
  204: ["V"],
  205: ["I"],
  206: ["N"],
};

// Correct order: P-R-E-V-I-N-A
export const PREVINA_ORDER = ["P", "R", "E", "V", "I", "N", "A"];

// Available treatment products for Phase 3
export const TREATMENT_PRODUCTS = [
  "AGE (Ácidos Graxos Essenciais)",
  "Alginato de Cálcio",
  "Carvão Ativado",
  "Carvão Ativado com Prata",
  "Colagenase",
  "Filme Transparente",
  "Hidrocolóide",
  "Hidrofibra",
  "Hidrogel",
  "Óxido de Zinco",
  "Papaína 10%",
  "PHMB (Polihexanida)",
  "Soro Fisiológico",
  "Sulfadiazina de Prata"
];

export const BRADEN_CATEGORIES = [
  {
    name: "Percepção Sensorial",
    key: "sensoryPerception" as const,
    levels: [
      { score: 1, label: "Totalmente Limitado", desc: "Não responde a estímulo doloroso" },
      { score: 2, label: "Muito Limitado", desc: "Responde somente a estímulo doloroso" },
      { score: 3, label: "Levemente Limitado", desc: "Responde a comandos verbais, mas nem sempre comunica desconforto" },
      { score: 4, label: "Nenhuma Limitação", desc: "Responde a comandos verbais, sem déficit sensorial" },
    ]
  },
  {
    name: "Umidade",
    key: "moisture" as const,
    levels: [
      { score: 1, label: "Completamente Molhada", desc: "Pele mantida molhada quase constantemente" },
      { score: 2, label: "Muito Molhada", desc: "Pele frequentemente, mas nem sempre, molhada" },
      { score: 3, label: "Ocasionalmente Molhada", desc: "Pele ocasionalmente molhada" },
      { score: 4, label: "Raramente Molhada", desc: "Pele geralmente seca" },
    ]
  },
  {
    name: "Atividade",
    key: "activity" as const,
    levels: [
      { score: 1, label: "Acamado", desc: "Confinado à cama" },
      { score: 2, label: "Confinado à Cadeira", desc: "Capacidade de andar severamente limitada" },
      { score: 3, label: "Anda Ocasionalmente", desc: "Anda ocasionalmente durante o dia" },
      { score: 4, label: "Anda Frequentemente", desc: "Anda fora do quarto pelo menos 2x/dia" },
    ]
  },
  {
    name: "Mobilidade",
    key: "mobility" as const,
    levels: [
      { score: 1, label: "Totalmente Imóvel", desc: "Não faz nem mesmo pequenas mudanças" },
      { score: 2, label: "Bastante Limitado", desc: "Faz pequenas mudanças ocasionais" },
      { score: 3, label: "Levemente Limitado", desc: "Faz frequentes, embora pequenas, mudanças" },
      { score: 4, label: "Não Apresenta Limitações", desc: "Faz importantes e frequentes mudanças" },
    ]
  },
  {
    name: "Nutrição",
    key: "nutrition" as const,
    levels: [
      { score: 1, label: "Muito Pobre", desc: "Nunca come uma refeição completa" },
      { score: 2, label: "Provavelmente Inadequada", desc: "Raramente come uma refeição completa" },
      { score: 3, label: "Adequada", desc: "Come mais da metade da maioria das refeições" },
      { score: 4, label: "Excelente", desc: "Come a maior parte de cada refeição" },
    ]
  },
  {
    name: "Fricção e Cisalhamento",
    key: "frictionShear" as const,
    levels: [
      { score: 1, label: "Problema", desc: "Requer assistência máxima para se mover" },
      { score: 2, label: "Problema em Potencial", desc: "Move-se com dificuldade ou requer mínima assistência" },
      { score: 3, label: "Nenhum Problema Aparente", desc: "Move-se independentemente na cama e na cadeira" },
    ]
  },
];

export function getBradenRisk(total: number): string {
  if (total <= 9) return "Risco Severo";
  if (total <= 12) return "Risco Alto";
  if (total <= 14) return "Risco Moderado";
  if (total <= 18) return "Risco Leve";
  return "Sem Risco";
}
