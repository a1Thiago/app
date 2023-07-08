import Link from 'next/link'

export default function LayoutFooter() {
  return (
    <footer className='mt-auto bg-theme-secondary-dark text-white text-center py-2 font-semibold'>
      <Link href={'https://github.com/a1Thiago/app'} target='_blank' >
        GitHub
      </Link>
    </footer>
  )
}
