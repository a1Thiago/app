'use client'
import AuthModal from '@/app/(components)/AuthModal'
import GamePageComponent from '@/app/(components)/GamePageComponent'

export default function GamePageModal({ params }: { params: { id: string } }) {

  if (!params.id) return

  return (
    <AuthModal url={`--------------------/game/${params.id}`}>
      <GamePageComponent id={params?.id} />
    </AuthModal>
  )
}
