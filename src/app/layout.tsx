import Image from 'next/image'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import isProduction from '@/utils/environment'

const inter = Inter({ subsets: ['latin'] })

const URL = 'https://a1th.dev'
const TITLE = 'a1Th App-Masters'
const DESCRIPTION = 'Projeto de Estágio Frontend React'

export const metadata = {

  metadataBase: URL,
  title: TITLE,
  description: DESCRIPTION,
  ...(isProduction ? { manifest: "/manifest.json" } : {}),
  themeColor: "#9CC9FF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: TITLE,
    startUpImage: ['/og.png'],
  },
  formatDetection: {
    telephone: false,
  },
  category: 'games',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
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
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#f3f4f6]`}>
        <header className='px-4 py-2 bg-theme-primary'>
          <div className='max-w-[1440px] mx-auto'>
            <Image src={'/logo2.svg'} alt='a1Th logo' width={100} height='0' className='-my-8' />
            {/* TODO FIX THE LOGOS FILES */}
          </div>
        </header>
        <main className='max-w-[1440px] mx-auto'>
          {children}
        </main>
        <footer className='mt-auto bg-theme-secondary-dark text-white text-center py-2 font-semibold'>
          <Link href={'https://github.com/a1Thiago/app-masters'} target='_blank' >
            GitHub
          </Link>
        </footer>
      </body>
    </html>
  )
}
