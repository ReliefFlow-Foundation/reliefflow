import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a0a00',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          {/* Large heart */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ display: 'flex', width: '48px', height: '48px', background: '#f59e0b', borderRadius: '50%' }} />
              <div style={{ display: 'flex', width: '48px', height: '48px', background: '#f59e0b', borderRadius: '50%' }} />
            </div>
            <div style={{ display: 'flex', width: '72px', height: '48px', background: '#f59e0b', borderRadius: '0 0 38px 38px', marginTop: '-16px' }} />
          </div>
          {/* Brand name */}
          <div style={{
            display: 'flex',
            color: '#f59e0b',
            fontSize: '20px',
            fontWeight: 900,
            letterSpacing: '0.16em',
            fontFamily: 'sans-serif',
          }}>
            RELIEFFLOW
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
