
import { Metadata } from 'next'

import fetchGamesImage from '@/scripts/fetchGamesImage'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {

  try {

    const id = params?.id

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