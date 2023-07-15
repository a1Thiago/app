import Image from 'next/image'
import Link from 'next/link'
import HeaderButtons from './HeaderButtons'

export default function LayoutHeader() {
  return (
    <header className='px-4 py-2 bg-gradient-to-r from-theme-secondary to-theme-primary/70'>
      <div className='max-w-[1400px] mx-auto'>
        <div className='grid grid-cols-2 mobile:grid-cols-1 justify-center items-center'>
          <Link className='grid mobile:hidden items-center h-12 w-12  relative' href={'/'}>
            <Image src={'/logo.png'} alt='a1Th logo' quality={100} fill className='transition-all hover:scale-125' />
          </Link>
          <span className='place-self-end min-w-[240px]'>
            <HeaderButtons />
          </span>
        </div>
      </div>

    </header>
  )
}
