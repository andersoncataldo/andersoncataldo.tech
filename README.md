# Portfólio de Anderson Cataldo

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19%20%2F%2018.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Portfólio de alta performance e vitrine técnica profissional de nível **SaaS** de **Anderson Cataldo**, Desenvolvedor Full-Stack | Automação & RPA | Agentes de IA (LLM) | Python · TypeScript.

🔗 **Live Demo:** [https://andersoncataldo.tech](https://andersoncataldo.tech)  
📁 **Repositório:** [https://github.com/andersoncataldo/andersoncataldo.tech](https://github.com/andersoncataldo/andersoncataldo.tech)

---

## 🎯 Sobre o Projeto & Posicionamento

Este projeto foi concebido para apresentar Anderson Cataldo com o mais alto nível de maturidade, rigor de engenharia e foco em resultados de um **Desenvolvedor Full-Stack, Automação & IA**.

A aplicação foi desenvolvida no padrão de craft de produtos digitais Silicon Valley (estilo Linear, Raycast e Apple), operando como uma **Single Page Application (SPA)** ultra-rápida, acessível (WCAG 2.1 AA) e com profunda interatividade de software real.

---

## 🚀 Destaques & Recursos Técnicos SaaS

### 1. Command Palette Global (`Ctrl + K` / `Cmd + K`)
- Modal de comando instantâneo inspirado no Raycast e Linear.
- Atalho global via teclado com busca difusa reativa.
- Ações rápidas: navegação para qualquer seção, cópia de e-mail, redirecionamento para WhatsApp, download de CV (PT ou EN), alternância de tema e troca de idioma.

### 2. Terminal CLI Interativo Executável (`DevConsole.tsx`)
- Terminal executável com histórico de comandos (navegável com setas `↑` e `↓`) e prompt `visitor@cataldo-tech:~$`.
- Comandos implementados: `help`, `bio`, `stack`, `rpa`, `ai-agents`, `projects`, `contact`, `cv`, `clear` e o comando especial `sudo hire`.
- Abas gráficas de inspeção JSON (`profile.json`, `stack.json`, `metrics.json`) com botão de cópia instantânea.

### 3. Calculadora Interativa de ROI de Automação (`RpaRoiCalculator.tsx`)
- Simulador interativo SaaS com sliders para volume mensal de processos, tempo manual por item e custo de hora operacional.
- Cálculo em tempo real de horas poupadas/mês, economia financeira anual estimada (R$) e precisão de schemas SEFAZ.
- Call to Action integrado com parâmetros pré-carregados para o WhatsApp.

### 4. Navegação Contínua no Modal de Projetos (`ProjectModal.tsx`)
- Navegação fluida entre os projetos sem necessidade de fechar e reabrir o modal.
- Botões de cabeçalho "← Anterior" e "Próximo →" com suporte a teclas de atalho de seta (`ArrowLeft` / `ArrowRight`).

### 5. Barra de Progresso de Leitura (`ScrollProgress.tsx`)
- Barra no topo com gradiente suave indicando a porcentagem de leitura da página.

### 6. Pipeline de 15 Automações & FTP_SYNC (`PipelineVisualizer.tsx`)
- Demonstração visual e técnica em 4 etapas do pipeline corporativo:
  1. **FTP_SYNC & Coleta Autônoma:** Ponte com servidores FTP/SFTP a cada 15 min (−99% de tempo, de 6h para < 10s).
  2. **Parsing & Validação de Schemas:** Validação SEFAZ e EDI Pharma Link com 99.85% de precisão.
  3. **Integração WinThor ERP (Oracle) & ETL:** Atualização de lotes e conciliação contábil via Pandas.
  4. **Entrega Executiva & Monitoramento:** Painel Streamlit e alertas em tempo real.

### 7. Competências & ATS Keywords (`Skills.tsx`)
- 7 categorias técnicas completas: IA & Agentes, Automação & RPA, Back-End, Front-End, Bancos de Dados & Storage, Qualidade/DevOps e Métodos.
- Filtro por busca reativa e tags de proficiência (`Avançado`, `Intermediário`, `Em expansão`).

### 8. Assistente Conversacional "Pergunte ao Anderson AI" (`AiAssistantWidget.tsx` & `/api/chat`)
- Chat conversacional inteligente integrado com streaming Server-Sent Events (SSE) via **Google Gemini Flash** no Vercel Edge Runtime.
- **RAG Estático & Guardrails:** Grounding factual estrito na trajetória de Anderson, com defesas contra *prompt injection* e alucinações.
- **Resiliência Local:** Motor de contingência determinístico que responde com fatos verificados instantaneamente mesmo offline ou sem chave de API.
- Quick Prompts com 1 clique para recrutadores (FTP_SYNC -99%, squad de 9 agentes, certificação Huawei, etc.).

### 9. Progressive Web App (PWA) & Capacidade Offline (`vite-plugin-pwa`)
- Instalação nativa como Web App no Android, iOS e Desktop.
- Service Worker com estratégias de cache Workbox (*Stale-While-Revalidate* e *Cache-First*) para carregamento instantâneo sem conexão.
- Prompt discreto de atualização com notificação não intrusiva (`ReloadPrompt.tsx`).

### 10. Geração Dinâmica de Cartões OpenGraph (`api/og.tsx` Edge Runtime)
- Endpoint Edge de geração de imagens sociais 1200x630 via `@vercel/og`.
- Renderização em tempo real de métricas corporativas (*15 Robôs, -99.1% FTP_SYNC, 9 Agentes Maker-Checker, Huawei HCIA-Storage*).
- Suporte a internacionalização dinâmica (`?lang=pt` e `?lang=en`) e cache CDN global.

---

## 🛠️ Stack Tecnológica

| Camada                      | Tecnologias                                                                         |
| :-------------------------- | :---------------------------------------------------------------------------------- |
| **Front-End & UI SaaS**     | React 19 / 18, TypeScript 5, Next.js 16 (App Router), Vite 6, Tailwind CSS v4, Framer Motion, Recharts |
| **IA & Sistemas Multiagente**| Claude Code, MCP (Model Context Protocol), Gemini API, OpenAI API, Maker-Checker, Guardrails |
| **Automação & RPA**         | Python 3.11+, Paramiko (SFTP), ftplib, Playwright, Selenium, Pandas, lxml, BeautifulSoup, PyInstaller |
| **Back-End & APIs**         | Node.js (Express), Python (FastAPI), SQLAlchemy, Alembic, Pydantic v2, Zod, JWT SSO |
| **Bancos de Dados & Storage**| PostgreSQL, Supabase (RLS), Oracle SQL (TOTVS WinThor), Huawei HCIA-Storage, Neon  |
| **DevOps & Qualidade**      | Pytest (58 suítes), Playwright E2E (35 testes), GitHub Actions CI/CD, Cloudflare, Render, Vercel |

---

## 📊 Métricas de Impacto Comprovadas

- **15** Automações corporativas entregues em produção.
- **-99%** no tempo de processo com o FTP_SYNC (reduzido de 6 horas para menos de 10 segundos).
- **15.000+** Documentos fiscais (XML/NFe) processados de forma autônoma por mês (Grupo 3corações).
- **200+** Horas acumuladas de retrabalho manual eliminadas para equipes de negócios.
- **9 Agentes de IA** operando no modelo maker-checker com Claude Code e menor privilégio.
- **58 testes Pytest** e **35 asserções Playwright** aprovados na auditoria de go-live.
- **4 Sistemas Unificados** sob SSO corporativo no monorepo Central Grupo Mais.
- **6º Semestre** de Ciência da Computação na UNIFOR e certificação internacional **Huawei HCIA-Storage V5.0**.

---

## 📂 Estrutura do Projeto

```text
andersoncataldo.tech/
├── .agents/                      # Ecossistema de Agentes de IA e Governança
├── .github/workflows/ci.yml      # CI/CD automatizado (lint + build)
├── openspec/                     # Especificações vivas (Spec-Driven Development)
├── public/                       # Assets públicos (favicon, og-image, sitemap)
├── scripts/                      # Scripts utilitários de engenharia (contrast.js)
├── src/
│   ├── assets/                   # Previews, fotos e currículos em PDF (PT e EN)
│   ├── components/               # Componentes modulares UI
│   │   ├── About.tsx             # Trajetória, formação e pilares profissionais
│   │   ├── Automation.tsx        # Seção de RPA e simulador de ROI
│   │   ├── CommandPalette.tsx    # Command Palette global (Ctrl+K)
│   │   ├── Contact.tsx           # Canais de contato direto
│   │   ├── CopyEmail.tsx         # Cópia de e-mail com toast
│   │   ├── DevConsole.tsx        # Terminal CLI interativo executável + abas JSON
│   │   ├── ErrorBoundary.tsx     # Tratamento resiliente de falhas
│   │   ├── Experience.tsx        # Linha do tempo profissional e certificações
│   │   ├── Footer.tsx            # Rodapé institucional
│   │   ├── Hero.tsx              # Apresentação e chamada de ação
│   │   ├── PipelineVisualizer.tsx# Visualizador interativo do fluxo RPA
│   │   ├── ProjectModal.tsx      # Modal de projeto com navegação contínua
│   │   ├── Projects.tsx          # Vitrine de projetos filtrável
│   │   ├── RpaRoiCalculator.tsx  # Simulador interativo de ROI de automação
│   │   ├── ScrollProgress.tsx    # Barra de progresso de leitura no topo
│   │   ├── Sidebar.tsx           # Sidebar responsiva com acionador de comandos
│   │   └── Skills.tsx            # Catálogo e busca de competências
│   ├── config/links.ts           # Links oficiais e dados de contato
│   ├── context/LanguageContext.tsx# Provedor de idioma (PT/EN)
│   ├── data/                     # Camada centralizada de dados tipados
│   ├── i18n/translations.ts      # Dicionário de traduções bilíngue estrito
│   └── styles/index.css          # Tokens Tailwind v4 e temas
```

---

## 🚀 Como Executar Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/andersoncataldo/andersoncataldo.tech.git
cd andersoncataldo.tech

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev

# 4. Executar build de produção e linter
npm run lint
npm run build
```

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte `LICENSE` para mais informações.
