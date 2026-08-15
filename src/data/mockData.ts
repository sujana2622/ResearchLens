import { Paper, CaseStudy, ResearchBrief, ResearchGapItem } from '../types';

export const initialPapers: Paper[] = [
  {
    id: 'paper-1',
    title: 'Fraud Detection in Healthcare Claims using Graph Neural Networks',
    authors: 'A. Smith, J. Doe, E. Chen',
    year: 2023,
    doi: '10.1109/TNNLS.2023.1234567',
    matchScore: 99,
    journal: 'IEEE Transactions on Neural Networks and Learning Systems',
    domain: 'Healthcare AI',
    isOpenAccess: true,
    type: 'Journal',
    isSaved: true,
    status: 'Analyzed',
    dateAdded: '2d ago',
    abstract:
      'This paper presents a novel approach to identifying fraudulent activities within healthcare insurance claims by formulating the domain as a heterogeneous information network. We design an end-to-end Graph Neural Network architecture with relation-aware attention to capture collusive billing patterns across medical providers, pharmacies, and patients that evade traditional tabular screening models.',
    analysis: {
      researchProblem:
        'Existing fraud detection systems typically treat claims as isolated instances, failing to capture collusive behavior networks between medical providers and patients.',
      objective:
        'To develop a heterogeneous graph representation of healthcare claims and design a GNN model capable of identifying anomalous subgraphs indicative of fraud rings.',
      algorithms: [
        { name: 'Random Forest (Baseline)', role: 'Baseline' },
        { name: 'Logistic Regression', role: 'Baseline' },
        { name: 'Heterogeneous GNN (Proposed)', role: 'Proposed' },
      ],
      dataset: {
        name: 'NHCAA Claims Dataset (National Health Care Anti-Fraud Association).',
        records: '1.2 Million',
        features: '45',
        description: 'Multi-provider clinical claims spanning inpatient, outpatient, and prescription records over 3 fiscal years.',
      },
      summaryBullets: [
        'Formulates healthcare fraud as a bipartite graph of providers, beneficiaries, and diagnostic codes.',
        'Implements relation-level attention mechanisms to weight abnormal billing clusters.',
        'Achieves a 24.3% increase in precision on coordinated fraud ring detection compared to XGBoost.',
      ],
      results: [
        { metric: 'ROC-AUC', value: '0.942', comparisonBaseline: '0.814 (Random Forest)' },
        { metric: 'F1 Score (Fraud Class)', value: '0.887', comparisonBaseline: '0.721 (Logistic Reg)' },
        { metric: 'Detection Latency', value: '42ms/claim', comparisonBaseline: '120ms (Rule-engine)' },
      ],
      takeaways: [
        'Graph-based relational modeling is essential when fraud involves multi-party kickback rings.',
        'Pre-training node embeddings on historical claim frequency reduces false positive rates by 31%.',
        'Can be deployed as an asynchronous scoring layer alongside real-time claim adjudication pipelines.',
      ],
      limitations: [
        'Requires periodic graph re-indexing which incurs computational overhead on large health networks.',
        'Cold-start challenge for newly registered medical practitioners with fewer than 10 submitted claims.',
      ],
    },
  },
  {
    id: 'paper-2',
    title: 'Deep Learning Approaches for Anomaly Detection in Health Insurance Claims',
    authors: 'S. Johnson, A. Chen, M. Rodriguez et al.',
    year: 2023,
    doi: '10.1016/j.jmai.2023.04.012',
    matchScore: 98,
    journal: 'Journal of Medical AI',
    domain: 'Healthcare AI',
    isOpenAccess: true,
    type: 'Journal',
    isSaved: true,
    status: 'Analyzed',
    dateAdded: '3d ago',
    abstract:
      'This study evaluates the efficacy of autoencoder networks combined with random forest classifiers to detect anomalous reimbursement requests across multi-state hospital systems without relying exclusively on historical fraud labels.',
    analysis: {
      researchProblem:
        'Supervised models suffer from severe label scarcity and confirmation bias because historical audit data only labels already investigated fraud types.',
      objective:
        'To establish a semi-supervised variational autoencoder framework that flags subtle deviations in billing distribution and treatment duration profiles.',
      algorithms: [
        { name: 'Isolation Forest', role: 'Baseline' },
        { name: 'One-Class SVM', role: 'Baseline' },
        { name: 'Variational Autoencoder + Random Forest', role: 'Proposed' },
      ],
      dataset: {
        name: 'CMS Medicare Part B Public Use File',
        records: '3.4 Million',
        features: '38',
        description: 'Comprehensive physician utilization and payment dataset covering specialized medical procedures.',
      },
      summaryBullets: [
        'Reconstruction loss serves as an unsupervised anomaly score for rare billing behavior.',
        'Latent representation isolates geographic outliers without demographic bias.',
        'Demonstrates 91.2% audit validation accuracy on previously unflagged upcoding practices.',
      ],
      results: [
        { metric: 'Precision@100', value: '92.4%', comparisonBaseline: '74.1% (One-Class SVM)' },
        { metric: 'Recall', value: '86.5%', comparisonBaseline: '68.0% (Isolation Forest)' },
      ],
      takeaways: [
        'Unsupervised autoencoders discover emerging fraud schemes that rule engines fail to catch.',
        'Combining reconstruction error with ensemble decision trees provides explainable anomaly heatmaps.',
      ],
      limitations: [
        'Sensitive to seasonal surges in claims volume (e.g. respiratory illnesses in winter).',
      ],
    },
  },
  {
    id: 'paper-3',
    title: 'Graph Neural Networks for Fraud Ring Detection in Healthcare Providers',
    authors: 'T. Wang, L. Zhang, Y. Kim',
    year: 2022,
    doi: '10.1109/TKDE.2022.9876543',
    matchScore: 94,
    journal: 'IEEE Transactions on Big Data',
    domain: 'Graph Machine Learning',
    isOpenAccess: false,
    type: 'Conference',
    isSaved: false,
    status: 'Analyzed',
    dateAdded: '1w ago',
    abstract:
      'We propose a novel framework utilizing Graph Convolutional Networks (GCNs) to model complex collusion networks between clinical clinics, testing laboratories, and transport providers in subsidized insurance programs.',
    analysis: {
      researchProblem:
        'Fraudulent syndicates systematically split claims below audit thresholds across distributed shell clinics to stay undetected.',
      objective:
        'Construct higher-order motif representations to identify dense sub-graphs of reciprocal referrals and shared bank accounts.',
      algorithms: [
        { name: 'Node2Vec + SVM', role: 'Baseline' },
        { name: 'Graph Convolutional Network (GCN)', role: 'Proposed' },
        { name: 'Graph Attention Network (GAT)', role: 'Comparison' },
      ],
      dataset: {
        name: 'Synthea Synthetic EHR & Billing Dataset',
        records: '850,000',
        features: '52',
        description: 'Synthetic medical record generation benchmark augmented with synthetic syndicate patterns.',
      },
      summaryBullets: [
        'Graph spectral clustering groups suspicious clinical co-billing rings with 94% purity.',
        'Node-level explainability provides visual subnet diagrams for legal compliance investigators.',
      ],
      results: [
        { metric: 'Ring Detection F1', value: '0.891', comparisonBaseline: '0.640 (Node2Vec)' },
        { metric: 'False Positive Ratio', value: '2.1%', comparisonBaseline: '8.4% (Rule-based)' },
      ],
      takeaways: [
        'Community detection algorithms in conjunction with GCN edge features isolate shell provider rings rapidly.',
      ],
      limitations: [
        'High memory requirements when evaluating graphs with >5 million edges.',
      ],
    },
  },
  {
    id: 'paper-4',
    title: 'Predictive Modeling of Upcoding Practices using Natural Language Processing',
    authors: 'E. Davies, P. Gupta',
    year: 2024,
    doi: '10.1093/jamia/ocae019',
    matchScore: 88,
    journal: 'Health Informatics Journal',
    domain: 'Natural Language Processing',
    isOpenAccess: true,
    type: 'Journal',
    isSaved: false,
    status: 'Analyzed',
    dateAdded: '4d ago',
    abstract:
      'By applying BERT-based models to clinical notes and comparing them against submitted billing ICD-10 and CPT codes, this paper detects discrepancies and intentional upcoding in outpatient emergency departments.',
    analysis: {
      researchProblem:
        'Physicians and billing aggregators frequently assign higher-severity billing codes than what clinical notes substantiate.',
      objective:
        'To build a cross-modal alignment model between unstructured doctor notes and structured billing claims.',
      algorithms: [
        { name: 'TF-IDF + Ridge Classifier', role: 'Baseline' },
        { name: 'ClinicalBERT Cross-Encoder', role: 'Proposed' },
      ],
      dataset: {
        name: 'MIMIC-IV Emergency Department Cohort',
        records: '420,000',
        features: '64',
        description: 'De-identified clinical notes paired with corresponding emergency room discharge billings.',
      },
      summaryBullets: [
        'Identifies code inflation in over 14.8% of evaluated complex trauma cases.',
        'Automates highlighted evidence extraction directly within clinical notes for audit verification.',
      ],
      results: [
        { metric: 'Upcoding Discrepancy F1', value: '0.862', comparisonBaseline: '0.612 (TF-IDF)' },
        { metric: 'Audit Agreement Rate', value: '94.8%', comparisonBaseline: '72.0% (Manual Sample)' },
      ],
      takeaways: [
        'NLP analysis of clinical documentation bridges the gap between patient care reality and financial billing.',
      ],
      limitations: [
        'Variations in physician shorthand and dictation typos can slightly lower entity extraction confidence.',
      ],
    },
  },
  {
    id: 'paper-5',
    title: 'Attention Is All You Need',
    authors: 'A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones et al.',
    year: 2017,
    doi: '10.48550/arXiv.1706.03762',
    matchScore: 95,
    journal: 'Advances in Neural Information Processing Systems (NeurIPS)',
    domain: 'Deep Learning / Transformers',
    isOpenAccess: true,
    type: 'Conference',
    isSaved: true,
    status: 'Analyzed',
    dateAdded: '2d ago',
    abstract:
      'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    analysis: {
      researchProblem:
        'Sequential computation in RNNs and LSTMs precludes parallelization within training examples, creating fundamental bottlenecks at longer sequence lengths.',
      objective:
        'To build a sequence model based entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution.',
      algorithms: [
        { name: 'ByteNet / ConvS2S', role: 'Baseline' },
        { name: 'GNMT (Recurrent LSTM)', role: 'Baseline' },
        { name: 'Transformer (Multi-Head Self-Attention)', role: 'Proposed' },
      ],
      dataset: {
        name: 'WMT 2014 English-to-German & English-to-French Translation',
        records: '4.5 Million sentence pairs',
        features: '512-dim embedding',
        description: 'Standard machine translation benchmark datasets for bilingual language modeling.',
      },
      summaryBullets: [
        'Introduces Multi-Head Scaled Dot-Product Self-Attention and Positional Encodings.',
        'Allows significantly more parallelization and reaches state-of-the-art translation quality with 3.5 days of training on 8 P100 GPUs.',
      ],
      results: [
        { metric: 'BLEU (EN-DE)', value: '28.4', comparisonBaseline: '26.3 (Ensemble GNMT)' },
        { metric: 'BLEU (EN-FR)', value: '41.8', comparisonBaseline: '40.6 (ConvS2S)' },
        { metric: 'Training Cost', value: '3.5 days / 8 GPUs', comparisonBaseline: 'Months (RNNs)' },
      ],
      takeaways: [
        'Self-attention captures long-range syntactic and semantic dependencies irrespective of distance.',
        'Foundation architecture for all modern foundational LLMs and vision transformers.',
      ],
      limitations: [
        'Quadratic computational and memory complexity O(N^2) relative to sequence length.',
      ],
    },
  },
  {
    id: 'paper-6',
    title: 'Language Models are Few-Shot Learners',
    authors: 'T. Brown, B. Mann, N. Ryder, M. Subbiah, J. Kaplan et al.',
    year: 2020,
    doi: '10.48550/arXiv.2005.14165',
    matchScore: 92,
    journal: 'NeurIPS 2020',
    domain: 'Large Language Models',
    isOpenAccess: true,
    type: 'Conference',
    isSaved: true,
    status: 'Processing',
    dateAdded: '1h ago',
    abstract:
      'We train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance in the few-shot setting without task-specific fine-tuning.',
    analysis: {
      researchProblem:
        'Standard NLP benchmarks required thousands of task-specific labeled examples for fine-tuning, restricting generalization and adaptability.',
      objective:
        'To demonstrate that scaling language models substantially improves task-agnostic, few-shot performance through in-context prompting alone.',
      algorithms: [
        { name: 'Fine-tuned RoBERTa', role: 'Baseline' },
        { name: 'T5-11B', role: 'Baseline' },
        { name: 'GPT-3 (175B Parameters Autoregressive Transformer)', role: 'Proposed' },
      ],
      dataset: {
        name: 'Common Crawl Filtered + WebText2 + Books1/2 + Wikipedia',
        records: '300 Billion Tokens',
        features: '175B weights',
        description: 'Vast multilingual and multimodal text corpus cleaned with heuristic filtering.',
      },
      summaryBullets: [
        'Shows strong performance on translation, question-answering, cloze tasks, and arithmetic without gradient updates.',
        'Demonstrates emergent scaling law behaviors with predictable power-law loss curves.',
      ],
      results: [
        { metric: 'TriviaQA Zero-Shot', value: '64.3%', comparisonBaseline: '45.1% (T5-11B Zero-shot)' },
        { metric: 'SuperGLUE Few-Shot', value: '71.8', comparisonBaseline: '70.2 (Fine-tuned BERT-Large)' },
      ],
      takeaways: [
        'In-context learning is a viable alternative to task fine-tuning for thousands of linguistic tasks.',
      ],
      limitations: [
        'Prone to factual hallucinations and common-sense physical reasoning blind spots.',
      ],
    },
  },
  {
    id: 'paper-7',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: 'J. Devlin, M. Chang, K. Lee, K. Toutanova',
    year: 2018,
    doi: '10.48550/arXiv.1810.04805',
    matchScore: 90,
    journal: 'NAACL-HLT 2019',
    domain: 'Natural Language Processing',
    isOpenAccess: true,
    type: 'Conference',
    isSaved: true,
    status: 'Analyzed',
    dateAdded: '5d ago',
    abstract:
      'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.',
    analysis: {
      researchProblem:
        'Standard language models were unidirectional (left-to-right), severely limiting contextual representation in sentence-level tasks like question answering and sentiment classification.',
      objective:
        'To train bidirectional Transformer representations using Masked Language Modeling (MLM) and Next Sentence Prediction (NSP).',
      algorithms: [
        { name: 'OpenAI GPT (Unidirectional)', role: 'Baseline' },
        { name: 'ELMo (Feature-based Bidirectional LSTM)', role: 'Baseline' },
        { name: 'BERT-Base & BERT-Large', role: 'Proposed' },
      ],
      dataset: {
        name: 'BooksCorpus (800M words) + English Wikipedia (2,500M words)',
        records: '3.3 Billion Words',
        features: '768 / 1024 hidden dims',
        description: 'Large clean text corpora covering diverse encyclopedic domains.',
      },
      summaryBullets: [
        'Pre-trained with 15% masked token prediction and binary next-sentence coherence objective.',
        'Set new state-of-the-art records across 11 NLP tasks including GLUE, MultiNLI, and SQuAD.',
      ],
      results: [
        { metric: 'GLUE Score', value: '80.5%', comparisonBaseline: '72.8% (OpenAI GPT)' },
        { metric: 'SQuAD 1.1 F1', value: '93.2%', comparisonBaseline: '91.6% (Human baseline: 91.2%)' },
      ],
      takeaways: [
        'Deep bidirectional pre-training provides substantial transfer learning benefits with modest fine-tuning compute.',
      ],
      limitations: [
        'High latency during real-time edge inference compared to lightweight recurrent models.',
      ],
    },
  },
];

