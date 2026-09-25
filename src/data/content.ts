import {
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Eye,
  Handshake,
  Network,
  ShieldCheck,
  Target,
  UsersRound,
} from 'lucide-react'

export const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Para quem', href: '#perfis' },
  { label: 'Dúvidas', href: '#faq' },
]

export const heroSlides = [
  {
    eyebrow: 'Associação para quem vive a instrução',
    title: 'Fortaleça sua atuação.',
    highlight: 'Faça parte da ABRIAT.',
    description: 'Representatividade, estrutura e conexão para instrutores de armamento e tiro em todo o Brasil.',
    cta: 'Quero conhecer a associação',
    href: '#quiz',
    image: '/assets/hero-associacao.webp',
    alt: 'Imagem ilustrativa de atividade profissional em ambiente de treinamento',
    crop: 'association',
  },
  {
    eyebrow: 'Benefícios ABRIAT',
    title: 'Mais que benefícios.',
    highlight: 'Estrutura para o IAT.',
    description: 'Uma proposta construída para apoiar o desenvolvimento, a visibilidade e a conexão profissional.',
    cta: 'Conhecer os benefícios',
    href: '#beneficios',
    image: '/assets/hero-beneficios.webp',
    alt: 'Equipamentos profissionais e credencial em composição institucional',
    crop: 'benefits',
  },
  {
    eyebrow: 'Conheça a liderança',
    title: 'Uma associação criada',
    highlight: 'por quem conhece o setor.',
    description: 'Conheça Paulo Dornelas, fundador da ABRIAT, e a proposta que orienta a associação.',
    cta: 'Conhecer o fundador',
    href: '#fundador',
    image: '/assets/hero-associacao.webp',
    alt: 'Imagem ilustrativa de atividade profissional em ambiente de treinamento',
    crop: 'leadership',
  },
]

export const pillars = [
  { title: 'Representatividade', text: 'Fortalecimento da categoria junto a órgãos e instituições.', icon: UsersRound },
  { title: 'Estrutura', text: 'Orientação e suporte institucional para a atuação profissional.', icon: ShieldCheck },
  { title: 'Conexão', text: 'Aproximação entre profissionais de diferentes regiões do Brasil.', icon: Network },
  { title: 'Valorização', text: 'Mais presença, reconhecimento e oportunidades para o instrutor.', icon: BadgeCheck },
]

export const benefits = [
  { title: 'Representatividade', text: 'Uma voz mais forte para a categoria perante órgãos, instituições e entidades do setor.', icon: UsersRound },
  { title: 'Rede profissional', text: 'Conexão com instrutores de diferentes regiões e novas possibilidades de colaboração.', icon: Network },
  { title: 'Visibilidade', text: 'Um ambiente pensado para ampliar reconhecimento e credibilidade profissional.', icon: Eye },
  { title: 'Conteúdo e atualização', text: 'Acesso futuro a materiais, orientações e capacitações da associação.', icon: BookOpenCheck },
  { title: 'Parcerias', text: 'Estrutura para desenvolver condições com empresas e marcas alinhadas ao setor.', icon: Handshake },
]

export const profiles = [
  { id: 'instrutor', label: 'Instrutor ativo', title: 'Instrutor em atividade', text: 'Profissionais que atuam diretamente com instrução de armamento e tiro em diferentes contextos e modalidades.', icon: Target },
  { id: 'clube', label: 'Clube / Centro', title: 'Atuação em clube ou centro', text: 'Instrutores e profissionais que desenvolvem atividades em clubes, estandes, escolas ou centros de treinamento.', icon: Building2 },
  { id: 'autonomo', label: 'Profissional autônomo', title: 'Profissional independente', text: 'Instrutores independentes e profissionais liberais que buscam mais estrutura, apoio e representatividade.', icon: BriefcaseBusiness },
  { id: 'interessado', label: 'Quero saber mais', title: 'Interessado na associação', text: 'Profissionais que se identificam com a proposta da ABRIAT e querem entender critérios e próximos passos.', icon: UsersRound },
]

export const faqs = [
  { question: 'O que é a ABRIAT?', answer: 'A ABRIAT é a Associação Brasileira dos Instrutores de Armamento e Tiro, criada para fortalecer a representatividade, a integração e o desenvolvimento profissional da categoria.' },
  { question: 'Quem pode demonstrar interesse?', answer: 'Instrutores em atividade, profissionais autônomos e pessoas ligadas a clubes, estandes, escolas ou centros de treinamento podem preencher o formulário para receber orientação.' },
  { question: 'Preencher o formulário confirma minha associação?', answer: 'Não. O formulário registra seu interesse. A equipe responsável deverá orientar sobre critérios, documentos e etapas antes de qualquer associação.' },
  { question: 'Quais documentos serão necessários?', answer: 'A documentação ainda será detalhada pelo atendimento institucional. A página não solicita envio de documentos nesta primeira etapa.' },
  { question: 'Como meus dados serão usados?', answer: 'Os dados informados devem ser usados apenas para contato sobre a ABRIAT e sobre o processo de associação, conforme a política de privacidade a ser publicada.' },
]
