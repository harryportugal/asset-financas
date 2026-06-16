import { motion } from "framer-motion";
import { ArrowRight, Wallet, Users, BarChart3 } from "lucide-react";

export function DashboardSection() {
	return (
		<section className="relative z-20 w-full bg-white px-8 py-12 sm:py-16">
			<div className="max-w-[1440px] mx-auto w-full">
				
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 w-full">
					<motion.div
						initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
						whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
						style={{ willChange: "transform, opacity, filter" }}
						className="max-w-2xl"
					>
						<h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] font-normal text-gray-900 tracking-tight leading-[1.15] mb-4">
							Gestão completa em um só <span className="font-bold">Dashboard</span>
						</h2>
						<p className="text-gray-500 text-[14px] sm:text-[15.5px] font-normal leading-relaxed">
							Monitore suas transações, acompanhe o fluxo de caixa e tome decisões inteligentes em tempo real com a nossa interface desktop otimizada.
						</p>
					</motion.div>

					{/* View Demo Pill Button on the Right */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
						whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
						style={{ willChange: "transform, scale, opacity, filter" }}
						className="shrink-0"
					>
						<a
							href="#demo"
							className="inline-flex items-center gap-2 bg-black hover:bg-black/80 text-white rounded-full px-5 py-2.5 font-semibold text-[13px] tracking-wider uppercase transition-all duration-200 cursor-pointer"
						>
							Experimentar
							<ArrowRight className="size-4" />
						</a>
					</motion.div>
				</div>

				{/* 3-Column Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					
					{/* Card 1: Analytics / Fluxo de Caixa */}
					<DashboardCard
						index={0}
						title="Visão Geral & Fluxo de Caixa"
						description="Acompanhe receitas, despesas e saldo projetado em tempo real com gráficos intuitivos."
						mockup={<MockupAnalytics />}
					/>

					{/* Card 2: Conciliação / Vendas Pix */}
					<DashboardCard
						index={1}
						title="Conciliação & Vendas Pix"
						description="Monitore transações instantâneas e faça conciliação de recebíveis Pix de forma automatizada."
						mockup={<MockupTransactions />}
					/>

					{/* Card 3: Segurança / Alçadas */}
					<DashboardCard
						index={2}
						title="Aprovações & Controle de Acesso"
						description="Defina alçadas de decisão personalizadas e aprove pagamentos em lote com total segurança."
						mockup={<MockupSecurity />}
					/>

				</div>
			</div>
		</section>
	);
}

function DashboardCard({
	title,
	description,
	mockup,
	index,
}: {
	title: string;
	description: string;
	mockup: React.ReactNode;
	index: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{
				duration: 0.8,
				delay: index * 0.12,
				ease: [0.16, 1, 0.3, 1],
			}}
			style={{ willChange: "transform, opacity, filter" }}
			className="relative w-full h-[400px] rounded-[28px] overflow-hidden border border-gray-200/50 bg-[#f9f9fb] group select-none flex flex-col justify-between"
		>
			{/* Simulated Dashboard content behind */}
			<div className="absolute inset-x-0 top-0 h-[80%] overflow-hidden p-4">
				{mockup}
			</div>

			{/* Gradual backdrop blur and light glassmorphism overlay */}
			<div 
				className="absolute inset-x-0 bottom-0 h-[35%] backdrop-blur-[12px] bg-white/40 border-t border-gray-200/50 z-10 pointer-events-none"
			/>

			{/* Card Text Footer */}
			<div className="relative z-20 mt-auto p-6 flex flex-col gap-1.5">
				<h3 className="text-gray-900 text-[18px] sm:text-[20px] font-bold leading-snug tracking-tight">
					{title}
				</h3>
				<p className="text-gray-500 text-[13px] sm:text-[14px] leading-relaxed">
					{description}
				</p>
			</div>
		</motion.div>
	);
}

// Browser Window Mockup Frame Utility
function BrowserFrame({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-full bg-white rounded-xl border border-gray-200/60 shadow-xs flex flex-col overflow-hidden">
			{/* Titlebar */}
			<div className="bg-gray-50 border-b border-gray-200/60 px-3 py-2 flex items-center justify-between shrink-0">
				<div className="flex gap-1.5">
					<span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
					<span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
					<span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
				</div>
				<div className="w-24 h-3 rounded-full bg-gray-100/80 mx-auto" />
			</div>
			{/* Content */}
			<div className="flex-1 p-3 bg-gray-50/50 flex gap-2 overflow-hidden">
				{children}
			</div>
		</div>
	);
}

