import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";


interface FAQItem {
	question: string;
	answer: string;
}

const faqData: FAQItem[] = [
	{
		question: "O que é Banking as a Service (BaaS) e como ele ajuda meu negócio?",
		answer: "O Banking as a Service (BaaS) permite que qualquer empresa (como SaaS, ERPs e marketplaces) integre serviços bancários de forma simples via API. Isso cria novas fontes de receita e aumenta a fidelização de clientes sem que sua empresa precise se preocupar com licenças bancárias.",
	},
	{
		question: "A Asset Pagamentos é regulada pelo Banco Central?",
		answer: "Sim, atuamos em total conformidade com as regulamentações do Banco Central do Brasil. Operamos como correspondente bancário e adotamos rígidos procedimentos de KYC (Know Your Customer), prevenção de fraudes e proteção de dados em conformidade com a LGPD, garantindo segurança jurídica total.",
	},
	{
		question: "Qual o tempo médio de integração das APIs da Asset?",
		answer: "Nossas APIs RESTful foram desenvolvidas com foco na experiência do desenvolvedor. Com a nossa documentação rica, SDKs modernos e ambiente de sandbox completo para testes, a integração pode ser concluída em poucos dias por qualquer equipe técnica.",
	},
	{
		question: "Quais meios de pagamento são suportados pela plataforma?",
		answer: "Suportamos as principais formas de pagamento nacionais: Pix (com confirmação e liquidação em milissegundos e QR Code estático ou dinâmico) e boletos registrados (com liquidação rápida).",
	},
];

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 w-full pt-4">
			{/* Left Column - Heading */}
			<motion.div 
				initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
				whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
				style={{ willChange: "transform, opacity" }}
				className="flex flex-col justify-start md:sticky md:top-24 h-fit"
			>
				<h2 className="text-[2.0rem] sm:text-[2.3rem] font-bold text-gray-900 tracking-tight leading-tight">
					Perguntas Frequentes
				</h2>
				
				{/* Double underline decoration matching the user's layout image */}
				<div className="mt-4 space-y-1.5 max-w-[140px]">
					<div className="h-[2px] bg-gray-300 w-full" />
					<div className="h-[1px] bg-gray-200 w-[65%]" />
				</div>
				
				<p className="text-gray-800 text-[13.5px] sm:text-[14px] mt-6 leading-relaxed max-w-sm">
					Tire suas principais dúvidas sobre nossa plataforma de pagamentos, split de comissões e infraestrutura de Banking as a Service (BaaS).
				</p>
			</motion.div>

			{/* Right Column - Accordion Items */}
			<div className="space-y-3">
				{faqData.map((item, index) => {
					const isOpen = openIndex === index;
					return (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{
								duration: 0.6,
								delay: index * 0.06,
								ease: [0.16, 1, 0.3, 1]
							}}
							style={{ willChange: "transform, opacity" }}
							className={cn(
								"group overflow-hidden rounded-[18px] transition-all duration-300 cursor-pointer select-none",
								isOpen
									? "bg-white border border-gray-200/50 shadow-sm"
									: "bg-[#f3f4f6]/70 border border-transparent hover:bg-white hover:border-gray-200/50 hover:shadow-xs"
							)}
							onClick={() => toggleItem(index)}
						>
							{/* Header row containing Question and Left + / - indicator */}
							<div className="flex items-center p-5 pl-6 pr-6">
								{/* Left Indicator (+ / -) */}
								<div className="flex items-center justify-center mr-4 text-gray-900 shrink-0 w-5 h-5">
									{isOpen ? (
										<Minus className="size-[15px] stroke-[3.5]" />
									) : (
										<Plus className="size-[15px] stroke-[3.5]" />
									)}
								</div>
								
								<h3
									className={cn(
										"text-[14.5px] sm:text-[15.5px] font-bold text-gray-900 tracking-tight transition-colors duration-200",
										isOpen && "text-[#002b8a]"
									)}
								>
									{item.question}
								</h3>
							</div>

							{/* Answer row with smooth grid height animation */}
							<div
								className={cn(
									"grid transition-all duration-300 ease-in-out px-6 pl-14",
									isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0 pb-0"
								)}
							>
								<div className="overflow-hidden">
									<div className="text-gray-800 text-[13.5px] sm:text-[14px] leading-relaxed max-w-2xl pt-2 border-t border-gray-100/80">
										{item.answer}
									</div>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
