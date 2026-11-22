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
    format_project_links,
    render_cv_docx,
    render_cv_pdf,
)

ROOT = Path(__file__).resolve().parent.parent

DATA_PT = ResumeData(
    doc_title="ANDERSON VIANA CATALDO - Desenvolvedor Full-Stack (TypeScript · Python) | IA Aplicada & Automação/RPA",
    name="ANDERSON VIANA CATALDO",
    headline="Desenvolvedor Full-Stack (TypeScript · Python) | IA Aplicada & Automação/RPA",
    location_contact_line="Fortaleza, CE | +55 85 99225-8794 | andersonvcataldo@gmail.com",
    links_line_xml=format_header_links("Portfólio"),
    summary_heading="RESUMO PROFISSIONAL",
    summary_text=(
        "Quase 2 anos de experiência corporativa em tecnologia e automação de processos, com foco em desenvolvimento Full-Stack "
        "(TypeScript, Next.js 16, React 19, Node.js, Python/FastAPI, PostgreSQL/Supabase) e diferencial em IA aplicada "
        "(Google Gemini API, OpenAI API, orquestração de agentes em Linux/WSL2) e RPA. Experiência prática em integrações com "
        "ERP TOTVS WinThor (Oracle), testes automatizados (58 testes Pytest, 35 asserções Playwright) e governança de entregas."
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
            "Neo4j (Cypher), SQLAlchemy, Alembic, Pydantic v2, RLS (Row Level Security), JWT, SSO, RPCs",
        ),
        (
            "Qualidade, Linux & Cloud",
            "Linux (Ubuntu/WSL2), Git Worktree, Git/GitHub, GitHub Actions (CI/CD), Pytest, Playwright, "
            "Vercel Edge, Cloudflare Pages, Render, Docker, Streamlit",
        ),
        (
            "IA, LLMs & Orquestração de Agentes",
            "Google Gemini API (3.8 Flash / 3.5 Flash-Lite), OpenAI API, RAG / CRAG (Corrective RAG), Engenharia de Prompts, "
            "Function Calling, MCP (Model Context Protocol), Claude Code, Antigravity CLI, Herdr, RTK, Evals Automatizados",
        ),
        (
            "Automação, RPA & Integrações",
            "EDI Pharma Link, FTP/SFTP (Paramiko), XML/XSD (SEFAZ), pdfplumber, OpenPyXL, Pandas, "
            "Selenium, PyInstaller, Google Apps Script",
        ),
        (
            "Conhecimentos Acadêmicos & Complementares",
            "Java (Spring Boot), Django, Vue.js, NumPy (Machine Learning), MongoDB, SQLite, Neon, "
            "Power BI, n8n, BDD (Behavior-Driven Development), OpenSpec, Figma",
        ),
    ],
    experience_heading="EXPERIÊNCIA PROFISSIONAL",
    experiences=[
        ExperienceItem(
            header="Estagiário de T.I. - Distribuidora Mais Saúde | jun/2026 - presente (Fortaleza, CE - 100% Presencial)",
            bullets=[
                "Desenvolvi funcionalidades do monorepo Central Grupo Mais (arquitetura e requisitos definidos pela gestão) com SSO via JWT, Next.js 16, React 19, FastAPI, Node.js e Supabase com RLS, unificando 4 sistemas internos.",
                "Implementei suíte de qualidade com 58 testes em Pytest (E2E, autenticação e proteção de dados), 35 asserções visuais em Playwright e checagem de design system em 5 pacotes.",
                "Desenvolvi motor de diagnóstico no Sistema de Devolução com LLM via Google Gemini API e OpenAI API, Pareto, fallback heurístico (< 1 s) e anonimização aderente a boas práticas da LGPD.",
                "Criei 10 automações em Python no ERP TOTVS WinThor (Oracle), incluindo 4 robôs EDI Pharma Link e o FTP_SYNC, reduzindo rotinas de 6 h para menos de 10 s por ciclo (mediana; redução superior a 99,9%).",
                "Estruturei fluxo de desenvolvimento assistido por IA com 9 agentes no modelo maker-checker (Claude Code, MCP e revisão humana obrigatória), ampliando produtividade com qualidade auditável.",
            ],
        ),
        ExperienceItem(
            header="Aprendiz - Setor Fiscal / Projetos - Grupo 3corações | jan/2025 - abr/2026 (Eusébio, CE - Presencial)",
            bullets=[
                "Implementei validação e processamento mensal de mais de 15.000 XMLs de NF-e contra schemas XSD da SEFAZ, atingindo 99,85% de conformidade com tratamento automatizado de exceções.",
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
            title="RPA Extratos — Consolidação Automática Bancária",
            description_xml=(
                "Pipeline híbrido em Python (pdfplumber, OpenPyXL, Gemini Vision + Pydantic) para conciliação de extratos em "
                "PDF/XLSX/PNG com reconciliação Decimal, SHA-256, 52+ testes Pytest, CI e painel Streamlit. "
                f"{format_project_links('https://case-rpa-consolidacao-extratos.streamlit.app/', 'Demo', 'https://github.com/andersoncataldo/case-rpa-consolidacao-extratos')}"
            ),
        ),
        ProjectItem(
            title="Sistema de Chamados Corporativo - Mais Saúde (Código privado - empresa)",
            description_xml=(
                "Plataforma interna com RBAC (Role-Based Access Control), gestão de SLA, "
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
    ],
    education_heading="FORMAÇÃO ACADÊMICA",
    education_title="Bacharelado em Ciência da Computação",
    education_detail=" - Universidade de Fortaleza (UNIFOR) | 2024 - dez/2027 (finalizando 6º semestre; adiantando disciplinas do 7º)",
    certifications_heading="CERTIFICAÇÕES",
    certification_title="Huawei HCIA-Storage V5.0",
    certification_detail=(
        " - Huawei ICT Academy | jun/2026 (Armazenamento Corporativo, SAN/NAS, RAID, Virtualização e Disaster Recovery)"
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
    docx_target = ROOT / "curriculos_revisados" / "Anderson_Viana_Cataldo_PT.docx"
    render_cv_docx(DATA_PT, docx_target)
    for target in [*targets, docx_target]:
        print(f"Generated {target}")


if __name__ == "__main__":
    main()
