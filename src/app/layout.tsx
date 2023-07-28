import './globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import LayoutHeader from './(components)/LayoutHeader'
import LayoutFooter from './(components)/LayoutFooter'

import isProduction from '@/lib/environment'
import FirebaseAuthContextProvider from '@/contexts/FirebaseAuthContext'
import FirebaseDataContextProvider from '@/contexts/FirebaseDataContext'
import GamesStoreProvider from '@/contexts/gameStore'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = new URL('https://app-masters-a1th.vercel.app/')
const DEFAULT_TITLE = 'GameList'
const TEMPLATE_TITLE = '%s | GameList'
const DESCRIPTION = 'Projeto criado para o processo seletivo Estágio Frontend React da App Masters'

export const metadata: Metadata = {

  metadataBase: APP_URL,
  title: { default: DEFAULT_TITLE, template: TEMPLATE_TITLE },

  description: DESCRIPTION,
  ...(isProduction ? { manifest: '/manifest.json' } : {}),
  themeColor: '#9CC9FF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: DEFAULT_TITLE,
    startupImage: ['/og.png']
  },
  formatDetection: {
    telephone: false,
  },
  category: 'games',
  openGraph: {
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
    url: APP_URL,
    siteName: DEFAULT_TITLE,
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
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
    creator: 'a1Th',
    images: ['/og.png'],
  },

}

export default function RootLayout({
  children,
  authModal,
  gamePageModal
}: {
  children: React.ReactNode
  authModal: React.ReactNode
  gamePageModal: React.ReactNode
}) {
  return (
    <html lang='pt'>
      <body className={`${inter.className} flex flex-col min-h-screen `}>
        <NextTopLoader color='#284F80' height={5} />
        <FirebaseAuthContextProvider >
          <FirebaseDataContextProvider >
            <LayoutHeader />
            <GamesStoreProvider />
            <main className='w-full max-w-[1440px] mx-auto px-4'>
              {authModal}
              {gamePageModal}
              {children}
            </main>
            <LayoutFooter />
          </FirebaseDataContextProvider>
        </FirebaseAuthContextProvider>
      </body>
    </html>
  )
}
