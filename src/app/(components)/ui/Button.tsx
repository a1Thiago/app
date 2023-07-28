
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  colorStyle?: 'primary' | 'secondary'
}

export default function Button({ children, colorStyle = 'primary', ...props }: ButtonProps) {

  const buttonStyle = colorStyle === 'primary' ? 'bg-theme-secondary/90 text-black ' : 'bg-theme-secondary-dark text-white'

  return (
    <button {...props}
      className={`disabled:opacity-60 disabled:pointer-events-none cursor-pointer text-center truncate inline-block w-full border border-black/30
    ${buttonStyle} 
     font-semibold p-2 rounded hover:opacity-90 transition-opacity mobile:text-12 tablet:text-14`} >
      {children}
    </button>
  )
}
