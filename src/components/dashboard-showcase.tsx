import { motion } from "framer-motion";
import ScrollFloat from "../ScrollFloat";

export function DashboardShowcase() {
	return (
		<section className="relative z-20 w-full bg-white px-8 py-16 sm:py-24 overflow-hidden">
			<div className="max-w-[1440px] mx-auto w-full">
				
				{/* Section Header */}
				<div className="flex flex-col items-center text-center mb-14">
					<motion.div
						initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
						whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
						style={{ willChange: "transform, opacity, filter" }}
						className="max-w-3xl"
					>
						<ScrollFloat
							as="h2"
							animationDuration={1}
							ease="power3.out"
							scrollStart="top bottom"
							scrollEnd="bottom center-=15%"
							stagger={0.012}
							containerClassName="text-center mb-4"
							textClassName="text-[1.8rem] sm:text-[2.5rem] lg:text-[2.8rem] font-normal text-gray-900 tracking-tight leading-[1.15]"
						>
							Uma experiência <span className="font-bold">completa</span> de<br className="hidden sm:inline" /> <span className="font-bold">gestão financeira</span>
						</ScrollFloat>
						<p className="text-gray-500 text-[15px] sm:text-[16.5px] font-normal leading-relaxed max-w-2xl mx-auto mt-4">
							Acesse relatórios avançados, concilie recebíveis e gerencie seu fluxo de caixa de ponta a ponta com uma interface desktop ágil, intuitiva e extremamente segura.
						</p>
					</motion.div>
				</div>

				{/* Desktop Mockup container */}
				<div className="relative max-w-5xl mx-auto px-2 sm:px-4">

					{/* Browser Mockup Wrapper */}
					<motion.div
						initial={{ opacity: 0, y: 60, filter: "blur(6px)", scale: 0.98 }}
						whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
						whileHover={{ y: -4, scale: 1.005 }}
						style={{ willChange: "transform, opacity, filter" }}
						className="relative z-20 w-full rounded-2xl sm:rounded-3xl border border-gray-200/60 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.12)] bg-white overflow-hidden flex flex-col"
					>
						{/* Browser Top Bar */}
						<div className="bg-gray-50 border-b border-gray-200/60 px-4 py-3 sm:py-3.5 flex items-center justify-between shrink-0 select-none">
							{/* Window dots */}
							<div className="flex gap-1.5 w-16">
								<span className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 transition-all cursor-pointer" />
								<span className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-90 transition-all cursor-pointer" />
								<span className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-90 transition-all cursor-pointer" />
							</div>
							
							{/* Search Bar URL */}
							<div className="flex-1 max-w-md bg-white border border-gray-200/50 rounded-lg py-1 px-3 flex items-center justify-center gap-1.5 shadow-xs">
								<svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
									<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
									<path d="M7 11V7a5 5 0 0 1 10 0v4" />
								</svg>
								<span className="text-[11px] sm:text-[12px] text-gray-400 font-medium tracking-tight">app.assetfinancas.com.br</span>
							</div>

							{/* Spacing alignment */}
							<div className="w-16 hidden sm:block" />
						</div>

						{/* Browser Content Frame displaying dash2.png */}
						<div className="bg-gray-50/30 p-2 sm:p-4 flex items-center justify-center relative group">
							<div className="relative w-full overflow-hidden rounded-lg border border-gray-100 shadow-sm bg-white aspect-[16/10] sm:aspect-[16/9.5]">
								<img 
									src="dash2.webp" 
									alt="Desktop Dashboard" 
									className="w-full h-full object-cover object-left-top select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
								/>
							</div>
						</div>
					</motion.div>

					{/* Glow backdrop effect */}
					<div className="absolute inset-0 bg-radial from-[#080c16]/3 via-transparent to-transparent blur-3xl z-0 pointer-events-none scale-110" />
				</div>
			</div>
		</section>
	);
}
