import { ImageResponse } from 'next/og'

export const size = { width: 256, height: 256 }
export const contentType = 'image/png'

export default async function Icon() {
  const fs = await import('fs')
  const path = await import('path')
  const imagePath = path.join(process.cwd(), 'public', 'AMLogo.png')
  const imageData = fs.readFileSync(imagePath)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${imageData.toString('base64')}`}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  )
}
