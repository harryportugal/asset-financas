# Manual Técnico de Deploy — Asset Landing Page

Este documento serve como manual executivo de deploy e entrega do código fonte da Landing Page da Asset.

## 📋 Informações Gerais
* **Framework**: React 19 + TypeScript
* **Ferramenta de Build**: Vite 8
* **Estilização**: Tailwind CSS v4

---

## 🛠️ Pré-requisitos
Antes de iniciar, certifique-se de ter instalado em seu ambiente:
1. **Node.js** (Versão 18.0.0 ou superior recomendada)
2. **Gerenciador de Pacotes**: `npm` (incluso por padrão com o Node.js)

---

## 🚀 Passo a Passo para Execução Local e Deploy

### Passo 1: Instalação de Dependências
Navegue até a raiz do projeto no terminal e execute o comando abaixo para instalar todas as bibliotecas necessárias:
```bash
npm install
```

### Passo 2: Configuração das Variáveis de Ambiente
O projeto é uma aplicação estática (SPA) e, no momento, não necessita obrigatoriamente de variáveis de ambiente ativas. Caso precise adicionar integrações futuras (APIs, Analytics, etc.), siga estes passos:
1. Copie o arquivo `.env.example` criando um novo arquivo chamado `.env`:
   ```bash
   cp .env.example .env
   ```
2. Abra o arquivo `.env` e preencha as variáveis necessárias. Lembre-se de que todas as variáveis que serão expostas ao frontend no Vite precisam ter o prefixo `VITE_` (ex: `VITE_API_URL=valor`).

### Passo 3: Executar o Projeto em Desenvolvimento
Para rodar o site localmente com suporte a *Hot Module Replacement* (HMR):
```bash
npm run dev
```
O console exibirá o endereço local (geralmente `http://localhost:5173/`). Abra-o no navegador para visualizar e testar o projeto.

### Passo 4: Realizar o Build de Produção
Para compilar e minificar o código para distribuição em produção, execute:
```bash
npm run build
```
Esse comando gera uma pasta chamada `/dist` na raiz do projeto. Esta pasta contém todos os arquivos estáticos compilados (HTML, JS, CSS, imagens) prontos para serem servidos por qualquer servidor web (como NGINX, Apache, AWS S3, etc.).

---

## ☁️ Opções Recomendadas de Deploy em Nuvem

### Opção 1: Vercel (Recomendada pela facilidade)
Como o projeto é estático e super leve, a hospedagem na Vercel é gratuita e extremamente simples:
1. Acesse o painel da **[Vercel](https://vercel.com/)** e faça login.
2. Clique em **Add New...** > **Project**.
3. Importe o repositório Git do projeto.
4. A Vercel detectará automaticamente a configuração do **Vite** e definirá os comandos de build (`npm run build`) e diretório de saída (`dist`).
5. Clique em **Deploy**. O site estará no ar em poucos segundos com SSL automático.

### Opção 2: Cloudflare Pages / Netlify
Similar à Vercel:
* **Framework Preset**: `Vite` ou `Create React App`
* **Build Command**: `npm run build`
* **Publish Directory**: `dist`
