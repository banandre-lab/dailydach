import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DailyDach - Stories with Daily Duck Energy',
    short_name: 'DailyDach',
    description: 'High-energy stories, cultural signals, and bold voices.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f1cc',
    theme_color: '#d9aa0d',
    icons: [
      {
        src: '/icon.png',
        sizes: '2048x2048',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
