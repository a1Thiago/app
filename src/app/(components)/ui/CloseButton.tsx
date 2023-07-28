
interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
}

export default function CloseButton({ className, ...props }: CloseButtonProps) {

  return (
    <button
      {...props}
      type='button'
      aria-label="Close button"
      className={`absolute top-2 right-2  ${className} `}
    >
      <svg
        className="w-[inherit] h-[inherit] "
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