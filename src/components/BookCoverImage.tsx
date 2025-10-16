'use client'

import Image from 'next/image'
import { useState } from 'react'
import { BookOpen } from 'lucide-react'

interface BookCoverImageProps {
  src: string
  alt: string
  title: string
  author: string
  className?: string
  fill?: boolean
  sizes?: string
}

export function BookCoverImage({ 
  src, 
  alt, 
  title, 
  author, 
  className = "", 
  fill = false,
  sizes 
}: BookCoverImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  // Generate a color based on the book title for consistent fallback colors
  const generateColor = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const colors = [
      'from-blue-600 to-blue-800',
      'from-purple-600 to-purple-800',
      'from-green-600 to-green-800',
      'from-red-600 to-red-800',
      'from-indigo-600 to-indigo-800',
      'from-pink-600 to-pink-800',
      'from-yellow-600 to-yellow-800',
      'from-teal-600 to-teal-800'
    ]
    return colors[Math.abs(hash) % colors.length]
  }

  const FallbackCover = () => (
    <div className={`w-full h-full bg-gradient-to-br ${generateColor(title)} flex flex-col items-center justify-center text-white p-4 ${className}`}>
      <BookOpen className="w-8 h-8 md:w-12 md:h-12 mb-2 text-white/80" />
      <div className="text-center">
        <p className="text-xs md:text-sm font-semibold line-clamp-3 mb-1">{title}</p>
        <p className="text-xs text-white/70 line-clamp-2">{author}</p>
      </div>
    </div>
  )

  const LoadingCover = () => (
    <div className={`w-full h-full bg-gray-700 animate-pulse flex items-center justify-center ${className}`}>
      <BookOpen className="w-8 h-8 text-gray-500" />
    </div>
  )

  if (imageError) {
    return <FallbackCover />
  }

  if (isLoading) {
    return (
      <>
        <LoadingCover />
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className={`${className} opacity-0`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          sizes={sizes}
        />
      </>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
      sizes={sizes}
    />
  )
}