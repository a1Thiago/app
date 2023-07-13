import { useFirebaseDataContext } from '@/contexts/FirebaseDataContext'
import { useGameStore } from '@/contexts/gameStore'
import CheckBoxButtonComponent from './CheckBoxButtonComponent'

interface GenresFilterProps extends React.HTMLProps<HTMLDivElement> {
  selectedGenres: string[]
}

export default function GenresFilter({ selectedGenres, ...props }: GenresFilterProps) {

  const { modifiedGames } = useGameStore()

  const { userData } = useFirebaseDataContext()

  const allGenres = modifiedGames.map((game) => game.genre)
  const uniqueGenres = Array.from(new Set(allGenres))
  const favorites = modifiedGames?.filter(game => game?.isFavorite)

  if (userData) {
    uniqueGenres.push('Favoritos')
  }

  const checked = (genre: string) => selectedGenres.includes(genre?.toLowerCase())

  return (
    <>
      <div className='grid gap-2 w-full'>
        <div className='font-medium'>Filtrar pelo gênero</div>
        <div className='grid grid-rows-2 gap-2 items-center truncate text-start desktop:grid-rows-3 
        grid-flow-col mobile:grid-flow-row mobile:grid-cols-2 tablet:grid-cols-3 tablet:grid-flow-row  '>

          {uniqueGenres.map((genre) => {

            const countOfGames =
              genre === 'Favoritos'
                ? favorites?.length
                : modifiedGames.filter((game) => game?.genre?.toLowerCase() === genre.toLowerCase()).length

            return (

              <div key={genre} {...props} className='grid group'>
                <CheckBoxButtonComponent
                  item={genre}
                  className={`
                            ${checked(genre) ? 'bg-theme-secondary-dark text-white' : 'bg-theme-primary'}
                            ${genre === 'Favoritos' && 'bg-red-500/50'}
                            // fix ${checked(genre) && genre === 'Favoritos' && 'bg-red-500/70'}`}>
                  {genre}<span className='font-normal'>({countOfGames})</span>
                </CheckBoxButtonComponent>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
