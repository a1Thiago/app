
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  onClick?: () => void
}

export default function Button({ label, onClick, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} className="disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-center truncate inline-block
     bg-theme-secondary text-white font-semibold mx-2 px-4 py-2 rounded hover:opacity-90 transition-opacity" {...props}>
      {label}
    </button>
  )
}