// Card 1 Mockup: Area chart + Stats
function MockupAnalytics() {
	return (
		<BrowserFrame>
			{/* Left Sidebar */}
			<div className="w-10 bg-white border border-gray-200/50 rounded-lg flex flex-col items-center gap-3 py-3 shrink-0">
				<div className="w-5 h-5 rounded-full bg-[#002b8a]/10 flex items-center justify-center">
					<BarChart3 className="size-3 text-[#002b8a]" />
				</div>
				<div className="w-4 h-1.5 rounded-sm bg-gray-100" />
				<div className="w-4 h-1.5 rounded-sm bg-gray-100" />
			</div>
			
			{/* Chart Area */}
			<div className="flex-1 bg-white border border-gray-200/50 rounded-lg p-2.5 flex flex-col justify-between overflow-hidden">
				<div className="flex justify-between items-center mb-1">
					<div className="space-y-0.5">
						<span className="text-[7px] text-gray-400 font-bold uppercase tracking-wider block">Receita</span>
						<span className="text-[11px] font-bold text-gray-800">R$ 45.230,00</span>
					</div>
					<span className="text-[7px] font-bold text-[#002b8a] bg-blue-50 px-1 py-0.5 rounded-sm">+12%</span>
				</div>
				
				{/* Chart SVG */}
				<svg className="w-full h-16 text-[#002b8a]" viewBox="0 0 100 40" fill="none">
					<defs>
						<linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#002b8a" stopOpacity="0.2" />
							<stop offset="100%" stopColor="#002b8a" stopOpacity="0.0" />
						</linearGradient>
					</defs>
					<path 
						d="M0 35 C 10 32, 20 15, 30 22 C 40 29, 50 8, 60 12 C 70 16, 80 2, 90 8 C 95 11, 100 5, 100 5" 
						stroke="currentColor" 
						strokeWidth="1.5" 
						strokeLinecap="round"
					/>
					<path 
						d="M0 35 C 10 32, 20 15, 30 22 C 40 29, 50 8, 60 12 C 70 16, 80 2, 90 8 C 95 11, 100 5, 100 5 L 100 40 L 0 40 Z" 
						fill="url(#chartGrad)"
					/>
				</svg>
			</div>
		</BrowserFrame>
	);
}

// Card 2 Mockup: Transaction List Rows
function MockupTransactions() {
	return (
		<BrowserFrame>
			<div className="flex-1 bg-white border border-gray-200/50 rounded-lg p-2.5 flex flex-col gap-2 overflow-hidden">
				<div className="flex justify-between items-center pb-1 border-b border-gray-100">
					<span className="text-[9px] font-bold text-gray-800">Vendas Recentes</span>
					<span className="text-[7px] text-gray-400 font-semibold">Pix Ativo</span>
				</div>
				
				<div className="flex flex-col gap-1.5 flex-1 justify-center">
					{[
						{ desc: "Checkout Pix", status: "Confirmado", val: "+R$150" },
						{ desc: "Boleto Emitido", status: "Pendente", val: "R$89" },
						{ desc: "Transferência TED", status: "Confirmado", val: "+R$1.200" }
					].map((item, idx) => (
						<div key={idx} className="flex justify-between items-center text-[8px] bg-gray-50/50 p-1.5 rounded-md border border-gray-100">
							<div className="flex items-center gap-1.5">
								<div className="w-4 h-4 rounded-full bg-[#002b8a]/10 flex items-center justify-center shrink-0">
									<Wallet className="size-2 text-[#002b8a]" />
								</div>
								<div className="flex flex-col">
									<span className="font-bold text-gray-800 leading-tight">{item.desc}</span>
									<span className="text-[6px] text-gray-400 font-medium">{item.status}</span>
								</div>
							</div>
							<span className="font-bold text-gray-800">{item.val}</span>
						</div>
					))}
				</div>
			</div>
		</BrowserFrame>
	);
}

// Card 3 Mockup: User roles / Permissions grid
function MockupSecurity() {
	return (
		<BrowserFrame>
			{/* Left navigation bar */}
			<div className="w-10 bg-white border border-gray-200/50 rounded-lg flex flex-col items-center gap-3 py-3 shrink-0">
				<div className="w-5 h-5 rounded-full bg-[#002b8a]/10 flex items-center justify-center">
					<Users className="size-3 text-[#002b8a]" />
				</div>
				<div className="w-4 h-1.5 rounded-sm bg-gray-100" />
			</div>
			
			<div className="flex-1 bg-white border border-gray-200/50 rounded-lg p-2.5 flex flex-col gap-2 overflow-hidden justify-between">
				<div className="space-y-0.5">
					<span className="text-[9px] font-bold text-gray-800 block">Alçadas de Decisão</span>
					<span className="text-[6px] text-gray-400 block font-medium">Controle de permissões</span>
				</div>
				
				<div className="flex flex-col gap-1.5">
					{[
						{ role: "Diretor", perm: "Aprovação Ilimitada" },
						{ role: "Gerente", perm: "Até R$ 50.000,00" },
						{ role: "Operador", perm: "Apenas Agendamento" }
					].map((item, idx) => (
						<div key={idx} className="flex justify-between items-center text-[7.5px] border-b border-gray-50 pb-1">
							<span className="font-bold text-gray-700">{item.role}</span>
							<span className="text-gray-500 font-semibold bg-gray-50 border border-gray-200/50 px-1 py-0.5 rounded-sm">{item.perm}</span>
						</div>
					))}
				</div>
			</div>
		</BrowserFrame>
	);
}
