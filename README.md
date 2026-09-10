# Portfólio de Anderson Cataldo

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Portfólio de alta performance e vitrine técnica profissional de **Anderson Cataldo**, Desenvolvedor Full-Stack (React, TypeScript, Next.js, Python, Node.js) e especialista em automação de processos corporativos (RPA).

🔗 **Live Demo:** [https://andersoncataldo.tech](https://andersoncataldo.tech)  
📁 **Repositório:** [https://github.com/andersoncataldo/andersoncataldo.tech](https://github.com/andersoncataldo/andersoncataldo.tech)

---

## 🎯 Sobre o Projeto & Posicionamento

Este projeto foi concebido para apresentar Anderson Cataldo com o nível de maturidade, rigor de engenharia e foco em resultados de um **Desenvolvedor Júnior com vivência corporativa real e sólida base acadêmica em Ciência da Computação (Unifor - 6º Semestre)**.

A aplicação vai além de uma landing page estática tradicional: ela funciona como uma **Single Page Application (SPA)** modular, performática, acessível e orientada a dados, integrando componentes interativos, arquitetura desacoplada e métricas reais de produção.

---

## 🚀 Destaques & Recursos Técnicos

### 1. Terminal Interativo de Engenharia (`DevConsole.tsx`)
- Widget interativo no Hero simulando um terminal de desenvolvedor.
- Permite alternar entre dados em formato JSON em tempo real: `profile.json`, `stack.json` e `metrics.json`.
- Função de cópia com um clique para a área de transferência com feedback visual imediato.

### 2. Visualizador do Fluxo de Automação (`PipelineVisualizer.tsx`)
- Demonstração visual e técnica em 4 etapas do pipeline corporativo de RPA:
  1. **Captura & Ingestão de Lotes:** Varredura automática e download de lotes fiscais.
  2. **Parsing & Validação:** Validação contra schemas da SEFAZ com lxml e BeautifulSoup (99.85% de precisão).
  3. **ETL & Conciliação:** Tratamento estruturado com Pandas e conciliação contábil.
  4. **Entrega & Relatórios:** Geração automatizada de planilhas e dashboards.
- Métricas em destaque: **15.000+ XMLs processados/mês** e **200+ horas manuais poupadas**.

### 3. Vitrine de Projetos Filtrável & Modal de Arquitetura (`ProjectModal.tsx`)
- Filtros instantâneos por categoria: `Todos`, `Full-Stack & Web`, `Automações RPA & Python` e `Front-End & Performance`.
- Cartões com visualização de resultados de negócio, preview com moldura técnica e tags de stack.
- **Modal de Detalhamento Técnico:** Exibe o desafio de engenharia, arquitetura adotada em camadas, decisões de design e métricas de cada projeto.

### 4. Busca em Tempo Real e Categorias de Habilidades (`Skills.tsx`)
- Campo de pesquisa reativo para filtragem instantânea de tecnologias e palavras-chave.
- Categorização clara com tags de proficiência (`Avançado`, `Intermediário`, `Em expansão`) e destaque para palavras-chave de triagem técnica (ATS).

### 5. Design System Moderno & Acessibilidade
- **Paleta de Alta Tecnologia:** Superfícies em ardósia/vidro escuro (`#090e1a` / `#0f172a`), detalhes luminosos em Índigo/Violeta elétrico e destaques funcionais em Ciano e Esmeralda.
- **Tema Claro / Escuro:** Persistência automática via `localStorage` e sincronização com preferências do sistema operacional (`prefers-color-scheme`).
- **Acessibilidade (WCAG 2.1 AA):** Navegação por teclado, leitor de tela (`aria-*`), atalho de pular para o conteúdo (`skip-to-content`) e respeito a `prefers-reduced-motion`.

### 6. Contato de Alta Conversão
- Indicador de status de contratação ao vivo: `🟢 Aberto a Oportunidades (Estágio & Júnior)`.
- Botão de 1-clique para copiar e-mail profissional com notificação toast.
- Link direto para conversa no WhatsApp com mensagem pré-formatada.
- Download direto do Currículo Técnico em PDF atualizado.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
| :--- | :--- |
| **Front-End & UI** | React 18, TypeScript 5, Vite 6, Tailwind CSS v4, Framer Motion, Lucide React |
| **Back-End & APIs** | Node.js (Express), Python (Django & Scripts), Java (Spring Boot) |
| **Bancos de Dados & Cloud** | PostgreSQL, Supabase, Neon Serverless, Vercel, Git & GitHub |
| **Automação & RPA** | Python 3.11+, Pandas, lxml, BeautifulSoup, Task Scheduler / Cron |
| **Práticas & Engenharia** | Clean Code, RESTful APIs, Git Flow, Metodologias Ágeis (Scrum/Kanban), WCAG AA, SEO |

---

## 📊 Métricas de Impacto Comprovadas

- **15.000+** Documentos fiscais (XML/NFe) processados por mês de forma autônoma (Grupo 3Corações).
- **200+** Horas acumuladas de retrabalho manual poupadas para equipes operacionais.
- **-40%** de tempo em consultas internas com sistemas corporativos em Next.js e Supabase (Distribuidora Mais Saúde).
- **3+** Aplicações web completas entregues em ambiente de produção real.
- **6º Semestre** do Bacharelado em Ciência da Computação na Universidade de Fortaleza (Unifor).

---

## 📂 Estrutura do Projeto

```text
andersoncataldo.tech/
├── public/
│   ├── favicon.svg               # Ícone da aplicação
│   ├── robots.txt                # Diretrizes de indexação para robôs de busca
│   └── sitemap.xml               # Mapa do site indexável
├── src/
│   ├── assets/                   # Imagens, previews SVG de projetos e CV em PDF
│   ├── components/               # Componentes de interface modulares
│   │   ├── About.tsx             # Trajetória, formação e pilares profissionais
│   │   ├── Automation.tsx        # Apresentação do motor de RPA corporativo
│   │   ├── Contact.tsx           # Canais de contato direto e download do CV
│   │   ├── CopyEmail.tsx         # Botão de copiar e-mail com toast animado
│   │   ├── DevConsole.tsx        # Terminal interativo de especificações
│   │   ├── ErrorBoundary.tsx     # Captura e tratamento de falhas em componentes
│   │   ├── Experience.tsx        # Timeline interativa com KPIs de carreira
│   │   ├── Footer.tsx            # Rodapé com links e copyright
│   │   ├── Hero.tsx              # Apresentação principal, métricas e CTAs
│   │   ├── PipelineVisualizer.tsx# Visualizador interativo do fluxo RPA
│   │   ├── ProjectModal.tsx      # Modal de detalhamento técnico dos projetos
│   │   ├── Projects.tsx          # Vitrine de projetos com abas de categoria
│   │   ├── Sidebar.tsx           # Navegação lateral com glassmorphism e drawer móvel
│   │   └── Skills.tsx            # Busca e catálogo de habilidades técnicas
│   ├── config/
│   │   └── links.ts              # URLs oficiais, e-mail, WhatsApp e meta-dados
│   ├── data/                     # Camada de dados centralizada e tipada
│   │   ├── automation.ts         # Etapas e métricas do pipeline de automação
│   │   ├── experience.ts         # Histórico corporativo e acadêmico detalhado
│   │   ├── metrics.ts            # Indicadores quantitativos de impacto
│   │   ├── projects.ts           # Casos de sucesso, desafios e arquitetura
│   │   └── skills.ts             # Competências, níveis e palavras-chave ATS
│   ├── styles/
│   │   └── index.css             # Tokens do Tailwind v4, temas e utilitários globais
│   ├── types/
│   │   └── index.ts              # Contratos e tipos estritos TypeScript
│   ├── App.tsx                   # Layout principal, controle de tema e Lazy Loading
│   └── main.tsx                  # Ponto de entrada da aplicação React
├── index.html                    # HTML5 semântico com JSON-LD Schema e SEO
├── package.json                  # Dependências e scripts npm
├── tsconfig.json                 # Configurações do compilador TypeScript
└── vite.config.ts                # Configuração do Vite e plugins
```

---

## 💻 Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (ou yarn / pnpm)

### Instalação & Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/andersoncataldo/andersoncataldo.tech.git
   cd andersoncataldo.tech
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a URL informada no terminal (geralmente `http://localhost:5173`).

4. **Executar verificação de linting:**
   ```bash
   npm run lint
   ```

5. **Gerar build de produção otimizada:**
   ```bash
   npm run build
   ```

6. **Visualizar a build localmente:**
   ```bash
   npm run preview
   ```

---

## 📈 Avaliação de Qualidade & Performance

Para uma análise detalhada sobre a pontuação de qualidade de código, padrões de acessibilidade, arquitetura de software e métricas de bundle do Vite, consulte o documento:
👉 **[AVALIACAO_QUALIDADE_PERFORMANCE.md](./AVALIACAO_QUALIDADE_PERFORMANCE.md)**

---

## 📬 Contato & Conexões

- **LinkedIn:** [linkedin.com/in/andersonnviana](https://linkedin.com/in/andersonnviana)
- **GitHub:** [github.com/andersoncataldo](https://github.com/andersoncataldo)
- **WhatsApp:** [Enviar Mensagem](https://wa.me/5585994276707)
- **E-mail:** [andersonvcataldo@gmail.com](mailto:andersonvcataldo@gmail.com)

---

Desenvolvido por **Anderson Cataldo**. Código aberto sob a licença [MIT](LICENSE).
