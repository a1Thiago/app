

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

export default function SearchInput({ ...props }: SearchInputProps) {
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        placeholder="Procurar pelo título"
        type="text"
        id="search"
        className="px-4 py-1 border border-theme-secondary-dark rounded placeholder:text-center w-96 tablet:w-72 mobile:w-auto"
        {...props}
      />
    </div>
  )
}
