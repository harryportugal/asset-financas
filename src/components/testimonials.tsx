import { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
	id: number;
	name: string;
	company: string;
	quote: string;
	image: string;
	logoType: "umbrella" | "vision" | "cactus";
}

const testimonialsData: Testimonial[] = [
	{
		id: 1,
		name: "Elara Vance",
		company: "Umbrella Co.",
		quote: "Eles ofereceram insights claros em projetos complexos, removendo barreiras e fornecendo soluções precisas e eficientes.",
		image: "/LHF5pnTEGiDqPokWO5u1DEp2l0.webp",
		logoType: "umbrella",
	},
	{
		id: 2,
		name: "Darius Jones",
		company: "Vision Tech",
		quote: "Trouxeram clareza para problemas difíceis, derrubando barreiras e gerando soluções rápidas e inteligentes.",
		image: "/IGOxPIDHI4tPrADWVh1HrKM99RQ.webp",
		logoType: "vision",
	},
	{
		id: 3,
		name: "Sarah Lin",
		company: "Cactus Co.",
		quote: "Resolveram demandas complexas com extrema clareza, simplificando processos e entregando resultados precisos.",
		image: "/Mjb5QC7cBmKTRevvIPeGBCVzHHM.webp",
		logoType: "cactus",
	},
	{
		id: 4,
		name: "Marcus Aurelius",
		company: "Nova Corp.",
		quote: "Uma infraestrutura de pagamentos excepcional. A transição para suas APIs levou a eficiência da nossa plataforma a outro nível.",
		image: "/owRvmfck3MmE9RTAPlzhICFlFg.webp",
		logoType: "umbrella",
	},
];

