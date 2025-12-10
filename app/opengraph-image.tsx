import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Tribitat - Real Stories in Plain English'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #72E3AD 0%, #6DD5FA 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#171717',
              marginBottom: '20px',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Tribitat
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: '#ffffff',
              textAlign: 'center',
              marginTop: '20px',
              fontWeight: '600',
            }}
          >
            Real Stories in Plain English
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
