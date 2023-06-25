import { Game } from '../scripts/fetchGames'

interface GenresFilterProps extends React.InputHTMLAttributes<HTMLInputElement> {
  games: Game[]
  selectedGenres: string[]
}

export default function GenresFilter({ games, selectedGenres, ...props }: GenresFilterProps) {

  const allGenres = games.map((game) => game.genre)
  const uniqueGenres = Array.from(new Set(allGenres))

  return (

    <div className='grid gap-2'>
      <div className='font-medium'>Filtrar pelo gênero</div>
      <div className='grid grid-rows-2 gap-2 items-center truncate text-start desktop:grid-rows-3 grid-flow-col mobile:grid-flow-row mobile:grid-cols-2 tablet:grid-cols-3 tablet:grid-flow-row  '>

        {uniqueGenres.map((genre) => {

          const countOfGames = games
            .map((game) => game.genre.toLowerCase() === genre.toLowerCase())
            .filter((game) => game)
            .length

          return (
            <div key={genre} >
              <label htmlFor={genre} className='mobile:text-14'>
                <input
                  className='mx-1 rounded cursor-pointer'
                  type='checkbox'
                  value={genre}
                  checked={selectedGenres.includes(genre.toLowerCase())}
                  {...props}
                />
                {genre} ({countOfGames})
              </label>
            </div>
          )
        })}

      </div>
    </div>
  )
}
