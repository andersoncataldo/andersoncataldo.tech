export const config = {
  runtime: 'edge',
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default function handler(req: Request): Response {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') === 'en' ? 'en' : 'pt';
    const section = searchParams.get('section') || 'home';
    const isEn = lang === 'en';

    const titleBySection: Record<string, { pt: string; en: string }> = {
      home: {
        pt: 'Anderson Cataldo | Full-Stack, Automação & IA',
        en: 'Anderson Cataldo | Full-Stack, Automation & AI',
      },
      automation: {
        pt: 'Anderson Cataldo | Engenharia RPA & WinThor Oracle',
        en: 'Anderson Cataldo | RPA Engineering & WinThor Oracle',
      },
      projects: {
        pt: 'Anderson Cataldo | Sistemas Corporativos & IA',
        en: 'Anderson Cataldo | Enterprise Systems & AI',
      },
    };

    const selectedTitle = titleBySection[section] || titleBySection.home;
    const title = escapeXml(isEn ? selectedTitle.en : selectedTitle.pt);

    const subtitle = escapeXml(
      isEn
        ? '15 Corporate Automations • -99% FTP_SYNC • 9 Maker-Checker Agents • Huawei HCIA-Storage'
        : '15 Robôs Corporativos • -99% FTP_SYNC • 9 Agentes Maker-Checker • Huawei HCIA-Storage',
    );

    const badgeText = escapeXml(
      isEn ? 'ENGINEERING & AI PORTFOLIO' : 'PORTFÓLIO DE ENGENHARIA & IA',
    );
    const statusText = escapeXml(
      isEn ? 'Available for new challenges' : 'Disponível para novos desafios',
    );

    const metric1Label = escapeXml(isEn ? 'Robots in Production' : 'Robôs em Produção');
    const metric2Label = escapeXml(isEn ? 'FTP_SYNC Process Time' : 'Tempo Processo FTP_SYNC');
    const metric3Value = escapeXml(isEn ? '9 Agents' : '9 Agentes');
    const metric3Label = escapeXml(isEn ? 'Maker-Checker AI Squad' : 'Squad Maker-Checker');
    const metric4Label = escapeXml('Huawei Storage V5.0');

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#090e1a" />
      <stop offset="55%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
    <radialGradient id="glowIndigo" cx="0.85" cy="0.2" r="0.5">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowEmerald" cx="0.15" cy="0.85" r="0.45">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowIndigo)" />
  <rect width="1200" height="630" fill="url(#glowEmerald)" />

  <!-- Top Row: Portfolio Badge -->
  <rect x="80" y="64" width="380" height="44" rx="22" fill="#6366f1" fill-opacity="0.15" stroke="#818cf8" stroke-opacity="0.4" stroke-width="1.5" />
  <text x="106" y="92" fill="#818cf8" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="1.2">${badgeText}</text>

  <!-- Top Row: Status Pill -->
  <rect x="780" y="64" width="340" height="44" rx="22" fill="#10b981" fill-opacity="0.14" stroke="#34d399" stroke-opacity="0.35" stroke-width="1.5" />
  <circle cx="808" cy="86" r="6" fill="#10b981" />
  <text x="826" y="92" fill="#34d399" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="17" font-weight="600">${statusText}</text>

  <!-- Main Heading -->
  <text x="80" y="245" fill="#ffffff" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="46" font-weight="900" letter-spacing="-0.8">${title}</text>

  <!-- Subtitle -->
  <text x="80" y="305" fill="#94a3b8" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="500">${subtitle}</text>

  <!-- Divider Line -->
  <line x1="80" y1="395" x2="1120" y2="395" stroke="#334155" stroke-opacity="0.65" stroke-width="1.5" />

  <!-- Metric Card 1 -->
  <rect x="80" y="430" width="242" height="126" rx="16" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-opacity="0.6" stroke-width="1.5" />
  <text x="104" y="488" fill="#818cf8" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="36" font-weight="800">15+</text>
  <text x="104" y="524" fill="#94a3b8" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="500">${metric1Label}</text>

  <!-- Metric Card 2 -->
  <rect x="346" y="430" width="242" height="126" rx="16" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-opacity="0.6" stroke-width="1.5" />
  <text x="370" y="488" fill="#34d399" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="36" font-weight="800">-99%</text>
  <text x="370" y="524" fill="#94a3b8" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="500">${metric2Label}</text>

  <!-- Metric Card 3 -->
  <rect x="612" y="430" width="242" height="126" rx="16" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-opacity="0.6" stroke-width="1.5" />
  <text x="636" y="488" fill="#c084fc" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="36" font-weight="800">${metric3Value}</text>
  <text x="636" y="524" fill="#94a3b8" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="500">${metric3Label}</text>

  <!-- Metric Card 4 -->
  <rect x="878" y="430" width="242" height="126" rx="16" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-opacity="0.6" stroke-width="1.5" />
  <text x="902" y="488" fill="#f59e0b" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="36" font-weight="800">HCIA</text>
  <text x="902" y="524" fill="#94a3b8" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="500">${metric4Label}</text>
</svg>`;

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Failed to generate OG image: ${message}`, { status: 500 });
  }
}
