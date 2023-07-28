import { Envelope, Lock } from '@phosphor-icons/react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: 'password' | 'email'
  inputRef?: React.RefObject<HTMLInputElement>
}

export default function InputWithLabel({ label, icon, inputRef, ...props }: InputProps) {

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-16 font-medium" htmlFor={label}>
        {label}
      </label>
      <div className=" flex gap-2 ring-theme-primary-dark  ring-1 items-center rounded px-2 h-10 bg-theme-primary/50 focus-within:ring-2  focus-within:text-black text-black/80">
        {icon === 'password' && <Lock />}
        {icon === 'email' && <Envelope />}
        <input className="bg-transparent outline-none flex-1 placeholder:text-black/50" ref={inputRef}
          name={label} id={label}  {...props} />
      </div>
    </div>
  )
}