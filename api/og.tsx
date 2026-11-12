import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') === 'en' ? 'en' : 'pt';
    const isEn = lang === 'en';

    const title = isEn
      ? 'Anderson Cataldo | Full-Stack, Automation & AI'
      : 'Anderson Cataldo | Desenvolvedor Full-Stack & IA';

    const subtitle = isEn
      ? '15 Corporate Automations • -99.1% FTP_SYNC • 9 Maker-Checker Agents • Huawei HCIA-Storage'
      : '15 Robôs Corporativos • -99.1% FTP_SYNC • 9 Agentes Maker-Checker • Huawei HCIA-Storage';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#090e1a',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(99, 102, 241, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(168, 85, 247, 0.1) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '60px 80px',
            fontFamily: 'sans-serif',
            color: '#ffffff',
          }}
        >
          {/* Top Row: Badge + Status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 20px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(129, 140, 248, 0.4)',
                color: '#818cf8',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              <span>{isEn ? 'ENGINEERING & AI PORTFOLIO' : 'PORTFÓLIO DE ENGENHARIA & IA'}</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                color: '#34d399',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                }}
              />
              <span>{isEn ? 'Available for new challenges' : 'Disponível para novos desafios'}</span>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#ffffff',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: '24px',
                color: '#94a3b8',
                lineHeight: 1.4,
                maxWidth: '960px',
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Bottom Grid: 4 Metrics */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(51, 65, 85, 0.6)',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(51, 65, 85, 0.5)',
              }}
            >
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#818cf8' }}>15+</span>
              <span style={{ fontSize: '15px', color: '#94a3b8', marginTop: '4px' }}>
                {isEn ? 'Robots in Production' : 'Robôs em Produção'}
              </span>
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(51, 65, 85, 0.5)',
              }}
            >
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#34d399' }}>-99.1%</span>
              <span style={{ fontSize: '15px', color: '#94a3b8', marginTop: '4px' }}>
                {isEn ? 'FTP_SYNC I/O Latency' : 'Tempo de I/O FTP_SYNC'}
              </span>
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(51, 65, 85, 0.5)',
              }}
            >
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#c084fc' }}>9 Agentes</span>
              <span style={{ fontSize: '15px', color: '#94a3b8', marginTop: '4px' }}>
                {isEn ? 'Maker-Checker AI Squad' : 'Squad Maker-Checker'}
              </span>
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(51, 65, 85, 0.5)',
              }}
            >
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#f59e0b' }}>HCIA</span>
              <span style={{ fontSize: '15px', color: '#94a3b8', marginTop: '4px' }}>
                {isEn ? 'Huawei Storage Certified' : 'Certificado Huawei Storage'}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Failed to generate OG image: ${message}`, { status: 500 });
  }
}
