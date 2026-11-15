"""Generate the Portuguese (PT-BR) ATS resume PDF in curriculos_revisados and src/assets."""

import sys
sys.dont_write_bytecode = True

from pathlib import Path

from cv_pdf_builder import (
    ExperienceItem,
    ProjectItem,
    ResumeData,
    format_header_links,
    format_portfolio_links,
    render_cv_pdf,
)

ROOT = Path(__file__).resolve().parent.parent

DATA_PT = ResumeData(
    doc_title="ANDERSON VIANA CATALDO - Desenvolvedor Full-Stack | Automação & RPA | IA Aplicada (Python · TypeScript)",
    name="ANDERSON VIANA CATALDO",
    headline="Desenvolvedor Full-Stack | Automação & RPA | IA Aplicada (Python · TypeScript)",
    location_contact_line="Fortaleza, CE | +55 85 99225-8794 | andersonvcataldo@gmail.com",
    links_line_xml=format_header_links("Portfólio"),
    summary_heading="RESUMO PROFISSIONAL",
    summary_text=(
        "Quase 2 anos de experiência corporativa em tecnologia e automação de processos, com atuação recente em "
        "desenvolvimento Full-Stack (Next.js 16, React 19, TypeScript, JavaScript, Node.js, Python/FastAPI, SQL/PostgreSQL) "
        "e IA aplicada (Google Gemini API, OpenAI API). Experiência prática em integrações com ERP (Enterprise Resource Planning) "
        "TOTVS WinThor (Oracle), RPA (Robotic Process Automation), testes automatizados (58 testes Pytest, 35 asserções Playwright) "
        "e fluxos assistidos por agentes."
    ),
    skills_heading="COMPETÊNCIAS TÉCNICAS",
    skills=[
        (
            "Front-End & UI",
            "TypeScript, JavaScript, Next.js 16, React 19, Vite 6, Tailwind CSS 4, Recharts, "
            "PWA (Progressive Web App), WCAG (Web Content Accessibility Guidelines) 2.1 AA",
        ),
        (
            "Back-End & Bancos de Dados",
            "Node.js, Express, Python, FastAPI, APIs REST, SQL, PostgreSQL (Supabase), Oracle (TOTVS WinThor), "
            "SQLAlchemy, Alembic, Pydantic v2, RLS (Row Level Security), JWT (JSON Web Token), SSO (Single Sign-On), "
            "RPCs (Remote Procedure Calls)",
        ),
        (
            "Qualidade, Cloud & Infraestrutura",
            "Pytest, Playwright, Vercel Edge, Cloudflare Pages, Render, PM2, Git/GitHub, Streamlit",
        ),
        (
            "IA, LLMs (Large Language Models) & Agentes",
            "Google Gemini API (3.8 Flash / 3.5 Flash-Lite), OpenAI API, RAG / CRAG (Retrieval-Augmented Generation / "
            "Corrective RAG), Engenharia de Prompts, Function Calling, MCP (Model Context Protocol), Claude Code, Evals Automatizados",
        ),
        (
            "Automação, RPA & Integrações",
            "EDI (Electronic Data Interchange) Pharma Link, FTP/SFTP (File Transfer Protocol / SSH File Transfer Protocol), "
            "XML/XSD (Extensible Markup Language / XML Schema Definition), SEFAZ (Secretaria da Fazenda), PyInstaller, Google Apps Script",
        ),
        (
            "Conhecimentos Acadêmicos & Complementares",
            "Java (Spring Boot), Django, Vue.js, MongoDB, SQLite, Power BI, Docker, Neon, n8n, Agendador de Tarefas do Windows, "
            "ftplib, WinSCP, Selenium, PyAutoGUI, BDD (Behavior-Driven Development), Figma, Trello, Miro, Git Flow",
        ),
    ],
    experience_heading="EXPERIÊNCIA PROFISSIONAL",
    experiences=[
        ExperienceItem(
            header="Estagiário de T.I. - Distribuidora Mais Saúde | jun/2026 - presente (Fortaleza, CE - 100% Presencial)",
            bullets=[
                "Desenvolvi funcionalidades do monorepo Central Grupo Mais (arquitetura e requisitos definidos pela gestão) com SSO via JWT, Next.js 16, React 19, FastAPI, Node.js e Supabase com RLS, unificando 4 sistemas internos.",
                "Implementei suíte de qualidade com 58 testes em Pytest (E2E - End-to-End, autenticação e proteção de dados), 35 asserções visuais em Playwright e checagem de design system em 5 pacotes.",
                "Desenvolvi motor de diagnóstico no Sistema de Devolução com LLM via Google Gemini API e OpenAI API, Pareto, fallback heurístico (< 1 s) e anonimização aderente a boas práticas da LGPD (Lei Geral de Proteção de Dados).",
                "Criei 10 automações em Python no ERP TOTVS WinThor (Oracle), incluindo 4 robôs EDI Pharma Link e o FTP_SYNC, reduzindo rotinas de 6 h para menos de 10 s por ciclo (mediana; redução superior a 99,9%).",
                "Estruturei fluxo de desenvolvimento assistido por IA com 9 agentes no modelo maker-checker (Claude Code e MCP), acelerando entregas com revisão humana obrigatória.",
            ],
        ),
        ExperienceItem(
            header="Aprendiz - Setor Fiscal / Projetos - Grupo 3corações | jan/2025 - abr/2026 (Eusébio, CE - Presencial)",
            bullets=[
                "Implementei validação e processamento mensal de mais de 15.000 XMLs de NF-e (Nota Fiscal Eletrônica) contra schemas XSD da SEFAZ, atingindo 99,85% de sucesso.",
                "Desenvolvi 5 robôs em Python e RPA para renovação de CNDs (Certidões Negativas de Débitos) e extração fiscal em lote.",
                "Automatizei consultas em portais web e geração de planilhas corporativas em Python, economizando mais de 200 horas acumuladas de trabalho manual.",
                "Elaborei documentação técnica dos robôs e playbooks de contingência, atuando no atendimento de chamados operacionais do setor fiscal.",
            ],
        ),
    ],
    projects_heading="PROJETOS",
    projects=[
        ProjectItem(
            title="Central Grupo Mais & SSO Corporativo (Código privado - empresa)",
            description_xml=(
                "Monorepo full-stack em Next.js 16, React 19, Vite 6, Node.js, Express, FastAPI e PostgreSQL (Supabase) "
                "com RLS unificando 4 sistemas internos via JWT."
            ),
        ),
        ProjectItem(
            title="Portfólio Web & Assistente Anderson AI",
            description_xml=(
                "React 18, TypeScript, Tailwind CSS 4, Vite 6, Vercel Edge, Supabase (cache L1/L2, RPCs), Gemini 3.8 Flash / "
                "3.5 Flash-Lite, fallback OpenAI, CRAG, 95 evals sem alucinações detectadas, WCAG 2.1 AA, PWA. "
                f"{format_portfolio_links('Demo')}"
            ),
        ),
        ProjectItem(
            title="Sistema de Chamados Corporativo - Mais Saúde (Código privado - empresa)",
            description_xml=(
                "Plataforma interna com RBAC (Role-Based Access Control), gestão de SLA (Service Level Agreement), "
                "métricas de MTTR (Mean Time To Repair) e dashboards em Recharts."
            ),
        ),
        ProjectItem(
            title="Logística Reversa & Devoluções com IA (Código privado - empresa)",
            description_xml=(
                "Aplicação em React, Vite 6, FastAPI, SQLAlchemy, Alembic, Pydantic v2 e Pytest com diagnóstico por LLM, "
                "curva de Pareto, anomalias e fallback (&lt; 1 s)."
            ),
        ),
        ProjectItem(
            title="FTP_SYNC & Motor EDI WinThor (Código privado - empresa)",
            description_xml=(
                "Sincronização autônoma em Python entre FTPs de parceiros e SFTP do TOTVS WinThor Cloud "
                "a cada 15 min no layout EDI Pharma Link."
            ),
        ),
        ProjectItem(
            title="Squad Autônomo de Agentes de IA (Projeto pessoal de pesquisa - repositório local)",
            description_xml=(
                "Orquestração de agentes autônomos em Node.js com Google Gemini API e gerenciamento de processos via PM2."
            ),
        ),
    ],
    education_heading="FORMAÇÃO ACADÊMICA",
    education_title="Bacharelado em Ciência da Computação",
    education_detail=" - Universidade de Fortaleza (UNIFOR) | 2024 - dez/2027 (previsão; 6º semestre)",
    certifications_heading="CERTIFICAÇÕES",
    certification_title="Huawei HCIA-Storage V5.0",
    certification_detail=(
        " - Huawei ICT Academy | jun/2026 (Armazenamento Corporativo, SAN/NAS - Storage Area Network / Network-Attached Storage, "
        "RAID - Redundant Array of Independent Disks, Disaster Recovery)"
    ),
    languages_heading="IDIOMAS",
    languages_text="Português (Nativo) | Inglês (Avançado) | Espanhol (Básico)",
)


def main() -> None:
    targets = [
        ROOT / "curriculos_revisados" / "Anderson_Viana_Cataldo_PT.pdf",
        ROOT / "src" / "assets" / "Anderson_Viana_Curriculo_PT-BR.pdf",
    ]
    render_cv_pdf(DATA_PT, targets)
    for target in targets:
        print(f"Generated {target}")


if __name__ == "__main__":
    main()
