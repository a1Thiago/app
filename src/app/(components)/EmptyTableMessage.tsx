
interface EmptyTableMessageProps {
  message: string
  children?: React.ReactNode
}

export default function EmptyTableMessage({ message, children }: EmptyTableMessageProps) {
  return (
    <div className='col-span-full text-center space-y-28 mobile:space-y-16 '>
      <h3 className='text-32 tablet:text-24 mobile:text-20 font-medium'>{message}</h3>
      {children}
    </div>
  )
}
