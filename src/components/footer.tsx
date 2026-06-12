import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
	{
		name: "Facebook",
		href: "#facebook",
		icon: (
			<svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
				<path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1h-4c-2.8 0-5 2.2-5 5v2z"/>
			</svg>
		)
	},
	{
		name: "Instagram",
		href: "#instagram",
		icon: (
			<svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
				<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
			</svg>
		)
	},
	{
		name: "LinkedIn",
		href: "#linkedin",
		icon: (
			<svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
				<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
			</svg>
		)
	},
	{
		name: "YouTube",
		href: "#youtube",
		icon: (
			<svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
				<path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
			</svg>
		)
	}
];

const cardParentVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.7,
			ease: [0.16, 1, 0.3, 1] as const,
			when: "beforeChildren",
			staggerChildren: 0.12,
		}
	}
};

const childParentVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		}
	}
};

const childVariants = {
	hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.85,
			ease: [0.16, 1, 0.3, 1] as const
		}
	}
};



export function Footer() {
	return (
		<div className="relative z-20 w-full bg-[#efefed] pt-4 -mt-px select-none overflow-hidden">
			<div className="max-w-[1480px] mx-auto flex flex-col gap-6 w-full px-8">
				{/* ─── CTA Card ─── */}
				<motion.div 
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={cardParentVariants}
					className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0c40c0] via-[#0d55e0] to-[#1475ff] px-8 py-16 sm:px-12 sm:py-20 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-8"
				>
					{/* Background Image */}
					<img 
						src="/celular cta.webp" 
						alt="CTA Background" 
						className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
					/>
					
					{/* Subtle abstract glow/mesh pattern for premium look */}
					<div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_50%)] pointer-events-none" />
					
					{/* Left content area */}
					<div className="relative flex-1 z-10 max-w-2xl">
						{/* Social Proof Badges */}
						<div className="flex items-center gap-2.5 mb-6 select-none">
							<div className="flex -space-x-1.5">
								<img
									className="size-7 rounded-full border-2 border-[#002b8a] object-cover"
									src="/avatar-1.webp"
									alt="Cliente 1"
								/>
								<img
									className="size-7 rounded-full border-2 border-[#002b8a] object-cover"
									src="/avatar-2.webp"
									alt="Cliente 2"
								/>
								<img
									className="size-7 rounded-full border-2 border-[#002b8a] object-cover"
									src="/avatar-3.webp"
									alt="Cliente 3"
								/>
								<img
									className="size-7 rounded-full border-2 border-[#002b8a] object-cover"
									src="/avatar-4.webp"
									alt="Cliente 4"
								/>
							</div>
							<span className="text-white/95 text-[12.5px] font-semibold tracking-tight">
								Mais de 10.000 transações diárias
							</span>
						</div>

						{/* Headline */}
						<h2 className="text-[2.2rem] sm:text-[3.2rem] font-normal text-white tracking-tight leading-[1.1] mb-5">
							Pronto para <span className="font-bold">escalar</span> a sua <span className="font-bold">operação financeira</span>?
						</h2>

						{/* Subtext */}
						<p className="text-white text-[14px] sm:text-[15.5px] leading-relaxed font-normal">
							Fale com um de nossos especialistas e saiba como integrar Pix, boletos, cartões e contas digitais diretamente no seu produto ou plataforma.
						</p>
					</div>

					{/* Right CTA Button */}
					<div className="relative z-10 shrink-0">
						<a
							href="#contato"
							className="inline-flex items-center gap-3 bg-white text-[#002b8a] hover:bg-gray-50 active:scale-98 transition-all duration-200 rounded-full py-3.5 pl-6 pr-4 font-bold text-[14px] tracking-wider uppercase shadow-sm group"
						>
							Começar Agora
							<div className="size-8 rounded-full bg-[#002b8a] text-white flex items-center justify-center transition-transform duration-200 group-hover:rotate-45">
								<ArrowUpRight className="size-4 stroke-[2.5]" />
							</div>
						</a>
					</div>
				</motion.div>



				{/* ─── Footer Card Deck ─── */}
				<div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 text-gray-900">
					{/* Left Card (Blue Gradient) */}
					<motion.div 
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={cardParentVariants}
						className="relative w-full lg:w-[32%] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0c40c0] via-[#0d55e0] to-[#1475ff] px-8 py-10 md:p-12 shadow-lg flex flex-col justify-between min-h-[460px] text-white"
					>
						{/* Subtle mesh/glow pattern */}
						<div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />
						
						{/* Top content: Logo */}
						<motion.div variants={childParentVariants} className="relative z-10">
							<img 
								src="/logo%20asset.png" 
								alt="Asset Logo" 
								className="w-24 h-24 object-contain select-none pointer-events-none invert brightness-0"
							/>
						</motion.div>

						{/* Middle content: Tagline & Socials */}
						<div className="relative z-10 mt-auto flex flex-col gap-8">
							<motion.h3 variants={childVariants} className="text-[26px] sm:text-[30px] font-normal leading-[1.2] tracking-tight text-white max-w-[280px]">
								Sua operação financeira inteligente, <span className="font-semibold text-white/90">powered by Asset.</span>
							</motion.h3>

							<motion.div variants={childParentVariants} className="flex flex-col gap-3">
								<span className="text-[11px] uppercase tracking-widest text-white/60 font-bold select-none">Baixe o nosso App</span>
								<div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
									<a 
										href="https://apps.apple.com/br/app/asset-finance/id6761480957" 
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-3 bg-black/20 hover:bg-black/30 border border-white/10 active:scale-98 transition-all duration-200 rounded-xl px-4 py-2.5 text-white"
									>
										<svg className="w-5.5 h-5.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
											<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.51 12.09 1.007 1.452 2.207 3.085 3.783 3.024 1.52-.06 2.09-.983 3.93-.983 1.83 0 2.36.983 3.953.953 1.62-.027 2.673-1.479 3.666-2.923 1.152-1.678 1.623-3.303 1.652-3.393-.036-.015-3.172-1.2-3.204-4.79-.025-2.998 2.463-4.437 2.583-4.512-1.41-2.065-3.585-2.29-4.348-2.336-1.99-.163-3.5 1.012-4.154 1.012zM15.47 3.197c.84-1.02 1.408-2.44 1.253-3.197-.7.03-2.164.47-2.986 1.432-.69.79-1.294 2.23-1.127 3.196.79.06 2.15-.36 2.86-1.43z"/>
										</svg>
										<div className="flex flex-col text-left">
											<span className="text-[8px] uppercase tracking-widest text-white/60 font-semibold leading-none">Baixar na</span>
											<span className="text-[13px] font-bold text-white leading-tight mt-0.5">App Store</span>
										</div>
									</a>
									<a 
										href="https://play.google.com/store/apps/details?id=finance.onz.asset" 
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-3 bg-black/20 hover:bg-black/30 border border-white/10 active:scale-98 transition-all duration-200 rounded-xl px-4 py-2.5 text-white"
									>
										<svg className="w-5.5 h-5.5 fill-current text-white shrink-0" viewBox="0 0 16 16">
											<path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
										</svg>
										<div className="flex flex-col text-left">
											<span className="text-[8px] uppercase tracking-widest text-white/60 font-semibold leading-none">Disponível no</span>
											<span className="text-[13px] font-bold text-white leading-tight mt-0.5">Google Play</span>
										</div>
									</a>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Right Card (Off-White) */}
					<motion.div 
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={cardParentVariants}
						className="relative w-full lg:w-[68%] rounded-[32px] bg-white border border-gray-200/50 p-8 md:p-12 shadow-lg flex flex-col justify-between min-h-[460px] overflow-visible"
					>
						{/* Floating tilted 3D App Icon */}
						<div className="absolute -top-12 right-6 lg:right-12 z-30 flex flex-col items-center select-none">
							<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#0c40c0] to-[#1475ff] shadow-[0_20px_40px_rgba(12,64,192,0.3)] flex items-center justify-center transform rotate-[10deg] border-[3px] border-white transition-all duration-300 hover:rotate-[6deg] hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(12,64,192,0.4)] pointer-events-auto">
								<img 
									src="/logo%20asset.png" 
									alt="Asset Icon" 
									className="w-10 h-10 sm:w-12 sm:h-12 object-contain invert brightness-0"
								/>
							</div>
						</div>

						{/* Top: Columns */}
						<div className="relative z-10 flex flex-col sm:flex-row gap-12 sm:gap-24 w-full">
							{/* Navigation Column */}
							<motion.div variants={childParentVariants} className="flex flex-col gap-4">
								<h4 className="text-[12px] uppercase tracking-wider text-gray-400 font-bold select-none">Navegação</h4>
								<div className="flex flex-col gap-2.5">
									{[
										{ label: "Como Funciona", href: "#infraestrutura" },
										{ label: "Funcionalidades", href: "#solucoes" },
										{ label: "Soluções", href: "#pagamentos" },
										{ label: "Depoimentos", href: "#recursos" },
										{ label: "FAQ", href: "#faq" }
									].map((link) => (
										<a 
											key={link.label}
											href={link.href}
											className="text-[14px] font-semibold text-gray-800 hover:text-black transition-colors duration-200"
										>
											{link.label}
										</a>
									))}
								</div>
							</motion.div>

							{/* Company Column */}
							<motion.div variants={childParentVariants} className="flex flex-col gap-4">
								<h4 className="text-[12px] uppercase tracking-wider text-gray-400 font-bold select-none">Institucional</h4>
								<div className="flex flex-col gap-2.5">
									{[
										{ label: "Blog", href: "#blog" },
										{ label: "Sobre Nós", href: "#sobre" },
										{ label: "Termos e Condições", href: "#termos" },
										{ label: "Política de Privacidade", href: "#privacidade" }
									].map((link) => (
										<a 
											key={link.label}
											href={link.href}
											className="text-[14px] font-semibold text-gray-800 hover:text-black transition-colors duration-200"
										>
											{link.label}
										</a>
									))}
								</div>
							</motion.div>

							{/* Contact & Social Column */}
							<motion.div variants={childParentVariants} className="flex flex-col gap-5 sm:ml-auto pr-8">
								<div className="flex flex-col gap-2">
									<h4 className="text-[12px] uppercase tracking-wider text-gray-400 font-bold select-none">Fale Conosco</h4>
									<a href="mailto:contato@assetfinance.com.br" className="text-[14.5px] font-bold text-gray-800 hover:text-black transition-colors duration-200">
										contato@assetfinance.com.br
									</a>
									<span className="text-[13.5px] text-gray-500 font-medium">
										São Paulo, SP — Brasil
									</span>
								</div>

								<div className="flex flex-col gap-3">
									<h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-bold select-none">Redes Sociais</h4>
									<div className="flex gap-2">
										{socialLinks.map((social) => (
											<a 
												key={social.name}
												href={social.href}
												className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/60 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-black"
												aria-label={social.name}
											>
												{social.icon}
											</a>
										))}
									</div>
								</div>
							</motion.div>
						</div>

						{/* Bottom Area */}
						<div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-12 md:mt-auto">
							{/* Copyright (Bottom-Left) */}
							<motion.div variants={childVariants} className="text-gray-400 text-[12px] font-medium">
								&copy; {new Date().getFullYear()} Asset. Todos os direitos reservados.
							</motion.div>

							{/* Security Badge (Bottom-Right) */}
							<motion.div variants={childVariants} className="text-gray-400 text-[12px] font-medium md:text-right max-w-[280px] leading-relaxed">
								Seguimos o padrão PCI-DSS, garantindo mais segurança nas suas transações.
							</motion.div>
						</div>
					</motion.div>
				</div>

			</div>
			{/* Espaço no final com a marca "asset" gigante, sem divisão, no mesmo fundo */}
			<div className="relative w-full flex items-end justify-center select-none pointer-events-none overflow-hidden h-[18vw] mt-12">
				<span className="text-[38vw] font-extrabold tracking-tight text-black/[0.12] leading-none select-none translate-y-[35%] font-sans">
					Asset
				</span>
			</div>
		</div>
	);
}
