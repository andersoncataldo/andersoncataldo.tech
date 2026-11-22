"""Generate the English (EN) ATS resume PDF in curriculos_revisados and src/assets."""

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

DATA_EN = ResumeData(
    doc_title="ANDERSON VIANA CATALDO - Full-Stack Developer (TypeScript · Python) | Applied AI & Automation/RPA",
    name="ANDERSON VIANA CATALDO",
    headline="Full-Stack Developer (TypeScript · Python) | Applied AI & Automation/RPA",
    location_contact_line="Fortaleza, CE, Brazil | +55 85 99225-8794 | andersonvcataldo@gmail.com",
    links_line_xml=format_header_links("Portfolio"),
    summary_heading="PROFESSIONAL SUMMARY",
    summary_text=(
        "Nearly 2 years of corporate experience in technology and process automation, focused on Full-Stack development "
        "(TypeScript, Next.js 16, React 19, Node.js, Python/FastAPI, PostgreSQL/Supabase) with a strong edge in Applied AI "
        "(Google Gemini API, OpenAI API, Linux/WSL2 agent orchestration) and RPA. Hands-on experience with TOTVS WinThor ERP "
        "(Oracle), automated testing (58 Pytest tests, 35 Playwright assertions), and spec-driven delivery governance."
    ),
    skills_heading="TECHNICAL SKILLS",
    skills=[
        (
            "Frontend & UI",
            "TypeScript, JavaScript, Next.js 16, React 19, Vite 6, Tailwind CSS 4, Recharts, "
            "PWA (Progressive Web App), WCAG (Web Content Accessibility Guidelines) 2.1 AA",
        ),
        (
            "Backend & Databases",
            "Node.js, Express, Python, FastAPI, REST APIs, SQL, PostgreSQL (Supabase), Oracle (TOTVS WinThor), "
            "Neo4j (Cypher), SQLAlchemy, Alembic, Pydantic v2, RLS (Row Level Security), JWT, SSO, RPCs",
        ),
        (
            "Quality, Linux & Cloud",
            "Linux (Ubuntu/WSL2), Git Worktree, Git/GitHub, GitHub Actions (CI/CD), Pytest, Playwright, "
            "Vercel Edge, Cloudflare Pages, Render, Docker, Streamlit",
        ),
        (
            "AI, LLMs & Agent Orchestration",
            "Google Gemini API (3.8 Flash / 3.5 Flash-Lite), OpenAI API, RAG / CRAG (Corrective RAG), Prompt Engineering, "
            "Function Calling, MCP (Model Context Protocol), Claude Code, Antigravity CLI, Herdr, RTK, Automated Evals",
        ),
        (
            "Automation, RPA & Integration",
            "EDI Pharma Link, FTP/SFTP (Paramiko), XML/XSD (SEFAZ), pdfplumber, OpenPyXL, Pandas, "
            "Selenium, PyInstaller, Google Apps Script",
        ),
        (
            "Academic & Complementary Knowledge",
            "Java (Spring Boot), Django, Vue.js, NumPy (Machine Learning), MongoDB, SQLite, Neon, "
            "Power BI, n8n, BDD (Behavior-Driven Development), OpenSpec, Figma",
        ),
    ],
    experience_heading="WORK EXPERIENCE",
    experiences=[
        ExperienceItem(
            header="IT Intern - Distribuidora Mais Saúde | Jun 2026 - Present (Fortaleza, CE, Brazil - 100% On-site)",
            bullets=[
                "Developed features for the Central Grupo Mais monorepo (architecture and requirements defined by management) with JWT SSO, Next.js 16, React 19, FastAPI, Node.js, and Supabase with RLS, unifying 4 internal systems.",
                "Implemented a quality suite with 58 Pytest tests (E2E, authentication, and data protection), 35 Playwright visual regression assertions, and design system drift checks across 5 packages.",
                "Built a diagnostic engine in the Returns System using LLM calls via Google Gemini API and OpenAI API, Pareto analysis, heuristic fallback (< 1 s), and data anonymization aligned with LGPD best practices.",
                "Created 10 Python automations integrated with TOTVS WinThor ERP on Oracle, including 4 EDI Pharma Link bots and FTP_SYNC, reducing manual routines from 6 h to under 10 s per cycle (median; >99.9% reduction).",
                "Structured an AI-assisted development workflow with 9 agents in a maker-checker model (Claude Code, MCP, and mandatory human review), accelerating deliveries with auditable quality.",
            ],
        ),
        ExperienceItem(
            header="Apprentice - Tax & Projects - Grupo 3corações | Jan 2025 - Apr 2026 (Eusébio, CE, Brazil - On-site)",
            bullets=[
                "Implemented monthly validation and processing of over 15,000 NF-e XML files against SEFAZ XSD schemas, achieving 99.85% compliance with automated exception handling.",
                "Developed 5 Python and RPA bots for automated CND (Tax Clearance Certificate) renewal and batch fiscal extraction.",
                "Automated web portal queries and corporate spreadsheet generation in Python, saving over 200 cumulative hours of manual work.",
                "Authored technical documentation and contingency playbooks for automation bots while handling operational support tickets for the tax team.",
            ],
        ),
    ],
    projects_heading="PROJECTS",
    projects=[
        ProjectItem(
            title="Central Grupo Mais & Corporate SSO (Private code - company)",
            description_xml=(
                "Full-stack monorepo in Next.js 16, React 19, Vite 6, Node.js, Express, FastAPI, and PostgreSQL (Supabase) "
                "with RLS unifying 4 internal systems via JWT."
            ),
        ),
        ProjectItem(
            title="Web Portfolio & Anderson AI Assistant",
            description_xml=(
                "React 18, TypeScript, Tailwind CSS 4, Vite 6, Vercel Edge, Supabase (L1/L2 cache, RPCs), Gemini 3.8 Flash / "
                "3.5 Flash-Lite, OpenAI fallback, CRAG, 95 evals with no hallucinations detected, WCAG 2.1 AA, PWA. "
                f"{format_portfolio_links('Live')}"
            ),
        ),
        ProjectItem(
            title="Bank Statement RPA Consolidation Engine",
            description_xml=(
                "Hybrid Python pipeline (pdfplumber, OpenPyXL, Gemini Vision + Pydantic) reconciling PDF/XLSX/PNG statements "
                "with Decimal arithmetic, SHA-256 deduplication, 52+ Pytest tests, CI, and Streamlit dashboard. "
                f"{format_project_links('https://case-rpa-consolidacao-extratos.streamlit.app/', 'Live', 'https://github.com/andersoncataldo/case-rpa-consolidacao-extratos')}"
            ),
        ),
        ProjectItem(
            title="Corporate Service Desk System - Mais Saúde (Private code - company)",
            description_xml=(
                "Internal platform with RBAC (Role-Based Access Control), SLA tracking, "
                "MTTR (Mean Time To Repair) metrics, and Recharts dashboards."
            ),
        ),
        ProjectItem(
            title="AI-Powered Reverse Logistics & Returns (Private code - company)",
            description_xml=(
                "Application in React, Vite 6, FastAPI, SQLAlchemy, Alembic, Pydantic v2, and Pytest featuring LLM diagnosis, "
                "Pareto analysis, anomalies, and fallback (&lt; 1 s)."
            ),
        ),
        ProjectItem(
            title="FTP_SYNC & WinThor EDI Engine (Private code - company)",
            description_xml=(
                "Autonomous Python sync every 15 min between partner FTPs and TOTVS WinThor Cloud SFTP "
                "in EDI Pharma Link layout."
            ),
        ),
    ],
    education_heading="EDUCATION",
    education_title="Bachelor of Science in Computer Science",
    education_detail=" - University of Fortaleza (UNIFOR) | 2024 - Dec 2027 (finishing 6th semester; taking 7th-semester courses)",
    certifications_heading="CERTIFICATIONS",
    certification_title="Huawei HCIA-Storage V5.0",
    certification_detail=(
        " - Huawei ICT Academy | Jun 2026 (Enterprise Storage, SAN/NAS, RAID, Virtualization, and Disaster Recovery)"
    ),
    languages_heading="LANGUAGES",
    languages_text="Portuguese (Native) | English (Advanced) | Spanish (Basic)",
)


def main() -> None:
    targets = [
        ROOT / "curriculos_revisados" / "Anderson_Viana_Cataldo_EN.pdf",
        ROOT / "src" / "assets" / "Anderson_Viana_Curriculum_EN.pdf",
    ]
    render_cv_pdf(DATA_EN, targets)
    docx_target = ROOT / "curriculos_revisados" / "Anderson_Viana_Cataldo_EN.docx"
    render_cv_docx(DATA_EN, docx_target)
    for target in [*targets, docx_target]:
        print(f"Generated {target}")


if __name__ == "__main__":
    main()
