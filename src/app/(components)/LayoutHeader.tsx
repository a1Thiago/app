import Image from 'next/image'
import Link from 'next/link'
import HeaderButtons from './HeaderButtons'

export default function LayoutHeader() {
  return (
    <header className='px-4 py-2 bg-gradient-to-r from-theme-secondary to-theme-primary/70'>
      <div className='max-w-[1440px] mx-auto'>
        <div className='grid grid-cols-2 items-center'>
          <Link href={'/'}>
            <Image src={'/logo2.svg'} alt='a1Th logo' width={100} height='0' className='-my-8' />
          </Link>
          {/* TODO FIX THE LOGOS FILES */}
          <span className='place-self-end min-w-[240px]'>
            <HeaderButtons />
          </span>
        </div>
      </div>

    </header>
  )
}
