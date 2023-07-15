import { metadata } from '@/app/layout'
import { useGameStore } from '@/contexts/gameStore'
import fetchGames from '@/scripts/fetchGames'
import fetchGamesImage from '@/scripts/fetchGamesImage'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  try {

    const id = params.id

    const game = await fetchGamesImage(Number(id))

    if (!game!?.id) throw new Error()

    const { title, thumbnail } = game

    return {
      title: title,
      openGraph: {
        images: [thumbnail],
      },
    }
  } catch (error) {

    return { title: params?.id }
  }

}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      {children}
    </>
  )
}