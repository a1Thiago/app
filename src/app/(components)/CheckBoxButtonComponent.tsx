interface CheckBoxButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  item: string
  className?: string
}

export default function CheckBoxButtonComponent({ item, children, className, ...props }: CheckBoxButtonComponentProps) {
  return (
    <button
      type="button"
      tabIndex={0}
      {...props}
      className={`group transition-all duration-500 rounded-lg font-semibold cursor-pointer disabled:pointer-events-none hover:shadow-md '} ${className}`}>
      <label htmlFor={item} className='group flex text-14 mobile:text-12 group-hover:cursor-pointer items-center justify-center py-1 px-2'>
        <input
          tabIndex={-1}
          className='h-0 w-0 group'
          type='checkbox'
          id={item}
          value={item}
        // checked={checked(item)}
        />
        {children}
      </label>
    </button>
  )
}
