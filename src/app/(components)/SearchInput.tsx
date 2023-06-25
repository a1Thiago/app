import { Game } from '../scripts/fetchGames'


interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  games: Game[]
}


export default function SearchInput({ games, ...props }: SearchInputProps) {

  const gameTitles = games.map(game => game.title)

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        placeholder="Procurar pelo título"
        type="text"
        id="search"
        list='gameTitlesList'
        className="px-4 py-1 border border-theme-secondary-dark rounded placeholder:text-center w-96 tablet:w-72 mobile:w-auto"
        {...props}
      />

      <datalist id="gameTitlesList">
        {gameTitles.map((option) => {
          return (
            <option key={option} value={option} />
          )
        })}
      </datalist>

    </>
  )
}
