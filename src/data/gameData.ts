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
  treatmentQuestion: string;
  productOptions: string[];
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
      { label: "A", text: "Realiza o reposicionamento com lençol móvel em dupla, eleva a cabeceira a pelo menos 60° para otimizar o padrão ventilatório e ajusta a fixação do cateter com fita hipoalergênica sob leve tração para evitar deslocamento." },
      { label: "B", text: "Solicita ajuda para reposicionamento no leito usando lençol móvel para evitar atrito, mantém cabeceira a 30-45°, eleva os membros inferiores para evitar deslizamento e protege as orelhas do atrito com o cateter com hidrocoloide." },
      { label: "C", text: "Mantém o decúbito atual provisoriamente devido à queixa álgica à mobilização, reposicionando-o suavemente pelo tronco superior após analgesia, e aplica filme transparente nas orelhas para reduzir a fricção, seguido da elevação da cabeceira à 45° para evitar broncoaspiração." },
      { label: "D", text: "Reposiciona o paciente sobre o leito com uso de lençol móvel, elevando a cabeceira 30-45º, posiciona almofadas d'água nos calcanhares para diminuir a pressão e utiliza fita microporosa sob leve tração para evitar a movimentação dos dispositivos a atrito com a pele." }
    ],
    correctAnswer: 1,
    letter: "P",
    letterIndex: 0,
    successMessage: "Excelente! A proteção da orelha com hidrocolóide, no mnemônico, explica o P (Posicionamento de Dispositivos) que diz respeito a diminuição da fricção e cisalhamento. Para evitar fricção no leito, utiliza-se lençol móvel para movimentação e cabeceira de 30-45° evitando deslizamento.",
    wrongExplanations: [
      "Atente-se em relação à fixação do cateter, se estiver muito apertado pode exercer grande pressão na pele e ocasionar lesões. O posicionamento à 60° não é recomendado para repouso prolongado por aumentar riscos de lesão por pressão.",
      "",
      "Ao priorizar a vontade do paciente, há aumento no risco para agravar o processo de recuperação, portanto é ideal conversar e tentar um consenso para a mobilização, evitando manter a mesma posição por tempo prolongado.",
      "É falso que o uso de almofadas d'água auxiliam na prevenção de lesões por pressão, pois podem ocasionar falha na redistribuição de pressão."
    ],
    braden: {
      sensoryPerception: 3,
      moisture: 2,
      activity: 1,
      mobility: 3,
      nutrition: 2,
      frictionShear: 1,
      total: 12,
      risk: "Risco Alto"
    },
    lesionDescription: "Lesão de 3 cm na região auricular esquerda, com tecido necrótico seco (LPP relacionada a dispositivo médico).",
    treatmentQuestion: "Qual a conduta terapêutica imediata para evitar a progressão da lesão?",
    productOptions: ["Papaína 10%", "Papaína 2%", "PHMB (Polihexanida)", "Soro Fisiológico", "Alginato de Cálcio", "Alginato de Cálcio com Prata", "Carvão Ativado", "Creme Barreira", "Sulfadiazina de Prata", "Hidrogel", "Hidrofibra"],
    correctTreatments: ["Papaína 2%", "Alginato de Cálcio com Prata", "Creme Barreira"],
    treatmentExplanation: "Desbridamento autolítico com Papaína 2%; redução da carga microbiana com Alginato de Cálcio com Prata; proteção perilesional com Creme Barreira.",
    nursingAction: "Reposicionamento do dispositivo médico (cateter) para cessar a pressão local e uso de coxins."
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
    scenario: "A sra. Lucinda Alves está em jejum rigoroso até a liberação da sonda por Raio-x.",
    enigmaTitle: "Enigma: Avaliação de Risco e Nutrição (\"A\" e \"N\")",
    options: [
      { label: "A", text: "Risco Alto. Percepção sensorial alterada (pelo AVC), com mobilidade totalmente limitada. A nutrição não é urgente, visto que está adequada à situação clínica em que se encontra, aguardando realização do raio-x pela equipe multiprofissional." },
      { label: "B", text: "Risco Moderado. Percepção sensorial limitada (pelo AVC), com mobilidade reduzida, preservada parcialmente. O início da dieta enteral é urgente, mesmo sem o raio-x de confirmação, pois o jejum prolongado reduz a tolerância tecidual." },
      { label: "C", text: "Risco Alto. Percepção sensorial alterada (pelo AVC), com mobilidade totalmente limitada. A dieta, a partir da confirmação pelo raio-x, do posicionamento da sonda, é urgente, pois o jejum prolongado reduz a tolerância tecidual." },
      { label: "D", text: "Risco Baixo. Percepção sensorial afetada (pelo AVC), com mobilidade reduzida, preservada parcialmente, consegue se alimentar adequadamente, com acompanhamento da equipe multiprofissional que avalia uma vez o risco de lesões por pressão, com a necessidade de passagem de sonda." }
    ],
    correctAnswer: 2,
    letter: "A e N",
    letterIndex: 6,
    successMessage: "Exato! A Avaliação do Risco (Letra A) está correta, ela possui um Risco Alto para desenvolvimento ou agravamento da lesão por pressão. A Nutrição (Letra N) é o \"combustível\" para manter a pele íntegra, portanto uma ingestão dietética adequada de proteínas e calorias deve ser mantida durante a doença/hospitalização.",
    wrongExplanations: [
      "Um paciente com desenvolvimento de lesão por pressão não deve ficar em jejum prolongado, pois, em pacientes críticos, prejudica a cicatrização e promove a evolução da ferida.",
      "Uma paciente acamada, dependente e com hemiplegia é classificada como Alto Risco pela Escala de Braden. Os dados mostram que ela é totalmente dependente para mobilização. Além disso, uma ingestão dietética adequada de proteínas e calorias deve ser mantida durante a doença/hospitalização, porém é necessário o raio-x para confirmar o posicionamento da sonda.",
      "",
      "Classificar como \"Risco Baixo\" ignora a realidade de uma paciente com AVCi crônico (30 dias de internação) e lesão cutânea já existente. Os pacientes hospitalizados necessitam ser avaliados a cada plantão ou a cada mobilização quanto ao risco de lesões por pressão e não apenas uma única vez durante a internação."
    ],
    braden: {
      sensoryPerception: 2,
      moisture: 2,
      activity: 1,
      mobility: 2,
      nutrition: 1,
      frictionShear: 1,
      total: 9,
      risk: "Risco Muito Alto"
    },
    lesionDescription: "Lesão de 7 cm em região sacral, com esfacelos em centro e tecido de granulação ao redor, bordas irregulares, maceradas e sangrantes (LPP Estágio 3).",
    treatmentQuestion: "Qual a conduta para favorecer a reparação tecidual?",
    productOptions: ["Papaína 10%", "Papaína 2%", "PHMB (Polihexanida)", "Soro Fisiológico", "Alginato de Cálcio", "Alginato de Cálcio com Prata", "Carvão Ativado", "Coxim", "Carvão Ativado com Prata", "Gaze", "Sulfadiazina de Prata", "Hidrogel", "Hidrofibra", "Óxido de Zinco"],
    correctTreatments: ["Hidrogel", "Hidrofibra", "Óxido de Zinco"],
    treatmentExplanation: "Desbridamento do esfacelo com Hidrogel; Hidrofibra para as bordas sangrantes em tecido de granulação; Óxido de Zinco para proteção perilesional e evitar maceração.",
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
      assessment: "Glasgow 14 (AO:3/RV:5/RM:6), PIF+. Deambula ocasionalmente, força muscular grau V, dependência parcial para movimentação, com dor (8/10). Em ar ambiente, hemodinamicamente estável. Dieta geral VO com aceitação < 1/3. Evacuação ausente há 48h. Micção espontânea em WC. FO longitudinal em região xifo-umbilical 13cm, pontos íntegros, com bordas aproximadas, com hiperemia, exsudativa em grande quantidade. Dreno de sucção com débito serossanguinolento (240ml/24h). CVP em antebraço E (J20) com Morfina 2mg/h via bomba de PCA. Normoglicêmica e febril.",
      recommendation: "Coletar 1 par de hemoculturas e swab do dreno. Iniciar antibioticoterapia imediatamente após coleta. Reavaliar a eficácia da bomba de PCA com a equipe médica. Realizar curativo em FO abdominal e inserção de dreno. Monitorar débito de dreno. Estimular aceitação da dieta."
    },
    scenario: "Ao entrar no quarto, você sente um cheiro característico. Maria está gemendo de dor (8/10). Ao levantar o lençol, você nota que a camisola está encharcada de suor e há vazamento de secreção sero-hemática do dreno Portovac, deixando a roupa de cama úmida.",
    enigmaTitle: "Enigma: Evitar a umidade (\"E\")",
    options: [
      { label: "A", text: "Controlar rigorosamente a umidade, realizando troca imediata da roupa de cama sempre que úmida, promovendo higiene adequada da pele com água morna, sabonete com pH próximo a 5,5 e secagem cuidadosa, além de manter o leito limpo e seco." },
      { label: "B", text: "Posicionamento adequado do dreno Portovac, para evitar lesões por tração ou cisalhamento. Durante o banho utilizar água fria e sabonete com pH próximo a 5,5. Massagear as regiões de proeminências ósseas, se estiverem com hiperemia, para estimular a circulação e diminuir o risco de evoluir para LPP." },
      { label: "C", text: "Verificar o posicionamento adequado da paciente no leito e, se necessário, reposicionar rigorosamente a cada 3-4 horas. Trocar a roupa de cama e hidratar a pele do paciente com massagem vigorosa em regiões de proeminências ósseas. Durante o banho, otimizar a utilização de sabonetes de pH 9 a 10, porque o caráter alcalino cria uma barreira de proteção para a pele, evitando futuras lesões." },
      { label: "D", text: "Como a paciente está com muita dor, controlar a umidade colocando mais lençóis no leito para absorção, evitando a movimentação excessiva e a fricção no leito, que deve ser feita durante o banho como uso de sabonetes de caráter alcalino que diminuem a abrasão com a pele e a incidência de lesões." }
    ],
    correctAnswer: 0,
    letter: "E",
    letterIndex: 2,
    successMessage: "Perfeito! Evitar a fonte da umidade (curativo vazando e sudorese excessiva), e proteger a pele (barreira), evitando o uso de água quente e sabonete que podem ressecar a pele (o sabonete com pH ácido, próximo a 5,5, se assemelha com o pH da pele, sendo a melhor escolha para evitar o ressecamento) e aumentar o risco de lesão por pressão, é a essência do E.",
    wrongExplanations: [
      "",
      "O posicionamento do dreno para evitar fricção é uma ação adequada para o caso, mas massagear proeminências ósseas hiperemiadas para diminuir o risco de evoluir para lesão por pressão é ineficaz e pode agravar mais o quadro.",
      "Uma escala com horários para mudança de decúbito deve ser utilizada para cada paciente com presença ou em risco para lesão por pressão, o posicionamento a exatamente 3-4 horas apresenta um tempo muito prolongado.",
      "Recomenda-se que retire os lençóis molhados e substitua por novos com a movimentação da paciente sendo realizada com lençol móvel e ajuda de pelo menos mais 2 pessoas da equipe."
    ],
    braden: {
      sensoryPerception: 4,
      moisture: 3,
      activity: 3,
      mobility: 3,
      nutrition: 1,
      frictionShear: 2,
      total: 16,
      risk: "Risco Baixo"
    },
    lesionDescription: "FO longitudinal em região xifo-umbilical, 13 cm, pontos íntegros, bordas aproximadas, com hiperemia e exsudato em grande quantidade e odor forte. Dreno de sucção (Portovac) com débito serossanguinolento (240ml/24h).",
    treatmentQuestion: "O que a equipe deve antecipar como complicação local e sistêmica?",
    productOptions: ["Papaína 10%", "Papaína 2%", "PHMB (Polihexanida)", "Colchão Pneumático", "Soro Fisiológico", "Alginato de Cálcio", "Alginato de Cálcio com Prata", "Hidrocolóide", "Gaze", "Sulfadiazina de Prata", "Membrana Polimérica", "Hidrofibra", "Carvão Ativado com Prata"],
    correctTreatments: ["Membrana Polimérica", "Hidrofibra", "Carvão Ativado com Prata"],
    treatmentExplanation: "Membrana polimérica e hidrofibra para diminuir a umidade local; Carvão Ativado com Prata para reduzir o odor e a proliferação de infecção.",
    nursingAction: "Troca de camisolas e lençóis úmidos imediatamente para evitar umidade excessiva; monitorar sinais de infecção sistêmica (coleta de hemoculturas e swab do dreno)."
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
      assessment: "Glasgow 15 (AO:4/RV:5/RM:6), PIF+. Permanece em cadeira, força muscular grau V em MMSS e grau IV em MMII, dependência parcial para movimentação, sem dor. Em ar ambiente, com uso de CN de O2 2L/min aos esforços, hemodinamicamente estável. Dieta hipossódica VO com aceitação <50%. Evacuação ausente hoje. Micção espontânea em papagaio, 1000ml/12h. Hiperemia que não embranquece ao toque em região sacral, 8cm. Edema generalizado MMII (3+/4+). CVP em face anterior de antebraço D (J22). Hiperglicêmico e afebril.",
      recommendation: "Analgesia SN. Vigilância respiratória. Manter cabeceira elevada (Fowler/Semi-Fowler) ou cadeira para alívio da ortopneia. RH=1000ml/dia. Monitorar balanço hídrico. Estimular aceitação da dieta. Controle de glicemia. Sem antibioticoterapia."
    },
    scenario: "Você entra no quarto para visita de enfermagem no período noturno e observa que o paciente se encontra sentado na cadeira desde o plantão da tarde, após o almoço, dormindo.",
    enigmaTitle: "Enigma: Inspeção da pele (\"I\")",
    options: [
      { label: "A", text: "Avalia a região sacral e o edema em membros inferiores. Considerando a permanência prolongada na cadeira, recomenda uso de almofada comum e elevação das pernas para auxiliar no retorno venoso, protegendo os calcâneos de modo a aliviar pressão, sempre mantendo a cabeceira elevada para evitar desconforto respiratório ocasionado pela ortopneia." },
      { label: "B", text: "Inspeciona a região sacral, observando que a hiperemia não regride após alívio da pressão e orienta uso de almofada que atue na redistribuição de pressão ou alternância de posicionamento na cadeira, mantendo cabeceira elevada para ortopneia, movimentando o paciente de modo a não permanecer na mesma posição por tempo prolongado." },
      { label: "C", text: "Observa a região sacral e os membros edemaciados e realiza massagem local suave para estimular a circulação, se não houver regressão da hiperemia após a massagem é considerada uma lesão por pressão em estágio inicial, sendo necessário posicionar o paciente em decúbito dorsal horizontal no leito para evitar a piora, associando elevação de membros inferiores em um banquinho para redução do edema em MMII." },
      { label: "D", text: "Considerando que a inspeção foi realizada no turno da manhã, orienta nova avaliação a cada 2 dias e posiciona o paciente no leito, em decúbito dorsal horizontal, para favorecer retorno venoso e aliviar a pressão, observando queixas de desconforto respiratório. Se a hiperemia persistir sem embranquecer ao toque, é necessário fornecer analgesia ao paciente e realizar a mudança de decúbito a cada 2 horas." }
    ],
    correctAnswer: 1,
    letter: "I",
    letterIndex: 4,
    successMessage: "Muito bem!! Realizar o teste de alívio da pressão é fundamental para verificar a presença de lesão por pressão, no caso dele, a hiperemia não regride, sendo uma LPP estágio 1. O paciente com mobilidade limitada e que pode permanecer na cadeira, deve ter uma almofada no assento para proteção da região das proeminências ósseas. Atentando-se o paciente que pode mudar a posição do corpo sem ajuda deve ser orientado a realizar o alívio da pressão, a cada 15 minutos, enquanto estiver sentado na cadeira. A inspeção deve ser feita, no mínimo, uma vez ao dia (a cada 24 horas), sendo possível realizar a inspeção a cada plantão ou a cada mudança de decúbito.",
    wrongExplanations: [
      "Não se deve olhar apenas a região sacral e sim todas as regiões de proeminências ósseas. O recomendado é disponibilizar uma almofada específica no assento para proteção das regiões de proeminência óssea.",
      "",
      "A massagem na região sacral e nos MMII não é efetiva pois aplica uma força mecânica que pode romper os capilares frágeis, transformando uma lesão que era apenas uma \"mancha vermelha\" em um hematoma profundo ou acelerando a abertura de uma ferida (estágio 2).",
      "A inspeção deve ser feita, no mínimo, uma vez ao dia. Em unidades de internação ou UTIs, o padrão ouro é realizar a inspeção a cada plantão ou a cada mudança de decúbito. O decúbito horizontal não é indicado para todos os pacientes e o Sr. Otávio possui ortopneia severa."
    ],
    braden: {
      sensoryPerception: 4,
      moisture: 4,
      activity: 2,
      mobility: 3,
      nutrition: 2,
      frictionShear: 2,
      total: 17,
      risk: "Risco Baixo"
    },
    lesionDescription: "Hiperemia que não embranquece ao toque em região sacral, 8 cm (LPP Estágio 1). Edema generalizado em MMII (3+/4+).",
    treatmentQuestion: "O que deve ser feito para prevenir uma complicação dessa lesão?",
    productOptions: ["Hidrocolóide", "Papaína 10%", "Papaína 2%", "PHMB (Polihexanida)", "Soro Fisiológico", "Alginato de Cálcio", "Colchão Pneumático", "Alginato de Cálcio com Prata", "Carvão Ativado", "Gaze", "Sulfadiazina de Prata", "Hidrogel", "Hidrofibra", "Óxido de Zinco"],
    correctTreatments: ["Hidrocolóide", "Colchão Pneumático"],
    treatmentExplanation: "Placa de Hidrocolóide para reduzir a pressão e o atrito no local da lesão; Colchão Pneumático como superfície de suporte para redistribuição de pressão (não local).",
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
      assessment: "Glasgow 12 (AO:3/RV:3/RM:6), PIF+. Acamado, força muscular com avaliação prejudicada, dependência para mobilização, com sinais de dor. Em ar ambiente, hemodinamicamente estável. Dieta pastosa VO com aceitação < 1/3. Micção espontânea em fralda. Evacuação líquida 3x em 24h. Dermatite associada à incontinência em região perineal. Lesão 5 cm em calcâneo E, com tecido acastanhado escurecido seco, bordas regulares. Sem dispositivos. Hipoglicemia (3 amp de G 50%) e afebril.",
      recommendation: "Puncionar novo CVP e iniciar SG5% 500ml 12/12h. Controle glicemia. Vigilância infecciosa e respiratória. Analgesia CPM. Aplicar creme barreira em região perineal nas trocas de fralda. Estimular aceitação da dieta. Sem antibioticoterapia. Jejum a partir da 0h."
    },
    scenario: "O Sr. Manoel (Leito 205) está no 2º DIH com quadro de fratura de fêmur D, está emagrecido e possui uma lesão suspeita de tecido profundo no calcâneo esquerdo com tecido acastanhado escurecido seco e bordas regulares. Além disso, a fratura limita muito sua movimentação.",
    enigmaTitle: "Enigma: Verificar superfície de suporte (\"V\")",
    options: [
      { label: "A", text: "Manter o paciente em colchão hospitalar, mas utilizar uma almofada em formato de \"roda\" ou \"donut\" sob os glúteos e sob os calcâneos para aliviar a pressão no sacro, pés e na fratura. Otimizando a movimentação do paciente a cada 1 hora." },
      { label: "B", text: "Utilizar um colchão que redistribua a pressão, junto ao reposicionamento do paciente. Manter os calcâneos elevados, sem contato direto com o leito. Manter em decúbito lateral em um ângulo de 30º em relação ao leito." },
      { label: "C", text: "Colocar um colchão pneumático e evitar mudanças de decúbito excessivas para não gerar dor no local da fratura de fêmur, devido à instabilidade local. Manter os calcâneos elevados, sem contato direto com o leito e protegidos com ataduras para evitar fricção." },
      { label: "D", text: "Forrar a cama com várias camadas de lençóis por cima do colchão \"casca de ovos\" para evitar o contato direto e deixar o leito macio, sempre deixando um lençol móvel para a movimentação do paciente e evitar fricções, garantindo que a pele emagrecida não toque a estrutura rígida da cama. Levantar os calcâneos para que não fiquem em contato direto com o leito." }
    ],
    correctAnswer: 1,
    letter: "V",
    letterIndex: 3,
    successMessage: "Parabéns! Pacientes com risco alto e lesão de calcâneo precisam de uma superfície que redistribua o peso e de dispositivos que eliminem totalmente a pressão nos calcanhares, deixando-os elevados em relação ao leito. Na posição em decúbito lateral, o paciente com presença de lesão por pressão ou em risco para a mesma deve ficar em ângulo de 30 graus em relação ao colchão do leito.",
    wrongExplanations: [
      "O uso de colchão hospitalar comum não auxilia na redistribuição de pressão necessária. Almofadas tipo \"roda\" são contraindicadas, pois causam isquemia nas bordas e aumentam o risco de lesão no centro.",
      "",
      "O colchão pneumático e outros dispositivos em forma de anel ou rosca não são indicadas para o tratamento ou prevenção de lesões por pressão porque não distribuem o peso de forma uniforme e criam áreas de fricção e pressão contrária.",
      "O excesso de tecidos cria dobras, aumenta o calor e a fricção, além de anular o efeito de redistribuição de pressão do colchão especial."
    ],
    braden: {
      sensoryPerception: 3,
      moisture: 1,
      activity: 1,
      mobility: 1,
      nutrition: 1,
      frictionShear: 1,
      total: 8,
      risk: "Risco Muito Alto"
    },
    lesionDescription: "Dermatite associada à incontinência em região perineal. Lesão Tissular Profunda (LTP) de 5 cm em calcâneo E, com tecido acastanhado escurecido seco, bordas regulares.",
    treatmentQuestion: "Qual a conduta para tratamento da lesão?",
    productOptions: ["Hidrocolóide", "Papaína 10%", "Papaína 2%", "PHMB (Polihexanida)", "Soro Fisiológico", "Alginato de Cálcio", "AGE (Ácidos Graxos Essenciais)", "Carvão Ativado", "Gaze", "Sulfadiazina de Prata", "Hidrogel", "Hidrofibra", "Óxido de Zinco", "Coxim"],
    correctTreatments: ["Hidrocolóide", "AGE (Ácidos Graxos Essenciais)", "Coxim"],
    treatmentExplanation: "Coxins para redistribuição de pressão, mantendo os calcanhares \"flutuando\"; AGE ou Placa de Hidrocolóide para hidratar o tecido acastanhado.",
    nursingAction: "Uso de coxins para \"flutuar\" os calcanhares (elevação sem contato com a cama) e aplicação de creme barreira na região perineal."
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
    scenario: "Sra. Antônia está com alta programada, mas possui uma lesão de 5 cm na região sacral com tecido de granulação, bordas regulares e não exsudativa, que deve garantir a cicatrização, evitando que seja interrompida e que a dor à mobilização seja controlada. Ela está em ar ambiente, estável e com aceitação favorável da dieta ofertada, o que favorece a cicatrização, mas a umidade da fralda é um fator de risco constante.",
    enigmaTitle: "Enigma: Reposicionamento (\"R\")",
    options: [
      { label: "A", text: "Orientar mudanças de decúbito a cada 4 horas durante o período noturno para não prejudicar o sono, priorizando a posição lateral a 90°, com uso de travesseiros." },
      { label: "B", text: "Recomendar reposicionamento conforme tolerância da paciente, priorizando o controle da dor e evitando mudanças frequentes para não comprometer o tecido de granulação." },
      { label: "C", text: "Manter a paciente em decúbito lateral alternado a cada 2 horas, com apoio de coxins, incentivando períodos prolongados em cadeira para estímulo funcional." },
      { label: "D", text: "Orientar reposicionamento regular e individualizado (em média a cada 2 horas no leito), evitando ângulo lateral de 90°, utilizando técnica com dois cuidadores e lençol móvel para reduzir cisalhamento, além de manejo rigoroso da umidade e inspeção cutânea sistemática." }
    ],
    correctAnswer: 3,
    letter: "R",
    letterIndex: 1,
    successMessage: "Excelente! No plano de alta deve sempre incluir a orientação sobre os cuidados para a família, principais cuidadores e para o paciente. Puxar o paciente causa cisalhamento, deve-se realizar o Reposicionamento eficaz e seguro com o uso de lençóis móveis que devem ser utilizados para transferir ou movimentar pacientes que não se movimentam sozinhos, devendo sempre ser realizado em 2 ou mais pessoas.",
    wrongExplanations: [
      "Embora proponha reposicionamento, estabelece intervalo fixo e prolongado (4 horas) para paciente com LPP ativa, o que pode ser insuficiente. Além disso, recomenda decúbito lateral a 90°, posição associada a maior pressão sobre proeminências ósseas, contrariando as diretrizes que indicam inclinação aproximada de 30° para reduzir carga e cisalhamento.",
      "Condiciona o reposicionamento apenas à tolerância dolorosa da paciente, desconsiderando que a prevenção da progressão da LPP depende da redução sistemática da pressão, independentemente da queixa álgica. Priorizar conforto em detrimento do alívio periódico da pressão pode favorecer isquemia tecidual.",
      "Apesar de prever mudança de decúbito a cada duas horas, recomenda permanência prolongada em posição sentada, o que aumenta pressão na região sacral em paciente com lesão ativa. Ademais, a realização de transferências com apenas um cuidador eleva o risco de cisalhamento e novas lesões.",
      ""
    ],
    braden: {
      sensoryPerception: 3,
      moisture: 2,
      activity: 2,
      mobility: 3,
      nutrition: 3,
      frictionShear: 2,
      total: 15,
      risk: "Risco Baixo"
    },
    lesionDescription: "Lesão de 5 cm em região sacral, com tecido de granulação, bordas regulares, não exsudativa (LPP em fase de cicatrização).",
    treatmentQuestion: "O que deve ser realizado para garantir a continuidade de cicatrização dessa ferida?",
    productOptions: ["Hidrocolóide", "Papaína 10%", "Papaína 2%", "PHMB (Polihexanida)", "Soro Fisiológico", "Alginato de Cálcio com Prata", "Solução Polimérica", "Carvão Ativado", "Gaze", "Sulfadiazina de Prata", "Hidrogel", "Hidrofibra", "Óxido de Zinco", "Coxim"],
    correctTreatments: ["Hidrocolóide", "PHMB (Polihexanida)", "Solução Polimérica"],
    treatmentExplanation: "Hidrocolóide para manter o tecido de granulação em ambiente úmido favorável à cicatrização; Solução Polimérica para proteger as bordas regulares; PHMB indicado em caso de presença de biofilme.",
    nursingAction: "Orientações de alta para a família/ILPI sobre manutenção dos cuidados e prevenção de novas lesões."
  }
];

