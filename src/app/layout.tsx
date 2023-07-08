import './globals.css'
import { Inter } from 'next/font/google'
import isProduction from '@/lib/environment'
import { Metadata } from 'next'
import FirebaseContextProvider from '@/contexts/FirebaseContext'
import LayoutHeader from './(components)/LayoutHeader'
import LayoutFooter from './(components)/LayoutFooter'

const inter = Inter({ subsets: ['latin'] })

const appUrl = new URL('https://app-masters-a1th.vercel.app/')
const TITLE = 'a1Th App-Masters'
const DESCRIPTION = 'Projeto de Estágio Frontend React'

export const metadata: Metadata = {

  metadataBase: appUrl,
  title: TITLE,
  description: DESCRIPTION,
  ...(isProduction ? { manifest: '/manifest.json' } : {}),
  themeColor: '#9CC9FF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: TITLE,
    startupImage: ['/og.png']
  },
  formatDetection: {
    telephone: false,
  },
  category: 'games',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: appUrl,
    siteName: TITLE,
    images: [
      {
        url: '/og.png',
        width: 800,
        height: 600,
      }
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: 'a1Th',
    images: ['/og.png'],
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#f3f4f6]`}>
        <FirebaseContextProvider >
          <LayoutHeader />
          <main className='max-w-[1440px] mx-auto'>
            {children}
          </main>
          <LayoutFooter />
        </FirebaseContextProvider>
      </body>
    </html>
  )
}
