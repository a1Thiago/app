
interface EmptyTableMsgProps {
  message: string
  children?: React.ReactNode
}

export default function EmptyTableMsg({ message, children }: EmptyTableMsgProps) {
  return (
    <div className='col-span-full text-center space-y-28 mobile:space-y-16 py-24 mobile:py-12'>
      <h3 className='text-32 tablet:text-24 mobile:text-20 font-medium'>{message}</h3>
      {children}
    </div>
  )
}
