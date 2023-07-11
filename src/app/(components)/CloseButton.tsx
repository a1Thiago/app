
interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
}

export default function CloseButton({ className, ...props }: CloseButtonProps) {

  return (
    <button
      {...props}
      type='button'
      className={`absolute top-2 right-2 transition-all p-0.5 rounded hover:scale-95 ${className} `}
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}