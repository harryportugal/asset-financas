import fs from 'fs';
import path from 'path';
import https from 'https';

const logos = [
	{ name: 'nubank', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Nu_logo.svg' },
	{ name: 'itau', url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Itau_Unibanco_logo_2023.svg' },
	{ name: 'bradesco', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Bradesco_logo.svg' },
	{ name: 'bancodobrasil', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Banco_do_Brasil_logo.svg' },
	{ name: 'caixa', url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Caixa_Econ%C3%B4mica_Federal_logo.svg' },
	{ name: 'santander', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Santander_Logotipo.svg' },
	{ name: 'mastercard', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg' },
	{ name: 'visa', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg' },
	{ name: 'elo', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Elo_card_association_logo_-_black_text.svg' },
	{ name: 'pix', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix.svg' }
];

const destDir = path.resolve('public/marcas');

if (!fs.existsSync(destDir)) {
	fs.mkdirSync(destDir, { recursive: true });
}

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function download(url, dest) {
	return new Promise((resolve, reject) => {
		const options = {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
			}
		};

		https.get(url, options, (res) => {
			if (res.statusCode === 301 || res.statusCode === 302) {
				// Follow redirects
				download(res.headers.location, dest).then(resolve).catch(reject);
				return;
			}

			if (res.statusCode !== 200) {
				reject(new Error(`Failed to get '${url}' (Status Code: ${res.statusCode})`));
				return;
			}

			const file = fs.createWriteStream(dest);
			res.pipe(file);
			file.on('finish', () => {
				file.close();
				resolve();
			});
		}).on('error', (err) => {
			fs.unlink(dest, () => {}); // Delete local file on error
			reject(err);
		});
	});
}

async function run() {
	console.log('Downloading logos...');
	for (let i = 0; i < logos.length; i++) {
		const logo = logos[i];
		const dest = path.join(destDir, `${logo.name}.svg`);
		
		// Rate limit prevention: delay 1.5 seconds between requests
		if (i > 0) {
			console.log(`Waiting 1.5s to prevent rate limiting...`);
			await delay(1500);
		}

		try {
			await download(logo.url, dest);
			console.log(`✓ Downloaded ${logo.name}.svg`);
		} catch (error) {
			console.error(`✗ Failed to download ${logo.name}:`, error.message);
		}
	}
	console.log('All downloads completed!');
}

run();
