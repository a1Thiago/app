
export default function LoadingCircle() {
  return (
    <div className="flex justify-center items-center  col-span-full row-span-full">
      <div className="w-12 h-12 border-t-4 border-theme-secondary-dark rounded-full animate-spin"></div>
    </div>
  )
}

export function SmallLoadingCircle({ className }: { className: string }) {

  return (
    <div className="flex justify-center items-center  col-span-full row-span-full">
      <div className={`${className} border-t-4 border-theme-secondary-dark rounded-full animate-spin`}></div>
    </div>
  )
}
