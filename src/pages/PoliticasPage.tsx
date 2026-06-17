import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ArrowLeft, Shield } from "lucide-react";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

function AccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: { id: string; title: string; content: React.ReactNode };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-3 transition-all duration-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-semibold text-gray-900">{section.title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 bg-white border-t border-gray-100">
          <div className="pt-4 text-[14px] text-gray-600 leading-relaxed space-y-3">
            {section.content}
          </div>
        </div>
      )}
    </div>
  );
}

const policies: { id: string; label: string; sections: Section[] }[] = [
  {
    id: "aviso-privacidade",
    label: "Aviso de Privacidade",
    sections: [
      {
        id: "intro",
        title: "Introdução",
        content: (
          <>
            <p>Fizemos o máximo para explicar de forma clara e simples quais dados pessoais precisaremos de você e o que vamos fazer com cada um deles.</p>
            <p>Estamos sempre disponíveis para tirar qualquer dúvida geral pelo <a href="mailto:contato@assetpagamentos.com.br" className="text-blue-600 hover:underline">contato@assetpagamentos.com.br</a>. Para falar especificamente sobre seus dados pessoais, possuímos um canal específico: <a href="mailto:lgpd@assetpagamentos.com.br" className="text-blue-600 hover:underline">lgpd@assetpagamentos.com.br</a>.</p>
          </>
        ),
      },
      {
        id: "responsavel",
        title: "1. Quem é o responsável pelo tratamento de seus dados pessoais?",
        content: (
          <p>Somos controladores singulares do tratamento dos dados pessoais referentes aos Visitantes, ou seja, uma vez que o Visitante entra em nosso site, coletaremos algumas informações e tomaremos decisões, a fim de prestar o nosso serviço da melhor e mais segura forma possível. Alguns operadores são necessários para que o site esteja disponível, como: plataformas de servidores, hospedagens, chatbot, entre outros. Com isso, essas empresas passam a ter acesso aos seus dados. Contudo, nossas contratações sempre prezam pelo tratamento seguro das suas informações.</p>
        ),
      },
      {
        id: "seguranca",
        title: "2. Como faremos a segurança de seus dados?",
        content: (
          <p>A Asset se preocupa muito com a segurança de seus dados pessoais. Por isso, implementa todas as medidas sugeridas pela Autoridade Nacional de Proteção de Dados (ANPD) em seu Guia Orientativo para Agentes de Tratamento de Pequeno Porte, o que compreende uma variedade de tecnologias e procedimentos de segurança para ajudar a proteger as suas informações.</p>
        ),
      },
      {
        id: "dados-coletados",
        title: "3. Quais dados precisa nos informar para utilizar o nosso site?",
        content: (
          <p>Todos os seus dados são tratados com finalidades específicas e de acordo com a Lei Geral de Proteção de Dados Pessoais. Nós poderemos tratar essas informações para: enviar contatos relacionados a vendas e marketing; oferecer nossos serviços ou produtos; realizar cadastros, caso o Visitante tenha interesse na contratação do nosso serviço. Podemos também coletar algumas informações de forma indireta, conforme a nossa Política de Cookies.</p>
        ),
      },
      {
        id: "compartilhamento",
        title: "4. Com quem compartilhamos seus dados pessoais?",
        content: (
          <p>Nós não iremos compartilhar seus dados com terceiros, salvo nos casos citados neste Aviso, em caso de consentimento legal do titular dos dados pessoais e por força de ordem judicial ou determinação legal.</p>
        ),
      },
      {
        id: "registros-acesso",
        title: "5. Seus registros de acesso serão coletados?",
        content: (
          <p>Quando você entra no nosso site, colhemos seus registros de acesso, ou seja, conjunto de informações referentes à data e hora de uso de uma determinada aplicação de internet a partir de um determinado endereço IP. Essas informações serão mantidas pela Asset, sob sigilo, em ambiente controlado e de segurança, pelo prazo mínimo de 06 (seis) meses, nos termos da Lei n. 12.965/2014 e artigo 7º, II, da Lei n. 13.709/18.</p>
        ),
      },
      {
        id: "comunicacoes",
        title: "6. Registros de comunicações serão armazenados?",
        content: (
          <p>Sim. Iremos armazenar as conversas que você tiver conosco em nossos canais de comunicação, pois isso irá melhorar o seu atendimento e torná-lo mais eficiente, bem como para proteger todas as partes e usar como comprovações.</p>
        ),
      },
      {
        id: "direitos",
        title: "7. Quais são seus direitos?",
        content: (
          <>
            <p>Você possui total direito de, a qualquer momento, solicitar ao controlador:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Confirmação da existência de tratamento dos seus dados</li>
              <li>Acesso aos seus dados</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação dos dados desnecessários, excessivos ou tratados em desconformidade com a Lei</li>
              <li>Portabilidade dos dados</li>
              <li>Eliminação dos dados (exceto aqueles exigidos por lei)</li>
              <li>Informações sobre com quem o controlador realizou uso compartilhado</li>
              <li>Informação sobre a possibilidade de não fornecer consentimento</li>
              <li>Revogação do consentimento</li>
            </ul>
          </>
        ),
      },
      {
        id: "agentes",
        title: "8. Agentes de Tratamento",
        content: (
          <>
            <p>Somos controladores singulares do tratamento dos seus dados pessoais. Empresas que poderão estar envolvidas no tratamento incluem: Axis Banking, Venit I.P, Horizon Bank, Asaas, Owen, Fire Banking, Voluti, Rapdyn (subadquirentes); AWS (servidores); Google Analytics (análise e monitoramento); WhatsApp (comunicação); Google Ads (marketing); Crisp Chat (atendimento online).</p>
            <p className="mt-2"><strong>Transferência internacional:</strong> os servidores utilizados são munidos de mecanismos aptos a assegurar a segurança de seus dados e estão localizados nos Estados Unidos, conforme determina o artigo 33, IX, da Lei n. 13.709/18.</p>
          </>
        ),
      },
      {
        id: "canal",
        title: "9. Canal de Comunicação sobre Privacidade",
        content: (
          <>
            <p>A Asset disponibiliza o seguinte canal para comunicação sobre qualquer assunto envolvendo dados pessoais: <a href="mailto:lgpd@assetpagamentos.com.br" className="text-blue-600 hover:underline">lgpd@assetpagamentos.com.br</a>.</p>
            <div className="mt-3 space-y-1">
              <p><strong>Assuntos gerais:</strong> <a href="mailto:contato@assetpagamentos.com.br" className="text-blue-600 hover:underline">contato@assetpagamentos.com.br</a></p>
              <p><strong>Reembolsos:</strong> <a href="mailto:reembolso@assetpagamentos.com.br" className="text-blue-600 hover:underline">reembolso@assetpagamentos.com.br</a></p>
              <p><strong>Denúncias:</strong> <a href="mailto:denuncias@assetpagamentos.com.br" className="text-blue-600 hover:underline">denuncias@assetpagamentos.com.br</a></p>
              <p><strong>Jurídico:</strong> <a href="mailto:juridico@assetpagamentos.com.br" className="text-blue-600 hover:underline">juridico@assetpagamentos.com.br</a></p>
              <p><strong>Ouvidoria:</strong> <a href="mailto:sac@assetpagamentos.com.br" className="text-blue-600 hover:underline">sac@assetpagamentos.com.br</a></p>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "usuario-comprador",
    label: "Usuário Comprador",
    sections: [
      {
        id: "uc-intro",
        title: "Introdução",
        content: (
          <p>Explicamos de forma clara e simples quais dados pessoais precisaremos de você e o que vamos fazer com cada um deles. Para dúvidas gerais: <a href="mailto:contato@assetpagamentos.com.br" className="text-blue-600 hover:underline">contato@assetpagamentos.com.br</a>. Para assuntos específicos sobre dados pessoais: <a href="mailto:lgpd@assetpagamentos.com.br" className="text-blue-600 hover:underline">lgpd@assetpagamentos.com.br</a>.</p>
        ),
      },
      {
        id: "uc-responsavel",
        title: "1. Quem é o responsável pelo tratamento de dados?",
        content: (
          <p>Somos operadores do tratamento dos dados pessoais do Usuário Comprador inseridos em nossas soluções pelo Usuário Seller ou Usuário Afiliado. O Usuário Seller e Usuário Afiliado são os controladores dos dados pessoais que coletarem e tratarem por meio da plataforma. Empresas envolvidas: Axis Banking, Venit I.P, Horizon Bank, Asaas, Owen, Fire Banking, Voluti, Rapdyn (subadquirentes); AWS (servidores).</p>
        ),
      },
      {
        id: "uc-seguranca",
        title: "2. Como faremos a segurança de seus dados?",
        content: (
          <p>A Asset se compromete a manter os dados fornecidos na plataforma em ambiente seguro, por meio de medidas técnicas compatíveis com os padrões internacionais. A plataforma utiliza os servidores AWS (Amazon Web Services), cujo acesso é restrito.</p>
        ),
      },
      {
        id: "uc-dados",
        title: "3. Quais dados precisa nos informar?",
        content: (
          <>
            <p>Para o cadastro e utilização dos serviços, o Usuário Comprador deverá informar:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Nome completo</li>
              <li>E-mail</li>
              <li>Telefone ou Celular</li>
              <li>CPF</li>
            </ul>
          </>
        ),
      },
      {
        id: "uc-finalidades",
        title: "4. Para quais finalidades utilizamos os seus dados pessoais?",
        content: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Prestar o nosso serviço</li>
            <li>Compartilhar dados com Usuários Sellers e Afiliados</li>
            <li>Dar suporte e realizar atendimento</li>
            <li>Enviar contatos relacionados a vendas e marketing</li>
            <li>Oferecer nossos serviços ou produtos</li>
          </ul>
        ),
      },
      {
        id: "uc-direitos",
        title: "5. Quais são seus direitos?",
        content: (
          <p>A qualquer momento você pode solicitar ao controlador: confirmação de tratamento; acesso, correção e anonimização dos dados; bloqueio ou eliminação de dados desnecessários ou excessivos; portabilidade; eliminação de dados (exceto os exigidos por lei); informações sobre compartilhamentos; e revogação do consentimento.</p>
        ),
      },
      {
        id: "uc-cancelamento",
        title: "6. Cancelamento e Exclusão de Dados",
        content: (
          <p>A Asset poderá bloquear, restringir ou impedir o acesso de qualquer Usuário sempre que detectada conduta inadequada. Para cancelar serviços, contate <a href="mailto:contato@assetpagamentos.com.br" className="text-blue-600 hover:underline">contato@assetpagamentos.com.br</a>. Quando finda a finalidade de tratamento, o Usuário poderá solicitar a exclusão das informações. Os registros de acesso serão mantidos pelo prazo legal mínimo de 6 meses.</p>
        ),
      },
    ],
  },
  {
    id: "sellers-afiliados",
    label: "Sellers e Afiliados",
    sections: [
      {
        id: "sa-intro",
        title: "Introdução",
        content: (
          <p>Explicamos de forma clara quais dados pessoais precisaremos de você e o que vamos fazer com cada um deles. Para dúvidas gerais: <a href="mailto:contato@assetpagamentos.com.br" className="text-blue-600 hover:underline">contato@assetpagamentos.com.br</a>. Para dados pessoais: <a href="mailto:lgpd@assetpagamentos.com.br" className="text-blue-600 hover:underline">lgpd@assetpagamentos.com.br</a>.</p>
        ),
      },
      {
        id: "sa-dados",
        title: "1. Quais dados precisa nos informar?",
        content: (
          <>
            <p><strong>Seller:</strong> Nome, E-mail Corporativo, Telefone, CNPJ, E-mail, dados bancários e chave PIX.</p>
            <p className="mt-2"><strong>Afiliado:</strong> Nome, E-mail Corporativo, Telefone, CNPJ ou CPF, E-mail, dados bancários e chave PIX.</p>
          </>
        ),
      },
      {
        id: "sa-finalidades",
        title: "2. Para quais finalidades utilizamos os seus dados pessoais?",
        content: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Prestar o nosso serviço</li>
            <li>Dar suporte e atendimento ao cliente</li>
            <li>Enviar contatos de vendas e marketing</li>
            <li>Oferecer nossos serviços ou produtos</li>
          </ul>
        ),
      },
      {
        id: "sa-cancelamento",
        title: "3. Cancelamento e Exclusão de Dados",
        content: (
          <p>Para cancelar serviços, envie solicitação para <a href="mailto:contato@assetpagamentos.com.br" className="text-blue-600 hover:underline">contato@assetpagamentos.com.br</a>. Para excluir dados, envie para <a href="mailto:lgpd@assetpagamentos.com.br" className="text-blue-600 hover:underline">lgpd@assetpagamentos.com.br</a>. Após cancelamento, os dados ficam disponíveis para download por 30 dias. Registros de acesso são mantidos pelo prazo legal.</p>
        ),
      },
    ],
  },
  {
    id: "codigo-etica",
    label: "Código de Ética e Conduta",
    sections: [
      {
        id: "ce-intro",
        title: "Visão Geral",
        content: (
          <>
            <p>Versão 1.0/2025 — Aprovado pela Diretoria em 23/04/2025.</p>
            <p className="mt-2">Este Código estabelece os direitos e deveres no regulamento interno da empresa, garantindo segurança jurídica e padrões claros de conduta entre a ASSET, seus Stakeholders, Fornecedores, Parceiros e Clientes.</p>
          </>
        ),
      },
      {
        id: "ce-abrangencia",
        title: "1. Abrangência",
        content: (
          <p>Este Código aplica-se a todos os Stakeholders, Fornecedores e Parceiros, quando estiverem: exercendo sua capacidade profissional; representando a ASSET perante terceiros; realizando atendimento a Clientes; ou interagindo entre si.</p>
        ),
      },
      {
        id: "ce-conduta",
        title: "2. Regras de Conduta",
        content: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Exercer atividades com transparência e diligência</li>
            <li>Não realizar engenharia reversa de informações criptografadas</li>
            <li>Abster-se de decisões em conflito com interesses pessoais</li>
            <li>Respeitar o espaço de trabalho</li>
            <li>Não realizar críticas ofensivas que afetem a imagem da ASSET</li>
            <li>Não praticar preconceito, discriminação, coação ou assédio</li>
            <li>Não emitir juízo depreciativo de concorrentes</li>
          </ul>
        ),
      },
      {
        id: "ce-dados",
        title: "3. Proteção de Dados e Confidencialidade",
        content: (
          <p>O acesso a qualquer tipo de dado é permitido apenas em caso de necessidade, conforme as leis de proteção de dados aplicáveis. Stakeholders, Fornecedores e Parceiros devem guardar sigilo sobre informações confidenciais, mesmo após o término do vínculo, por período adicional de 2 (dois) anos. É vedado utilizar informações confidenciais para vantagens pessoais ou repassá-las a terceiros sem aprovação da Diretoria.</p>
        ),
      },
      {
        id: "ce-anticorrupcao",
        title: "4. Corrupção, Suborno e Lavagem de Dinheiro",
        content: (
          <>
            <p>A ASSET possui <strong>tolerância zero</strong> com a corrupção. Stakeholders, Fornecedores e Parceiros estão proibidos de prometer, oferecer ou dar vantagem indevida a agente público ou terceiros, conforme a Lei nº 12.846 de 2013 (Lei Anticorrupção) e a Lei nº 13.260 de 2016 (Lei de Combate ao Terrorismo).</p>
            <p className="mt-2">A ASSET adota procedimentos de prevenção à lavagem de dinheiro (Lei nº 9.613/1998) e ao financiamento do terrorismo (Lei nº 13.260/2016) conforme política específica.</p>
          </>
        ),
      },
      {
        id: "ce-denuncia",
        title: "5. Canal de Denúncia",
        content: (
          <p>Qualquer Stakeholder, Fornecedor, Parceiro ou Cliente que sofrer ou presenciar assédio ou discriminação deve comunicar pelo Canal de Denúncia da ASSET. A ASSET compromete-se a manter sigilo sobre a identidade dos denunciantes. Contato: <a href="mailto:denuncias@assetpagamentos.com.br" className="text-blue-600 hover:underline">denuncias@assetpagamentos.com.br</a>.</p>
        ),
      },
    ],
  },
  {
    id: "politica-cookies",
    label: "Política de Cookies",
    sections: [
      {
        id: "pc-intro",
        title: "O que são cookies?",
        content: (
          <p>De acordo com a ANPD, "cookies são arquivos instalados no dispositivo de um Usuário que permitem a coleta de determinadas informações, inclusive de dados pessoais em algumas situações". A maioria dos navegadores aceita cookies automaticamente, mas o Usuário pode configurá-los para recusar ou apagar cookies a qualquer momento.</p>
        ),
      },
      {
        id: "pc-categorias",
        title: "1. Categorias de Cookies",
        content: (
          <>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-800">Cookies Necessários</p>
                <p>Essenciais para o funcionamento do site e prestação do serviço solicitado.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Cookies Analíticos ou de Desempenho</p>
                <p>Coletam dados sobre como os Usuários utilizam o site, páginas mais visitadas e ocorrência de erros.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Cookies de Publicidade</p>
                <p>Coletam informações para exibir anúncios personalizados de acordo com os interesses do Usuário.</p>
              </div>
            </div>
          </>
        ),
      },
      {
        id: "pc-rejeicao",
        title: "2. Rejeição e Exclusão de Cookies",
        content: (
          <p>O Usuário pode gerenciar ou desabilitar cookies nas configurações do navegador. Cookies para registros de acesso não poderão ser excluídos pelo prazo de 6 (seis) meses, conforme art. 15 do Marco Civil da Internet e art. 16, I, da LGPD. Após esse período, dados serão excluídos ou anonimizados.</p>
        ),
      },
      {
        id: "pc-compartilhamento",
        title: "3. Compartilhamento de Dados via Cookies",
        content: (
          <p>Sendo aceitos os cookies de publicidade e monitoramento, os dados poderão ser compartilhados com Google, Facebook e similares. A ASSET exclui esses dados após 90 dias; empresas receptoras podem armazená-los por até 560 dias. O consentimento pode ser revogado a qualquer momento via configurações do navegador.</p>
        ),
      },
      {
        id: "pc-legislacao",
        title: "4. Legislação e Foro",
        content: (
          <p>Esta Política será regida pelas Leis da República Federativa do Brasil, especialmente a Lei nº 13.709/2018 (LGPD) e a Lei nº 12.965/2014 (Marco Civil da Internet), sendo competente o foro de Goiânia – GO.</p>
        ),
      },
    ],
  },
  {
    id: "politica-antifraude",
    label: "Política Antifraude",
    sections: [
      {
        id: "paf-intro",
        title: "Objetivo e Abrangência",
        content: (
          <>
            <p>Versão 1.0/2025 — Aprovada pela Diretoria em 23/04/2025.</p>
            <p className="mt-2">Esta Política tem por objetivo estabelecer as diretrizes e orientações de combate à fraude nas operações da ASSET PAGAMENTOS LTDA. É de responsabilidade de todos os colaboradores o cumprimento do disposto nesta Política, ficando a cargo do Setor de Compliance realizar o seu monitoramento.</p>
          </>
        ),
      },
      {
        id: "paf-diretrizes",
        title: "1. Diretrizes",
        content: (
          <p>Todos os profissionais devem assumir o compromisso em manter o comportamento ético e íntegro de acordo com o Programa de Compliance da ASSET, sendo responsáveis por reportar qualquer suspeita de atividade fraudulenta. É dever dos membros aplicar o Manual de Procedimentos de Conheça o seu Cliente (KYC) de forma indistinta.</p>
        ),
      },
      {
        id: "paf-risco",
        title: "2. Gerenciamento de Risco e Análise de Casos Suspeitos",
        content: (
          <p>A estrutura de governança define diretrizes compatíveis com o perfil de risco e modelo de negócios da ASSET, conforme ABNT NBR ISO 37301/2021. Cada caso suspeito é analisado pelo Setor de Compliance de forma cautelosa e sigilosa, considerando fatos e contexto. Quando necessário, a ASSET pode consultar cadastros de inadimplência (SPC, Serasa), listas restritivas e outras fontes lícitas.</p>
        ),
      },
      {
        id: "paf-sancoes",
        title: "3. Violações e Sanções",
        content: (
          <p>Nos casos em que houver fraude, a ASSET repassa todas as informações às autoridades competentes. Internamente, após identificação de desvios, há análise e deliberação sobre penalidades, levando em conta a gravidade. O descumprimento sujeita o indivíduo a sanções disciplinares, medidas administrativas e/ou criminais.</p>
        ),
      },
    ],
  },
  {
    id: "pld-ft",
    label: "Prevenção à Lavagem de Dinheiro",
    sections: [
      {
        id: "pld-intro",
        title: "Objetivo",
        content: (
          <>
            <p>Versão 1.0/2024 — Aprovada pela Diretoria em 23/04/2025.</p>
            <p className="mt-2">Definir princípios e diretrizes para prevenir a utilização dos produtos e serviços da ASSET para as práticas de lavagem de dinheiro e de financiamento do terrorismo (PLD/FT).</p>
          </>
        ),
      },
      {
        id: "pld-vocabulario",
        title: "1. Vocabulário",
        content: (
          <div className="space-y-2">
            <p><strong>Lavagem de Dinheiro:</strong> ocultação ou dissimulação da natureza, origem, localização, disposição, movimentação ou propriedade de bens, direitos ou valores provenientes de infração penal (Lei nº 9.613/1998).</p>
            <p><strong>Financiamento do Terrorismo:</strong> oferecimento ou aplicação de recursos para financiar pessoa, grupo ou organização criminosa que pratique terrorismo (Lei nº 13.260/2016).</p>
          </div>
        ),
      },
      {
        id: "pld-principios",
        title: "2. Princípios",
        content: (
          <div className="space-y-2">
            <p><strong>Due Diligence:</strong> contrapartes serão identificadas e qualificadas previamente para evitar relacionamento com partes inidôneas.</p>
            <p><strong>Zero Tolerância:</strong> a ASSET não se relaciona com contrapartes envolvidas em ilícitos.</p>
            <p><strong>Gerenciamento de Riscos:</strong> análise dos riscos de LD/FT para estabelecer controles internos de mitigação.</p>
            <p><strong>Análise das Operações:</strong> monitoramento contínuo para identificar transações atípicas.</p>
          </div>
        ),
      },
      {
        id: "pld-fases",
        title: "3. Fases da Lavagem de Dinheiro",
        content: (
          <div className="space-y-2">
            <p><strong>Colocação:</strong> introdução do dinheiro de origem ilícita no sistema econômico, frequentemente com fragmentação de valores.</p>
            <p><strong>Ocultação:</strong> dificultar o rastreamento contábil e financeiro por meio de movimentações complexas.</p>
            <p><strong>Integração:</strong> incorporação do dinheiro no sistema econômico com aparência lícita.</p>
          </div>
        ),
      },
      {
        id: "pld-sancoes",
        title: "4. Sanções",
        content: (
          <p>Em caso de violação, após processo de apuração, a ASSET pode aplicar penalidades como rescisão contratual, sem prejuízo das sanções legais cabíveis pelos órgãos competentes.</p>
        ),
      },
    ],
  },
];

