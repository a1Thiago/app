
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  colorStyle?: 'primary' | 'secondary'
}

export default function Button({ children, colorStyle = 'primary', ...props }: ButtonProps) {

  const buttonStyle = colorStyle === 'primary' ? 'bg-theme-primary-dark' : 'bg-theme-secondary-dark'

  return (
    <button {...props}
      className={`disabled:opacity-60 disabled:pointer-events-none cursor-pointer text-center truncate inline-block w-full
    ${buttonStyle} 
    text-white font-semibold p-2 rounded hover:opacity-90 transition-opacity mobile:text-12 tablet:text-14`} >
      {children}
    </button>
  )
}
