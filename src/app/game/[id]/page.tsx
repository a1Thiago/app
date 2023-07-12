'use client'
import BackButton from '@/app/(components)/BackButton'
import GamePageComponent from '@/app/(components)/GamePageComponent'


export default function GamePage({ params }: { params: { id: string } }) {

  const { id } = params

  if (!id) return

  return (
    <div className=''>
      <span className='left-4 absolute'>
        <BackButton className='text-black' />
      </span>
      <h2 className='text-32 font-semibold '>Mais Informaçoes sobre o jogo</h2>
      <GamePageComponent id={id} />
    </div>
  )
}



