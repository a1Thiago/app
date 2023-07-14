import Image from 'next/image'

interface ErrorProps {
  error: string
}

export default function ErrorMessage({ error }: ErrorProps) {

  const errorStatusRegex = /(?<=\()\d+(?=\))/g

  const errorStatus = error?.match(errorStatusRegex)

  return (
    <div className='grid col-span-full text-center space-y-28 mobile:space-y-16  place-items-center p-4'>
      <p className='text-24 tablet:text-20 mobile:text-16 font-semibold'>{error}</p>
      <Image className='animate-bounce-slow my-12' src={'/error.png'} alt='error image' width={200} height={200} />
      {errorStatus && (<h3 className='text-32  mobile:text-24 font-bold text-red-500'>{errorStatus}</h3>)}
    </div>
  )
}
