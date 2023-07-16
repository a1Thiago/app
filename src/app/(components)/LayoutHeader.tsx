import Image from 'next/image'
import Link from 'next/link'
import HeaderButtons from './HeaderButtons'

export default function LayoutHeader() {
  return (
    <header className='px-4 py-2 bg-gradient-to-r from-theme-secondary to-theme-primary/70'>
      <div className='max-w-[1440px] mx-auto px-4'>
        <div className='grid grid-cols-2 mobile:grid-cols-1 justify-center items-center'>
          <Link className='grid mobile:hidden items-center h-12 w-12  relative' href={'/'}>
            <Image src={'/logo.png'} alt='a1Th logo' sizes="(max-width: 404px) 40vw , (max-width: 768px) 30vw, (min-width: 769px) 20vw"
              quality={100} fill className='transition-all hover:scale-125' />
          </Link>
          <span className='place-self-end min-w-[240px]'>
            <HeaderButtons />
          </span>
        </div>
      </div>

    </header>
  )
}
