export const profile = {
  name: 'Aiden Cole',
  title: 'AI / Machine Learning Engineer',
  tagline: 'I design and ship machine learning systems, from data pipeline to production endpoint.',
  location: 'Remote · Open to relocation',
  email: 'aiden.cole@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  resumeUrl: '/resume.pdf',
  bio: [
    'I build applied machine learning systems — from data pipelines to fine-tuned models to the APIs that serve them. My work sits at the intersection of research and production: turning a promising notebook into something that holds up under real traffic.',
    "Most recently I've focused on retrieval-augmented generation, computer vision for structured documents, and the backend infrastructure that keeps model inference fast and observable.",
  ],
  highlights: [
    { value: '4+', label: 'years building ML systems' },
    { value: '20+', label: 'models shipped to production' },
    { value: '12', label: 'open-source contributions' },
    { value: '3', label: 'research papers co-authored' },
  ],
};

export const skills = [
  {
    category: 'Programming',
    items: ['Python', 'TypeScript', 'C++', 'SQL', 'Bash'],
  },
  {
    category: 'Machine Learning',
    items: ['Scikit-learn', 'XGBoost', 'Feature Engineering', 'Model Evaluation', 'MLOps'],
  },
  {
    category: 'Deep Learning',
    items: ['PyTorch', 'TensorFlow', 'CNNs', 'Transformers', 'ONNX Runtime'],
  },
  {
    category: 'Generative AI',
    items: ['LLM Fine-tuning', 'RAG Pipelines', 'Prompt Engineering', 'LangChain', 'Vector Search'],
  },
  {
    category: 'Backend',
    items: ['FastAPI', 'Node.js', 'REST APIs', 'Docker', 'Celery'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'Redis', 'Pinecone', 'MongoDB'],
  },
  {
    category: 'Tools',
    items: ['Git', 'AWS', 'Weights & Biases', 'CI/CD', 'Linux'],
  },
];

export const projects = [
  {
    id: 'doc-intel',
    name: 'DocIntel',
    description:
      'A document-understanding pipeline that extracts structured fields from scanned invoices using a fine-tuned vision-language model, cutting manual entry time by 70%.',
    tags: ['PyTorch', 'FastAPI', 'PostgreSQL', 'Docker'],
    image: null,
    github: 'https://github.com/yourusername/doc-intel',
    demo: 'https://demo.example.com/doc-intel',
    featured: true,
  },
  {
    id: 'retrieval-copilot',
    name: 'Retrieval Copilot',
    description:
      'A RAG-based internal knowledge assistant with hybrid search, source citations, and a feedback loop that improves retrieval ranking over time.',
    tags: ['LangChain', 'Pinecone', 'OpenAI API', 'React'],
    image: null,
    github: 'https://github.com/yourusername/retrieval-copilot',
    demo: 'https://demo.example.com/retrieval-copilot',
    featured: true,
  },
  {
    id: 'signalboard',
    name: 'Signalboard',
    description:
      'Real-time anomaly detection for time-series infrastructure metrics, with an alerting service tuned to minimize false positives.',
    tags: ['Python', 'XGBoost', 'Kafka', 'Redis'],
    image: null,
    github: 'https://github.com/yourusername/signalboard',
    demo: null,
    featured: false,
  },
  {
    id: 'visionsort',
    name: 'VisionSort',
    description:
      'A lightweight image classification service deployed at the edge for warehouse sorting, running under 40ms per inference on commodity hardware.',
    tags: ['TensorFlow', 'ONNX', 'C++', 'Edge Deployment'],
    image: null,
    github: 'https://github.com/yourusername/visionsort',
    demo: null,
    featured: false,
  },
];

export const experience = [
  {
    id: 'exp-1',
    role: 'Machine Learning Engineer',
    org: 'Northwind AI',
    start: '2023',
    end: 'Present',
    description:
      'Lead engineer for the document-understanding platform serving 40+ enterprise clients. Own the model training pipeline and the FastAPI inference layer.',
    tech: ['PyTorch', 'FastAPI', 'AWS', 'PostgreSQL'],
  },
  {
    id: 'exp-2',
    role: 'AI Engineer',
    org: 'Fieldstone Labs',
    start: '2021',
    end: '2023',
    description:
      'Built and shipped a recommendation engine and an internal RAG assistant used daily by the support team, reducing average ticket resolution time by 30%.',
    tech: ['LangChain', 'Python', 'Redis', 'Docker'],
  },
  {
    id: 'exp-3',
    role: 'Data Science Intern',
    org: 'Marlow Analytics',
    start: '2020',
    end: '2021',
    description:
      'Developed churn-prediction models and automated the weekly reporting pipeline, later adopted as the team standard.',
    tech: ['Scikit-learn', 'SQL', 'Pandas'],
  },
];

export const education = [
  {
    id: 'edu-1',
    degree: 'M.S. in Computer Science, Machine Learning',
    school: 'University of Toronto',
    start: '2019',
    end: '2021',
    description: 'Thesis on efficient fine-tuning strategies for low-resource document classification.',
    tech: ['Deep Learning', 'Statistics', 'Distributed Systems'],
  },
  {
    id: 'edu-2',
    degree: 'B.S. in Computer Science',
    school: 'University of Waterloo',
    start: '2015',
    end: '2019',
    description: 'Focused on algorithms, systems programming, and applied mathematics.',
    tech: ['Algorithms', 'Linear Algebra', 'Software Systems'],
  },
];

export const certifications = [
  {
    id: 'cert-1',
    name: 'DeepLearning.AI TensorFlow Developer',
    issuer: 'DeepLearning.AI',
    date: '2022',
    url: 'https://coursera.org/verify/example1',
  },
  {
    id: 'cert-2',
    name: 'AWS Certified Machine Learning – Specialty',
    issuer: 'Amazon Web Services',
    date: '2023',
    url: 'https://aws.amazon.com/verification/example2',
  },
  {
    id: 'cert-3',
    name: 'Natural Language Processing Specialization',
    issuer: 'DeepLearning.AI',
    date: '2021',
    url: 'https://coursera.org/verify/example3',
  },
];

export const services = [
  {
    id: 'svc-1',
    title: 'Machine Learning',
    description: 'End-to-end model development — from data exploration to a trained, evaluated, and versioned model.',
  },
  {
    id: 'svc-2',
    title: 'AI Application Development',
    description: 'Full applications built around a model: APIs, UI, auth, and the plumbing that makes it usable.',
  },
  {
    id: 'svc-3',
    title: 'Generative AI',
    description: 'RAG systems, fine-tuning, and prompt pipelines tailored to a specific domain or dataset.',
  },
  {
    id: 'svc-4',
    title: 'Computer Vision',
    description: 'Detection, classification, and document-understanding pipelines, optimized for real deployment constraints.',
  },
  {
    id: 'svc-5',
    title: 'Backend / API Development',
    description: 'FastAPI services and data layers designed to serve models reliably at production traffic.',
  },
  {
    id: 'svc-6',
    title: 'AI Chatbots',
    description: 'Conversational assistants grounded in real data, with guardrails and a feedback loop built in.',
  },
];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];