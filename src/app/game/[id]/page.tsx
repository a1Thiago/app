
import BackButton from '@/app/(components)/BackButton'
import GamePageComponent from '@/app/(components)/GamePageComponent'


export default function GamePage({ params }: { params: { id: string } }) {

  const { id } = params

  if (!id) return

  return (
    <div className='flex flex-col'>
      <span className='left-4 mt-2 absolute '>
        <BackButton className='text-black h-10 w-10' />
      </span>
      <div className='w-[100vw] mt-16'>
        <h2 className='text-32 font-semibold tablet:text-24 mobile:text-18'>Mais Informaçoes sobre o jogo</h2>
        <GamePageComponent id={id} />
      </div>
    </div>
  )
}



