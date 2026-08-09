# Portfólio de Anderson Cataldo

Este repositório contém o portfólio pessoal de Anderson Cataldo, uma landing page desenvolvida com React, TypeScript e Vite para apresentar sua trajetória profissional, habilidades técnicas e projetos com foco em desenvolvimento full-stack, automação de processos e produtos digitais.

## Sobre o portfólio

O objetivo deste projeto é funcionar como uma vitrine profissional moderna, clara e objetiva. A interface foi pensada para mostrar:

- formação e experiência em desenvolvimento e automação;
- projetos com contexto, solução e impacto;
- stack tecnológica e mindset profissional;
- canais de contato e links externos de forma organizada.

A estrutura foi construída em uma única página, com navegação por seções e um layout responsivo que adapta o conteúdo para desktop e mobile.

## Principais seções

- Hero: apresentação inicial com destaque para perfil e diferencial técnico.
- Sobre: visão geral profissional, formação e localização.
- Experiência: trajetória acadêmica e profissional com resultados concretos.
- Automação: foco em processos automatizados e eficiência operacional.
- Habilidades: stack técnica e competências profissionais.
- Projetos: exemplos de soluções desenvolvidas com contexto e impacto.
- Contato: e-mail, LinkedIn e currículo em PDF.

## Recursos principais

- Tema claro/escuro com persistência via localStorage.
- Sidebar fixa no desktop e drawer móvel no mobile.
- Navegação por âncoras com scroll suave e offset para evitar sobreposição com a sidebar.
- Botão de copiar e-mail com feedback visual.
- Animações leves com Framer Motion e ícones consistentes com Lucide React.
- Design responsivo com foco em legibilidade e acessibilidade.

## Tecnologias utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Como executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto em modo de desenvolvimento:

```bash
npm run dev
```

3. Abra o endereço exibido no terminal no navegador.

## Como gerar a build

```bash
npm run build
```

## Como visualizar a build localmente

```bash
npm run preview
```

## Estrutura do projeto

- `src/App.tsx`: composição das seções e lógica de tema.
- `src/components/`: componentes da interface, como sidebar, hero, projetos e contato.
- `src/styles/index.css`: tokens de tema, utilitários e estilos globais.
- `src/config/links.ts`: centralização de links e informações de contato.
- `public/`: arquivos estáticos como favicon, robots.txt e sitemap.

## Objetivo do projeto

Este portfólio tem como propósito apresentar Anderson Cataldo como um desenvolvedor em formação, com interesse especial em desenvolvimento web, automação e soluções que reduzem trabalho manual e aumentam eficiência.
