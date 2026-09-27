import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { siteConfig } from '../data/content'
import { Brand } from './Brand'

type LegalPageProps = { type: 'privacy' | 'terms' }

export function LegalPage({ type }: LegalPageProps) {
  const privacy = type === 'privacy'
  useEffect(() => {
    document.title = `${privacy ? 'Política de Privacidade' : 'Termos de Uso'} | ABRIAT`
  }, [privacy])
  return (
    <main className="legal-page" id="conteudo">
      <div className="legal-page__top"><Brand logo={siteConfig.assets.logo} /><a href="/"><ArrowLeft aria-hidden="true"/> Voltar para o site</a></div>
      <article className="legal-page__article">
        <p className="eyebrow"><span aria-hidden="true"/>Informação institucional</p>
        <h1>{privacy ? 'Política de Privacidade' : 'Termos de Uso'}</h1>
        <p className="legal-page__updated">Última atualização: 27 de setembro de 2026</p>
        {privacy ? <PrivacyContent /> : <TermsContent />}
        <p className="legal-page__contact">Dúvidas? Fale com a ABRIAT pelo <a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>.</p>
      </article>
      <footer className="legal-page__footer">© {new Date().getFullYear()} ABRIAT</footer>
    </main>
  )
}

function PrivacyContent() {
  return <>
    <section><h2>1. Quem é responsável pelo tratamento</h2><p>{siteConfig.organization.legalName}, inscrita no CNPJ {siteConfig.organization.cnpj}, é responsável pelos dados tratados por meio deste site.</p></section>
    <section><h2>2. Dados que podem ser tratados</h2><p>Conforme os campos preenchidos, podem ser tratados nome, WhatsApp/telefone, e-mail, cidade, estado e escolhas feitas nos formulários. Dados técnicos estritamente necessários para carregar e proteger o site também podem ser processados pelo navegador e pela infraestrutura de hospedagem. O formulário não recebe upload de documentos.</p></section>
    <section><h2>3. Para que usamos os dados</h2><p>Os dados informados no formulário são organizados em uma mensagem para você revisar. Quando você abre o link do WhatsApp, o conteúdo preenchido é transmitido ao serviço para preparar a conversa. A equipe ABRIAT só recebe a mensagem se você decidir enviá-la pelo WhatsApp. O contato recebido pode ser usado para responder à solicitação, iniciar e acompanhar o pedido de filiação, prestar a orientação solicitada e administrar o relacionamento institucional. Dados técnicos podem apoiar o funcionamento e a segurança do site; obrigações legais podem exigir tratamento adicional quando aplicável.</p></section>
    <section><h2>4. Compartilhamento</h2><p>Os dados podem ser tratados por fornecedores essenciais à hospedagem e operação do site, dentro do necessário para esses serviços, e compartilhados quando uma obrigação legal exigir. Ao escolher contato pelo WhatsApp, você passa a interagir também com o serviço operado pela Meta. O mapa incorporado é fornecido pelo Google Maps e só é carregado se você clicar para exibi-lo; ao fazer isso, dados técnicos do acesso podem ser processados pelo Google, segundo os termos e a <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noreferrer">Política de Privacidade do Google</a>.</p></section>
    <section><h2>5. Retenção</h2><p>Os dados são mantidos pelo período necessário para cumprir as finalidades informadas e as obrigações legais ou regulatórias aplicáveis.</p></section>
    <section><h2>6. Seus direitos</h2><p>Nos termos da legislação aplicável, você pode solicitar confirmação do tratamento, acesso, correção de dados incompletos ou desatualizados, informações sobre compartilhamento, anonimização, bloqueio ou eliminação quando cabíveis, portabilidade quando aplicável, e revisão de decisões automatizadas nos casos previstos. Também pode apresentar solicitações relacionadas ao consentimento quando essa for a base aplicável ao tratamento.</p></section>
    <section><h2>7. Canal de privacidade</h2><p>Para exercer seus direitos ou esclarecer dúvidas sobre dados pessoais, escreva para <a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>.</p></section>
    <section><h2>8. Segurança</h2><p>Adotamos cuidados razoáveis e compatíveis com a operação do site para proteger as informações. Nenhum meio de transmissão ou armazenamento pode ser garantido como absolutamente seguro.</p></section>
    <section><h2>9. Cookies e analytics</h2><p>O site não integra ferramentas externas de analytics ou marketing. Eventos de uso são registrados somente em memória no navegador por meio de <code>window.dataLayer</code>; não são incluídos nome, telefone, e-mail ou outros dados pessoais nesses eventos. O mapa externo do Google Maps só é carregado após sua escolha e pode usar cookies ou tecnologias semelhantes conforme as práticas do Google e as configurações do navegador.</p></section>
    <section><h2>10. Atualizações</h2><p>Esta política pode ser atualizada para refletir alterações no site ou em suas práticas. A data no início desta página indica a revisão mais recente.</p></section>
  </>
}

function TermsContent() {
  return <>
    <section><h2>1. Identificação</h2><p>Este site é mantido pela {siteConfig.organization.legalName}, CNPJ {siteConfig.organization.cnpj}.</p></section>
    <section><h2>2. Finalidade</h2><p>O site apresenta informações institucionais sobre a ABRIAT e permite que profissionais interessados iniciem contato e manifestem interesse em conhecer o processo de filiação.</p></section>
    <section><h2>3. Uso das informações</h2><p>As informações são gerais e voltadas à apresentação institucional. O visitante deve usar o site de forma lícita e responsável e fornecer dados verdadeiros ao preencher o formulário.</p></section>
    <section><h2>4. Solicitação de filiação</h2><p>O envio de uma manifestação de interesse não confirma filiação nem garante aprovação. Informações e solicitações relacionadas à filiação estão sujeitas à análise e às orientações da equipe responsável.</p></section>
    <section><h2>5. Links e serviços externos</h2><p>O site pode direcionar a serviços externos, como WhatsApp e Google Maps. O mapa incorporado só carrega depois que o visitante solicita sua exibição. Esses serviços são operados por terceiros e seguem suas próprias condições de uso e políticas.</p></section>
    <section><h2>6. Propriedade intelectual</h2><p>Os textos, marcas e elementos visuais apresentados pertencem aos respectivos titulares. Não é permitida sua reprodução para fins comerciais sem autorização aplicável.</p></section>
    <section><h2>7. Alterações</h2><p>Estes termos podem ser atualizados para refletir mudanças no site. A versão vigente fica disponível nesta página.</p></section>
  </>
}
