import { useFirebaseDataContext } from '@/contexts/FirebaseDataContext'
import { useGameStore } from '@/contexts/gameStore'
import { Game } from '@/scripts/fetchGames'
import { useEffect, useState } from 'react'

interface GenresFilterProps extends React.HTMLProps<HTMLDivElement> {
  // games: Game[]
  selectedGenres: string[]
}

export default function GenresFilter({
  // games,
  selectedGenres, ...props }: GenresFilterProps) {

  const { userData } = useFirebaseDataContext()

  const { modifiedGames } = useGameStore()

  const allGenres = modifiedGames.map((game) => game.genre)
  const uniqueGenres = Array.from(new Set(allGenres))
  if (userData) {
    uniqueGenres.push('Favoritos')
  }
  const checked = (genre: string) => selectedGenres.includes(genre.toLowerCase())
  const favorites = modifiedGames.filter(game => userData?.favorites?.includes(game.id))

  return (
    <>
      <div className='grid gap-2'>
        <div className='font-medium'>Filtrar pelo gênero</div>
        <div className='grid grid-rows-2 gap-2 items-center truncate text-start desktop:grid-rows-3 
        grid-flow-col mobile:grid-flow-row mobile:grid-cols-2 tablet:grid-cols-3 tablet:grid-flow-row  '>

          {uniqueGenres.map((genre) => {

            const countOfGames =
              genre === 'Favoritos'
                ? favorites?.length
                : modifiedGames.filter((game) => game?.genre?.toLowerCase() === genre.toLowerCase()).length

            return (
              <div
                {...props}
                key={genre}
                className={`grid group transition-all duration-400 rounded-lg font-semibold cursor-pointer 
                ${checked(genre) ? 'bg-theme-secondary-dark text-white' : 'bg-theme-primary'} hover:shadow-md
                ${genre == 'Favoritos' && 'bg-red-500/50'} 
                //fix ${checked(genre) && genre == 'Favoritos' && 'bg-red-500/70'}
                `}>
                <label htmlFor={genre} className='text-14 mobile:text-12 group-hover:cursor-pointer grid grid-flow-col items-center justify-center py-1 px-2'>
                  <input
                    className='h-0 w-0'
                    type='checkbox'
                    id={genre}
                    value={genre}
                  // checked={checked(genre)}
                  />
                  {genre} (<span className='font-normal'>{countOfGames}</span>)
                </label>
              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}
