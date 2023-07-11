interface CheckBoxButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  item: string
  className: string
}

export default function CheckBoxButtonComponent({ item, children, className, ...props }: CheckBoxButtonComponentProps) {
  return (
    <button
      type="button"
      tabIndex={0}
      {...props}
      className={`transition-all duration-500 rounded-lg font-semibold cursor-pointer hover:shadow-md '} ${className}`}>
      <label htmlFor={item} className='text-14 mobile:text-12 group-hover:cursor-pointer grid grid-flow-col items-center justify-center py-1 px-2'>
        <input
          tabIndex={-1}
          className='h-0 w-0'
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