export const initialCaseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Medicare Syndicate Detection: 42M Recovered in Collusive Billing',
    organization: 'National Health Integrity Bureau & Horizon Health',
    year: 2023,
    domain: 'Healthcare & Public Sector',
    summary:
      'Deployment of heterogeneous graph neural networks across 14 million historical Medicare claims to uncover a cross-state ring of 18 phantom outpatient surgical clinics submitting inflated billing.',
    problem:
      'Traditional rule engines were failing because fraudulent providers rotated patient beneficiaries and kept individual billing invoices under the $5,000 threshold that triggered manual auditor review.',
    solution:
      'Implemented a live graph anomaly detection engine linking tax identifiers, patient referral paths, and diagnostic frequencies to flag dense collusive cliques in real-time.',
    impactMetrics: [
      { label: 'Funds Recovered', value: '$42.4M', detail: 'Identified and frozen in 6 months' },
      { label: 'False Positive Drop', value: '-74%', detail: 'Compared to legacy rule-engine alerts' },
      { label: 'Audit Speedup', value: '4.8x', detail: 'Investigation preparation time reduced from weeks to hours' },
    ],
    techStack: ['PyTorch Geometric', 'Heterogeneous GNNs', 'Apache GraphX', 'FastAPI'],
    timeline: '8 Months from Pilot to Production Adjudication',
    linkedPaperIds: ['paper-1', 'paper-3'],
  },
  {
    id: 'case-2',
    title: 'Clinical Note Upcoding Audit: Hospital System Compliance AI',
    organization: 'Apex Regional Health System (22 Hospitals)',
    year: 2024,
    domain: 'Hospital Operations',
    summary:
      'Integration of ClinicalBERT NLP pipeline to pre-screen emergency room billing codes against raw EHR physician progress notes before submission to commercial payers.',
    problem:
      'Payer rejections and post-payment clawbacks cost the health network $18M annually due to accidental upcoding and mismatched documentation.',
    solution:
      'Automated semantic alignment scoring that flags documentation discrepancies to clinical coders before billing finalization.',
    impactMetrics: [
      { label: 'Payer Clawbacks', value: '-68%', detail: 'Reduced clawback penalties within first fiscal year' },
      { label: 'Clean Claim Rate', value: '98.2%', detail: 'Increased first-pass claim acceptance rate' },
      { label: 'Coder Efficiency', value: '+35%', detail: 'Faster coding review turnaround' },
    ],
    techStack: ['ClinicalBERT', 'Hugging Face Inference', 'HL7 FHIR API', 'PostgreSQL'],
    timeline: '6 Months Full Hospital System Rollout',
    linkedPaperIds: ['paper-4'],
  },
  {
    id: 'case-3',
    title: 'Cross-Border Payment Fraud Ring Defense',
    organization: 'NovaPay Global Banking',
    year: 2023,
    domain: 'Financial Technology',
    summary:
      'Applying graph convolutional embeddings and temporal sequence modeling to prevent synthetic identity theft rings across multi-currency remittances.',
    problem:
      'Organized fraud syndicates were generating thousands of synthetic credit profiles to perform rapid bust-out attacks across international merchant corridors.',
    solution:
      'Created dynamic temporal graph snapshots that evaluate entity relationship velocity (device IDs, IP subnets, recipient bank accounts).',
    impactMetrics: [
      { label: 'Fraud Loss Prevented', value: '$29.1M', detail: 'Prevented bust-out attempts in Q1-Q3' },
      { label: 'Latency', value: '18ms', detail: 'P99 authorization decision speed' },
      { label: 'Customer Friction', value: '<0.05%', detail: 'Legitimate transaction block rate' },
    ],
    techStack: ['GraphSAGE', 'RedisGraph', 'TensorRT', 'Kafka Streaming'],
    timeline: '10 Months Multi-Region Deployment',
    linkedPaperIds: ['paper-1', 'paper-3'],
  },
  {
    id: 'case-4',
    title: 'Mayo Clinic Diagnostic Assistance Pilot',
    organization: 'Mayo Clinic Research Division',
    year: 2024,
    domain: 'Clinical Decision Support',
    summary:
      'Evaluated few-shot clinical language models for triaging rare autoimmune disease differential diagnoses across complex patient histories.',
    problem:
      'Patients with rare rheumatological and autoimmune conditions experienced average diagnostic delays of 3.2 years across multiple specialist referrals.',
    solution:
      'Deployed an in-context few-shot clinical assistant trained to aggregate multi-organ symptoms and recommend relevant rare condition panels.',
    impactMetrics: [
      { label: 'Diagnostic Speed', value: '2.4x Faster', detail: 'Accelerated time to correct specialist referral' },
      { label: 'Physician Agreement', value: '89.4%', detail: 'Differential diagnosis overlap rate' },
      { label: 'Rare Diseases Flagged', value: '142 Cases', detail: 'Early identification in 6-month trial' },
    ],
    techStack: ['Gemini 1.5 Pro (Clinical Fine-tune)', 'FHIR Data Lake', 'FastAPI'],
    timeline: '12 Months Clinical Trial & IRB Review',
    linkedPaperIds: ['paper-5', 'paper-6'],
  },
];

