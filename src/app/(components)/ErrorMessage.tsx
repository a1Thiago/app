import Image from 'next/image'

interface ErrorProps {
  error: string
}

export default function ErrorMessage({ error }: ErrorProps) {
  return (
    <div className='grid gap-8  place-items-center text-center p-4'>
      <h3 className='text-32 tablet:text-24 mobile:text-20 font-medium mt-32'>{error}</h3>
      <Image src={'/error.png'} alt='error image' width={100} height={100} />
    </div>
  )
}
