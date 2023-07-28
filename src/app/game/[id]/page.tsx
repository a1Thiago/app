
import BackButton from '@/app/(components)/ui/BackButton'
import GamePageComponent from '@/app/(components)/GamePageComponent'


export default function GamePage({ params }: { params: { id: string } }) {

  const { id } = params

  if (!id) return

  return (
    <div className='flex flex-col'>
      <span className='left-4 absolute'>
        <BackButton className='text-black h-8 w-8' />
      </span>
      <h2 className='text-32 font-semibold tablet:text-24 mobile:text-18 mt-12 mb-4'>Mais Informaçoes sobre o jogo</h2>
      <GamePageComponent id={id} />
    </div>
  )
}



