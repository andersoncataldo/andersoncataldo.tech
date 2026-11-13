import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT


def build_pdf():
    output_path = os.path.join(
        os.path.dirname(__file__),
        '..', 'src', 'assets', 'Anderson_Viana_Curriculo_PT-BR.pdf'
    )
    output_path = os.path.abspath(output_path)

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=28,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()

    c_primary = colors.HexColor('#0f172a')
    c_accent = colors.HexColor('#4338ca')
    c_secondary = colors.HexColor('#475569')
    c_dark = colors.HexColor('#1e293b')
    c_border = colors.HexColor('#cbd5e1')

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

    # Cabeçalho
    story.append(Paragraph("ANDERSON VIANA CATALDO", title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Desenvolvedor Full-Stack | Automação & RPA | Agentes de IA (LLM) | Python · TypeScript", subtitle_style))
    story.append(Spacer(1, 3))

    contacts = (
        "Fortaleza, CE · Remoto / Híbrido · +55 85 99225-8794 · "
        "<font color='#2563eb'>andersonvcataldo@gmail.com</font><br/>"
        "<font color='#2563eb'>LinkedIn</font>: linkedin.com/in/andersonnviana · "
        "<font color='#2563eb'>GitHub</font>: github.com/andersoncataldo · "
        "<font color='#2563eb'>Portfólio</font>: andersoncataldo.tech"
    )
    story.append(Paragraph(contacts, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.8, color=c_border, spaceBefore=1, spaceAfter=5))

    # Resumo profissional
    story.append(Paragraph("Resumo profissional", section_heading))
    summary_text = (
        "Desenvolvedor Full-Stack e de Automação focado em <b>IA aplicada ao desenvolvimento de software</b>. "
        "Projeto e entrego sistemas web corporativos de ponta a ponta (Next.js, React, Node.js, FastAPI, "
        "PostgreSQL/Supabase) e robôs de integração em Python conectados ao ERP <b>TOTVS WinThor (Oracle)</b>. "
        "Meu diferencial é orquestrar <b>agentes de IA (Claude Code, MCP, Gemini API)</b> em uma arquitetura "
        "multiagente <i>maker-checker</i>, combinando <b>Spec-Driven Development</b> e testes automatizados "
        "(58 suítes Pytest, 35 asserções Playwright, CI/CD) para entregar com velocidade sem abrir mão de qualidade "
        "e segurança LGPD. <b>15 automações desenvolvidas</b>, com redução de processos de horas para segundos (−99%). "
        "Graduando em Ciência da Computação (UNIFOR, 6º semestre), certificação internacional <b>Huawei HCIA-Storage V5.0</b>, "
        "inglês avançado."
    )
    story.append(Paragraph(summary_text, body_style))

    # Competências técnicas
    story.append(Paragraph("Competências técnicas", section_heading))
    skills = [
        ("IA & Agentes", "Agentes de IA, Sistemas Multiagente, Orquestração de LLMs, Engenharia de Prompt, IA Generativa, Corrective RAG (CRAG), Function Calling, Evals (95/95), Claude Code, MCP (Model Context Protocol), Google Gemini API, OpenAI API, Guardrails, Fallback e Anti-alucinação, Desenvolvimento Assistido por IA."),
        ("Automação & RPA", "Python, Selenium, Playwright, PyAutoGUI, Web Scraping, ETL, Integração de Sistemas, EDI (Pharma Link), FTP/SFTP (Paramiko, ftplib, WinSCP), Pandas, Tkinter, PyInstaller, Agendador de Tarefas do Windows, n8n."),
        ("Back-end", "Node.js, Express, TypeScript, Python, FastAPI, SQLAlchemy, Alembic, Pydantic v2, Zod, APIs REST, JWT, SSO, RBAC; também Java (Spring Boot) e Django."),
        ("Front-end", "React 19, Next.js 16 (App Router, Server Actions), Vite 6, Tailwind CSS 4, Recharts, Design System, Vue.js, HTML5, CSS3, WCAG 2.1 AA."),
        ("Dados", "PostgreSQL, Supabase (Auth, RLS, RPCs SECURITY DEFINER, Storage), Oracle SQL (TOTVS WinThor), SQLite, MongoDB, Google Sheets API / Apps Script, Streamlit, Power BI."),
        ("Qualidade, Cloud & DevOps", "Pytest (58 suítes), Playwright (E2E e regressão visual), Testes Automatizados, GitHub Actions (CI/CD), Git/GitHub, Monorepo, Docker, Cloudflare Pages, Render, Vercel Edge, Neon, LGPD, Segurança de Aplicações (JWT, RLS, CSP, IDOR)."),
        ("Métodos", "Scrum/Ágil, Spec-Driven Development (OpenSpec), Arquitetura Maker-Checker, BDD, Documentação Técnica, Figma, Trello, Miro.")
    ]
    for cat, desc in skills:
        story.append(Paragraph(f"• <b>{cat}:</b> {desc}", bullet_style))

    # Experiência profissional
    story.append(Paragraph("Experiência profissional", section_heading))

    story.append(Paragraph("<b>Estagiário de T.I. — Distribuidora Mais Saúde</b> | jun/2026 – presente (Fortaleza, CE · Híbrido)", job_title_style))
    ms_points = [
        "Projetei e desenvolvo a <b>Central Grupo Mais</b>, monorepo corporativo com <b>SSO (JWT)</b> que unifica 4 sistemas internos (Central, Chamados, Devolução e Ativos): frontends em Next.js 16/React 19 e Vite, APIs em Node.js/Express (TypeScript) e Python/FastAPI, PostgreSQL (Supabase) com Row Level Security e deploy em Cloudflare Pages + Render.",
        "Implementei um <b>escritório de 9 agentes de IA</b> (orquestrador, 5 executores especialistas e 3 validadores independentes) no modelo <i>maker-checker</i> com Claude Code: quem executa nunca valida o próprio trabalho, com menor privilégio, protocolo anti-alucinação e escalonamento para revisão humana.",
        "Tornei a qualidade um gate de entrega: <b>58 testes Pytest</b> (fluxos E2E, autenticação e LGPD) e <b>35 asserções Playwright</b> de regressão visual, lint e typecheck em 5 pacotes e checagem de drift do design system — 100% aprovados na auditoria de go-live.",
        "Desenvolvi <b>10 automações em Python</b> integradas ao WinThor (Oracle), incluindo 4 robôs de integração de estoque com operadores logísticos da indústria farmacêutica (Eurofarma, Eurofarma Genérico, Smartped e Momenta) no layout EDI Pharma Link, via FTP/SFTP, empacotados com PyInstaller.",
        "Criei o <b>FTP_SYNC</b>, ponte autônoma entre servidores FTP de parceiros e o SFTP do WinThor Cloud (TOTVS) que sincroniza pedidos, retornos e notas fiscais a cada 15 minutos; a automação reduziu um processo manual de 6 horas para menos de 10 segundos (−99%).",
        "Construí um <b>motor de IA</b> no Sistema de Devolução: diagnóstico executivo com LLM (Gemini/OpenAI), curva de Pareto de causas-raiz e detecção de anomalias, com fallback heurístico local (&lt; 1 s), timeout de inferência e anonimização de dados (LGPD).",
        "Entreguei ferramentas internas de apoio: painel de automações em Streamlit (catálogo central para executar e monitorar robôs), controle de inventário de TI (Google Sheets + Apps Script) e atualizador de catálogo de estoque (Tkinter) com consulta em lote ao Oracle e backup automático.",
        "Suporte à infraestrutura: redes, configuração de máquinas e help desk."
    ]
    for pt in ms_points:
        story.append(Paragraph(f"• {pt}", bullet_style))

    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Aprendiz — Setor Fiscal (Sistemas e Projetos) — Grupo 3corações</b> | jan/2025 – abr/2026", job_title_style))
    tc_points = [
        "Desenvolvi <b>5 robôs RPA em Python</b> para renovação automática de CNDs em portais web, extração massiva de dados de XML fiscais e manipulação automatizada de arquivos.",
        "Processei mais de <b>15.000 arquivos XML por mês</b> com 99,85% de acurácia na validação contra schemas oficiais da SEFAZ.",
        "Automatizei a interação com sistemas web e o preenchimento de planilhas corporativas, eliminando retrabalho e poupando mais de <b>200 horas acumuladas</b> de trabalho operacional.",
        "Elaborei documentação técnica dos robôs, playbooks de contingência e controle de chamados técnicos."
    ]
    for pt in tc_points:
        story.append(Paragraph(f"• {pt}", bullet_style))

    # Diferencial
    story.append(Paragraph("Diferencial: IA aplicada ao desenvolvimento", section_heading))
    ai_points = [
        "<b>Desenvolvimento orientado a agentes:</b> uso diário de Claude Code com subagentes, servidores MCP e prompts de orquestração para planejar, implementar, revisar e auditar código em projetos reais.",
        "<b>Spec-Driven Development:</b> especificações OpenSpec/BDD escritas antes do código; os agentes consultam e atualizam as specs a cada evolução, preservando contexto e reduzindo alucinação.",
        "<b>Testes e auditoria com IA:</b> validadores autônomos de QA e segurança executam builds, Pytest e Playwright e auditam JWT, RLS, CSP e IDOR antes de aprovar uma entrega.",
        "<b>Aprendizado pelos fundamentos:</b> construí do zero um squad de agentes autônomos (Node.js + Gemini API + PM2) com personas, memória compartilhada e orquestrador 24/7.",
        "<b>IA em produto, com responsabilidade:</b> LLMs integrados a sistemas de negócio com guardrails, fallback determinístico, contratos tipados e conformidade com a LGPD."
    ]
    for pt in ai_points:
        story.append(Paragraph(f"• {pt}", bullet_style))

    # Projetos em destaque
    story.append(Paragraph("Projetos em destaque", section_heading))
    projects = [
        ("Central Grupo Mais & SSO Corporativo (corporativo)", "Monorepo corporativo unificado com SSO JWT integrando 4 plataformas críticas (Central, Chamados, Devolução e Ativos). Next.js 16, React 19, Vite, Node.js, FastAPI, Supabase (RLS), Cloudflare Pages + Render."),
        ("Sistema de Chamados Corporativo — Mais Saúde (corporativo)", "Plataforma multinível (solicitante → atendente → gestor → admin) com RBAC granular, SLA preditivo, métricas de MTTR, BI com Recharts, ações em lote e relatórios em PDF. Next.js 16, React 19, TypeScript, Supabase (PostgreSQL, RLS), Tailwind CSS 4."),
        ("Sistema de Devolução — Logística Reversa (corporativo)", "Substituiu Google Forms/Planilhas: triagem, validação de NF duplicada, Modo TV, alertas em tempo real e diagnóstico executivo por IA (Gemini/OpenAI) com curva de Pareto e fallback &lt;1s. React + Vite, Python/FastAPI, SQLAlchemy, Alembic, Pydantic v2, Pytest."),
        ("FTP_SYNC & Motor EDI WinThor (corporativo)", "Ponte SFTP autônoma conectando operadores logísticos farmacêuticos (Eurofarma, Smartped, Momenta) em layout EDI Pharma Link ao ERP TOTVS WinThor (Oracle), reduzindo um fluxo de 6h para &lt;10s (−99%). Python, Paramiko, PyInstaller."),
        ("Sistema de Ativos de TI & Termos SHA-256 (corporativo)", "Gestão de inventário com esteira de aprovação em 2 níveis, auditoria por triggers e geração automática de Termos (.docx) com hash SHA-256. Next.js, Node.js, PostgreSQL (Supabase)."),
        ("Squad de Agentes de IA Autônomos (estudo aplicado)", "Arquitetura multiagente do zero: personas por papel, barramento JSON compartilhado, orquestrador em máquina de estados e daemon PM2 24/7. Node.js, Google Gemini API, PM2."),
        ("Plataforma Gamificada — São Carlo Acutis (pessoal)", "Aplicação web full-stack com quizzes interativos, pontuação em tempo real e gamificação educacional. React, TypeScript, Tailwind CSS, Supabase, Vercel."),
        ("Portfólio Web SaaS & Agente Anderson AI (pessoal)", "Vitrine de engenharia com Command Palette (Ctrl+K), terminal CLI executável, simulador de ROI RPA, PWA, WCAG 2.1 AA e assistente de IA full-stack em produção: pipeline híbrido CRAG + CoVe (5 etapas, 95/95 evals sem alucinação), Gemini 3.8 Flash / 3.5 Flash-Lite com Function Calling (LeadForm, navegação e CV), cache L1/L2 no Supabase com invalidação por feedback negativo, RPCs protegidas por AI_WRITE_SECRET, retenção LGPD e smoke test diário. React, TypeScript, Tailwind CSS 4, Vite 6, Vercel Edge, Supabase.")
    ]
    for p_title, p_desc in projects:
        story.append(Paragraph(f"• <b>{p_title}:</b> {p_desc}", bullet_style))

    # Formação e Certificações
    story.append(Paragraph("Formação acadêmica e Certificações", section_heading))
    story.append(Paragraph("• <b>Bacharelado em Ciência da Computação:</b> Universidade de Fortaleza (UNIFOR) | 2024 – em andamento (6º semestre).", bullet_style))
    story.append(Paragraph("• <b>Huawei HCIA-Storage V5.0:</b> Huawei ICT Academy | Certificado jun/2026 (Enterprise Storage, SAN/NAS, RAID, Disaster Recovery).", bullet_style))

    # Idiomas e Competências Comportamentais
    story.append(Paragraph("Idiomas e Competências comportamentais", section_heading))
    story.append(Paragraph("• <b>Idiomas:</b> Português (Nativo) · Inglês (Avançado) · Espanhol (Básico).", bullet_style))
    story.append(Paragraph("• <b>Comunicação com áreas de negócio:</b> tradução fluida de dores operacionais em automações e sistemas robustos.", bullet_style))
    story.append(Paragraph("• <b>Proatividade, autonomia e disciplina:</b> identificação de gargalos manuais e execução rápida sob padrões rigorosos de código, testes e entrega.", bullet_style))

    doc.build(story)
    print(f"Successfully generated: {output_path}")


if __name__ == '__main__':
    build_pdf()
