'use client'
import GamePageComponent from '@/app/(components)/GamePageComponent'


export default function GamePage({ params }: { params: { id: string } }) {

  const { id } = params

  if (!id) return

  return (
    <GamePageComponent id={id} />
  )
}



