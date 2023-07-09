
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  colorStyle?: 'primary' | 'secondary'
}

export default function Button({ label, colorStyle = 'primary', ...props }: ButtonProps) {

  const buttonStyle = colorStyle === 'primary' ? 'bg-theme-primary-dark' : 'bg-theme-secondary-dark'

  return (
    <button {...props}
      className={`disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-center truncate inline-block w-full
    ${buttonStyle} 
    text-white font-semibold p-2 rounded hover:opacity-90 transition-opacity`} >
      {label}
    </button>
  )
}
