
import Image from 'next/image'
import EmptyTableMessage from './(components)/EmptyTableMessage'
import { headers } from 'next/headers'

export default function page() {

  const path = headers()?.get('x-invoke-path')?.toLowerCase()

  return (

    <div className='flex flex-col items-center justify-center h-screen'>
      <EmptyTableMessage message={`A pagina ${path} não existe.`}>
        <span className='grid justify-center w-full'>
          <Image className='animate-bounce-slow' src={'/empty.png'} height={200} width={200} alt='Esta pagina não existe' />
        </span>
      </EmptyTableMessage>

      <div className='flex flex-col justify-center mt-6'>
        <a href='/'>
          <button className='px-4 py-2 text-sm font-semibold text-white bg-theme-secondary-dark rounded hover:bg-red-600 active:bg-red-600 focus:bg-red-600'>
            Clique aqui para voltar a pagina inicial.
          </button>
        </a>
      </div>
    </div>
  )
}


