import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';
import { FeatureSection } from './components/feature-section';
import { FAQ } from './components/faq';
import { PartnerLogos } from './components/partner-logos';
import { Footer } from './components/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardShowcase } from './components/dashboard-showcase';
import { DigitalAccountFeatures } from './components/digital-account-features';
import { ArrowUpRight } from 'lucide-react';


// Logo component loading the custom PNG from public directory, styled in pure black, sized significantly larger
const Logo = ({ 
  logoRef, 
  opacity, 
  className, 
  style 
}: { 
  logoRef?: React.RefObject<HTMLImageElement | null>; 
  opacity?: number; 
  className?: string; 
  style?: React.CSSProperties; 
}) => (
  <img 
    ref={logoRef}
    src="logo%20asset.png" 
    alt="Asset Finanças Logo" 
    className={className ?? "w-10 h-10 sm:w-12 sm:h-12 object-contain select-none pointer-events-none"}
    style={{ filter: 'brightness(0)', opacity: opacity ?? 1, transition: 'opacity 0.2s ease-out', ...style }}
  />
);


interface MobileHeroProps {
  startHeroIntro: boolean;
  headerLogoRef: React.RefObject<HTMLImageElement | null>;
  navLinks: string[];
  onScrollToSection: (targetId: string) => void;
}
function MobileHero({ startHeroIntro, headerLogoRef, navLinks, onScrollToSection }: MobileHeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [downloadLink, setDownloadLink] = useState("https://apps.apple.com/br/app/asset-finance/id6761480957");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
      setDownloadLink("https://play.google.com/store/apps/details?id=finance.onz.asset");
    } else {
      setDownloadLink("https://apps.apple.com/br/app/asset-finance/id6761480957");
    }
  }, []);

  return (
    <div 
      className="relative z-[25] w-full h-[100svh] flex flex-col justify-start overflow-visible font-sans text-zinc-950 bg-white" 
    >
      {/* Imagem de fundo absoluta com sobreposição */}
      <img
        src="hero-mobile-opt.webp"
        alt="Background Hero Mobile"
        className="absolute pointer-events-none select-none z-0 mobile-hero-img"
      />

      {/* Mobile Header */}
      <header className="relative z-50 flex items-center justify-between w-full px-6 h-20 shrink-0 mobile-hero-header">
        {/* Logo Icon (Increased Size, Text Removed) */}
        <div className="flex items-center">
          <img 
            ref={headerLogoRef}
            src="/logo%20asset.png" 
            alt="Asset Logo" 
            className="w-32 h-10 object-contain select-none pointer-events-none"
            style={{ filter: 'brightness(0)' }}
          />
        </div>

        {/* Right side menu */}
        <div className="flex items-center">
          {/* Custom 3-bar menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-full bg-black text-white cursor-pointer z-50 shadow-sm active:scale-95 transition-all"
            aria-label="Menu"
          >
            <div className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'w-5 rotate-45 translate-y-[5.5px]' : 'w-5'}`} />
            <div className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 w-0' : 'w-5'}`} />
            <div className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'w-5 -rotate-45 -translate-y-[5.5px]' : 'w-5'}`} />
          </button>
        </div>
      </header>

      {/* Compact Popup Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop to close on outside click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-40 bg-black/20 backdrop-blur-xs"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top right' }}
              className="absolute top-[72px] right-6 z-50 bg-white rounded-[22px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] p-4 w-[220px] flex flex-col gap-3"
            >
              {/* Header row */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <img
                  src="/logo%20asset.png"
                  alt="Asset Logo"
                  className="w-8 h-8 object-contain select-none"
                  style={{ filter: 'brightness(0)' }}
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors text-[13px] font-bold leading-none"
                  aria-label="Fechar menu"
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const targetId = link.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                  return (
                    <a
                      key={link}
                      href={`#${targetId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        onScrollToSection(targetId);
                      }}
                      className="text-[14px] font-semibold text-zinc-800 py-2 px-3 rounded-xl hover:bg-zinc-50 transition-colors active:scale-[0.98] block"
                    >
                      {link}
                    </a>
                  );
                })}
                <div className="h-px bg-zinc-100 my-1" />
                <a
                  href="https://finance.assetpagamentos.com.br/login?redirect=%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[13px] font-semibold text-zinc-500 py-2 px-3 rounded-xl hover:bg-zinc-50 transition-colors block"
                >
                  Acesse sua conta
                </a>
              </div>

              {/* CTA */}
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  onScrollToSection('contato');
                }}
                className="w-full text-center py-3 bg-black text-white font-bold text-[12px] tracking-wider uppercase rounded-full hover:bg-zinc-900 transition-all active:scale-[0.98]"
              >
                Entre em contato
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Content - Alinhado no lado esquerdo superior */}
      <div className="relative z-10 flex flex-col items-start justify-start text-left mt-6 px-6 xs:px-8 w-full mobile-hero-content">
        
        {/* Social Proof (Avatares) */}
        <div className="flex -space-x-2 mb-6 items-center mobile-hero-avatar-wrapper">
          <img
            className="w-10 h-10 rounded-full border-2 border-[#080c16] object-cover mobile-hero-avatar"
            src="avatar-1.webp"
            alt="Usuário 1"
          />
          <img
            className="w-10 h-10 rounded-full border-2 border-[#080c16] object-cover mobile-hero-avatar"
            src="avatar-2.webp"
            alt="Usuário 2"
          />
          <img
            className="w-10 h-10 rounded-full border-2 border-[#080c16] object-cover mobile-hero-avatar"
            src="avatar-3.webp"
            alt="Usuário 3"
          />
          <img
            className="w-10 h-10 rounded-full border-2 border-[#080c16] object-cover mobile-hero-avatar"
            src="avatar-4.webp"
            alt="Usuário 4"
          />
          <div className="w-10 h-10 rounded-full border-2 border-[#080c16] bg-white flex items-center justify-center text-[12px] font-bold text-zinc-900 mobile-hero-avatar-badge">
            32k
          </div>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={startHeroIntro ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.2rem] xs:text-[2.5rem] font-semibold leading-[1.12] tracking-[-0.03em] text-[#1f242d] mb-6 text-left w-full mobile-hero-title"
        >
          Transforme seu <br />
          ecossistema em um <br />
          centro de <span className="font-bold text-black">serviços</span> <br />
          <span className="font-bold text-black">financeiros</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={startHeroIntro ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14.5px] xs:text-[15.5px] leading-relaxed tracking-tight text-black max-w-[340px] mb-8 font-light text-left mobile-hero-desc"
        >
          Fidelize clientes e crie novas receitas com Banking As A Ser vice. Tecnologia e segurança bancária integradas de forma simples ao seu negócio.
        </motion.p>

        {/* CTA Buttons - Alinhado à esquerda */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={startHeroIntro ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-start w-full"
        >
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 pl-5 pr-2 inline-flex items-center gap-2 whitespace-nowrap shrink-0 bg-[#080c16] text-white rounded-full font-bold text-[13px] tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md hover:bg-[#0d1424] active:scale-[0.98] mobile-hero-btn"
          >
            Baixar app
            <div className="w-8 h-8 rounded-full bg-white text-[#080c16] flex items-center justify-center shrink-0 shadow-sm">
              <ArrowUpRight className="size-4 stroke-[2.5]" />
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

interface BankingPixFeaturesProps {
  isLargeScreen: boolean;
  isMobile: boolean;
}
function BankingPixFeatures({ isLargeScreen, isMobile }: BankingPixFeaturesProps) {
  return (
    <section id="servicos" className={`relative z-20 w-full bg-white px-8 pb-12 sm:py-16 ${isMobile ? 'pt-28' : 'pt-12'}`}>
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform, opacity, filter" }}
          className="mb-24 text-center mt-10 sm:mt-0"
        >
          <ScrollFloat
            animationDuration={1}
            ease="power3.out"
            scrollStart="top bottom"
            scrollEnd="bottom center-=15%"
            stagger={0.015}
            style={{ fontSize: isLargeScreen ? '4.0rem' : isMobile ? '1.9rem' : '3.3rem' }}
            containerClassName="leading-[1.15] font-normal text-gray-900 tracking-tight"
          >
            Conectando <span className="font-bold">tecnologia inteligente</span><br className="hidden lg:inline" /> à sua <span className="font-bold">operação financeira</span>
          </ScrollFloat>
          <p className="text-[19px] text-gray-900/60 max-w-3xl mx-auto mt-6 leading-relaxed font-normal">
            Simplificamos o dia a dia do seu negócio com ferramentas integradas de Banking, automação de Pix, cobranças eficientes e fluxos de aprovação seguros.
          </p>
        </motion.div>

        {/* Unified 2x2 Grid Container */}
        <div className="bg-gray-100 rounded-[36px] p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Conta Digital */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, scale, opacity, filter" }}
            className="bg-white rounded-[28px] pt-12 pb-10 px-8 sm:px-12 flex flex-col items-center justify-start transition-shadow duration-300"
          >
            {/* Graphic Mockup */}
            <div className="relative w-full h-[295px] flex items-center justify-center overflow-visible select-none mb-6 scale-75 xs:scale-90 sm:scale-100 origin-center">
              {/* Black Card */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-3, -4.5, -3] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute left-0 xs:left-[5%] sm:left-[10%] top-[18%] w-[200px] xs:w-[240px] h-[170px] bg-zinc-950 rounded-2xl shadow-xl p-5 flex flex-col justify-between z-10 border border-white/5"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] text-zinc-400 font-medium">Performance</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#080c16] animate-pulse" />
                </div>
                <div>
                  <span className="text-[12px] text-zinc-400 block">Crescimento</span>
                  <span className="text-3xl text-white font-bold block mt-0.5">50%</span>
                </div>
                {/* Sparkline SVG */}
                <svg className="w-full h-11 mt-1 text-[#080c16]" viewBox="0 0 100 30" fill="none">
                  <motion.path 
                    d="M0 25 C 20 20, 40 5, 60 15 C 80 25, 90 2, 100 10" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  />
                </svg>
              </motion.div>

              {/* White Card */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [0, 1.5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute right-0 xs:right-[5%] sm:right-[10%] top-[4%] w-[230px] xs:w-[285px] h-[250px] bg-white rounded-2xl border border-zinc-100 shadow-2xl p-5 flex flex-col justify-between z-20"
              >
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Meta Mensal</span>
                  <span className="text-[15px] font-bold text-zinc-800 block mt-0.5">R$ 49.300 / R$ 100k</span>
                  {/* Progress Bar */}
                  <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden mt-2.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "49%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                      className="h-full bg-[#080c16] rounded-full" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 mt-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex justify-between items-center text-[12px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#080c16]" />
                      <span className="text-zinc-500 font-medium">TED Recebida</span>
                    </div>
                    <span className="text-zinc-800 font-bold">+R$ 1.200</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex justify-between items-center text-[12px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                      <span className="text-zinc-500 font-medium">Pix Pago</span>
                    </div>
                    <span className="text-zinc-800 font-bold">-R$ 350</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="flex justify-between items-center text-[12px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                      <span className="text-zinc-500 font-medium">Tarifa Zero</span>
                    </div>
                    <span className="text-zinc-800 font-bold">R$ 0</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Title & Description */}
            <div className="text-center">
              <h3 className="text-[21px] font-bold text-zinc-900 mb-4">Conta Digital & Conciliação</h3>
              <p className="text-[15.5px] text-zinc-500 max-w-[360px] leading-relaxed mx-auto">
                Acompanhe recebimentos, pague fornecedores e controle seus saldos e extratos em um único ambiente integrado.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Todos os tipos de Pix */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, scale, opacity, filter" }}
            className="bg-white rounded-[28px] pt-12 pb-10 px-8 sm:px-12 flex flex-col items-center justify-start transition-shadow duration-300"
          >
            {/* Graphic Mockup */}
            <div className="relative w-full h-[295px] flex items-center justify-center overflow-visible select-none mb-6 scale-75 xs:scale-90 sm:scale-100 origin-center">
              {/* Black Card */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-6, -4.5, -6] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="absolute left-0 xs:left-[5%] sm:left-[10%] top-[18%] w-[210px] xs:w-[250px] h-[175px] bg-zinc-950 rounded-2xl shadow-xl p-5 flex flex-col justify-between z-10 border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#080c16]" />
                  <span className="text-[11px] text-white font-semibold uppercase tracking-wider">Expertise</span>
                </div>
                <p className="text-[14px] text-zinc-300 leading-relaxed font-medium">
                  Cobrar, pagar ou automatizar: tudo via Pix de forma simples.
                </p>
                <span className="text-[10px] text-zinc-500">Asset Engine</span>
              </motion.div>

              {/* White Card */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [6, 4.5, 6] }}
                transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}
                className="absolute right-0 xs:right-[5%] sm:right-[10%] top-[6%] w-[220px] xs:w-[265px] h-[245px] bg-white rounded-2xl border border-zinc-100 shadow-2xl p-5 flex flex-col justify-between z-20"
              >
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Inteligência</span>
                  <span className="text-[14px] font-bold text-zinc-800 block mt-0.5">Gestão de Chaves Pix</span>
                </div>
                
                {/* Miniature Bar Chart */}
                <div className="flex items-end justify-between h-32 gap-3 px-2">
                  {[35, 45, 30, 60, 50, 85].map((val, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ scaleY: 0, originY: 1 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${idx === 5 ? 'bg-[#080c16]' : 'bg-zinc-100'}`} 
                      style={{ height: `${val}%` }} 
                    />
                  ))}
                </div>

                <span className="text-[10px] text-zinc-400 text-center block mt-2">Histórico de Transações</span>
              </motion.div>
            </div>

            {/* Title & Description */}
            <div className="text-center">
              <h3 className="text-[21px] font-bold text-zinc-900 mb-4">Todos os tipos de Pix</h3>
              <p className="text-[15.5px] text-zinc-500 max-w-[360px] leading-relaxed mx-auto">
                Pague, receba ou automatize via Pix com transferências instantâneas, QR codes estáticos/dinâmicos e gestão de chaves.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Pix Automático & Recorrente */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, scale, opacity, filter" }}
            className="bg-white rounded-[28px] pt-12 pb-10 px-8 sm:px-12 flex flex-col items-center justify-start transition-shadow duration-300"
          >
            {/* Graphic Mockup */}
            <div className="relative w-full h-[295px] flex items-center justify-center overflow-visible select-none mb-6 scale-75 xs:scale-90 sm:scale-100 origin-center">
              {/* Black Card */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [12, 10.5, 12] }}
                transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}
                className="absolute right-0 xs:right-[5%] sm:right-[10%] top-[4%] w-[190px] xs:w-[230px] h-[165px] bg-zinc-950 rounded-2xl shadow-xl p-5 flex flex-col justify-between z-10 border border-white/5"
              >
                <div className="flex -space-x-2">
                  {[
                    { letter: 'A', bg: 'bg-zinc-700' },
                    { letter: 'B', bg: 'bg-zinc-600' },
                    { letter: 'C', bg: 'bg-zinc-500' }
                  ].map((item, idx) => (
                    <motion.span 
                      key={idx}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.55 + idx * 0.1, type: "spring", stiffness: 150 }}
                      className={`w-7 h-7 rounded-full ${item.bg} border border-zinc-950 flex items-center justify-center text-[9.5px] text-white`}
                    >
                      {item.letter}
                    </motion.span>
                  ))}
                </div>
                <div>
                  <h4 className="text-[13px] text-white font-semibold">Simples e Inteligente</h4>
                  <span className="text-[10px] text-zinc-500 block">Sua gestão automatizada</span>
                </div>
              </motion.div>

              {/* White Card */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-3, -4.5, -3] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
                className="absolute left-0 xs:left-[5%] sm:left-[10%] top-[10%] w-[230px] xs:w-[285px] h-[245px] bg-white rounded-2xl border border-zinc-100 shadow-2xl p-5 flex flex-col justify-between z-20 -rotate-3"
              >
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Performance</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-bold text-zinc-800">49%</span>
                    <span className="text-[11px] font-semibold text-[#080c16] bg-[#080c16]/5 px-1 rounded-sm">+2.4%</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">Crescimento de receita</span>
                </div>

                {/* Miniature Sparkline Chart */}
                <div className="h-8 my-1.5 text-[#080c16] shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 100 30" fill="none">
                    <defs>
                      <linearGradient id="card3Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#080c16" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#080c16" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <motion.path 
                      d="M0 25 C 15 22, 30 28, 45 15 C 60 2, 75 18, 90 8 C 95 5, 100 2, 100 2" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                    />
                    <path 
                      d="M0 25 C 15 22, 30 28, 45 15 C 60 2, 75 18, 90 8 C 95 5, 100 2, 100 2 L 100 30 L 0 30 Z" 
                      fill="url(#card3Grad)"
                    />
                  </svg>
                </div>

                {/* Filter tags matching style */}
                <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                  {['Pix Automático', 'Recorrente', 'Agendamentos', 'Seguro'].map((tag, idx) => (
                    <motion.span 
                      key={tag} 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.65 + idx * 0.08, type: "spring", stiffness: 120 }}
                      whileHover={{ scale: 1.05, backgroundColor: "#f4f4f5" }}
                      className="bg-zinc-50 border border-zinc-100 text-[10px] text-zinc-600 py-2 px-3 rounded-full text-center font-medium cursor-pointer transition-colors duration-200"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Title & Description */}
            <div className="text-center">
              <h3 className="text-[21px] font-bold text-zinc-900 mb-4">Pix Automático & Recorrente</h3>
              <p className="text-[15.5px] text-zinc-500 max-w-[360px] leading-relaxed mx-auto">
                Cobrar ou pagar assinaturas e mensalidades de forma 100% automatizada e sem burocracias.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Cobrança em lote & Aprovação */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, scale, opacity, filter" }}
            className="bg-white rounded-[28px] pt-12 pb-10 px-8 sm:px-12 flex flex-col items-center justify-start transition-shadow duration-300"
          >
            {/* Graphic Mockup */}
            <div className="relative w-full h-[295px] flex items-center justify-center overflow-visible select-none mb-6 scale-75 xs:scale-90 sm:scale-100 origin-center">
              {/* Concentric Circles Radar */}
              <motion.div 
                animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-[260px] h-[260px] xs:w-[330px] xs:h-[330px] rounded-full border border-zinc-100 flex items-center justify-center">
                  <div className="w-[190px] h-[190px] xs:w-[240px] xs:h-[240px] rounded-full border border-zinc-100/80 flex items-center justify-center">
                    <div className="w-[120px] h-[120px] xs:w-[150px] xs:h-[150px] rounded-full border border-zinc-100/50 flex items-center justify-center" />
                  </div>
                </div>
              </motion.div>

              {/* Center Badge */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center shadow-lg border border-white/5 z-10"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <motion.path 
                    d="M9 12l2 2 4-4" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                  />
                  <motion.path
                    d="M12 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: "easeOut", delay: 0.6 }}
                  />
                </svg>
              </motion.div>

              {/* Floating Orbit Users */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-[14%] left-0 xs:left-[2%] bg-white shadow-lg border border-zinc-100 rounded-full px-3.5 py-2 flex items-center gap-1.5 z-20 scale-90 xs:scale-110"
              >
                <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[8.5px] text-white">L</span>
                <span className="text-[11.5px] font-bold text-zinc-800">Livia C. <span className="text-[#080c16] font-bold ml-1">+R$25k</span></span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[12%] right-0 xs:right-[2%] bg-white shadow-lg border border-zinc-100 rounded-full px-3.5 py-2 flex items-center gap-1.5 z-20 scale-90 xs:scale-110"
              >
                <span className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center text-[8.5px] text-white">M</span>
                <span className="text-[11.5px] font-bold text-zinc-800">Mariana C. <span className="text-[#080c16] font-bold ml-1">+R$10k</span></span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[14%] left-[15%] xs:left-[30%] bg-white shadow-lg border border-zinc-100 rounded-full px-3.5 py-2 flex items-center gap-1.5 z-20 scale-90 xs:scale-110"
              >
                <span className="w-5 h-5 rounded-full bg-zinc-600 flex items-center justify-center text-[8.5px] text-white">A</span>
                <span className="text-[11.5px] font-bold text-zinc-800">Ana S. <span className="text-[#080c16] font-bold ml-1">+R$15k</span></span>
              </motion.div>
            </div>

            {/* Title & Description */}
            <div className="text-center">
              <h3 className="text-[19px] font-bold text-zinc-900 mb-4">Fluxos de Aprovação & Lotes</h3>
              <p className="text-[14.5px] text-zinc-500 max-w-[330px] leading-relaxed mx-auto">
                Aprove transações com alçadas de segurança customizadas e envie faturamentos em lote com total controle.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const navLinks = ['Início', 'Painel', 'Serviços', 'Diferenciais', 'Parceiros', 'FAQ'];

  const lenisRef = useRef<Lenis | null>(null);

  const onScrollToSection = (targetId: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${targetId}`, { duration: 1.2 });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [preloaderState, setPreloaderState] = useState<'loading' | 'flying' | 'done'>('loading');
  const [logoTransform, setLogoTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [startHeroIntro, setStartHeroIntro] = useState(false);

  const headerLogoRef = useRef<HTMLImageElement>(null);
  const preloaderLogoRef = useRef<HTMLDivElement>(null);
  
  // Keep preloaded image objects in memory to prevent browser garbage collection
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  
  // Timestamp to guarantee a minimum loading screen duration (e.g. 3 seconds)
  const preloaderStartTimeRef = useRef<number>(Date.now());

  // Remove static initial loader instantly once React is mounted and ready
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.remove();
    }
  }, []);

  // Background frame preloader with progress tracking
  useEffect(() => {
    let isMounted = true;
    const isMob = window.innerWidth < 1024;
    const imagesToPreload = [
      isMob ? "hero-mobile-opt.webp" : "herozinha.webp",
      "logo%20asset.png",
      "avatar-1.webp",
      "avatar-2.webp",
      "avatar-3.webp",
      "avatar-4.webp",
      "cards%20bento/1780313376294.webp",
      "cards%20bento/card%20b.webp",
      "cards%20bento/card-c-plataforma.webp",
      "cards%20bento/card-d-baas.webp",
    ];

    if (!isMob) {
      // Add all 60 animation frames (starting from frame 2 because frame 1 is hero.webp)
      // Guardado sem uso por solicitação do usuário:
      /*
      for (let i = 2; i <= totalFrames; i++) {
        imagesToPreload.push(`frames/frame_${String(i).padStart(4, '0')}.webp`);
      }
      */
    }

    let loadedCount = 0;
    const totalAssets = imagesToPreload.length;
    const preloadedImages: HTMLImageElement[] = [];
    const completedAssets = new Set<string>();

    const handleAssetLoad = (resolvedSrc: string) => {
      if (!isMounted) return;
      if (completedAssets.has(resolvedSrc)) return;
      completedAssets.add(resolvedSrc);
      
      loadedCount++;
      const progress = Math.round((loadedCount / totalAssets) * 100);
      setLoadingProgress(progress);
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      
      // Setup load/error handlers before setting src
      const onImageLoad = () => handleAssetLoad(src);
      
      img.onload = onImageLoad;
      img.onerror = onImageLoad; // prevent getting stuck if any frame fails
      img.src = src;

      // Check if already complete from cache
      if (img.complete) {
        onImageLoad();
      } else if (typeof img.decode === 'function') {
        // Use modern decode API to guarantee GPU readiness
        img.decode()
          .then(() => {
            handleAssetLoad(src);
          })
          .catch(() => {
            // fallback handled by onload/onerror
          });
      }

      preloadedImages.push(img);
    });

    preloadedImagesRef.current = preloadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  // Morph transition calculation when progress reaches 100%
  useEffect(() => {
    if (loadingProgress === 100 && preloaderState === 'loading') {
      const elapsed = Date.now() - preloaderStartTimeRef.current;
      const minDuration = window.innerWidth < 1024 ? 1000 : 1500; // 1s mobile, 1.5s desktop
      const delay = Math.max(0, minDuration - elapsed);

      const timer = setTimeout(() => {
        if (headerLogoRef.current && preloaderLogoRef.current) {
          const headerRect = headerLogoRef.current.getBoundingClientRect();
          const preloaderRect = preloaderLogoRef.current.getBoundingClientRect();

          // Calculate displacement from preloader logo center to header logo center
          const deltaX = (headerRect.left + headerRect.width / 2) - (preloaderRect.left + preloaderRect.width / 2);
          const deltaY = (headerRect.top + headerRect.height / 2) - (preloaderRect.top + preloaderRect.height / 2);
          const scale = headerRect.width / preloaderRect.width;

          setLogoTransform({ x: deltaX, y: deltaY, scale });
          setPreloaderState('flying');
          setStartHeroIntro(true);

          // Trigger GSAP Grid Reveal Animation
          gsap.to('.grid-block', {
            scaleY: 0,
            duration: 0.7,
            stagger: 0.05, // Stair format (one column after another)
            ease: 'power2.inOut',
            onComplete: () => {
              setPreloaderState('done');
            }
          });
        } else {
          // Fallback if refs not ready
          setPreloaderState('done');
          setStartHeroIntro(true);
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [loadingProgress, preloaderState]);

  // Detect large screens (monitors >= 1800px wide) and mobile screens (< 1024px)
  const [isLargeScreen, setIsLargeScreen] = useState(() => window.innerWidth >= 1800);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const windowHeightRef = useRef(window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      setIsLargeScreen(window.innerWidth >= 1800);
      setIsMobile(window.innerWidth < 1024);
      windowHeightRef.current = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Refs to track scroll target frame and current interpolated frame
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);

  const isMobileRef = useRef(isMobile);
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heroPinRef = useRef<HTMLDivElement>(null);

  // Efeito do ScrollTrigger para Pinning e Snapping no Desktop
  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroPinRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        snap: {
          snapTo: 1,
          duration: { min: 0.4, max: 0.6 },
          ease: "power2.out",
          delay: 0.05
        }
      });
    }, heroContainerRef);

    return () => ctx.revert();
  }, [isMobile]);





  // Initialize Lenis smooth-scroll and detect scroll position
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Smoother deceleration curve
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9, // Slightly less jumpy scroll speed
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;


    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleScroll = (e: any) => {
      if (isMobileRef.current) {
        targetFrameRef.current = 1;
        return;
      }

      const currentScrollY = e.scroll;
      const viewHeight = windowHeightRef.current;

      // Calcula o progresso de 0 a 1 do scroll do Hero
      const progress = Math.min(1, Math.max(0, currentScrollY / viewHeight));
      targetFrameRef.current = Math.round(1 + progress * 59);
    };

    lenis.on('scroll', handleScroll);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // requestAnimationFrame loop to smoothly interpolate (lerp) frame and bento progress changes
  useEffect(() => {
    let animationFrameId: number;
    let lastFrame = 1;

    const updateProgress = () => {
      // 1. Smoothly interpolate (lerp) hero frame
      const frameDiff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(frameDiff) < 0.01) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        currentFrameRef.current += frameDiff * 0.08;
      }
      const newFrame = Math.round(currentFrameRef.current);

      if (newFrame !== lastFrame) {
        lastFrame = newFrame;

        // Direct DOM update: Bypassing React rendering entirely for smooth 60/120fps scrolling
        if (heroImageRef.current && !isMobileRef.current) {
          heroImageRef.current.src = "herozinha.webp";
        }

        // Direct DOM update: CSS custom property for morphing nav
        const navProgress = Math.min(1, Math.max(0, (newFrame - 1) / 12));
        if (navRef.current) {
          navRef.current.style.setProperty('--nav-progress', String(navProgress));
        }



        // Direct DOM update: progresso de sombra para a Dashboard
        const shadowProgress = Math.min(1, Math.max(0, (newFrame - 1) / 59));
        const showcaseWrapper = document.getElementById('dashboard-showcase-wrapper');
        if (showcaseWrapper) {
          showcaseWrapper.style.setProperty('--scroll-progress', String(shadowProgress));
        }
      }

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return (
    <>
      <main>
        <div 
          ref={heroContainerRef}
        id="inicio"
        className={`relative w-full bg-white ${isMobile ? 'z-[25] overflow-visible' : ''}`}
      >
        {isMobile ? (
          <MobileHero 
            startHeroIntro={startHeroIntro} 
            headerLogoRef={headerLogoRef} 
            navLinks={navLinks} 
            onScrollToSection={onScrollToSection}
          />
        ) : (
          <div 
            ref={heroPinRef}
            className="relative h-screen w-full overflow-hidden flex flex-col justify-between z-0"
          >
            
            {/* Fullscreen background image / 3D frame */}
            <motion.img
              ref={heroImageRef}
              src="herozinha.webp"
              alt="3D Animation / Hero Background"
              initial={{ scale: 1.08 }}
              animate={startHeroIntro ? { scale: 1 } : {}}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
            />

            {/* Foreground content wrapper */}
            <div className="relative z-10 flex flex-col h-full w-full justify-between">
              
              {/* Navbar wrapper: stable positioning layout to prevent backdrop-filter glitches and maintain logo target static alignment */}
              <div 
                className="w-full flex items-center justify-center pt-6 px-8 z-20 pointer-events-auto"
              >
                {/* Centered, pill-style, morphs smoothly into a single pill on scroll */}
                <nav 
                  ref={navRef}
                  style={{
                    '--nav-progress': '0',
                    backdropFilter: 'blur(24px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(160%)'
                  } as React.CSSProperties}
                  className="morphing-nav flex items-center justify-center rounded-full"
                >
                  {/* Left circular logo container: static Y coordinates for perfect flying morph landing, fades in */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={startHeroIntro ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                    className="morphing-nav-child flex items-center justify-center rounded-full w-14 h-14 shrink-0"
                  >
                    {/* Inner logo wrapper that cross-fades exactly when the flying logo lands */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={startHeroIntro ? { opacity: 1 } : {}}
                      transition={{ duration: 0.1, delay: 1.1, ease: 'linear' }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Logo logoRef={headerLogoRef} opacity={1} />
                    </motion.div>
                  </motion.div>

                  {/* Right pill container: links + actions, slides down independently */}
                  <motion.div
                    initial={{ y: -25, opacity: 0 }}
                    animate={startHeroIntro ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="morphing-nav-child morphing-nav-links flex items-center rounded-full"
                  >
                    {navLinks.map((link) => {
                      const targetId = link.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                      return (
                        <a
                          key={link}
                          href={`#${targetId}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onScrollToSection(targetId);
                          }}
                          className="hidden lg:inline-block text-[14px] font-semibold text-black hover:text-black/70 transition-colors duration-200 whitespace-nowrap"
                        >
                          {link}
                        </a>
                      );
                    })}

                    {/* Separator */}
                    <div className="hidden lg:block w-px h-4 bg-black/15 shrink-0" />

                    {/* Acesse sua conta */}
                    <a
                      href="https://finance.assetpagamentos.com.br/login?redirect=%2F"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden lg:inline-block text-[14px] font-semibold text-black hover:text-black/70 transition-colors duration-200 whitespace-nowrap"
                    >
                      Acesse sua conta
                    </a>

                    {/* Entre em contato CTA button */}
                    <a
                      href="#contato"
                      onClick={(e) => {
                        e.preventDefault();
                        onScrollToSection('contato');
                      }}
                      className="text-[14px] font-semibold text-white bg-black rounded-full px-4 py-2 hover:bg-black/80 transition-colors duration-200 whitespace-nowrap shrink-0"
                    >
                      Entre em contato
                    </a>
                  </motion.div>
                </nav>
              </div>

              {/* Hero content: bottom-left aligned */}
              <div 
                ref={heroContentRef}
                className="flex-1 flex items-end pr-6 lg:pr-28 transition-all duration-75"
                style={{
                  paddingBottom: isLargeScreen ? '260px' : '190px',
                  paddingLeft: isLargeScreen ? '340px' : '256px',
                  opacity: 1,
                  filter: 'blur(0px)',
                  transform: 'translate3d(0, 0px, 0)',
                }}
              >
                <div 
                  style={{ maxWidth: isLargeScreen ? '420px' : '384px' }}
                >
                  
                  {/* Social Proof (Active Users badge) */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={startHeroIntro ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 mb-4 select-none"
                  >
                    <div className="flex -space-x-2">
                      <img
                        className="w-9 h-9 rounded-full border-2 border-[#080c16] object-cover"
                        src="avatar-1.webp"
                        alt="Usuário 1"
                      />
                      <img
                        className="w-9 h-9 rounded-full border-2 border-[#080c16] object-cover"
                        src="avatar-2.webp"
                        alt="Usuário 2"
                      />
                      <img
                        className="w-9 h-9 rounded-full border-2 border-[#080c16] object-cover"
                        src="avatar-3.webp"
                        alt="Usuário 3"
                      />
                      <img
                        className="w-9 h-9 rounded-full border-2 border-[#080c16] object-cover"
                        src="avatar-4.webp"
                        alt="Usuário 4"
                      />
                      <div className="w-9 h-9 rounded-full border-2 border-[#080c16] bg-white flex items-center justify-center text-[11px] font-bold text-gray-900">
                        32k
                      </div>
                    </div>
                  </motion.div>

                  {/* 2. Headline <h1> */}
                  <ScrollFloat
                    as="h1"
                    scrollTriggered={false}
                    animateTrigger={startHeroIntro}
                    animationDuration={0.8}
                    stagger={0.012}
                    delay={0.2}
                    style={{ fontSize: isLargeScreen ? '2.2rem' : '1.95rem' }}
                    containerClassName="leading-[1.15] font-normal text-white tracking-tight mb-3"
                  >
                    <span className="font-bold">Transforme</span> seu<br />
                    <span className="font-bold">ecossistema</span> em um<br />
                    centro de <span className="font-bold">serviços<br />financeiros</span>
                  </ScrollFloat>

                  {/* 3. Subtext <p> */}
                  <ScrollFloat
                    as="p"
                    scrollTriggered={false}
                    animateTrigger={startHeroIntro}
                    animationDuration={0.8}
                    stagger={0.003}
                    delay={0.4}
                    style={{ fontSize: isLargeScreen ? '16px' : '14.5px' }}
                    containerClassName="text-white font-normal mb-3"
                  >
                    Fidelize clientes e crie novas receitas com Banking As A Service. Tecnologia e segurança bancária integradas de forma simples ao seu negócio.
                  </ScrollFloat>

                  {/* 4. CTA anchor */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={startHeroIntro ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href="https://api.whatsapp.com/send/?phone=556181229813&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-white border border-white/80 rounded-full px-5 py-2.5 hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-200 group"
                      style={{
                        fontSize: isLargeScreen ? '15px' : '13.5px',
                        boxShadow: '0 0 1px rgba(255, 255, 255, 0.8)',
                        transform: 'translate3d(0,0,0)',
                        WebkitFontSmoothing: 'antialiased',
                        backgroundClip: 'padding-box'
                      }}
                    >
                      Falar com um consultor especialista
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </a>
                  </motion.div>

                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {isMobile ? (
        <>
          {/* ─── Banking & Pix Features Section ─── */}
          <BankingPixFeatures isLargeScreen={isLargeScreen} isMobile={isMobile} />

          {/* ─── Dashboard Showcase Section ─── */}
          <div id="painel" className="relative z-20 w-full bg-white mt-0">
            <DashboardShowcase />
          </div>

          {/* ─── Partner Logos Section ─── */}
          <div id="parceiros" className="relative z-20 w-full">
            <PartnerLogos />
          </div>
        </>
      ) : (
        <>
          {/* ─── Dashboard Showcase Section ─── */}
          <div 
            id="dashboard-showcase-wrapper"
            style={{ '--scroll-progress': '0' } as React.CSSProperties}
            className="relative z-20 w-full bg-white shadow-[0_-16px_48px_rgba(0,0,0,calc(var(--scroll-progress,0)*0.08))] rounded-t-[40px] overflow-hidden mt-0"
          >
            <div id="painel" className="w-full h-full">
              <DashboardShowcase />
            </div>
          </div>

          {/* ─── Partner Logos Section ─── */}
          <div id="parceiros" className="relative z-20 w-full">
            <PartnerLogos />
          </div>

          {/* ─── Banking & Pix Features Section ─── */}
          <BankingPixFeatures isLargeScreen={isLargeScreen} isMobile={isMobile} />
        </>
      )}
      {/* ─── Digital Account Features Section ─── */}
      <DigitalAccountFeatures />

      {/* ─── Why Choose Us Section ─── */}
      <section id="diferenciais" className="relative z-20 w-full bg-white px-8 py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, opacity, filter" }}
            className="text-center mb-12"
          >
            <ScrollFloat
              as="h2"
              animationDuration={1}
              ease="power3.out"
              scrollStart="top bottom"
              scrollEnd="bottom center-=15%"
              stagger={0.015}
              style={{ display: 'block' }}
              containerClassName="text-center"
              textClassName="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] font-normal text-gray-900 tracking-tight"
            >
              Por que <span className="font-bold">escolher</span> a <span className="font-bold">Asset?</span>
            </ScrollFloat>
          </motion.div>

          <FeatureSection />
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section id="faq" className="relative z-20 w-full bg-white px-8 pb-12 sm:pb-16 -mt-px">
        <div className="max-w-6xl mx-auto pt-12 sm:pt-16">
          <FAQ />
        </div>
      </section>

      <Footer />
      </main>

      {/* ─── Loading Screen (Grid Reveal) ─── */}
      {preloaderState !== 'done' && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden">
          {/* Grid Blocks */}
          <div className="loader-grid">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="grid-block" />
            ))}
          </div>

          {/* Centered Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-[10000] pointer-events-none">
            <div className="flex flex-col items-center justify-center gap-8">
              
              {/* Outer container for Flying Morph (desktop) or Blur Fade (mobile) */}
              <motion.div
                ref={preloaderLogoRef}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
                animate={
                  preloaderState === 'flying'
                    ? isMobile
                      ? {
                          opacity: 0,
                          scale: 0.8,
                          filter: 'blur(24px)',
                        }
                      : {
                          x: logoTransform.x,
                          y: logoTransform.y,
                          scale: logoTransform.scale,
                          opacity: [1, 1, 0],
                        }
                    : {
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        filter: 'blur(0px)',
                      }
                }
                transition={
                  preloaderState === 'flying' && isMobile
                    ? { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                    : {
                        x: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
                        y: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
                        scale: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
                        opacity: { duration: 1.2, times: [0, 0.916, 1], ease: 'linear' },
                      }
                }
                className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48"
              >
                {/* Inner container for Fluid Float Loop - Returns to center during flight */}
                <motion.div
                  initial={{ y: 0, scale: 1, rotate: 0 }}
                  animate={
                    preloaderState === 'flying'
                      ? {
                          y: 0,
                          scale: 1,
                          rotate: 0,
                          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                        }
                      : {
                          y: [0, -7, 0, 7, 0],
                          scale: [1, 1.03, 1, 0.97, 1],
                          rotate: [0, -2.5, 0, 2.5, 0],
                          transition: {
                            y: { duration: 4.0, repeat: Infinity, ease: "easeInOut" },
                            scale: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 5.6, repeat: Infinity, ease: "easeInOut" }
                          }
                        }
                  }
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src="logo%20asset.png"
                    alt="Asset Logo"
                    className="w-full h-full object-contain select-none pointer-events-none"
                    style={{ filter: 'brightness(0)' }}
                  />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
