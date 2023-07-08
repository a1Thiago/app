import AuthButtons from './AuthButtons'
import Image from 'next/image'
import Link from 'next/link'

export default function LayoutHeader() {
  return (
    <header className='px-4 py-2 bg-theme-primary'>
      <div className='max-w-[1440px] mx-auto'>
        <Link href={'/'}>
          <Image src={'/logo2.svg'} alt='a1Th logo' width={100} height='0' className='-my-8' />
        </Link>
        {/* TODO FIX THE LOGOS FILES */}
      </div>
      <AuthButtons />
    </header>
  )
}
