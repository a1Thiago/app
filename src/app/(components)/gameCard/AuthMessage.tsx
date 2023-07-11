import { useState } from 'react'
import CloseButton from '../CloseButton'

export default function AuthMessage() {

  const [modalVisible, setModalVisible] = useState(true)

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  if (modalVisible) return (
    (<div className='fixed top-0 right-0  w-full h-full flex items-center justify-center z-50'>
      <div className='bg-theme-secondary-dark  text-white p-12 rounded-md shadow-sm  relative mx-4 text-center z-20'>
        <span onClick={handleCloseModal}>
          <CloseButton className=' text-white' />
        </span>
        <h2 className='text-32 font-bold mb-4'>Ola</h2>
        <p>Para fazer isto voce precisa estar autenticado</p>
        <div className='flex items-center justify-center gap-5'>
        </div>
        <button
          className='flex items-center  text-white font-bold py-2 px-4 rounded mt-4'
        >
          Entra
        </button>
      </div>
    </div>)
  )

  return <></>
}
