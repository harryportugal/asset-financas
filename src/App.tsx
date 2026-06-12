import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollFloat from './ScrollFloat';
import { FeatureSection } from './components/feature-section';
import { FAQ } from './components/faq';
import { Testimonials } from './components/testimonials';
import { Footer } from './components/footer';
import { motion } from 'framer-motion';


// Logo component loading the custom PNG from public directory, styled in pure black, sized significantly larger
const Logo = ({ logoRef, opacity }: { logoRef?: React.RefObject<HTMLImageElement | null>, opacity?: number }) => (
  <img 
    ref={logoRef}
    src="logo%20asset.png" 
    alt="Asset Finanças Logo" 
    className="w-10 h-10 sm:w-12 sm:h-12 object-contain select-none pointer-events-none"
    style={{ filter: 'brightness(0)', opacity: opacity ?? 1, transition: 'opacity 0.2s ease-out' }}
  />
);

const bentoCardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 30, filter: "blur(10px)" },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1] as const
    }
  })
};

function App() {
  const navLinks = ['Início', 'Infraestrutura', 'Soluções', 'Pagamentos', 'Recursos'];
  const totalFrames = 122;

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

  // Fade out and remove static initial loader once React is mounted and ready
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.3s ease-out';
      const timer = setTimeout(() => loader.remove(), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Background frame preloader with progress tracking
  useEffect(() => {
    let isMounted = true;
    const imagesToPreload = [
      "hero.webp",
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

    // Add all 122 animation frames (starting from frame 2 because frame 1 is hero.webp)
    for (let i = 2; i <= totalFrames; i++) {
      imagesToPreload.push(`frames/frame_${String(i).padStart(4, '0')}.webp`);
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
      const minDuration = 3000; // Enforce minimum 3 seconds loading duration
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


  // Detect large screens (monitors >= 1800px wide) to nudge content up
  const [isLargeScreen, setIsLargeScreen] = useState(() => window.innerWidth >= 1800);
  useEffect(() => {
    const onResize = () => setIsLargeScreen(window.innerWidth >= 1800);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Refs to track scroll target frame and current interpolated frame
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);

  const bentoSectionRef = useRef<HTMLElement>(null);



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


    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewHeight = window.innerHeight;
      
      // 1. Calculate target frame index (1 to 122) based on the 300vh scroll animation height of the hero
      const animationHeight = viewHeight * 3;
      const scrollFraction = animationHeight > 0 ? Math.min(1, scrollTop / animationHeight) : 0;
      
      const frameIndex = Math.min(
        totalFrames,
        Math.max(1, Math.floor(scrollFraction * totalFrames) + 1)
      );
      targetFrameRef.current = frameIndex;


    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial sync on mount

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
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
        if (heroImageRef.current) {
          heroImageRef.current.src = newFrame === 1 ? "hero.webp" : `frames/frame_${String(newFrame).padStart(4, '0')}.webp`;
        }

        // Direct DOM update: CSS custom property for morphing nav
        const navProgress = Math.min(1, Math.max(0, (newFrame - 1) / 12));
        if (navRef.current) {
          navRef.current.style.setProperty('--nav-progress', String(navProgress));
        }

        // Direct DOM update: CSS styles for hero content fade
        const fadeProgress = Math.min(1, Math.max(0, (newFrame - 1) / (totalFrames * 0.15)));
        if (heroContentRef.current) {
          const textOpacity = 1 - fadeProgress;
          heroContentRef.current.style.opacity = String(textOpacity);
          heroContentRef.current.style.filter = `blur(${fadeProgress * 12}px)`;
          heroContentRef.current.style.transform = `translate3d(0, ${fadeProgress * -30}px, 0)`;
          heroContentRef.current.style.pointerEvents = textOpacity === 0 ? 'none' : 'auto';
        }
      }

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return (
    <>
      {/* Mobile Block Screen */}
      <div className="mobile-block-screen">
        <div className="mobile-block-content px-6">
          <img 
            src="logo%20asset.png" 
            alt="Asset Logo" 
            className="w-16 h-16 object-contain mb-8 opacity-90 select-none pointer-events-none"
            style={{ filter: 'brightness(0)' }}
          />
          <h1 className="text-[20px] sm:text-[22px] font-bold text-black tracking-tight mb-3">
            Preparando a Experiência Mobile
          </h1>
          <p className="text-[13px] text-black/60 leading-relaxed max-w-[300px]">
            O ecossistema financeiro da Asset está passando por otimizações para oferecer a melhor experiência em dispositivos móveis. Acesse a plataforma através de um computador.
          </p>
        </div>
      </div>

      {/* ─── 3D Scroll Hero ─── */}
      <div className="relative min-h-[400vh] bg-[#f0f0ee]">
      {/* Sticky wrapper that remains fixed in viewport while user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Fullscreen background image / 3D frame */}
        <motion.img
          ref={heroImageRef}
          src="hero.webp"
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
                  transition={{ duration: 0.3, delay: 0.8, ease: 'easeOut' }}
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
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                    className="text-[14px] font-semibold text-black hover:text-black/70 transition-colors duration-200 whitespace-nowrap"
                  >
                    {link}
                  </a>
                ))}

                {/* Separator */}
                <div className="w-px h-4 bg-black/15 shrink-0" />

                {/* Acesse sua conta */}
                <a
                  href="#conta"
                  className="text-[14px] font-semibold text-black hover:text-black/70 transition-colors duration-200 whitespace-nowrap"
                >
                  Acesse sua conta
                </a>

                {/* Entre em contato CTA button */}
                <a
                  href="#contato"
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
            className="flex-1 flex items-end pr-28 transition-all duration-75"
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
                    className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
                    src="avatar-1.webp"
                    alt="Usuário 1"
                  />
                  <img
                    className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
                    src="avatar-2.webp"
                    alt="Usuário 2"
                  />
                  <img
                    className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
                    src="avatar-3.webp"
                    alt="Usuário 3"
                  />
                  <img
                    className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
                    src="avatar-4.webp"
                    alt="Usuário 4"
                  />
                  <div className="w-9 h-9 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center text-[11px] font-bold text-gray-900">
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
                  href="#consultor"
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

      {/* ─── Bento Grid Section — Stacking Overlay ─── */}
      <section 
        ref={bentoSectionRef}
        className="relative z-20 w-full min-h-screen bg-[#efefed] px-8 pt-16 pb-8 sm:pt-24 sm:pb-12 shadow-[0_-16px_48px_rgba(0,0,0,0.08)] rounded-t-[40px] border-t border-gray-200/50 mt-[200vh] flex flex-col justify-center"
      >
        <div className="max-w-6xl mx-auto w-full">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 text-center"
          >
            <ScrollFloat
              animationDuration={1}
              ease="power3.out"
              scrollStart="top bottom"
              scrollEnd="bottom center-=15%"
              stagger={0.015}
              style={{ fontSize: isLargeScreen ? '2.4rem' : '2.0rem' }}
              containerClassName="leading-[1.15] font-normal text-gray-900 tracking-tight"
            >
              Uma <span className="font-bold">infraestrutura</span> completa de<br />
              <span className="font-bold">serviços financeiros</span> para o seu <span className="font-bold">negócio</span>
            </ScrollFloat>
          </motion.div>

          {/* Grid container — explicit CSS grid to guarantee row-span works */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: '300px 300px',
            gap: '14px',
          }}>

            {/* ── Card A: top-left (4 cols, row 1) — Soluções ── */}
            <motion.div
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={bentoCardVariants}
              style={{ 
                gridColumn: '1 / span 4', 
                gridRow: '1',
              }}
              className="rounded-3xl p-7 flex flex-col overflow-hidden shadow-sm border border-gray-200/40 relative bg-[#f6f6f4]"
            >
              {/* Background Image scaled 5% to clip out top screenshot border while keeping original center 12px crop */}
              <img 
                src="cards bento/1780313376294.webp" 
                alt="Soluções Background" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.05]"
                style={{ objectPosition: 'center 12px' }}
              />

              {/* Soft white gradient overlay at the top for premium text contrast */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/95 via-white/75 to-transparent pointer-events-none z-0" />

              <div className="relative z-10">
                <h3 className="text-[1.15rem] font-bold text-gray-900 mb-1">Soluções</h3>
                <p className="text-[13.5px] text-gray-800 leading-relaxed mb-3">
                  Portfólio completo para o seu ecossistema digital.
                </p>
                
                {/* Vertical features list with blue icons */}
                <div className="flex flex-col gap-2.5 mt-4">
                  {['Pix', 'TED / DOC', 'Boleto', 'Cartão'].map(tag => (
                    <div key={tag} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-[13px] font-semibold text-gray-800 tracking-tight">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Card B: top-middle (4 cols, row 1) — Pagamentos ── */}
            <motion.div
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={bentoCardVariants}
              style={{ 
                gridColumn: '5 / span 4', 
                gridRow: '1',
              }}
              className="rounded-3xl p-7 flex flex-col justify-between overflow-hidden shadow-sm border border-gray-200/40 relative bg-[#f6f6f4]"
            >
              {/* Background Image for Card B */}
              <img 
                src="cards bento/card b.webp" 
                alt="Pagamentos Background" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.05]"
                style={{ objectPosition: 'center 20px', filter: 'saturate(0.85)' }}
              />

              {/* Soft white gradient overlay at the top for premium text contrast */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/95 via-white/75 to-transparent pointer-events-none z-0" />

              <div className="relative z-10">
                <h3 className="text-[1.15rem] font-bold text-gray-900 mb-1">Pagamentos</h3>
                <p className="text-[13.5px] text-gray-800 leading-relaxed">
                  Infraestrutura em tempo real para o seu negócio.
                </p>
              </div>
            </motion.div>

            {/* ── Card C: right tall (4 cols, rows 1-2) — Plataforma ── */}
            <motion.div
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={bentoCardVariants}
              style={{ 
                gridColumn: '9 / span 4', 
                gridRow: '1 / span 2',
              }}
              className="rounded-3xl pt-20 px-8 pb-8 flex flex-col justify-between overflow-hidden shadow-sm border border-gray-200/40 relative bg-[#f6f6f4]"
            >
              {/* Background Image zoomed to clip out leak lines */}
              <img 
                src="cards bento/card-c-plataforma.webp" 
                alt="Plataforma Background" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.06]"
                style={{ objectPosition: 'center top' }}
              />
              <div className="flex flex-col items-center text-center relative z-10">
                {/* Title */}
                <h3 className="text-[1.65rem] font-bold text-gray-900 leading-[1.2] tracking-tight mb-2 max-w-xs">
                  Transforme seu Produto
                </h3>

                {/* Subtitle */}
                <p className="text-[13px] text-gray-800 font-normal leading-relaxed max-w-xs mb-4">
                  Integre serviços bancários ao seu negócio e crie novas fontes de receita.
                </p>

                {/* Search Bar - matching 'Search for education desire...' */}
                <div className="w-full max-w-xs bg-white border border-gray-100 rounded-full p-1 pl-4 pr-1.5 flex items-center justify-between shadow-sm">
                  <span className="text-[12px] text-gray-800 font-medium">Buscar recursos...</span>
                  <button className="w-8 h-8 rounded-full bg-[#002b8a] hover:bg-[#00227c] flex items-center justify-center text-white transition-colors duration-200">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── Card D: bottom-left wide (8 cols, row 2) — BaaS CTA ── */}
            <motion.div
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={bentoCardVariants}
              style={{
                gridColumn: '1 / span 8',
                gridRow: '2',
                backgroundImage: 'url("cards bento/card-d-baas.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="rounded-3xl p-9 flex flex-col justify-between overflow-hidden relative"
            >

              <div className="relative z-10">
                <h2 className="text-[1.45rem] sm:text-[1.6rem] font-bold text-white leading-tight mb-2 max-w-md">
                  Infraestrutura Financeira<br />
                  <span className="italic font-light">para Empresas em Escala</span>
                </h2>
                <p className="text-[13.5px] text-white max-w-sm leading-relaxed">
                  Sua plataforma financeira completa.<br />
                  Fidelize clientes e crie novas receitas<br />
                  com infraestrutura bancária integrada.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3 mt-6">
                <a href="#produtos" className="inline-flex items-center px-5 py-2.5 bg-white text-gray-900 text-[13px] font-semibold rounded-full hover:bg-white/90 transition-colors duration-200">
                  Ver produtos
                </a>
                <a href="#contato" className="inline-flex items-center px-5 py-2.5 bg-white/15 text-white text-[13px] font-semibold rounded-full border border-white/30 hover:bg-white/25 transition-colors duration-200">
                  Falar com especialista
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Why Choose Us Section ─── */}
      <section className="relative z-20 w-full bg-[#efefed] px-8 pt-8 pb-10 sm:pt-10 sm:pb-14 border-t border-gray-200/50 -mt-px">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
              textClassName="text-[2.2rem] sm:text-[2.5rem] font-normal text-gray-900 tracking-tight"
            >
              Por que <span className="font-bold">escolher</span> a <span className="font-bold">Asset</span>?
            </ScrollFloat>
          </motion.div>

          <FeatureSection />
        </div>
      </section>

      {/* ─── Testimonials Section ─── */}
      <div className="relative z-20 w-full border-t border-gray-200/50 -mt-px">
        <Testimonials />
      </div>

      {/* ─── FAQ Section ─── */}
      <section className="relative z-20 w-full bg-[#efefed] px-8 pb-10 sm:pb-12 -mt-px">
        <div className="max-w-6xl mx-auto border-t border-gray-200/50 pt-10 sm:pt-14">
          <FAQ />
        </div>
      </section>

      {/* ─── CTA & Footer Section ─── */}
      <Footer />
      </div>

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
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <div className="flex flex-col items-center justify-center gap-8">
              
              {/* Center Logo with Morph and Liquid-Fill */}
              <motion.div
                ref={preloaderLogoRef}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={
                  preloaderState === 'flying' 
                    ? { 
                        x: logoTransform.x, 
                        y: logoTransform.y, 
                        scale: logoTransform.scale,
                        opacity: 0,
                        transition: { 
                          x: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                          y: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                          scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3, delay: 0.8, ease: 'easeOut' } // fade out near the end
                        }
                      }
                    : { 
                        scale: 1, 
                        opacity: 1,
                        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                      }
                }
                className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28"
              >
                {/* Outline/Faint Logo */}
                <img 
                  src="logo%20asset.png" 
                  alt="Asset Logo Faint" 
                  className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none opacity-[0.12]"
                  style={{ filter: 'brightness(0)' }}
                />

                {/* Filled Logo (Liquid Fill using clipPath) */}
                <img 
                  src="logo%20asset.png" 
                  alt="Asset Logo Filled" 
                  className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                  style={{ 
                    filter: 'brightness(0)',
                    clipPath: `inset(${100 - loadingProgress}% 0px 0px 0px)`
                  }}
                />
              </motion.div>

              {/* Progress Text & Loading Bar (fades out when state is flying) */}
              <motion.div 
                animate={preloaderState === 'flying' ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col items-center gap-3 w-64"
              >
                <div className="text-[12px] font-bold tracking-[0.2em] text-black/40 uppercase">
                  Carregando...
                </div>
                {/* Progress bar */}
                <div className="w-full h-[2px] bg-black/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-[#002b8a]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                  />
                </div>
                <div className="text-[14px] font-bold text-[#002b8a] tracking-tight">
                  {loadingProgress}%
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
