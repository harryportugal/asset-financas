# Instruções de Deploy - Asset Finanças

Este guia técnico foi elaborado para orientar o deploy e a execução do projeto **Asset Finanças** no ambiente local ou de produção.

> [!NOTE]
> **Nota de Arquitetura**: Embora o escopo original mencione Next.js, este projeto é um aplicativo web moderno SPA estruturado em **Vite + React + TypeScript** (com roteamento e animações de alta fidelidade). Os passos a seguir refletem essa especificação técnica.

---

## Pré-requisitos
Antes de iniciar, certifique-se de ter instalado em sua máquina:
* **Node.js**: Versão **18.x** ou superior (recomenda-se LTS).
* **Gerenciador de Pacotes**: **npm** (já incluso na instalação do Node.js).

---

## Passo 1: Instalação das Dependências
Para instalar todos os pacotes e dependências listados no `package.json`, execute o seguinte comando no terminal da raiz do projeto:

```bash
npm install
```

---

## Passo 2: Configuração de Variáveis de Ambiente (Opcional)
Se o projeto precisar de integração com APIs externas futuramente:
1. Copie o arquivo `.env.example` da raiz e renomeie-o para `.env` ou `.env.local`:
   ```bash
   cp .env.example .env
   ```
2. Abra o arquivo `.env` recém-criado e configure os valores adequados para as chaves definidas.
   *(Nota: No momento, a aplicação roda inteiramente do lado do cliente e não exige variáveis críticas ativas para o funcionamento base).*

---

## Passo 3: Execução Local (Modo de Desenvolvimento)
Para rodar o projeto localmente com suporte a Hot Module Replacement (HMR):

```bash
npm run dev
```

O terminal indicará o endereço local ativo (normalmente `http://localhost:5173/`).

---

## Passo 4: Build de Produção
Para compilar a aplicação e gerar o build estático otimizado para produção:

```bash
npm run build
```

Este comando gera uma pasta chamada `/dist` na raiz do projeto contendo todos os arquivos estáticos (HTML, CSS, JavaScript, imagens, fontes) otimizados e minificados.

---

## Passo 5: Deploy para Produção

### Opção Recomendada: Vercel (Ideal para projetos SPA/Vite)
Como o build deste projeto gera arquivos estáticos puros (`dist`), o deploy na **Vercel** é extremamente simples e possui performance excepcional:

1. Acesse o painel da **Vercel** (https://vercel.com) e conecte sua conta do GitHub/GitLab.
2. Clique em **Add New > Project** e importe o repositório deste projeto.
3. A Vercel detectará automaticamente o framework preset como **Vite**.
4. Mantenha as configurações padrões:
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Adicione as variáveis de ambiente (se criadas no Passo 2) na seção *Environment Variables*.
6. Clique em **Deploy**. O projeto estará no ar em poucos segundos com SSL automático e CDN global.

### Opção Alternativa: Servidores Estáticos (Nginx, S3, Firebase Hosting, Netlify)
Como o resultado do build é puramente estático (`dist`), você pode hospedar o conteúdo da pasta `/dist` em qualquer servidor de arquivos estáticos de sua preferência.
