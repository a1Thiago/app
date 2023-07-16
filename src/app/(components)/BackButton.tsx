'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default function BackButton({ className, ...props }: BackButtonProps) {

  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <button
      {...props}
      type='button'
      className={`transition-all p-0.5 rounded hover:scale-95 ${className} `}
      onClick={handleClick}
      aria-label="Back button"
    >

      <svg fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.502 52.502" className="w-[inherit] h-[inherit] transition-all p-0.5 focus:bg-black/10 active:bg-black/10 rounded-xl hover:scale-95">
        <g strokeWidth={0}></g><g strokeLinecap="round" strokeLinejoin='round'></g><g id="SVGRepo_iconCarrier">
          <path d="M51.718,50.857l-1.341-2.252C40.075,31.295,25.975,32.357,22.524,32.917v13.642L0,23.995L22.524,1.644v13.43 c0.115,0,0.229-0.001,0.344-0.001c12.517,0,18.294,5.264,
 18.542,5.496c13.781,11.465,10.839,27.554,10.808,27.715L51.718,50.857z M25.505,30.735c5.799,0,16.479,1.923,24.993,14.345c0.128-4.872-0.896-15.095-10.41-23.012c-0.099-0.088-5.935-5.364-18.533-4.975
  l-1.03,0.03V6.447L2.832,24.001l17.692,17.724V31.311l0.76-0.188C21.338,31.109,22.947,30.735,25.505,30.735z"></path> </g></svg>

    </button >
  )
}