// Letters collected per patient, based on each patient's `letter` field above.
// Password spelled: P-R-E-V-I-N-A
// P = Posicionamento (201 - Joaquim)
// A, N = Avaliação de Risco e Nutrição (202 - Lucinda)
// E = Evitar umidade (203 - Maria)
// I = Inspeção (204 - Otávio)
// V = Verificar superfície de suporte (205 - Manoel)
// R = Reposicionamento (206 - Antônia)

export const LETTER_MAP: Record<number, string[]> = {
  201: ["P"],
  202: ["A", "N"],
  203: ["E"],
  204: ["I"],
  205: ["V"],
  206: ["R"],
};

// Correct order: P-R-E-V-I-N-A
export const PREVINA_ORDER = ["P", "R", "E", "V", "I", "N", "A"];

// Available treatment products for Phase 3
export const TREATMENT_PRODUCTS = [
  "AGE (Ácidos Graxos Essenciais)",
  "Alginato de Cálcio",
  "Alginato de Cálcio com Prata",
  "Carvão Ativado",
  "Carvão Ativado com Prata",
  "Colagenase",
  "Colchão Pneumático",
  "Coxim",
  "Creme Barreira",
  "Filme Transparente",
  "Gaze",
  "Hidrocolóide",
  "Hidrofibra",
  "Hidrogel",
  "Membrana Polimérica",
  "Óxido de Zinco",
  "Papaína 2%",
  "Papaína 10%",
  "PHMB (Polihexanida)",
  "Solução Polimérica",
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
  if (total <= 9) return "Risco Muito Alto";
  if (total <= 12) return "Risco Alto";
  if (total <= 14) return "Risco Moderado";
  if (total <= 18) return "Risco Baixo";
  return "Sem Risco";
}
