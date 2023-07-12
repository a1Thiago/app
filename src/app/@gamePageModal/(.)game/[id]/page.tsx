'use client'
import AuthModal from '@/app/(components)/AuthModal'
import GamePageComponent from '@/app/(components)/GamePageComponent'

export default function GamePageModal({ params }: { params: { id: string } }) {

  const { id } = params

  if (!id) return

  return (
    <AuthModal url={`--/game/${id}`}>
      <GamePageComponent id={id} />
    </AuthModal>
  )
}
