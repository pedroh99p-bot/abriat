import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Handshake,
  IdCard,
  Megaphone,
  Network,
  ShieldCheck,
  Target,
  UsersRound,
} from 'lucide-react'

export const siteConfig = {
  assets: {
    favicon: '/favicon.webp',
    logo: '/assets/navbar-abriat.webp',
    footerLogo: '/assets/logo-abriat-footer.webp',
    founder: '/assets/paulo-dornelas.webp',
  },
  contacts: {
    whatsappRaw: '83998858705',
    whatsappWaMe: '5583998858705',
    abriatInstagramUsername: '@abriat.brasil',
    abriatInstagramUrl: 'https://www.instagram.com/abriat.brasil/',
    founderInstagramUsername: '@paulodornelasbr',
    founderInstagramUrl: 'https://www.instagram.com/paulodornelasbr/',
  },
} as const

export const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Para quem', href: '#perfis' },
  { label: 'Dúvidas', href: '#faq' },
]

export const heroSlides = [
  {
    eyebrow: 'Associação nacional para instrutores',
    title: 'Fortaleça sua atuação.',
    highlight: 'Faça parte da ABRIAT.',
    description: 'Representatividade, benefícios e identificação profissional para instrutores de armamento e tiro em todo o Brasil.',
    cta: 'Iniciar filiação',
    href: '#filiacao',
    image: '/assets/hero-filiacao.webp',
    alt: 'Instrutor em camisa vermelha em estande de treinamento, posicionado à direita da composição',
    crop: 'filiacao',
  },
  {
    eyebrow: 'Benefícios ABRIAT',
    title: 'Mais que associação.',
    highlight: 'Estrutura para o instrutor.',
    description: 'Carteira de identificação, cursos de aperfeiçoamento, descontos em clubes parceiros e mais vantagens para o associado.',
    cta: 'Ver benefícios',
    href: '#beneficios',
    image: '/assets/hero-beneficios.webp',
    alt: 'Carteira de identificação ABRIAT e equipamentos em composição institucional',
    crop: 'beneficios',
  },
  {
    eyebrow: 'Identificação ABRIAT',
    title: 'Sua identificação.',
    highlight: 'Sua associação verificável.',
    description: 'Carteirinha do associado com número individual e validação por QR Code para confirmar a situação da associação.',
    cta: 'Conhecer a carteirinha',
    href: '#carteirinha',
    image: '/assets/hero-carteirinha.webp',
    alt: 'Carteirinha ABRIAT com QR Code sobre equipamentos, à direita da composição',
    crop: 'carteirinha',
  },
]

export const pillars = [
  { title: 'Representatividade', text: 'Uma voz mais forte para a categoria.', icon: UsersRound },
  { title: 'Estrutura', text: 'Orientação e suporte institucional.', icon: ShieldCheck },
  { title: 'Conexão', text: 'Instrutores mais conectados.', icon: Network },
  { title: 'Valorização', text: 'Mais reconhecimento e oportunidades.', icon: BadgeCheck },
]

export const benefits = [
  { title: 'Assessoria Doutor das Armas', text: 'Condição especial para associados ABRIAT.', highlight: '50% de desconto', logo: '/assets/partner-doutor-das-armas.webp' },
  { title: 'Carteira de identificação', text: 'Identificação do associado ABRIAT.', icon: IdCard },
  { title: 'Cursos de aperfeiçoamento gratuitos', text: 'Capacitação contínua para associados.', icon: GraduationCap },
  { title: 'Descontos em clubes parceiros', text: 'Condições especiais na rede parceira.', icon: Handshake },
  { title: 'Divulgação no ecossistema ABRIAT', text: 'Mais visibilidade para o associado.', icon: Megaphone },
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