export function Testimonials() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// Triple the array to create a seamless infinite scrolling list
	const infiniteTestimonials = [
		...testimonialsData,
		...testimonialsData,
		...testimonialsData,
	];

	const autoPlayTimerRef = useRef<any>(null);

	const startAutoPlay = () => {
		if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
		
		autoPlayTimerRef.current = setInterval(() => {
			if (isDraggingRef.current) return;
			const container = scrollContainerRef.current;
			if (!container) return;
			const firstCard = container.firstElementChild as HTMLElement;
			const scrollAmount = firstCard ? firstCard.offsetWidth + 16 : 410 + 16;
			container.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}, 2000); // Scrolls automatically every 2 seconds
	};

	const stopAutoPlay = () => {
		if (autoPlayTimerRef.current) {
			clearInterval(autoPlayTimerRef.current);
			autoPlayTimerRef.current = null;
		}
	};

	// Initialize scroll position to center (the start of the middle group)
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const initScroll = () => {
			const firstCard = container.firstElementChild as HTMLElement;
			if (firstCard) {
				const cardWidth = firstCard.offsetWidth;
				const gap = 16;
				const singleLoopWidth = (cardWidth + gap) * testimonialsData.length;
				container.scrollLeft = singleLoopWidth;
			}
		};

		// Run immediately and after a tiny timeout to ensure layout completes
		requestAnimationFrame(initScroll);
		const timer = setTimeout(initScroll, 100);

		return () => clearTimeout(timer);
	}, []);

	// Handle silent snapping on scrollend or debounced scroll to make it infinite
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScrollEnd = () => {
			const firstCard = container.firstElementChild as HTMLElement;
			if (!firstCard) return;
			const cardWidth = firstCard.offsetWidth;
			const gap = 16;
			const singleLoopWidth = (cardWidth + gap) * testimonialsData.length;

			// Snap back to the middle group if scrolled too far right or left
			if (container.scrollLeft >= singleLoopWidth * 1.8) {
				container.scrollLeft -= singleLoopWidth;
			} else if (container.scrollLeft <= singleLoopWidth * 0.2) {
				container.scrollLeft += singleLoopWidth;
			}
		};

		let timeoutId: any;
		const handleScroll = () => {
			// Debounce fallback for browsers that do not support scrollend natively
			clearTimeout(timeoutId);
			timeoutId = setTimeout(handleScrollEnd, 150);
		};

		container.addEventListener("scroll", handleScroll, { passive: true });
		container.addEventListener("scrollend", handleScrollEnd, { passive: true });

		// Start autoplay loop and set up hover/touch pause triggers
		startAutoPlay();
		container.addEventListener("touchstart", stopAutoPlay, { passive: true });
		container.addEventListener("touchend", startAutoPlay, { passive: true });

		return () => {
			container.removeEventListener("scroll", handleScroll);
			container.removeEventListener("scrollend", handleScrollEnd);
			clearTimeout(timeoutId);
			stopAutoPlay();
			container.removeEventListener("touchstart", stopAutoPlay);
			container.removeEventListener("touchend", startAutoPlay);
		};
	}, []);

	// Mouse drag-to-scroll implementation for premium desktop interaction
	const isDraggingRef = useRef(false);
	const startXRef = useRef(0);
	const scrollLeftRef = useRef(0);

	const handleMouseDown = (e: React.MouseEvent) => {
		const container = scrollContainerRef.current;
		if (!container) return;
		isDraggingRef.current = true;
		startXRef.current = e.pageX - container.offsetLeft;
		scrollLeftRef.current = container.scrollLeft;
		stopAutoPlay();
	};

	const handleMouseLeave = () => {
		isDraggingRef.current = false;
		startAutoPlay();
	};

	const handleMouseUp = () => {
		isDraggingRef.current = false;
		startAutoPlay();
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDraggingRef.current) return;
		e.preventDefault();
		const container = scrollContainerRef.current;
		if (!container) return;
		const x = e.pageX - container.offsetLeft;
		const walk = (x - startXRef.current) * 1.5; // Drag speed multiplier
		container.scrollLeft = scrollLeftRef.current - walk;
	};

	const scroll = (direction: "left" | "right") => {
		stopAutoPlay();
		const container = scrollContainerRef.current;
		if (container) {
			const firstCard = container.firstElementChild as HTMLElement;
			const scrollAmount = firstCard ? firstCard.offsetWidth + 16 : 410 + 16;
			container.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
		startAutoPlay();
	};

	return (
		<div className="w-full py-12 sm:py-16 bg-white select-none">
			{/* Top Header Row aligned with max-w-6xl mx-auto px-8 */}
			<div className="max-w-6xl mx-auto px-8 mb-10 w-full flex flex-col md:flex-row md:items-end md:justify-between">
				<motion.div 
					initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					style={{ willChange: "transform, opacity, filter" }}
					className="flex-1"
				>

					{/* Main Title */}
					<h2 className="text-[2.2rem] sm:text-[2.5rem] font-normal text-gray-900 tracking-tight leading-[1.15] mb-4">
						O que <span className="font-bold">dizem</span> sobre <span className="font-bold">nós</span>?
					</h2>
					
					{/* Description */}
					<p className="text-gray-600 text-[14px] sm:text-[15px] font-normal leading-relaxed max-w-xl">
						Veja a experiência de quem já utiliza a nossa infraestrutura financeira para escalar o seu negócio.
					</p>
				</motion.div>

				{/* Arrow buttons on the right side */}
				<motion.div 
					initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
					whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
					style={{ willChange: "transform, scale, opacity, filter" }}
					className="flex items-center gap-3 mt-6 md:mt-0"
				>
					<button
						onClick={() => scroll("left")}
						className="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 active:scale-95 shadow-xs transition-all duration-200 cursor-pointer focus:outline-none"
						aria-label="Rolar para a esquerda"
					>
						<ArrowLeft className="size-4 stroke-[2.2]" />
					</button>
					<button
						onClick={() => scroll("right")}
						className="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 active:scale-95 shadow-xs transition-all duration-200 cursor-pointer focus:outline-none"
						aria-label="Rolar para a direita"
					>
						<ArrowRight className="size-4 stroke-[2.2]" />
					</button>
				</motion.div>
			</div>

			{/* Horizontally scrollable cards container with dynamic page-edge padding */}
			<motion.div
				ref={scrollContainerRef}
				initial={{ opacity: 0, y: 45, filter: "blur(4px)" }}
				whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pointer-events-auto cursor-grab active:cursor-grabbing w-full outline-none focus:outline-none"
				style={{
					willChange: "transform, opacity, filter",
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					WebkitOverflowScrolling: "touch",
					paddingLeft: "max(2rem, calc((100vw - 1152px) / 2 + 2rem))",
					paddingRight: "max(2rem, calc((100vw - 1152px) / 2 + 2rem))",
				}}
			>
				{infiniteTestimonials.map((item, index) => (
					<div
						key={`${item.id}-${index}`}
						className="relative flex flex-col justify-between w-[360px] sm:w-[420px] md:w-[460px] h-[360px] sm:h-[410px] md:h-[440px] rounded-[32px] overflow-hidden border border-gray-200/20 shrink-0 select-none group snap-center bg-gray-100"
					>
						{/* Background image */}
						<img
							src={item.image}
							alt={item.name}
							className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
						/>

						{/* Top Left Company Logo */}
						<div className="relative z-20 flex items-center gap-2 pt-8 px-8 select-none pointer-events-none">
							<LogoIcon type={item.logoType} />
						</div>

						{/* Gradual backdrop blur and very faint dark overlay confined to the bottom, masked to fade out upwards */}
						<div 
							className="absolute inset-x-0 bottom-0 h-[40%] backdrop-blur-[10px] bg-black/15 z-10 pointer-events-none"
							style={{
								maskImage: "linear-gradient(to top, black 15%, transparent 100%)",
								WebkitMaskImage: "linear-gradient(to top, black 15%, transparent 100%)",
							}}
						/>

						{/* Bottom content section (placed above the blur overlay in z-index, so text is not masked/faded) */}
						<div className="relative z-20 flex flex-col pb-4 px-6 mt-auto">
							{/* Premium solid quote mark */}
							<svg className="size-6 text-white fill-current opacity-90 mb-2 select-none pointer-events-none" viewBox="0 0 24 24">
								<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
							</svg>
							
							{/* Testimonial Quote */}
							<p className="text-white text-[18px] sm:text-[20px] md:text-[21px] font-semibold leading-snug mb-2.5 tracking-tight">
								&ldquo;{item.quote}&rdquo;
							</p>

							{/* Author Info (space before comma matches layout screenshot) */}
							<span className="text-white/80 text-[13px] sm:text-[13.5px] font-bold text-right tracking-tight block">
								- {item.name} , {item.company}
							</span>
						</div>
					</div>
				))}
			</motion.div>
		</div>
	);
}

function LogoIcon({ type }: { type: Testimonial["logoType"] }) {
	if (type === "umbrella") {
		return (
			<div className="flex items-center gap-1.5 text-white/95 font-semibold text-[14px]">
				<svg className="size-4 stroke-white fill-none" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 2a10 10 0 0 1 10 10H2A10 10 0 0 1 12 2z" />
					<path d="M12 12v6a2 2 0 0 0 4 0" />
				</svg>
				<span>umbrella</span>
			</div>
		);
	}
	if (type === "vision") {
		return (
			<div className="flex items-center gap-1.5 text-white/95 font-semibold text-[14px]">
				<svg className="size-4 stroke-white fill-none" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
					<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
					<circle cx="12" cy="12" r="3" />
				</svg>
				<span>vision</span>
			</div>
		);
	}
	// Cactus logo
	return (
		<div className="flex items-center gap-1.5 text-white/95 font-semibold text-[14px]">
			<svg className="size-4 stroke-white fill-none" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
				<path d="M12 3v18" />
				<path d="M8 8.5C8 6.5 10 5 12 5m0 7.5c2 0 4-1.5 4-3.5m-8 7.5v-2" />
			</svg>
			<span>Cactus</span>
		</div>
	);
}

