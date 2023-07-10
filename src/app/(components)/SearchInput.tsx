import { Game } from '../../scripts/fetchGames'
import InputWithLabel from './InputWithLabel'


interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  games: Game[]
}


export default function SearchInput({ games, ...props }: SearchInputProps) {

  const gameTitles = games.map(game => game.title)

  return (
    <div className='grid w-full gap-2'>

      <InputWithLabel
        label='Procurar pelo título'
        placeholder="Procurar pelo título"
        type="text"
        id="search"
        list='gameTitlesList'
        className="bg-transparent outline-none flex-1 placeholder:text-black/50 text-center"
        {...props}
      />

      <datalist id="gameTitlesList">
        {gameTitles.map((option) => {
          return (
            <option key={option} value={option} />
          )
        })}
      </datalist>

    </div >
  )
}
