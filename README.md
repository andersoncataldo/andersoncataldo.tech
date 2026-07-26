# Portfólio de Anderson Viana Cataldo

Este repositório contém o portfólio pessoal de **Anderson Viana Cataldo**, desenvolvido com **React 18 + TypeScript + Vite**.
O site é uma vitrine de carreira, com foco em trajetória profissional, habilidades técnicas e resultados de projetos e automações.

## O que está incluído

### Seções do site
- `src/App.tsx` - ponto de entrada da aplicação, layout de página e lógica de tema.
- `src/components/Sidebar.tsx` - sidebar fixa à esquerda com navegação principal, links externos e toggle de tema.
- `src/components/Hero.tsx` - apresentação inicial com destaque para diferencial técnico e carreira.
- `src/components/About.tsx` - perfil profissional, formação e localização.
- `src/components/Experience.tsx` - experiência profissional e acadêmica com resultados e stack.
- `src/components/Automation.tsx` - destaque técnico para automação de processos e estabilidade operacional.
- `src/components/Skills.tsx` - stack técnica, infraestrutura e mindset profissional.
- `src/components/Projects.tsx` - projetos selecionados com problema, solução, resultado e tecnologies.
- `src/components/Contact.tsx` - contato neutro e profissional com e-mail, LinkedIn e currículo.
- `src/components/Footer.tsx` - rodapé simples com links externos.
- `src/components/CopyEmail.tsx` - botão para copiar e-mail com feedback.

### Estilo e arquitetura
- `src/styles/index.css` - tokens de design Apple-like, utilitários e dark mode.
- `framer-motion` para animações suaves e leitura visual.
- `lucide-react` para ícones consistentes.
- Dark mode real suportado com persistência de preferência via `localStorage`.

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

### Servir a build localmente (preview)

Após `npm run build` você pode servir a versão gerada com o preview do Vite:

```bash
npm run preview
```

Por padrão o servidor roda em `http://localhost:4173/`.

## Principais melhorias aplicadas
- Adição de sidebar fixa à esquerda com navegação por seções e menu móvel.
- Implementação de modo claro/escuro com persistência do tema.
- Neutralização do tom comercial em favor de foco em carreira e resultados.
- Remoção de CTAs de contratação/serviços e contato unificado e profissional.
- Atualização da navegação e do conteúdo para um portfólio de carreira mais claro.

## Notas de design e acessibilidade

- Paleta: tokenizada em `src/styles/index.css` com as variáveis principais:
	- `--color-apple-bg` — fundo (light: `#fbf8ff`, dark: `#000000`)
	- `--color-apple-text` — texto (light: `#0b0b0b`, dark: `#ffffff`)
	- `--color-apple-blue` — acento (light: `#7c3aed`)
	- `--color-apple-blue-dark` — acento (dark: `#5b21a9`) — ajustado para passar contraste com texto branco

- A aplicação removeu hard-coded colors e passou a usar utilitários como `bg-apple-bg`, `bg-apple-accent`, `text-apple-accent` e `border-apple` para manter consistência entre modos claro/escuro.

- Contraste: foi executado um script (`scripts/contrast.js`) que valida as razões de contraste entre tokens. Resultado resumido:
	- `text` sobre `bg` (light/dark): passa (>= 4.5)
	- `white` sobre `--color-apple-blue-dark` (`#5b21a9`): passa (9.39)
	- `black` sobre `--color-apple-blue` (`#7c3aed`): ~3.45 (AA Large) — evite texto pequeno preto sobre o acento claro; prefira `text-white` para pequenos rótulos ou use o acento escuro em contexto invertido.

- Sidebar móvel: implementado como drawer com `focus trap`, Esc para fechar e bloqueio de scroll enquanto aberto.

## Testes visuais realizados

- Capturas realizadas em 375px, 768px e 1440px para verificar o layout responsivo e o comportamento do `Sidebar` (drawer no mobile, fixo no desktop).

## Próximos passos recomendados

- Completar sweep para qualquer ocorrência remanescente de cores hard-coded (já reduzido consideravelmente).
- Implementar scroll-spy para destacar a seção ativa ao rolar a página.
- Testes automatizados de acessibilidade (axe, pa11y) em pipelines CI.

## Como explorar o repositório

- Veja `src/App.tsx` para a ordem e o layout das seções.
- Abra `src/components/Sidebar.tsx` para a implementação da navegação e do tema.
- Consulte `src/styles/index.css` para os tokens de paleta e o suporte ao modo escuro.
- Repare em `src/components/Contact.tsx` para o contato neutro e profissional.

## Objetivo do portfólio

Este site apresenta Anderson como um desenvolvedor full-stack em formação com foco em **automação de processos**, **React/TypeScript** e entregas que reduzem trabalho manual e melhoram produtividade.
