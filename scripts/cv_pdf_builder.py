"""Shared single-page ATS-friendly PDF generator using ReportLab."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Sequence
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate


ACCENT_HEX = "#0F4C81"
DARK_HEX = "#1A1A1A"
MUTED_HEX = "#4A5568"

ACCENT = colors.HexColor(ACCENT_HEX)
DARK = colors.HexColor(DARK_HEX)
MUTED = colors.HexColor(MUTED_HEX)


@dataclass(frozen=True)
class ExperienceItem:
    header: str
    bullets: Sequence[str]


@dataclass(frozen=True)
class ProjectItem:
    title: str
    description_xml: str


@dataclass(frozen=True)
class ResumeData:
    doc_title: str
    name: str
    headline: str
    location_contact_line: str
    links_line_xml: str
    summary_heading: str
    summary_text: str
    skills_heading: str
    skills: Sequence[tuple[str, str]]
    experience_heading: str
    experiences: Sequence[ExperienceItem]
    projects_heading: str
    projects: Sequence[ProjectItem]
    education_heading: str
    education_title: str
    education_detail: str
    certifications_heading: str
    certification_title: str
    certification_detail: str
    languages_heading: str
    languages_text: str


def _build_styles() -> dict[str, ParagraphStyle]:
    return {
        "name": ParagraphStyle(
            "Name",
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=14.5,
            textColor=DARK,
            spaceAfter=1.0,
        ),
        "headline": ParagraphStyle(
            "Headline",
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=10.5,
            textColor=ACCENT,
            spaceAfter=1.5,
        ),
        "meta": ParagraphStyle(
            "Meta",
            fontName="Helvetica",
            fontSize=7.5,
            leading=9.0,
            textColor=MUTED,
            spaceAfter=1.0,
        ),
        "links": ParagraphStyle(
            "Links",
            fontName="Helvetica",
            fontSize=7.5,
            leading=9.0,
            textColor=MUTED,
            spaceAfter=2.0,
        ),
        "section": ParagraphStyle(
            "Section",
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=10.0,
            textColor=ACCENT,
            spaceBefore=4.5,
            spaceAfter=1.8,
        ),
        "body": ParagraphStyle(
            "Body",
            fontName="Helvetica",
            fontSize=7.3,
            leading=8.8,
            textColor=DARK,
            spaceAfter=1.2,
        ),
        "job_title": ParagraphStyle(
            "JobTitle",
            fontName="Helvetica-Bold",
            fontSize=7.7,
            leading=9.2,
            textColor=DARK,
            spaceBefore=2.2,
            spaceAfter=1.2,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            fontName="Helvetica",
            fontSize=7.25,
            leading=8.7,
            textColor=DARK,
            leftIndent=8,
            firstLineIndent=-5,
            spaceAfter=1.0,
        ),
    }


def _link(url: str, label: str) -> str:
    return f'<u><font color="{ACCENT_HEX}"><a href="{escape(url)}">{escape(label)}</a></font></u>'


def render_cv_pdf(data: ResumeData, output_paths: Sequence[Path]) -> None:
    """Render a single-page ATS resume PDF to every path in output_paths."""
    styles = _build_styles()

    for out_path in output_paths:
        out_path.parent.mkdir(parents=True, exist_ok=True)
        doc = SimpleDocTemplate(
            str(out_path),
            pagesize=letter,
            leftMargin=33.36,
            rightMargin=33.36,
            topMargin=25.2,
            bottomMargin=25.2,
            title=data.doc_title,
            author=data.name,
        )

        story = [
            Paragraph(escape(data.name), styles["name"]),
            Paragraph(escape(data.headline), styles["headline"]),
            Paragraph(escape(data.location_contact_line), styles["meta"]),
            Paragraph(data.links_line_xml, styles["links"]),
            HRFlowable(width="100%", thickness=0.6, color=ACCENT, spaceBefore=0.5, spaceAfter=3.5),
            Paragraph(escape(data.summary_heading), styles["section"]),
            Paragraph(escape(data.summary_text), styles["body"]),
            Paragraph(escape(data.skills_heading), styles["section"]),
        ]

        for label, value in data.skills:
            story.append(
                Paragraph(f"<b>{escape(label)}:</b> {escape(value)}", styles["body"])
            )

        story.append(Paragraph(escape(data.experience_heading), styles["section"]))
        for exp in data.experiences:
            story.append(Paragraph(escape(exp.header), styles["job_title"]))
            for bullet in exp.bullets:
                story.append(Paragraph(f"- {escape(bullet)}", styles["bullet"]))

        story.append(Paragraph(escape(data.projects_heading), styles["section"]))
        for proj in data.projects:
            story.append(
                Paragraph(f"- <b>{escape(proj.title)}:</b> {proj.description_xml}", styles["bullet"])
            )

        story.extend([
            Paragraph(escape(data.education_heading), styles["section"]),
            Paragraph(f"<b>{escape(data.education_title)}</b>{escape(data.education_detail)}", styles["body"]),
            Paragraph(escape(data.certifications_heading), styles["section"]),
            Paragraph(
                f"<b>{escape(data.certification_title)}</b>{escape(data.certification_detail)}",
                styles["body"],
            ),
            Paragraph(escape(data.languages_heading), styles["section"]),
            Paragraph(escape(data.languages_text), styles["body"]),
        ])

        doc.build(story)


def format_header_links(portfolio_label: str) -> str:
    """Format the clickable header social links line with accent color."""
    return (
        f"LinkedIn: {_link('https://linkedin.com/in/andersonnviana', 'linkedin.com/in/andersonnviana')} | "
        f"GitHub: {_link('https://github.com/andersoncataldo', 'github.com/andersoncataldo')} | "
        f"{escape(portfolio_label)}: {_link('https://andersoncataldotech.vercel.app', 'andersoncataldotech.vercel.app')}"
    )


def format_portfolio_links(demo_label: str) -> str:
    """Format Demo/Live and GitHub links for the portfolio project bullet."""
    return format_project_links(
        "https://andersoncataldotech.vercel.app",
        demo_label,
        "https://github.com/andersoncataldo/andersoncataldo.tech",
    )


def format_project_links(demo_url: str, demo_label: str, repo_url: str) -> str:
    """Format clickable Demo/Live and GitHub links for any public project bullet."""
    return f"{_link(demo_url, demo_label)} | {_link(repo_url, 'GitHub')}"


def _strip_xml_tags(text: str) -> str:
    import html
    import re

    # Preserve href URLs inline in plain DOCX text when links exist
    text = re.sub(r'<a\s+href="([^"]+)">([^<]+)</a>', r'\2 (\1)', text)
    text = re.sub(r'<[^>]+>', '', text)
    return html.unescape(text)


def render_cv_docx(data: ResumeData, output_path: Path) -> None:
    """Render a clean ATS-friendly DOCX synchronized with ResumeData."""
    from docx import Document
    from docx.shared import Inches, Pt, RGBColor

    output_path.parent.mkdir(parents=True, exist_ok=True)
    doc = Document()

    for section in doc.sections:
        section.top_margin = Inches(0.45)
        section.bottom_margin = Inches(0.45)
        section.left_margin = Inches(0.5)
        section.right_margin = Inches(0.5)

    accent_rgb = RGBColor(0x0F, 0x4C, 0x81)
    dark_rgb = RGBColor(0x1A, 0x1A, 0x1A)
    muted_rgb = RGBColor(0x4A, 0x55, 0x68)

    def add_p(space_before: float = 0, space_after: float = 1.5, left_indent: float = 0):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        if left_indent:
            p.paragraph_format.left_indent = Inches(left_indent)
        return p

    def add_run(p, text: str, size: float = 9.0, bold: bool = False, color=dark_rgb):
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(size)
        r.bold = bold
        r.font.color.rgb = color
        return r

    # Header
    p_name = add_p(space_after=1)
    add_run(p_name, data.name, size=14, bold=True, color=dark_rgb)

    p_head = add_p(space_after=1.5)
    add_run(p_head, data.headline, size=10, bold=True, color=accent_rgb)

    p_meta = add_p(space_after=1)
    add_run(p_meta, data.location_contact_line, size=8.5, color=muted_rgb)

    p_links = add_p(space_after=4)
    add_run(
        p_links,
        "LinkedIn: https://linkedin.com/in/andersonnviana | "
        "GitHub: https://github.com/andersoncataldo | "
        "Portfólio: https://andersoncataldotech.vercel.app"
        if "Portfólio" in data.links_line_xml
        else "LinkedIn: https://linkedin.com/in/andersonnviana | "
        "GitHub: https://github.com/andersoncataldo | "
        "Portfolio: https://andersoncataldotech.vercel.app",
        size=8.5,
        color=muted_rgb,
    )

    def add_heading(title: str):
        p = add_p(space_before=5, space_after=2)
        add_run(p, title, size=9.5, bold=True, color=accent_rgb)

    # Summary
    add_heading(data.summary_heading)
    add_run(add_p(space_after=2), data.summary_text, size=8.8)

    # Skills
    add_heading(data.skills_heading)
    for label, value in data.skills:
        p = add_p(space_after=1.2)
        add_run(p, f"{label}: ", size=8.6, bold=True)
        add_run(p, value, size=8.6)

    # Experience
    add_heading(data.experience_heading)
    for exp in data.experiences:
        add_run(add_p(space_before=2.5, space_after=1.2), exp.header, size=9.0, bold=True)
        for b in exp.bullets:
            p = add_p(space_after=1.0, left_indent=0.14)
            add_run(p, f"- {b}", size=8.5)

    # Projects
    add_heading(data.projects_heading)
    for proj in data.projects:
        p = add_p(space_after=1.2, left_indent=0.14)
        add_run(p, f"- {proj.title}: ", size=8.5, bold=True)
        add_run(p, _strip_xml_tags(proj.description_xml), size=8.5)

    # Education
    add_heading(data.education_heading)
    p_edu = add_p(space_after=1.5)
    add_run(p_edu, data.education_title, size=8.6, bold=True)
    add_run(p_edu, data.education_detail, size=8.6)

    # Certifications
    add_heading(data.certifications_heading)
    p_cert = add_p(space_after=1.5)
    add_run(p_cert, data.certification_title, size=8.6, bold=True)
    add_run(p_cert, data.certification_detail, size=8.6)

    # Languages
    add_heading(data.languages_heading)
    add_run(add_p(space_after=1), data.languages_text, size=8.6)

    doc.save(str(output_path))
