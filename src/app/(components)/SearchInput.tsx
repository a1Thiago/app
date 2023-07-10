import { Game } from '../../scripts/fetchGames'


interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  games: Game[]
}


export default function SearchInput({ games, ...props }: SearchInputProps) {

  const gameTitles = games.map(game => game.title)




  return (
    <div className='grid w-full gap-2'>
      <label htmlFor="search" className="font-medium">
        Procurar pelo título
      </label>
      < div className=" flex gap-2 text-14 items-center rounded px-2 h-10 bg-theme-primary/50 focus-within:ring-2 ring-theme-primary-dark focus-within:text-black text-black/80" >
        <input
          placeholder="Procurar pelo título"
          type="text"
          id="search"
          list='gameTitlesList'
          className="bg-transparent outline-none flex-1 placeholder:text-black/50 text-center"
          {...props}
        />
      </div >


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
