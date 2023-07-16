
import InterceptorModal from '@/app/(components)/InterceptorModal'
import GamePageComponent from '@/app/(components)/GamePageComponent'

export default function GamePageModal({ params }: { params: { id: string } }) {

  const { id } = params

  if (!id) return

  return (
    <InterceptorModal url={`/game/${id}`}>
      <div className='h-auto px-8 py-12 mobile:px-4 w-[90vw] mobile:w-[95vw]'>
        <GamePageComponent id={id} />
      </div>
    </InterceptorModal>
  )
}
