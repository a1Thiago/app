import { useGameStore } from '@/contexts/gameStore'
import InputWithLabel from '@/app/(components)/ui/InputWithLabel'


interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }


export default function SearchInput({ ...props }: SearchInputProps) {

  const { modifiedGames } = useGameStore()

  const gameTitles = modifiedGames.map(game => game.title)

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
