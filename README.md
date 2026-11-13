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

### 8. Assistente Conversacional "Pergunte ao Anderson AI" (`AiAssistantWidget.tsx`, `src/lib/ai/` & `/api/chat`)
- **Arquitetura de Machine Learning Híbrido & Pipeline de Raciocínio em 5 Etapas (RAG + CRAG + IR + NLG):**
  - **Indexação Granular Facetada (`scripts/build-knowledge.mjs` → `src/data/knowledgeIndex.json`):** Extrai **35 micro-chunks facetados bilíngues (PT-BR e EN)** a partir de `src/data/*` (com facetas estruturadas de `challenge`, `solution`, `architecture`, `resultImpact`, `role`, `metricsSummary`, `firstJob`, `currentJob`, `languagesSpoken` e `differentials`), com suporte a embeddings pré-calculados (`text-embedding-004` quantizados L2) e vetores locais TF-IDF + N-gramas de caracteres.
  - **Pipeline de Raciocínio em 5 Etapas (`src/lib/ai/reasoningPipeline.ts`):**
    1. **Entender:** Reescrita conversacional e correferência contrastiva (*"e na outra empresa?"* resolve *Mais Saúde* $\leftrightarrow$ *Grupo 3corações*) + **Detector de Ambiguidade** (pede 1 esclarecimento objetivo se a pergunta não especificar qual dos 9 projetos ou 15 robôs).
    2. **Planejar:** Decomposição automática de perguntas multi-partes e comparativas em até 3 subperguntas atômicas (`SubQueryPlan[]`).
    3. **Recuperar e Avaliar (Corrective RAG — CRAG):** Busca híbrida **BM25 + Similaridade de Cosseno + RRF + MMR** por subpergunta e avaliação de suficiência (`sufficient`, `partial`, `insufficient`).
    4. **Responder:** Síntese *Direct-Answer-First* com memória anti-repetição, links âncora clicáveis (`#sobre`, `#experiencia`, `#rpa`, `#habilidades`, `#projetos`, `#contato`) e orçamento adaptativo de raciocínio (`thinkingConfig: { thinkingBudget: 0 | 256, includeThoughts: false }`) no Edge.
    5. **Verificar (Chain-of-Verification Determinístico):** Checagem de cada número e afirmação contra `canonicalMetrics` antes do envio.
  - **Suíte de 71 Evals Automatizados (`evals/dataset.json` & `scripts/run-evals.mjs`):** Integrada ao CI no GitHub Actions validando 100% de acurácia factual, 0% de alucinação, esclarecimento em perguntas ambíguas, resolução de meia-verdade CRAG, recusa correta e resistência a injection.

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
├── .github/workflows/ci.yml      # CI/CD automatizado (lint + evals + build)
├── api/                          # Vercel Edge Functions (/api/chat.ts e /api/og.tsx)
├── evals/
│   └── dataset.json              # Conjunto dourado de 71 casos de teste bilíngues (PT/EN)
├── openspec/                     # Especificações vivas (Spec-Driven Development)
├── prompts/anderson-ai/          # Prompts de sistema versionados (v1.md, v2.md, evals.json)
├── public/                       # Assets públicos (favicon, og-image, sitemap)
├── scripts/                      # Scripts de engenharia (build-knowledge.mjs, run-evals.mjs, contrast.js)
├── src/
│   ├── assets/                   # Previews, fotos e currículos em PDF (PT e EN)
│   ├── components/               # Componentes modulares UI (incluindo AiAssistantWidget.tsx)
│   ├── config/links.ts           # Links oficiais e dados de contato
│   ├── context/LanguageContext.tsx# Provedor de idioma (PT/EN)
│   ├── data/                     # Camada centralizada de dados tipados + knowledgeIndex.json
│   ├── i18n/translations.ts      # Dicionário de traduções bilíngue estrito
│   ├── lib/ai/                   # Pipeline de Raciocínio em 5 Etapas (reasoningPipeline, retriever, intentClassifier, responseSynthesizer, guardrails)
│   └── styles/index.css          # Tokens Tailwind v4 e temas
```

---

## 🚀 Como Executar Localmente, Regenerar o Índice e Rodar Evals

```bash
# 1. Clonar o repositório e instalar dependências
git clone https://github.com/andersoncataldo/andersoncataldo.tech.git
cd andersoncataldo.tech
npm install

# 2. Iniciar servidor de desenvolvimento (inclui middleware local para /api/chat)
npm run dev

# 3. Regenerar o índice de conhecimento (src/data/knowledgeIndex.json)
#    Se GEMINI_API_KEY estiver definida no ambiente, pré-calcula embeddings text-embedding-004
npm run build:knowledge

# 4. Executar a suíte de 71 Evals de IA (modo determinístico para CI, sem precisar de chave)
npm run evals

# 5. Executar Evals contra a API real do Gemini (requer GEMINI_API_KEY definida)
GEMINI_API_KEY="sua_chave" npm run evals:live

# 6. Executar linter e build de produção
npm run lint
npm run build
```

### Variáveis de Ambiente (Opcional)
- `GEMINI_API_KEY`: Chave server-side da Google Gemini API (configurada exclusivamente nas variáveis de ambiente da Vercel ou no shell local; **nunca** exposta ao front-end com prefixo `VITE_`). Sem ela, o assistente opera integralmente através do motor de Machine Learning Híbrido local (`BM25 + Cosine Similarity + RRF + MMR + Dynamic NLG`).

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte `LICENSE` para mais informações.
