import './globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader';
import isProduction from '@/lib/environment'
import LayoutHeader from './(components)/LayoutHeader'
import LayoutFooter from './(components)/LayoutFooter'
import FirebaseAuthContextProvider from '@/contexts/FirebaseAuthContext'
import FirebaseDataContextProvider from '@/contexts/FirebaseDataContext'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = new URL('https://app-masters-a1th.vercel.app/')
const TITLE = 'a1Th App-Masters'
const DESCRIPTION = 'Projeto de Estágio Frontend React'

export const metadata: Metadata = {

  metadataBase: APP_URL,
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
    url: APP_URL,
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
      <body className={`${inter.className} flex flex-col min-h-screen `}>
        <NextTopLoader color='var(--secondary-dark)' />
        <FirebaseAuthContextProvider >
          <FirebaseDataContextProvider >
            <LayoutHeader />
            <main className='max-w-[1440px] mx-auto'>
              {children}
            </main>
            <LayoutFooter />
          </FirebaseDataContextProvider>
        </FirebaseAuthContextProvider>
      </body>
    </html>
  )
}
