# Portfólio de Anderson Viana Cataldo

Este repositório contém o portfólio pessoal de **Anderson Viana Cataldo**, desenvolvido com **React 18 + TypeScript + Vite**.
A aplicação foi construída para ser uma vitrine profissional com foco em recrutadores, clientes de freelance e empresas que buscam automação de processos.

## O que está incluído

### Seções do site
- `src/App.tsx` - ponto de entrada da aplicação e renderização das seções.
- `src/components/Navbar.tsx` - navegação fixa com âncoras e CTAs claros.
- `src/components/Hero.tsx` - apresentação imediata com headline, diferenciais e botões para vaga ou automação.
- `src/components/About.tsx` - resumo profissional e formação.
- `src/components/Experience.tsx` - experiências reais com resultados, impacto e tecnologias.
- `src/components/Automation.tsx` - seção de destaque para serviços de automação/RPA.
- `src/components/Skills.tsx` - categorias de habilidades técnicas e mindset profissional.
- `src/components/Projects.tsx` - projetos com problema, solução, resultado, stack e links.
- `src/components/Contact.tsx` - contatos segmentados para recrutador e cliente, com WhatsApp, e-mail, LinkedIn e currículo.
- `src/components/Footer.tsx` - rodapé simples com links rápidos.
- `src/components/CopyEmail.tsx` - botão para copiar e-mail com feedback visual.

### Estilo e arquitetura
- `src/styles/index.css` - tokens de design, tipografia fluida, utilitários e componentes estilo Apple-like.
- `framer-motion` para micro-interações suaves.
- `lucide-react` para ícones com boa acessibilidade.

## Dependências principais
- `react`
- `react-dom`
- `typescript`
- `vite`
- `framer-motion`
- `lucide-react`
- `tailwindcss`

## Como executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Execute a aplicação em desenvolvimento:

```bash
npm run dev
```

3. Abra `http://localhost:5173` no navegador.

## Como buildar para produção

```bash
npm run build
```

## Principais melhorias aplicadas
- Adição de seção dedicada a **Automação / RPA** para destacar diferencial estratégico.
- Atualização dos projetos para exibir claramente **problema, solução e resultado**.
- CTA de contato segmentado entre **vaga** e **projeto/automação**.
- Melhoria da navegação mobile com `aria-label` mais descritivo.
- Manutenção do design system Apple-like e da arquitetura existente.

## Como explorar o repositório

- Verifique `src/App.tsx` para ver a ordem das seções.
- Abra cada componente em `src/components/` para entender como o conteúdo está organizado.
- Veja `src/styles/index.css` para os tokens de estilo e utilitários compartilhados.
- Consulte `public/` para recursos estáticos e `index.html` para metadata básica.

## O objetivo do portfólio

O site foi desenhado para comunicar rapidamente que Anderson é um **desenvolvedor full-stack em formação** com experiência prática, especializado em **automação de processos (RPA)** e **React/TypeScript**, gerando impacto real em ambientes corporativos.
