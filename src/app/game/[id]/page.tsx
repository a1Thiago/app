'use client'
import GamePageComponent from '@/app/(components)/GamePageComponent'


export default function GamePage({ params }: { params: { id: string } }) {

  if (!params?.id) return

  return (
    <GamePageComponent id={params?.id} />
  )
}



