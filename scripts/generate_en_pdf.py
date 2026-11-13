import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT

def build_pdf():
    output_path = os.path.join(
        os.path.dirname(__file__),
        '..', 'src', 'assets', 'Anderson_Viana_Curriculum_EN.pdf'
    )
    output_path = os.path.abspath(output_path)

    # 2-Page Executive Layout with tight professional spacing
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=28,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()

    # Colors
    c_primary = colors.HexColor('#0f172a')     # Slate 900
    c_accent = colors.HexColor('#4338ca')      # Indigo 700
    c_secondary = colors.HexColor('#475569')   # Slate 600
    c_dark = colors.HexColor('#1e293b')        # Slate 800
    c_border = colors.HexColor('#cbd5e1')      # Slate 300

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=c_primary,
        alignment=TA_LEFT
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=c_accent,
        alignment=TA_LEFT
    )

    contact_style = ParagraphStyle(
        'ContactLine',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=c_secondary,
        alignment=TA_LEFT
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=c_primary,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=c_primary,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.2,
        textColor=c_dark,
        alignment=TA_JUSTIFY
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.2,
        textColor=c_dark,
        leftIndent=12,
        firstLineIndent=-8,
        alignment=TA_JUSTIFY,
        spaceAfter=2
    )

    story = []

    # Header
    story.append(Paragraph("ANDERSON VIANA CATALDO", title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Full-Stack Developer | Automation & RPA | AI Agents (LLM) | Python · TypeScript", subtitle_style))
    story.append(Spacer(1, 3))
    
    contacts = (
        "Fortaleza, CE, Brazil · Remote / Hybrid · +55 85 99225-8794 · "
        "<font color='#2563eb'>andersonvcataldo@gmail.com</font><br/>"
        "<font color='#2563eb'>LinkedIn</font>: linkedin.com/in/andersonnviana · "
        "<font color='#2563eb'>GitHub</font>: github.com/andersoncataldo · "
        "<font color='#2563eb'>Portfolio</font>: andersoncataldo.tech"
    )
    story.append(Paragraph(contacts, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_border, spaceBefore=1, spaceAfter=5))

    # Professional Summary
    story.append(Paragraph("Professional Summary", section_heading))
    summary_text = (
        "Full-Stack and Automation Developer focused on <b>applied AI in software engineering</b>. "
        "I architect and deliver corporate web applications (Next.js 16, React 19, Node.js, FastAPI, "
        "PostgreSQL/Supabase) and Python integration robots connected to <b>TOTVS WinThor ERP (Oracle)</b>. "
        "My key differentiator is orchestrating <b>AI agents (Claude Code, MCP, Gemini API)</b> in a "
        "<i>maker-checker</i> multi-agent architecture, combining <b>Spec-Driven Development (OpenSpec)</b> and "
        "automated test suites (58 Pytest suites, 35 Playwright assertions, CI/CD) to deliver at maximum speed "
        "without compromising code quality, strict typing, or LGPD data privacy. "
        "<b>15 corporate automations delivered</b>, slashing workflows from hours to seconds (−99%). "
        "Computer Science undergraduate at UNIFOR (6th semester), hold an international <b>Huawei HCIA-Storage V5.0</b> "
        "certification, with advanced English."
    )
    story.append(Paragraph(summary_text, body_style))

    # Technical Skills
    story.append(Paragraph("Technical Skills", section_heading))
    skills = [
        ("AI & Agents", "AI Agents, Multi-Agent Systems, LLM Orchestration, Prompt Engineering, Generative AI, Corrective RAG (CRAG), Function Calling, Evals (95/95), Claude Code, MCP (Model Context Protocol), Google Gemini API, OpenAI API, Guardrails, Fallback & Anti-hallucination, AI-Assisted Engineering."),
        ("Automation & RPA", "Python, Selenium, Playwright, PyAutoGUI, Web Scraping, ETL, Systems Integration, EDI (Pharma Link), FTP/SFTP (Paramiko, ftplib, WinSCP), Pandas, Tkinter, PyInstaller, Windows Task Scheduler, n8n."),
        ("Back-end", "Node.js, Express, TypeScript, Python, FastAPI, SQLAlchemy, Alembic, Pydantic v2, Zod, RESTful APIs, JWT, SSO, RBAC; also Java (Spring Boot) and Django."),
        ("Front-end", "React 19, Next.js 16 (App Router, Server Actions), Vite, Tailwind CSS 4, Recharts, Design Systems, Vue.js, HTML5, CSS3, WCAG 2.1 AA."),
        ("Data & Storage", "PostgreSQL, Supabase (Auth, RLS, Storage), Oracle SQL (TOTVS WinThor), SQLite, MongoDB, Huawei Enterprise Storage (SAN/NAS/RAID), Google Sheets API / Apps Script, Streamlit, Power BI."),
        ("Quality, Cloud & DevOps", "Pytest (58 suites), Playwright (E2E & visual regression), Automated Testing, GitHub Actions (CI/CD), Git Flow, Monorepo, Docker, Cloudflare Pages, Render, Vercel, Neon, LGPD Compliance, AppSec (JWT, RLS, CSP, IDOR)."),
        ("Methods & Practices", "Scrum/Agile, Spec-Driven Development (OpenSpec), Maker-Checker Architecture, BDD, Technical Documentation, Figma, Trello, Miro.")
    ]
    for cat, desc in skills:
        story.append(Paragraph(f"• <b>{cat}:</b> {desc}", bullet_style))

    # Professional Experience
    story.append(Paragraph("Professional Experience", section_heading))

    # Mais Saude
    story.append(Paragraph("<b>IT Intern — Distribuidora Mais Saúde</b> | Jun/2026 – Present (Fortaleza, CE · Hybrid)", job_title_style))
    ms_points = [
        "Architect and build <b>Central Grupo Mais</b>, a corporate monorepo with <b>SSO (JWT)</b> unifying 4 internal systems (Central Portal, Service Desk, Returns & Reverse Logistics, and IT Asset Management): frontends in Next.js 16/React 19 and Vite, APIs in Node.js/Express (TypeScript) and Python/FastAPI, PostgreSQL (Supabase) with Row-Level Security, deployed on Cloudflare Pages and Render.",
        "Implemented a <b>squad of 9 AI agents</b> (orchestrator, 5 specialized implementers, and 3 independent validators) following the <i>maker-checker</i> model with Claude Code: executors never validate their own work, enforcing least privilege, anti-hallucination protocols, and human escalation.",
        "Turned software quality into an automated delivery gate: <b>58 Pytest suites</b> (E2E flows, authentication, and LGPD) and <b>35 Playwright visual regression assertions</b>, linting and design system drift checks across 5 packages — 100% approved in production go-live audit.",
        "Developed <b>10 Python automations</b> integrated with WinThor ERP (Oracle), including 4 inventory integration robots for major pharmaceutical operators (Eurofarma, Eurofarma Generic, Smartped, and Momenta) in EDI Pharma Link layout via FTP/SFTP, bundled with PyInstaller.",
        "Created <b>FTP_SYNC</b>, an autonomous bridge between partner FTP servers and WinThor Cloud SFTP (TOTVS) syncing orders, returns, and fiscal invoices every 15 minutes; automated ingestion and ERP loading slashed a 6-hour manual process down to under 10 seconds (−99%).",
        "Engineered an <b>AI diagnostic engine</b> in the Returns System: executive summaries with LLMs (Gemini/OpenAI), Pareto curves of root causes, and anomaly detection with local heuristic fallback (< 1s), inference timeout, and LGPD data anonymization.",
        "Delivered strategic internal support tooling: Streamlit automation control panel to monitor robot executions, IT asset inventory control (Google Sheets + Apps Script), and Tkinter inventory updater with batch Oracle SQL queries.",
        "Infrastructure support: corporate networking, hardware provisioning, and level-2 IT help desk."
    ]
    for pt in ms_points:
        story.append(Paragraph(f"• {pt}", bullet_style))

    # 3coracoes
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Apprentice — Tax Department (Systems & Projects) — Grupo 3corações</b> | Jan/2025 – Apr/2026", job_title_style))
    tc_points = [
        "Developed <b>5 Python RPA robots</b> for automated renewal of tax clearance certificates (CNDs) across government web portals, bulk fiscal XML data extraction, and automated file manipulation.",
        "Processed more than <b>15,000 XML files monthly</b> with 99.85% accuracy against official SEFAZ government schemas.",
        "Automated web portal navigation and corporate spreadsheet generation from extracted data, eliminating manual rework and cutting over <b>200 cumulative hours of manual labor</b>.",
        "Authored in-depth technical documentation, contingency playbooks, and handled agile ticketing for operational teams."
    ]
    for pt in tc_points:
        story.append(Paragraph(f"• {pt}", bullet_style))

    # AI Competitive Edge
    story.append(Paragraph("Competitive Edge: Applied AI in Software Engineering", section_heading))
    ai_points = [
        "<b>Agent-Driven Development:</b> Daily practice orchestrating Claude Code with specialized subagents, MCP servers, and strict delegation workflows to plan, implement, review, and audit code in production systems.",
        "<b>Spec-Driven Development:</b> Formal OpenSpec/BDD specifications authored before code; autonomous agents query and update specifications across iterations, preserving context and eliminating hallucinations.",
        "<b>Automated AI Quality & Security Gates:</b> Autonomous QA and AppSec validators run builds, Pytest, and Playwright suites, auditing JWT, RLS, CSP, and IDOR vulnerabilities before approving pull requests.",
        "<b>First-Principles Mastery:</b> Built an autonomous multi-agent squad from scratch (Node.js + Gemini API + PM2) with role personas, shared JSON memory bus, and 24/7 supervisor daemon.",
        "<b>Responsible AI in Production:</b> Integration of LLMs with business systems enforcing strict Zod/Pydantic output schemas, deterministic fallbacks, and LGPD data anonymization."
    ]
    for pt in ai_points:
        story.append(Paragraph(f"• {pt}", bullet_style))

    # Featured Projects
    story.append(Paragraph("Featured Projects", section_heading))
    projects = [
        ("Central Grupo Mais & Corporate SSO (Corporate)", "Unified corporate monorepo with JWT SSO integrating 4 mission-critical platforms (Central, Tickets, Returns, Assets). Built with Next.js 16, React 19, Vite, Node.js, FastAPI, Supabase (RLS), Cloudflare Pages + Render."),
        ("Corporate Service Desk System — Mais Saúde (Corporate)", "Multi-tier service platform (requester → agent → manager → admin) with granular RBAC, predictive SLA tracking, MTTR analytics, interactive Recharts BI, batch actions, and automated PDF reporting. Next.js 16, React 19, TypeScript, Supabase (PostgreSQL, RLS), Tailwind CSS 4."),
        ("AI-Powered Reverse Logistics & Returns (Corporate)", "Replaced Google Forms/spreadsheets: triage, duplicate invoice validation, warehouse TV Mode, real-time alerts, and executive AI diagnosis (Gemini/OpenAI) with Pareto analysis and sub-second fallback. React + Vite, Python/FastAPI, SQLAlchemy, Alembic, Pydantic v2, Pytest."),
        ("FTP_SYNC & WinThor EDI Engine (Corporate)", "Autonomous SFTP bridge connecting pharmaceutical logistics partners (Eurofarma, Smartped, Momenta) in EDI Pharma Link layout with TOTVS WinThor ERP (Oracle), slashing a 6-hour workflow to under 10 seconds (−99%). Python, SFTP/FTP, Paramiko, PyInstaller."),
        ("IT Asset Management & SHA-256 Custody (Corporate)", "Hardware inventory tracking with 2-tier approval flow, database audit triggers, and automated .docx Responsibility Term generation signed with SHA-256 cryptographic hashes. Next.js, Node.js, PostgreSQL (Supabase)."),
        ("Autonomous AI Agent Squad (Applied Research)", "Multi-agent architecture built from scratch: role personas, shared JSON memory bus, finite state machine orchestrator, and PM2 daemon for continuous 24/7 operation. Node.js, Google Gemini API, PM2."),
        ("Gamified Educational Platform — São Carlo Acutis (Personal)", "Full-stack web application featuring interactive quizzes, real-time scoring, and educational gamification. React, TypeScript, Tailwind CSS, Supabase, Vercel."),
        ("SaaS Web Portfolio & Anderson AI Agent (Personal)", "Full-stack showcase built to Silicon Valley craft standards with global Command Palette (Ctrl+K), executable CLI, RPA ROI simulator, lazy-loaded AI assistant (hybrid 5-stage CRAG + CoVe, 95/95 evals, Gemini 3.8/3.5 with Function Calling, L1/L2 Supabase cache with negative-feedback invalidation, AI_WRITE_SECRET RPCs, LGPD purge), WCAG 2.1 AA, and PWA. React, TypeScript, Tailwind CSS 4, Vite 6, Vercel Edge, Supabase.")
    ]
    for p_title, p_desc in projects:
        story.append(Paragraph(f"• <b>{p_title}:</b> {p_desc}", bullet_style))

    # Education & Certifications
    story.append(Paragraph("Education & Certifications", section_heading))
    story.append(Paragraph("• <b>Bachelor of Science in Computer Science:</b> University of Fortaleza (UNIFOR) | 2024 – In progress (6th semester).", bullet_style))
    story.append(Paragraph("• <b>Huawei HCIA-Storage V5.0:</b> Huawei ICT Academy | Certified Jun/2026 (Enterprise Storage, SAN/NAS, RAID, Disaster Recovery).", bullet_style))

    # Languages & Soft Skills
    story.append(Paragraph("Languages & Behavioral Competencies", section_heading))
    story.append(Paragraph("• <b>Languages:</b> Portuguese (Native) · English (Advanced) · Spanish (Basic).", bullet_style))
    story.append(Paragraph("• <b>Cross-Functional Communication:</b> Fluent collaboration with non-technical business teams, translating operational pain points into automated software solutions.", bullet_style))
    story.append(Paragraph("• <b>Proactivity & Ownership:</b> Autonomous identification of manual bottlenecks and rapid execution of high-leverage software pipelines.", bullet_style))
    story.append(Paragraph("• <b>Agility & Discipline:</b> High performance in fast-paced environments with concurrent demands, clean code standards, and strict delivery gates.", bullet_style))

    doc.build(story)
    print(f"Successfully generated: {output_path}")

if __name__ == '__main__':
    build_pdf()
