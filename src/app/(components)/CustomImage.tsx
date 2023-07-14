import { useEffect, useState } from 'react'
import Image from 'next/dist/client/image'
import { ImageProps } from 'next/image'


interface CustomImageProps extends ImageProps {
  alt: string
  src: string
  className?: string
}

export default function CustomImage({ alt, src, className, ...props }: CustomImageProps) {

  const fallbackImage = '/error.png'

  const [error, setError] = useState(false)

  const handleImageError = () => {
    setError(true)
  }

  return <Image {...props}
    onError={handleImageError} src={error ? fallbackImage : src}
    // blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcc/L/fwAH0gNlHyeiMAAAAABJRU5ErkJggg=='
    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcc/J/HwAHYQL0xs6VQgAAAABJRU5ErkJggg=='
    placeholder='blur'
    className={`w-full h-full self-center  ${className}`}
    alt={alt}
  />
}
