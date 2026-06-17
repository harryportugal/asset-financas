import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ──────────────────────────────────────────────
// InfiniteSlider — CSS-only fallback version
// uses framer-motion (já instalado no projeto)
// ──────────────────────────────────────────────
type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
  className?: string;
};

function InfiniteSlider({
  children,
  gap = 42,
  speed = 60,
  speedOnHover = 20,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const half = containerRef.current.scrollWidth / 2;
      setContainerWidth(half);
    }
  }, [children]);

  useEffect(() => {
    if (!containerWidth) return;
    const from = reverse ? -containerWidth : 0;
    const to = reverse ? 0 : -containerWidth;
    const distance = Math.abs(to - from);
    const duration = distance / currentSpeed;

    let controls: ReturnType<typeof animate> | undefined;

    if (isTransitioning) {
      const remaining = Math.abs(translation.get() - to);
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: remaining / currentSpeed,
        onComplete: () => setIsTransitioning(false),
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return () => controls?.stop();
  }, [containerWidth, currentSpeed, reverse, isTransitioning, translation]);

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        ref={containerRef}
        className="flex w-max"
        style={{ x: translation, gap: `${gap}px` }}
        onHoverStart={() => { setIsTransitioning(true); setCurrentSpeed(speedOnHover); }}
        onHoverEnd={() => { setIsTransitioning(true); setCurrentSpeed(speed); }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Logos de parceiros da Asset (infraestrutura e bancos)
// ──────────────────────────────────────────────
const partnerLogos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png", alt: "Amazon Web Services" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Visa_2021.svg/1280px-Visa_2021.svg.png", alt: "Visa" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png", alt: "Mastercard" },
  { src: "https://logospng.org/download/pix/logo-pix-icone-256.png", alt: "Pix" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo_TV_2015.png/1200px-Logo_TV_2015.png", alt: "Google" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png", alt: "Microsoft" },
  { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub" },
  { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel" },
];

// Logos SVG inline dos parceiros reais da Asset (banco centrais e subadquirentes)
const partnerItems = [
  {
    name: "Banco Central",
    logo: (
      <svg viewBox="0 0 200 60" className="h-7 w-auto" fill="none">
        <text x="0" y="44" fontFamily="Arial" fontWeight="700" fontSize="38" fill="currentColor">Banco Central</text>
      </svg>
    ),
  },
  {
    name: "Pix",
    logo: (
      <svg viewBox="0 0 80 80" className="h-8 w-auto" fill="none">
        <path d="M38.5 10L50 21.5L38.5 33L27 21.5L38.5 10Z" fill="currentColor" opacity="0.9"/>
        <path d="M50 21.5L61.5 33L50 44.5L38.5 33L50 21.5Z" fill="currentColor" opacity="0.7"/>
        <path d="M38.5 33L50 44.5L38.5 56L27 44.5L38.5 33Z" fill="currentColor" opacity="0.7"/>
        <path d="M27 21.5L38.5 33L27 44.5L15.5 33L27 21.5Z" fill="currentColor" opacity="0.5"/>
        <text x="10" y="74" fontFamily="Arial" fontWeight="800" fontSize="22" fill="currentColor">pix</text>
      </svg>
    ),
  },
  {
    name: "AWS",
    logo: (
      <svg viewBox="0 0 120 40" className="h-7 w-auto" fill="none">
        <text x="0" y="30" fontFamily="Arial" fontWeight="700" fontSize="28" fill="currentColor">aws</text>
      </svg>
    ),
  },
  {
    name: "Visa",
    logo: (
      <svg viewBox="0 0 120 40" className="h-7 w-auto" fill="none">
        <text x="0" y="32" fontFamily="Arial" fontWeight="900" fontSize="36" fill="currentColor" fontStyle="italic">VISA</text>
      </svg>
    ),
  },
  {
    name: "Mastercard",
    logo: (
      <svg viewBox="0 0 80 40" className="h-7 w-auto" fill="none">
        <circle cx="27" cy="20" r="18" fill="currentColor" opacity="0.8"/>
        <circle cx="53" cy="20" r="18" fill="currentColor" opacity="0.5"/>
        <path d="M40 6.5a18 18 0 0 1 0 27 18 18 0 0 1 0-27z" fill="currentColor" opacity="0.65"/>
      </svg>
    ),
  },
  {
    name: "Asaas",
    logo: (
      <svg viewBox="0 0 120 40" className="h-7 w-auto" fill="none">
        <text x="0" y="30" fontFamily="Arial" fontWeight="800" fontSize="28" fill="currentColor">Asaas</text>
      </svg>
    ),
  },
  {
    name: "Google Pay",
    logo: (
      <svg viewBox="0 0 160 40" className="h-7 w-auto" fill="none">
        <text x="0" y="30" fontFamily="Arial" fontWeight="400" fontSize="26" fill="currentColor">Google Pay</text>
      </svg>
    ),
  },
  {
    name: "Apple Pay",
    logo: (
      <svg viewBox="0 0 160 40" className="h-7 w-auto" fill="none">
        <text x="0" y="30" fontFamily="Arial" fontWeight="400" fontSize="26" fill="currentColor">Apple Pay</text>
      </svg>
    ),
  },
  {
    name: "LGPD Compliance",
    logo: (
      <svg viewBox="0 0 180 40" className="h-7 w-auto" fill="none">
        <text x="0" y="29" fontFamily="Arial" fontWeight="700" fontSize="24" fill="currentColor">LGPD Compliant</text>
      </svg>
    ),
  },
  {
    name: "PCI DSS",
    logo: (
      <svg viewBox="0 0 160 40" className="h-7 w-auto" fill="none">
        <text x="0" y="29" fontFamily="Arial" fontWeight="700" fontSize="24" fill="currentColor">PCI-DSS</text>
      </svg>
    ),
  },
];

export function PartnerLogos() {
  return (
    <section
      id="parceiros"
      className="relative z-20 w-full bg-white py-16 sm:py-20 overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 text-center">
        <p className="text-gray-400 text-[11px] uppercase tracking-[0.2em] font-semibold mb-3">
          Infraestrutura &amp; Ecossistema
        </p>
        <h2 className="text-gray-900 text-[1.6rem] sm:text-[2rem] font-normal tracking-tight leading-tight">
          Confiado por especialistas.{" "}
          <span className="font-bold">Usado pelos líderes.</span>
        </h2>
      </div>

      {/* Top divider line */}
      <div className="w-full border-t border-gray-100 mb-8" />

      {/* Slider */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <InfiniteSlider gap={72} speed={50} speedOnHover={15} reverse={false}>
          {partnerItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-center shrink-0 text-gray-400 hover:text-gray-700 transition-colors duration-300"
              title={item.name}
            >
              {item.logo}
            </div>
          ))}
        </InfiniteSlider>
      </div>

      {/* Bottom divider line */}
      <div className="w-full border-t border-gray-100 mt-8" />
    </section>
  );
}
