import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from './Button'

interface ErrorProps {
  error: string
}

export default function ErrorMessage({ error }: ErrorProps) {

  const router = useRouter()

  const errorStatusRegex = /(?<=\()\d+(?=\))/g

  const errorStatus = error?.match(errorStatusRegex)

  return (
    <div className='mt-32 grid gap-2 place-items-center text-center p-4'>
      <p className='text-24 tablet:text-20 mobile:text-16'>{error}</p>
      <Image src={'/error.png'} alt='error image' width={100} height={100} />
      {errorStatus && (<h3 className='text-32 tablet:text-24 mobile:text-20 font-bold text-red-500'>{errorStatus}</h3>)}
      <span className='mt-4'>
        <Button colorStyle='secondary' label='Click aqui para tentar novamente' onClick={() => router.refresh()} />
      </span>
    </div>
  )
}
