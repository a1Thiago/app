import Link from 'next/link'

export default function LayoutFooter() {
  return (
    <footer className='mt-auto bg-theme-secondary-dark text-white text-center py-1 font-semibold sticky bottom-0'>
      <Link href={'https://github.com/a1Thiago/app'} target='_blank' >
        GitHub
      </Link>
    </footer>
  )
}
