
import InterceptorModal from '@/app/(components)/ui/InterceptorModal'
import GamePageComponent from '@/app/(components)/GamePageComponent'

export default function GamePageModal({ params }: { params: { id: string } }) {

  const { id } = params

  if (!id) return

  return (
    <InterceptorModal url={`/game/${id}`}>
      <div className='h-auto px-8 py-12 mobile:px-4 w-[85vw] mobile:w-[90vw]'>
        <GamePageComponent id={id} />
      </div>
    </InterceptorModal>
  )
}
