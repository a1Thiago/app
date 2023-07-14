import { useFirebaseDataContext } from '@/contexts/FirebaseDataContext'
import { useState } from 'react'
interface StarProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filled: boolean
}
interface StarsProps {
  gameID: number
}

interface SortStarsProps {
  sortOrderOfRatings: 'asc' | 'desc' | 'fromZeroAsc'
}

export default function Stars({ gameID }: StarsProps) {

  const { userData, setDataOnDatabase } = useFirebaseDataContext()

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(-1)

  const handleStarClick = async (index: number) => {

    if (!userData) return

    const newRating = index + 1
    setDataOnDatabase('users', { ratings: { [gameID]: newRating } })
  }

  const handleDelete = () => {

    if (!userData) return

    setHoveredIndex(-1)
    handleStarClick(-1)
  }

  const gameRating = userData?.ratings?.[gameID]
  const rating = Number(gameRating)

  return (

    <div className="flex gap-1 group relative w-full">
      {Array.from({ length: 5 }).map((_, index) => {

        const filled = hoveredIndex !== -1
          ? index <= hoveredIndex!
          : index < rating

        return (
          <Star
            key={index}
            filled={filled}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            onClick={() => handleStarClick(index)}
          />
        )
      })}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1"
        onClick={handleDelete}
        stroke="currentColor"
        className="h-6 w-6 shrink-0 cursor-pointer absolute right-0 bottom-0.5 hover:scale-110">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    </div>

  )
}

export function SortStars({ sortOrderOfRatings }: SortStarsProps) {
  return (
    <div className={`flex  justify-center items-center gap-2 transition-all duration-500 
    ${sortOrderOfRatings === 'asc' && 'scale-x-[-1]'} ${sortOrderOfRatings === 'fromZeroAsc' && 'scale-x-[-1]'}`}>
      <div className='flex'>
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <div key={index} className='flex'>
              <Star filled={true} />
            </div>
          )
        })}
      </div>
      <svg className={`h-6 text-white transition-all duration-1000 transform 
      ${sortOrderOfRatings === 'asc' && ' -rotate-[540deg] '} ${sortOrderOfRatings === 'fromZeroAsc' && ' rotate-[540deg] '}`}
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g  > <polyline fill="none" points="16.4 7 21.5 12 16.4 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></polyline> <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" x1="2.5" x2="19.2" y1="12" y2="12"></line>  </g></svg>
      <Star filled={sortOrderOfRatings === 'fromZeroAsc'} />
    </div>
  )
}

function Star({ filled, ...props }: StarProps) {
  const fillClass = filled ? 'fill-amber-400' : 'fill-amber-400/60'
  return (
    <button className='group' {...props}>
      <svg className="h-7 w-7 shrink-0 cursor-pointer" viewBox="0 0 256 256">
        <path
          className={`duration-500 transition-all ${fillClass} hover:-translate-y-3`}
          d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"
        />
      </svg>
    </button>
  )
}