import LoadingCircle from '@/app/(components)/LoadingCircle'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center flex-col justify-center z-50 bg-white gap-4">
      <h2 className="text-black text-24 mobile:text-16 tablet:text-20">Carregando pagina</h2>
      <h3 className="text-black mt-4 text-18 mobile:text-14 tablet:text-16">Isso pode demorar alguns segundos...</h3>
      <LoadingCircle />
    </div>
  )
}