export const sampleResearchGaps: ResearchGapItem[] = [
  {
    id: 'gap-1',
    title: 'Real-time Dynamic Graph Evolution in Live Healthcare Adjudication',
    category: 'Methodological',
    description:
      'Most current GNN fraud detection models assume static or batched graphs (weekly/monthly snapshots), which allows rapid flash-fraud syndicates to operate in the sub-hour window before graph re-indexing.',
    opportunity:
      'Design continuous streaming graph neural networks with incremental node embedding updates that score incoming claims in under 50ms without full retraining.',
    relevantPaperIds: ['paper-1', 'paper-3'],
    difficulty: 'High',
  },
  {
    id: 'gap-2',
    title: 'Cross-Modal Multilingual Clinical Note Alignment for Underrepresented Languages',
    category: 'Data Scarcity',
    description:
      'Existing NLP upcoding models rely heavily on English-language MIMIC datasets. Multi-payer systems in European, Latin American, and Asian healthcare networks lack robust validated clinical note corpora.',
    opportunity:
      'Develop cross-lingual clinical transfer learning benchmarks using synthetic patient record generation with differential privacy guarantees.',
    relevantPaperIds: ['paper-4', 'paper-7'],
    difficulty: 'Medium',
  },
  {
    id: 'gap-3',
    title: 'Explainable Attribution for Legal Court Admissibility in Medical Fraud Cases',
    category: 'Application',
    description:
      'While deep learning autoencoders and GNNs yield high ROC-AUC scores, their black-box predictions face significant legal challenges when presented as primary evidence in civil fraud litigation.',
    opportunity:
      'Create verifiable causal attribution subgraphs and deterministic rule translations from GNN attention weights that satisfy federal evidentiary standards.',
    relevantPaperIds: ['paper-1', 'paper-2', 'paper-3'],
    difficulty: 'Medium',
  },
  {
    id: 'gap-4',
    title: 'Few-Shot Calibration for Rare Diagnostic Sub-Specialties',
    category: 'Empirical',
    description:
      'Large language models suffer from confidence miscalibration and overconfidence when diagnosing rare pediatric or orphan genetic diseases with fewer than 100 historical documented cases.',
    opportunity:
      'Construct uncertainty-quantified Bayesian prompting frameworks that explicitly trigger specialist consultation alerts when epistemic uncertainty exceeds calibrated safety thresholds.',
    relevantPaperIds: ['paper-5', 'paper-6'],
    difficulty: 'High',
  },
];

