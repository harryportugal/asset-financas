import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  gap = 64,
  speed = 50,
  speedOnHover = 15,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth / 2);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
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
        className="flex w-max items-center"
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

// ── Real partner logos (processed: bg removed, gray colored) ──
const partnerItems = [
  { name: "img-20260616-wa00282",    src: "/logos-carrossel/img-20260616-wa00282.png" },
  { name: "img-20260616-wa00301",    src: "/logos-carrossel/img-20260616-wa00301.png" },
  { name: "img-20260616-wa00321",    src: "/logos-carrossel/img-20260616-wa00321.png" },
  { name: "img-20260616-wa0036",     src: "/logos-carrossel/img-20260616-wa0036.png" },
  { name: "img-20260616-wa0037",     src: "/logos-carrossel/img-20260616-wa0037.png" },
  { name: "img-20260616-wa0038",     src: "/logos-carrossel/img-20260616-wa0038.png" },
  { name: "img-20260616-wa0040",     src: "/logos-carrossel/img-20260616-wa0040.png" },
  { name: "img-20260616-wa0041",     src: "/logos-carrossel/img-20260616-wa0041.png" },
  { name: "img-20260616-wa0042",     src: "/logos-carrossel/img-20260616-wa0042.png" },
  { name: "logo-completa-4---copia", src: "/logos-carrossel/logo-completa-4---copia.png" },
];

export function PartnerLogos() {
  return (
    <section
      id="parceiros"
      className="relative z-20 w-full bg-white py-16 sm:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 text-center">
        <p className="text-gray-400 text-[11px] uppercase tracking-[0.2em] font-semibold mb-3">
          Empresas Parceiras
        </p>
        <h2 className="text-gray-900 text-[1.6rem] sm:text-[2rem] font-normal tracking-tight leading-tight">
          Confiado por especialistas.{" "}
          <span className="font-bold">Usado pelos líderes.</span>
        </h2>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <InfiniteSlider gap={80} speed={50} speedOnHover={15}>
          {partnerItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-center shrink-0 select-none"
              title={item.name}
            >
              <img
                src={item.src}
                alt={item.name}
                className="h-16 sm:h-20 w-auto object-contain pointer-events-none opacity-50 hover:opacity-80 transition-opacity duration-300"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
