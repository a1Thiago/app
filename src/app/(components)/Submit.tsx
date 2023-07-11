import { experimental_useFormStatus as useFormStatus } from 'react-dom'

type SubmitProps = {
  children: React.ReactNode
}

export default function Submit({ children }: SubmitProps) {

  const { pending } = useFormStatus()

  return (
    <button type='submit' disabled={pending}>{children}{pending && 'Carregando...'}</button>
  )
}
