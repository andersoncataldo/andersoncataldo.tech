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
    return (
        f"{_link('https://andersoncataldotech.vercel.app', demo_label)} | "
        f"{_link('https://github.com/andersoncataldo/andersoncataldo.tech', 'GitHub')}"
    )
