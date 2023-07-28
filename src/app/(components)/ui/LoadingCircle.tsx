

export default function LoadingCircle() {
  return (
    <div className="flex justify-center items-center  col-span-full row-span-full">
      <div className="w-12 h-12 border-t-4 border-theme-secondary-dark rounded-full animate-spin"></div>
    </div>
  )
}

interface SmallLoadingCircle {
  className: string
}

export function SmallLoadingCircle({ className }: SmallLoadingCircle) {

  return (
    <div className="flex justify-center items-center  col-span-full row-span-full">
      <div className={`${className} border-t-4 border-theme-secondary-dark rounded-full animate-spin`}></div>
    </div>
  )
}