export default function PoliticasPage() {
  const [activePolicy, setActivePolicy] = useState(policies[0].id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentPolicy = policies.find((p) => p.id === activePolicy)!;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpenSections({});
  }, [activePolicy]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    currentPolicy.sections.forEach((s) => (all[s.id] = true));
    setOpenSections(all);
  };

  const collapseAll = () => setOpenSections({});
  const allOpen = currentPolicy.sections.every((s) => openSections[s.id]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>

          <div className="flex items-center gap-2">
            <img
              src="/logo%20asset.png"
              alt="Asset Logo"
              className="w-7 h-7 object-contain"
            />
            <span className="text-[15px] font-bold text-gray-900 tracking-tight">Políticas e Termos</span>
          </div>

          <div className="w-[120px] shrink-0 hidden sm:block" />
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#080c16] via-[#0d1424] to-[#131d34] py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/60 text-[12px] uppercase tracking-widest font-semibold">Transparência e Privacidade</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Políticas e Termos
          </h1>
          <p className="text-white/60 text-[15px] max-w-2xl leading-relaxed">
            Prezamos pela transparência com nossos usuários. Aqui você encontra todas as nossas políticas de privacidade, uso e conformidade legal.
          </p>
          <p className="text-white/40 text-[12px] mt-4">
            Última atualização: 23 de abril de 2025 — ASSET PAGAMENTOS LTDA, CNPJ nº 53.085.878/0001-33
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            {/* Mobile dropdown */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-[14px] font-semibold text-gray-800 shadow-sm"
              >
                {currentPolicy.label}
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileMenuOpen && (
                <div className="mt-2 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                  {policies.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { setActivePolicy(p.id); setMobileMenuOpen(false); }}
                      className={`w-full text-left px-5 py-3.5 text-[14px] font-medium transition-colors hover:bg-gray-50 ${activePolicy === p.id ? "text-gray-900 font-semibold bg-gray-50" : "text-gray-600"}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:block sticky top-24 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 py-4 border-b border-gray-100">
                <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Documentos</p>
              </div>
              <nav className="py-2">
                {policies.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePolicy(p.id)}
                    className={`w-full text-left px-4 py-3 text-[13.5px] font-medium transition-colors hover:bg-gray-50 ${
                      activePolicy === p.id
                        ? "text-gray-900 font-semibold bg-blue-50/60 border-r-2 border-blue-500"
                        : "text-gray-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  {currentPolicy.label}
                </h2>
                <button
                  onClick={allOpen ? collapseAll : expandAll}
                  className="shrink-0 text-[12px] font-semibold text-blue-600 hover:text-blue-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
                >
                  {allOpen ? "Recolher tudo" : "Expandir tudo"}
                </button>
              </div>
              <p className="text-[13px] text-gray-400">
                ASSET PAGAMENTOS LTDA · CNPJ nº 53.085.878/0001-33
              </p>
            </div>

            <div>
              {currentPolicy.sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  section={section}
                  isOpen={!!openSections[section.id]}
                  onToggle={() => toggleSection(section.id)}
                />
              ))}
            </div>

            {/* Contact Footer */}
            <div className="mt-8 bg-gradient-to-br from-[#080c16] via-[#0d1424] to-[#131d34] rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-[16px] font-bold mb-1">Dúvidas ou solicitações?</h3>
              <p className="text-white/60 text-[13.5px] mb-5">Entre em contato com nosso time de privacidade e compliance.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Privacidade & LGPD", email: "lgpd@assetpagamentos.com.br" },
                  { label: "Assuntos Gerais", email: "contato@assetpagamentos.com.br" },
                  { label: "Denúncias", email: "denuncias@assetpagamentos.com.br" },
                  { label: "Jurídico", email: "juridico@assetpagamentos.com.br" },
                ].map((c) => (
                  <a
                    key={c.email}
                    href={`mailto:${c.email}`}
                    className="flex flex-col gap-0.5 bg-white/10 hover:bg-white/15 rounded-xl px-4 py-3 transition-colors"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">{c.label}</span>
                    <span className="text-[13px] font-semibold text-white/90">{c.email}</span>
                  </a>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-10 py-8 px-4 sm:px-8 text-center">
        <p className="text-[12px] text-gray-400">
          © {new Date().getFullYear()} Asset Pagamentos LTDA — CNPJ nº 53.085.878/0001-33 — Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
