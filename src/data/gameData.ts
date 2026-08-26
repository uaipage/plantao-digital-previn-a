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
  enigmaQuestion: string;
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
    scenario: "O Sr. Joaquim está constantemente \"escorregando\" na cama, com o queixo próximo ao peito. O cateter nasal está esticado e pressionando a parte superior da orelha. Ao avaliá-lo, você percebe também que a fralda e a roupa de cama estão úmidas.",
    enigmaTitle: "Enigma: Posicionamento de dispositivos e Evitar umidade (\"P\" e \"E\")",
    enigmaQuestion: "Há mais de um fator colocando a pele do Sr. Joaquim em risco. Qual conjunto de cuidados é o mais adequado?",
    options: [
      { label: "A", text: "Reposiciona o paciente com auxílio de outro profissional e utilizando um lençol móvel, elevando a cabeceira a 60° para melhorar o padrão ventilatório. Fixa o cateter nasal com fita hipoalergênica, mantendo-o sob leve tração. Realiza a higiene da região perineal com sabonete de pH neutro e troca a fralda e a roupa de cama molhadas." },
      { label: "B", text: "Mantém temporariamente o paciente na posição atual para evitar o desconforto decorrente de reposicionamentos frequentes, protege a pele no ponto de contato com o cateter e mantém a cabeceira a 45°. Realiza a higiene da região perineal com sabonete de pH levemente ácido e utiliza duas fraldas, sendo uma delas como \"absorvente\", para aumentar a absorção e evitar que a roupa de cama fique úmida." },
      { label: "C", text: "Reposiciona o paciente com auxílio de outro profissional com um lençol móvel, mantém a cabeceira entre 30–45° e utiliza almofadas nos membros inferiores para reduzir o deslizamento. Protege a pele no ponto de contato com o cateter. Realiza a higiene da região perineal com sabonete de pH neutro e, após trocar a fralda úmida, coloca uma segunda fralda, utilizada como \"absorvente\", no interior da fralda seca para evitar vazamentos, trocando-a quando estiver saturada." },
      { label: "D", text: "Reposiciona o paciente com auxílio de outro profissional e utilizando um lençol móvel, mantendo a cabeceira entre 30–45° para reduzir o deslizamento no leito. Reposiciona o cateter nasal, eliminando a tração e aliviando a pressão sobre a orelha. Realiza a higiene da região perineal com sabonete de pH levemente ácido e troca a fralda e a roupa de cama úmidas." }
    ],
    correctAnswer: 3,
    letter: "P e E",
    letterIndex: 0,
    successMessage: "Correto! Você identificou os principais riscos e tomou as medidas adequadas. O reposicionamento com auxílio de outro profissional e lençol móvel reduz a fricção durante a movimentação, enquanto a manutenção da cabeceira entre 30–45° ajuda a minimizar o deslizamento e o cisalhamento. O reposicionamento do cateter elimina a tração e reduz a pressão sobre a orelha, contribuindo para a prevenção de lesões relacionadas a dispositivos. Além disso, a higiene com sabonete de pH levemente ácido, próximo ao pH fisiológico da pele, ajuda a preservar a barreira cutânea. A troca da fralda e da roupa de cama úmidas reduz o tempo de exposição da pele à umidade e o risco de maceração.",
    wrongExplanations: [
      "Atenção! Alguns fatores de risco permanecem. A elevação da cabeceira a 60° favorece o deslizamento e aumenta as forças de cisalhamento. Além disso, o cateter não deve permanecer sob tração, pois a pressão exercida sobre a orelha pode provocar lesão relacionada ao dispositivo. Para a higiene da pele exposta à umidade, prefira produto com pH levemente ácido, próximo ao pH fisiológico da pele.",
      "Ainda há riscos que precisam ser eliminados. Manter o paciente na posição em que está escorregando prolonga sua exposição ao cisalhamento. Além disso, utilizar uma segunda fralda como \"absorvente\" pode favorecer a retenção de calor e umidade junto à pele. A fralda úmida deve ser substituída e a pele deve ser mantida limpa e seca.",
      "Você está perto! O posicionamento está adequado, mas o manejo da umidade precisa ser revisto. A utilização de duas fraldas não é uma estratégia adequada para controlar a umidade, pois pode favorecer sua retenção junto à pele. Além disso, para a higiene da pele exposta à umidade, deve-se preferir produto com pH levemente ácido. A fralda deve ser substituída sempre que estiver úmida, mantendo a pele limpa e seca.",
      ""
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
    scenario: "A Sra. Lucinda Alves está acamada, é dependente para os cuidados e apresenta limitações decorrentes de um AVC. Encontra-se em jejum enquanto aguarda a confirmação radiológica do posicionamento da sonda antes do início da dieta enteral.",
    enigmaTitle: "Enigma: Avaliação de Risco e Nutrição (\"A\" e \"N\")",
    enigmaQuestion: "Ao avaliar a Sra. Lucinda, você identifica diversos fatores que podem aumentar seu risco para novas lesões por pressão. Considerando os dados clínicos disponíveis, a Escala de Braden e seu estado nutricional, qual é a interpretação e a conduta mais adequadas?",
    options: [
      { label: "A", text: "Risco moderado. Embora esteja acamada e dependente para mobilização, a força muscular preservada no hemicorpo esquerdo permite alguma movimentação, reduzindo seu risco pela Escala de Braden. Como o jejum é temporário e necessário para a segurança da paciente, o estado nutricional pode ser reavaliado após a liberação da sonda e o início da dieta enteral." },
      { label: "B", text: "Risco alto. A condição de acamada, a mobilidade muito limitada e a dependência para mobilização contribuem para a redução da pontuação na Escala de Braden. Como a ingestão nutricional adequada favorece a tolerância e a recuperação dos tecidos, a dieta enteral deve ser iniciada imediatamente, mesmo antes da confirmação radiológica do posicionamento da sonda." },
      { label: "C", text: "Risco alto. A condição de acamada, a mobilidade muito limitada, a dependência para mobilização e o comprometimento da ingestão nutricional contribuem para o risco de LPP. A nutrição deve ser considerada uma prioridade, mas a dieta enteral deve ser iniciada após a confirmação do posicionamento adequado da sonda e sua liberação para uso, evitando prolongar desnecessariamente o período sem aporte nutricional." },
      { label: "D", text: "Risco moderado. A condição de acamada e a dependência para mobilização aumentam o risco, porém a estabilidade clínica e a força muscular preservada no hemicorpo esquerdo contribuem para uma classificação de risco moderado. A nutrição deve ser considerada uma prioridade, e a dieta enteral iniciada assim que o posicionamento da sonda for confirmado e houver liberação para seu uso." }
    ],
    correctAnswer: 2,
    letter: "A e N",
    letterIndex: 6,
    successMessage: "Correto! Você avaliou o risco e reconheceu a importância da nutrição sem comprometer a segurança da paciente. A avaliação pela Escala de Braden deve considerar o conjunto de fatores que interferem na vulnerabilidade da paciente, incluindo sua condição de acamada, a mobilidade muito limitada, a dependência para mobilização e a condição nutricional. A nutrição adequada contribui para a integridade e tolerância dos tecidos e para o processo de cicatrização. Entretanto, a dieta enteral somente deve ser iniciada após a confirmação do posicionamento adequado da sonda e sua liberação para uso. Uma vez liberada, deve-se evitar prolongar desnecessariamente o período sem aporte nutricional.",
    wrongExplanations: [
      "Atenção à avaliação global do risco. A presença de alguma força muscular no hemicorpo esquerdo não elimina os demais fatores de risco. A paciente está acamada, apresenta mobilidade muito limitada e depende de auxílio para se reposicionar. Além disso, a disfagia e a ausência atual de aporte nutricional exigem atenção desde o início do cuidado, e não apenas após a liberação da sonda.",
      "Você identificou corretamente o risco, mas a conduta não é segura. A nutrição é fundamental para a manutenção da integridade dos tecidos e para a cicatrização, e o aporte nutricional não deve ser adiado desnecessariamente. Entretanto, a necessidade de nutrição não justifica utilizar a sonda antes da confirmação de seu posicionamento adequado e da liberação para uso. A prioridade nutricional deve estar sempre associada à segurança da paciente.",
      "",
      "A conduta nutricional está adequada, mas reveja a classificação do risco. A estabilidade clínica e a presença de força muscular no hemicorpo esquerdo não compensam os demais fatores identificados na avaliação pela Escala de Braden. A paciente permanece acamada, apresenta importante limitação da mobilidade, depende de auxílio para reposicionamento e apresenta comprometimento da ingestão nutricional. Você acertou a prioridade nutricional. Agora, reavalie o conjunto de fatores que determina o risco de LPP."
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
    scenario: "Durante a visita de enfermagem no período noturno, você encontra o Sr. Otávio dormindo na cadeira. Ao verificar as informações do plantão anterior, percebe que ele permanece sentado desde após o almoço.",
    enigmaTitle: "Enigma: Inspeção da pele (\"I\")",
    enigmaQuestion: "A permanência prolongada na mesma posição exige uma avaliação cuidadosa da pele. Ao examinar o Sr. Otávio, o que você deve procurar e quais cuidados devem ser realizados imediatamente?",
    options: [
      { label: "A", text: "Inspeciona a pele das regiões submetidas à pressão, com atenção especial à região sacral e aos membros inferiores edemaciados. Ao identificar a hiperemia sacral, realiza massagem suave para estimular a circulação local e verifica posteriormente se houve regressão. Reposiciona o paciente na cadeira e utiliza uma almofada em formato de anel para proporcionar maior conforto." },
      { label: "B", text: "Inspeciona cuidadosamente a região sacral e as demais áreas submetidas à pressão, avaliando alterações e integridade da pele. Ao identificar hiperemia sacral que não embranquece à digitopressão, reconhece o achado como compatível com LPP em estágio 1 e alivia imediatamente a pressão sobre a região. Reposiciona o paciente e utiliza superfície de apoio com propriedades para redistribuição da pressão, mantendo a inspeção frequente da pele." },
      { label: "C", text: "Inspeciona a região sacral e os membros inferiores e verifica a integridade da pele. Considerando que o paciente consegue permanecer sentado e não apresenta dor, mantém a permanência na cadeira, orientando mudanças periódicas de posição frequentes, utilizando uma almofada adequada para redistribuir a pressão. Programa nova inspeção da região sacral após o retorno ao leito." },
      { label: "D", text: "Inspeciona a região sacral e identifica que a hiperemia não regride após o alívio da pressão, considerando o achado compatível com LPP em estágio 1. Transfere o paciente para o leito em decúbito dorsal, utiliza superfícies de apoio para proporcionar maior conforto e eleva os membros inferiores devido ao edema. Programa nova inspeção da pele no dia seguinte." }
    ],
    correctAnswer: 1,
    letter: "I",
    letterIndex: 4,
    successMessage: "Muito bem!! Realizar o teste de alívio da pressão é fundamental para verificar a presença de lesão por pressão. Neste caso, a hiperemia não regride, característica de uma LPP estágio 1. O paciente com mobilidade limitada e que pode permanecer na cadeira deve ter uma almofada com propriedades de redistribuição de pressão no assento para proteção das proeminências ósseas. Evite almofadas em formato de anel / \"donuts\". Como o paciente pode mudar a posição do corpo sem ajuda, deve ser orientado a realizar o alívio da pressão frequentemente enquanto estiver sentado na cadeira. A inspeção deve ser feita, no mínimo, uma vez ao dia ou conforme protocolo institucional, devendo sua frequência ser aumentada de acordo com o risco e a condição clínica do paciente. As áreas submetidas à pressão devem ser observadas também durante as mudanças de decúbito.",
    wrongExplanations: [
      "A inspeção foi importante, mas o cuidado com a área hiperemiada precisa ser revisto. Não se recomenda massagear uma região com hiperemia associada à pressão, pois os tecidos podem já estar comprometidos e a manipulação pode agravar o dano. Além disso, uma almofada em formato de anel / \"donuts\" não deve ser utilizada, porque suas bordas podem gerar áreas de alta pressão, prejudicar a circulação e favorecer edema.",
      "",
      "As orientações de mudar de posição frequentemente e o uso de uma almofada com propriedades de redistribuição de pressão estão corretas, mas a ausência de dor não significa ausência de dano tecidual. O paciente permaneceu sentado por período prolongado e apresenta hiperemia sacral que não embranquece. Portanto, não é adequado manter a região afetada submetida à pressão e aguardar o retorno ao leito para reavaliá-la. A pressão sobre a região deve ser aliviada imediatamente.",
      "Você reconheceu corretamente o achado na pele, mas o posicionamento precisa ser revisto. A hiperemia que não embranquece à digitopressão em pele íntegra é compatível com LPP estágio 1. Entretanto, posicionar o paciente em decúbito dorsal mantém a região sacral sob pressão, justamente onde a alteração foi identificada. Após reconhecer a lesão, é necessário retirar a pressão da região afetada e manter inspeção sistemática da pele, em vez de aguardar uma nova avaliação no dia seguinte."
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
    scenario: "O Sr. Manoel está no 2º dia de internação por fratura de fêmur direito. Encontra-se emagrecido, acamado e dependente para mobilização, apresentando importante limitação de movimentos e sinais de dor. No calcâneo esquerdo, apresenta lesão de aproximadamente 5 cm, com tecido acastanhado e escurecido, seco e de bordas regulares.",
    enigmaTitle: "Enigma: Verificar a superfície de suporte (\"V\")",
    enigmaQuestion: "Ao avaliar o Sr. Manoel, você percebe que sua condição clínica exige atenção especial à superfície de suporte e ao posicionamento no leito. Considerando seu elevado risco de LPP e a lesão já presente no calcâneo, qual conjunto de medidas é mais adequado para redistribuir a pressão e proteger as áreas vulneráveis?",
    options: [
      { label: "A", text: "Utiliza colchão hospitalar convencional e almofadas em formato de anel / \"donuts\" para aliviar a pressão nas proeminências ósseas. Mantém os calcâneos elevados, sem contato com o leito e realiza o reposicionamento a cada hora com auxílio de lençol móvel." },
      { label: "B", text: "Utiliza superfície de suporte com propriedades de redistribuição de pressão, associada ao reposicionamento do paciente. Mantém os calcâneos elevados, sem contato com o leito e, quando tolerado, posiciona o paciente em decúbito lateral com inclinação de aproximadamente 30°." },
      { label: "C", text: "Utiliza colchão pneumático para redistribuição da pressão e mantém os calcâneos elevados, sem contato direto com o leito. Devido à fratura e à dor, reduz ao mínimo as mudanças de posição, mantendo o paciente em decúbito dorsal e utilizando ataduras nos calcâneos para protegê-los de fricção." },
      { label: "D", text: "Utiliza colchão de espuma perfilada (\"casca de ovo\") e adiciona várias camadas de lençóis para tornar a superfície mais macia. Mantém um lençol móvel para auxiliar na movimentação e eleva os calcâneos com almofadas. Realiza mudanças periódicas de posição, de acordo com a tolerância do paciente." }
    ],
    correctAnswer: 1,
    letter: "V",
    letterIndex: 3,
    successMessage: "Parabéns! Você associou uma superfície adequada ao alívio da pressão e ao reposicionamento. Uma superfície de suporte com propriedades de redistribuição de pressão contribui para reduzir a pressão sobre áreas vulneráveis, mas não substitui o reposicionamento. O calcâneo lesionado deve permanecer completamente livre de pressão, sem contato com o leito. O apoio pode ser realizado sob a panturrilha, de modo a elevar o calcâneo sem concentrar pressão sobre o tendão de Aquiles. Quando clinicamente possível e tolerado, o posicionamento lateral em aproximadamente 30° também favorece a redistribuição da pressão e evita apoio direto sobre proeminências ósseas.",
    wrongExplanations: [
      "Algumas medidas estão adequadas, mas reveja a superfície de suporte. A elevação dos calcâneos e o uso do lençol móvel são medidas importantes. Entretanto, almofadas em formato de anel ou \"donut\" não são recomendadas, pois podem concentrar pressão em suas bordas e comprometer os tecidos. Além disso, pacientes com alto risco de LPP devem utilizar uma superfície com propriedades adequadas de redistribuição de pressão. A frequência do reposicionamento também deve ser individualizada, considerando condição clínica, tolerância tecidual e superfície utilizada, e não definida automaticamente a cada hora.",
      "",
      "Você escolheu uma superfície adequada e aliviou a pressão nos calcâneos, mas ainda falta uma medida importante. O uso de uma superfície com propriedades de redistribuição de pressão não elimina a necessidade de reposicionamento. A dor e a fratura devem ser consideradas no planejamento das mudanças de posição, mas não justificam manter o paciente em decúbito dorsal. O reposicionamento deve ser individualizado e realizado de acordo com a condição clínica e a tolerância do paciente.",
      "A elevação dos calcâneos e as mudanças de posição estão adequadas, mas reveja a superfície utilizada. Um colchão de espuma perfilada do tipo \"casca de ovo\" não deve ser considerado, por si só, uma superfície adequada de redistribuição de pressão para um paciente de alto risco. Além disso, adicionar várias camadas de lençóis pode interferir no desempenho da superfície e produzir dobras que aumentam pressão e fricção. O objetivo não é simplesmente deixar o leito mais macio, mas utilizar uma superfície de suporte apropriada às necessidades do paciente."
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
    scenario: "A Sra. Antônia está com alta programada. É cadeirante e dependente para mobilização e apresenta uma lesão sacral de 5 cm, com tecido de granulação, bordas regulares e sem exsudato. Apresenta boa aceitação da dieta ofertada, porém utiliza fralda, mantendo a umidade como um fator de risco para a pele. Na alta, a paciente e seus cuidadores precisarão dar continuidade às medidas para favorecer a cicatrização e prevenir novas lesões.",
    enigmaTitle: "Enigma: Reposicionamento (\"R\")",
    enigmaQuestion: "Antes da alta, você precisa orientar a Sra. Antônia e seus cuidadores sobre reposicionamento, proteção da pele e manutenção das condições favoráveis à cicatrização. Qual estratégia deve fazer parte do plano de cuidados no domicílio?",
    options: [
      { label: "A", text: "Orienta mudanças de posição a cada quatro horas durante a noite para preservar o sono, priorizando o decúbito lateral a 90° com apoio de travesseiros. Recomenda manter a dieta habitual, considerando sua boa aceitação, e trocar a fralda em horários previamente estabelecidos." },
      { label: "B", text: "Orienta reposicionamentos conforme a tolerância da paciente, evitando mudanças frequentes para não comprometer o tecido de granulação. Recomenda manter a ingestão alimentar adequada e realizar a troca da fralda sempre que estiver úmida, mantendo a pele limpa e seca." },
      { label: "C", text: "Orienta alternância de decúbito a cada duas horas, com auxílio de coxins, e períodos prolongados na cadeira para estimular a funcionalidade. Recomenda manter a ingestão alimentar adequada e realizar higiene da pele e troca da fralda sempre que houver umidade." },
      { label: "D", text: "Orienta um plano individualizado de reposicionamento, evitando posicionar a paciente sobre a lesão e o decúbito lateral a 90°. Orienta técnicas de movimentação que reduzam fricção e cisalhamento, além de manter ingestão alimentar adequada, higiene da pele e troca da fralda sempre que estiver úmida." }
    ],
    correctAnswer: 3,
    letter: "R",
    letterIndex: 1,
    successMessage: "Excelente! O plano de alta deve sempre incluir a orientação sobre os cuidados para a família, principais cuidadores e para o paciente. Ele garante a continuidade das medidas de prevenção e favorece a cicatrização. O reposicionamento deve ser regular e individualizado, evitando pressão direta sobre a lesão e posições que concentrem pressão sobre proeminências ósseas. Durante a movimentação, técnicas que reduzam fricção e cisalhamento ajudam a proteger a pele e os tecidos. Deve ser orientado o uso de lençóis móveis para transferir ou movimentar pacientes que não se movimentam sozinhos, devendo sempre ser realizado por duas ou mais pessoas. No domicílio, também é fundamental manter ingestão nutricional adequada, além de controlar a exposição da pele à umidade, realizando higiene apropriada e trocando a fralda sempre que necessário. Mais do que estabelecer um horário fixo, o cuidador deve compreender por que, como e quando reposicionar a paciente e observar regularmente as condições da pele.",
    wrongExplanations: [
      "Algumas orientações precisam ser revistas antes da alta. O reposicionamento deve ser individualizado conforme a condição clínica, mobilidade, superfície utilizada e tolerância da pele, e não simplesmente estabelecido a cada quatro horas para preservar o sono. Além disso, o decúbito lateral a 90° aumenta a pressão sobre a região trocantérica. A troca da fralda também deve ocorrer sempre que necessário, evitando a permanência da pele em contato com a umidade, e não apenas em horários predeterminados.",
      "Os cuidados com nutrição e umidade estão adequados, mas reveja o reposicionamento. A presença de tecido de granulação não é motivo para evitar mudanças frequentes de posição. Pelo contrário, é fundamental impedir que a região lesionada permança submetida à pressão para favorecer a continuidade da cicatrização. O reposicionamento deve ser planejado de forma individualizada e executado com técnicas que reduzam pressão, fricção e cisalhamento.",
      "Você identificou medidas importantes, mas atenção ao tempo sentado. Mudanças de posição, manutenção da ingestão alimentar e controle da umidade são cuidados importantes. Entretanto, períodos prolongados na cadeira podem manter ou aumentar a pressão sobre a região sacral, especialmente em uma paciente dependente para mobilização. O tempo sentado e as mudanças de posição devem ser individualizados, com estratégias para redistribuição da pressão e proteção da região lesionada.",
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
// P, E = Posicionamento de dispositivos e Evitar umidade (201 - Joaquim)
// A, N = Avaliação de Risco e Nutrição (202 - Lucinda)
// I = Inspeção (204 - Otávio)
// V = Verificar superfície de suporte (205 - Manoel)
// R = Reposicionamento (206 - Antônia)

export const LETTER_MAP: Record<number, string[]> = {
  201: ["P", "E"],
  202: ["A", "N"],
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

// --- Fase 2 intro: mini-desafio antes da avaliação de Braden por paciente ---

// "Complete a palavra: ESCALA DE ______"
export const PHASE2_WORD_ANSWER = "BRADEN";
