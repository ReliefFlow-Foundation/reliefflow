import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '7px',
        }}
      >
        {/* Heart shape: two rounded lobes + tapered base */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            <div style={{ display: 'flex', width: '9px', height: '9px', background: '#f59e0b', borderRadius: '50%' }} />
            <div style={{ display: 'flex', width: '9px', height: '9px', background: '#f59e0b', borderRadius: '50%' }} />
          </div>
          <div style={{ display: 'flex', width: '14px', height: '9px', background: '#f59e0b', borderRadius: '0 0 8px 8px', marginTop: '-3px' }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