export const defaultResearchBrief: ResearchBrief = {
  query: 'AI-based healthcare fraud detection',
  summary:
    'Analysis indicates a strong correlation between deep learning models (specifically autoencoders and heterogeneous graph neural networks) and improved anomaly detection rates across multi-provider healthcare networks. Contemporary literature shows a transition from rule-based filters to relational graph architectures capable of identifying coordinated syndicates, yielding up to 24.3% higher precision and 68% lower false positive rates in clinical audits.',
  paperCount: 24,
  caseCount: 8,
  keyFindings: [
    'Graph Neural Networks (GNNs) outperform traditional XGBoost/Random Forest by 20-25% when detecting collusive multi-party fraud rings.',
    'Variational Autoencoders allow unsupervised anomaly discovery, catching emerging billing schemes without requiring historical fraud labels.',
    'Clinical NLP (BERT-based cross-encoders) enables automated verification of billing codes against unstructured physician progress notes.',
    'Real-world deployments at Medicare and private health networks report average ROI within 6 months and fraud recovery exceeding $40M.',
  ],
  consensusLevel: 'High',
  topMethodologies: ['Heterogeneous GNNs (RGCN/HGT)', 'Variational Autoencoders (VAE)', 'ClinicalBERT Alignment', 'Graph Spectral Clustering'],
  openQuestions: [
    'How to maintain sub-50ms inference latency on massive graphs with >100M dynamic billing edges?',
    'Ensuring explainability and chain-of-evidence transparency for federal legal court proceedings.',
  ],
};

export const sampleResearchBrief = defaultResearchBrief;
