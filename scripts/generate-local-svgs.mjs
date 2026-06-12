import fs from 'fs';
import path from 'path';
import { svgBanco } from '../node_modules/@edusites/bancos-brasil/src/core.js';

const destDir = path.resolve('public/marcas');

if (!fs.existsSync(destDir)) {
	fs.mkdirSync(destDir, { recursive: true });
}

// Custom vector SVGs for card networks and Pix
const customLogos = {
	mastercard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" fill="none">
		<path d="M7.7 15.6c-4.2 0-7.7-3.4-7.7-7.6S3.4.4 7.7.4c2.5 0 4.7 1.2 6.1 3 1.4-1.8 3.6-3 6.1-3 4.2 0 7.7 3.4 7.7 7.6s-3.4 7.6-7.7 7.6c-2.5 0-4.7-1.2-6.1-3-1.4 1.8-3.6 3-6.1 3z" fill="currentColor"/>
	</svg>`,
	visa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 8" fill="none">
		<path d="M3.7 8L6 1h2.2L6 8H3.7zm7.6 0l-1.3-4.6c-.2-.7-.4-.9-1-.9H6.8V2.1h3.4c.5 0 1 .3 1.1.9L12.5 8h-1.2zm5.7-4.1c0-1.2-1.7-1.3-1.7-1.8 0-.2.2-.4.7-.4.9-.1 1.7.3 1.7.3l.3-1.4s-.8-.3-1.7-.3c-1.8 0-3 1-3 2.3 0 1.9 2.6 2 2.6 3.1 0 .3-.3.5-.9.5-1.2 0-2-.4-2-.4l-.3 1.5s1 .4 2.1.4c1.8 0 3-1 3-2.3zM23.2 1h-1.7c-.5 0-.8.3-.9.7l-3.2 6.3H19l.5-1.3h2.6l.3 1.3h1.3L23.2 1zm-1.8 4.6l.7-2 .4 2h-1.1z" fill="currentColor"/>
	</svg>`,
	elo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 10" fill="none">
		<path d="M3.6 8.3L1.1 4.5l2.5-3.8H.1v7.6h3.5zm7.3 0l-2-6.1h-2v6.1h1.5V3.8l1.7 4.5h1.6V3.8l1.7 4.5h1.5V2.2h-2l-2 6.1zm8-4.8c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4zm0-1.3c1.5 0 2.7 1.2 2.7 2.7S20.4 9 18.9 9s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7z" fill="currentColor"/>
	</svg>`,
	pix: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
		<path d="M12 2a.6.6 0 0 1 .4.2l9.2 9.2a.6.6 0 0 1 0 .8l-9.2 9.2a.6.6 0 0 1-.8 0l-9.2-9.2a.6.6 0 0 1 0-.8L11.6 2.2a.6.6 0 0 1 .4-.2zM12 4.4L4.4 12l7.6 7.6 7.6-7.6L12 4.4zm.5 4.8v2.3h2.3v1h-2.3v2.3h-1v-2.3H9.2v-1h2.3V9.2h1z" fill="currentColor"/>
	</svg>`
};

const banks = [
	{ name: 'nubank', presetName: 'nubank' },
	{ name: 'itau', presetName: 'itau' },
	{ name: 'bradesco', presetName: 'bradesco' },
	{ name: 'bancodobrasil', presetName: 'bancodobrasil' },
	{ name: 'caixa', presetName: 'caixa' },
	{ name: 'santander', presetName: 'santander' }
];

async function run() {
	console.log('Generating local SVG assets...');

	// 1. Generate bank SVGs from package
	for (const bank of banks) {
		const dest = path.join(destDir, `${bank.name}.svg`);
		try {
			// Generate without background/border ('sem')
			const svgContent = svgBanco({
				nome: bank.presetName,
				formato: 'sem',
				tamanho: 108,
				cor: 'currentColor'
			});

			if (svgContent) {
				fs.writeFileSync(dest, svgContent);
				console.log(`✓ Generated ${bank.name}.svg`);
			} else {
				console.error(`✗ Failed to generate SVG for ${bank.name}`);
			}
		} catch (error) {
			console.error(`✗ Error generating ${bank.name}:`, error.message);
		}
	}

	// 2. Write custom SVGs
	for (const [name, content] of Object.entries(customLogos)) {
		const dest = path.join(destDir, `${name}.svg`);
		try {
			fs.writeFileSync(dest, content);
			console.log(`✓ Generated custom ${name}.svg`);
		} catch (error) {
			console.error(`✗ Failed to write custom ${name}:`, error.message);
		}
	}

	console.log('All local SVG assets generated successfully!');
}

run();
