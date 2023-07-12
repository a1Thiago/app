'use client'
import InterceptorModal from '@/app/(components)/InterceptorModal'
import GamePageComponent from '@/app/(components)/GamePageComponent'

export default function GamePageModal({ params }: { params: { id: string } }) {

  const { id } = params

  if (!id) return

  return (
    <InterceptorModal url={`/game/${id}`}>
      <section className='p-10 w-auto'>
        <GamePageComponent id={id} />
      </section>
    </InterceptorModal>
  )
}
