import { motion } from "framer-motion";
import ScrollFloat from "../ScrollFloat";
import { 
	ArrowUpRight, 
	CreditCard, 
	TrendingUp, 
	Key, 
	ArrowDownLeft, 
	ArrowUpRight as ArrowUpRightIcon,
	Landmark, 
	Smartphone, 
	FileText, 
	Wallet, 
	GitPullRequest, 
	ShieldCheck, 
	FileStack, 
	Users 
} from "lucide-react";

export function DigitalAccountFeatures() {
	const digitalAccountItems = [
		{ name: "Pix", icon: Landmark },
		{ name: "Pagamentos", icon: Smartphone },
		{ name: "Cobrança", icon: FileText },
		{ name: "Saldos e Extratos", icon: Wallet },
		{ name: "Fluxo de Aprovação", icon: GitPullRequest },
		{ name: "Conta Escrow", icon: ShieldCheck },
		{ name: "Cobrança em\u00A0lote", icon: FileStack },
		{ name: "Gestão de usuários", icon: Users },
	];

	return (
		<section className="relative z-20 w-full bg-white px-8 py-16 sm:py-24 overflow-hidden">
			<div className="max-w-[1440px] mx-auto w-full">
				
				{/* Section Header */}
				<div className="flex flex-col items-center text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
						whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
						style={{ willChange: "transform, opacity, filter" }}
						className="max-w-3xl flex flex-col items-center"
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
							Tudo que você precisa de <br className="hidden sm:inline" /> <span className="font-bold">uma conta digital.</span>
						</ScrollFloat>
						
						<p className="text-gray-500 text-[15px] sm:text-[16.5px] font-normal leading-relaxed max-w-2xl mx-auto mt-4 mb-8">
							Uma infraestrutura completa de serviços financeiros e APIs de banking integrada de forma simples, escalável e 100% segura para o seu negócio.
						</p>

						{/* Mockup Button "FALE COM UM ESPECIALISTA" */}
						<a
							href="#contato"
							className="group inline-flex items-center gap-3.5 bg-black hover:bg-black/90 text-white rounded-full pl-6 pr-2.5 py-2.5 font-semibold text-[13px] tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md"
						>
							Falar com um especialista
							<div className="w-8 h-8 rounded-full bg-[#002b8a] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
								<ArrowUpRight className="size-4 stroke-[2.5]" />
							</div>
						</a>
					</motion.div>
				</div>

				{/* Cards Grid Container wrapped in gray bg matching other sections */}
				<div className="bg-gray-100 rounded-[36px] p-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						
						{/* Card 1: Conta Digital (Double-wide, md:col-span-2) */}
						<motion.div
							initial={{ opacity: 0, y: 40, filter: "blur(4px)", scale: 0.97 }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
							whileHover={{ y: -4, scale: 1.002, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.04)" }}
							style={{ willChange: "transform, opacity, filter" }}
							className="relative md:col-span-2 rounded-[28px] bg-white p-8 sm:p-10 flex flex-col lg:flex-row justify-between gap-8 group transition-all duration-300"
						>
							{/* Left Side: Info */}
							<div className="flex-1 flex flex-col justify-between items-start">
								<div>
									{/* CreditCard Icon Badge */}
									<div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#002b8a] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
										<CreditCard className="size-5 stroke-[2]" />
									</div>
									
									<h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 tracking-tight leading-snug mt-6 mb-3">
										Conta Digital Completa
									</h3>
									<p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed max-w-sm">
										Movimente recursos, realize conciliações e gerencie múltiplos serviços financeiros nativos com facilidade em um só ambiente.
									</p>
								</div>
							</div>

							{/* Right Side: Grid of 8 items */}
							<div className="flex-1 flex items-center">
								<div className="grid grid-cols-2 gap-2 sm:gap-3.5 w-full">
									{digitalAccountItems.map((item, idx) => {
										const itemVariants = {
											hidden: { opacity: 0, y: 15, scale: 0.96, filter: "blur(2px)" },
											visible: (i: number) => ({
												opacity: 1,
												y: 0,
												scale: 1,
												filter: "blur(0px)",
												transition: {
													delay: 0.15 + i * 0.05,
													duration: 0.6,
													ease: [0.16, 1, 0.3, 1] as const
												}
											})
										};
										return (
											<motion.div 
												key={idx} 
												custom={idx}
												initial="hidden"
												whileInView="visible"
												viewport={{ once: true, margin: "-80px" }}
												variants={itemVariants}
												whileHover={{ scale: 1.02, backgroundColor: "#f9f9fb" }}
												className="flex items-center gap-2 sm:gap-3 bg-gray-50/50 rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-gray-100/70 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
											>
												<div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#002b8a] shrink-0">
													<item.icon className="size-3.5 sm:size-4 stroke-[2.2]" />
												</div>
												<span className="text-[11px] sm:text-[13px] font-semibold text-gray-800 tracking-tight leading-tight">
													{item.name}
												</span>
											</motion.div>
										);
									})}
								</div>
							</div>
						</motion.div>

						{/* Card 2: Alta escalabilidade (Single-wide, md:col-span-1) */}
						<motion.div
							initial={{ opacity: 0, y: 40, filter: "blur(4px)", scale: 0.97 }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
							whileHover={{ y: -4, scale: 1.002, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.04)" }}
							style={{ willChange: "transform, opacity, filter" }}
							className="rounded-[28px] bg-white p-8 sm:p-10 flex flex-col justify-between group transition-all duration-300"
						>
							<div>
								{/* Trending Up Icon Badge */}
								<div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#002b8a] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
									<TrendingUp className="size-5 stroke-[2]" />
								</div>
								
								<h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 tracking-tight leading-snug mt-6 mb-3">
									Alta escalabilidade
								</h3>
								<p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
									Escalabilidade e performance excepcionais no processamento de pagamentos instantâneos sob qualquer volume de transações.
								</p>
							</div>
						</motion.div>

						{/* Card 3: Gestão de chaves (Single-wide, md:col-span-1) */}
						<motion.div
							initial={{ opacity: 0, y: 40, filter: "blur(4px)", scale: 0.97 }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
							whileHover={{ y: -4, scale: 1.002, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.04)" }}
							style={{ willChange: "transform, opacity, filter" }}
							className="rounded-[28px] bg-white p-8 sm:p-10 flex flex-col justify-between group transition-all duration-300"
						>
							<div>
								{/* Key Icon Badge */}
								<div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#002b8a] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
									<Key className="size-5 stroke-[2]" />
								</div>
								
								<h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 tracking-tight leading-snug mt-6 mb-3">
									Gestão de chaves
								</h3>
								<p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
									Controle total sobre a criação, cancelamento, verificação e portabilidade de chaves Pix de forma automatizada via API.
								</p>
							</div>
						</motion.div>

						{/* Card 4: Cash-in (Single-wide, md:col-span-1) */}
						<motion.div
							initial={{ opacity: 0, y: 40, filter: "blur(4px)", scale: 0.97 }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
							whileHover={{ y: -4, scale: 1.002, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.04)" }}
							style={{ willChange: "transform, opacity, filter" }}
							className="rounded-[28px] bg-white p-8 sm:p-10 flex flex-col justify-between group transition-all duration-300"
						>
							<div>
								{/* Cash-in Icon Badge */}
								<div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#002b8a] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
									<ArrowDownLeft className="size-5 stroke-[2.5]" />
								</div>
								
								<h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 tracking-tight leading-snug mt-6 mb-3">
									Cash-in
								</h3>
								<p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
									Fluxos de entrada simplificados para receber dinheiro na sua conta corporativa com rapidez, webhook instantâneo e total segurança.
								</p>
							</div>
						</motion.div>

						{/* Card 5: Cash-out (Single-wide, md:col-span-1) */}
						<motion.div
							initial={{ opacity: 0, y: 40, filter: "blur(4px)", scale: 0.97 }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
							whileHover={{ y: -4, scale: 1.002, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.04)" }}
							style={{ willChange: "transform, opacity, filter" }}
							className="rounded-[28px] bg-white p-8 sm:p-10 flex flex-col justify-between group transition-all duration-300"
						>
							<div>
								{/* Cash-out Icon Badge */}
								<div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#002b8a] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
									<ArrowUpRightIcon className="size-5 stroke-[2.5]" />
								</div>
								
								<h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 tracking-tight leading-snug mt-6 mb-3">
									Cash-out
								</h3>
								<p className="text-gray-500 text-[14px] sm:text-[14.5px] leading-relaxed">
									Saque instantâneo e liquidação imediata para transferir valores via APIs flexíveis, com segurança jurídica e controle total.
								</p>
							</div>
						</motion.div>

					</div>
				</div>
			</div>
		</section>
	);
}
