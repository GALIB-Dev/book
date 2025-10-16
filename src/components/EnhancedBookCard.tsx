'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Book } from '@/types'
import { Play, Plus, Check, Clock, BookOpen } from 'lucide-react'

interface BookCardProps {
  book: Book
  onBookClick: (book: Book) => void
}

export function EnhancedBookCard({ book, onBookClick }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isInLibrary, setIsInLibrary] = useState(book.isInLibrary)
  const [imageError, setImageError] = useState(false)

  const handleAddToLibrary = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsInLibrary(!isInLibrary)
    // TODO: Implement actual library addition logic
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // Fallback book cover component
  const FallbackCover = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-white p-4">
      <BookOpen className="w-12 h-12 mb-2 text-gray-400" />
      <div className="text-center">
        <p className="text-sm font-semibold line-clamp-2 mb-1">{book.title}</p>
        <p className="text-xs text-gray-400">{book.author}</p>
      </div>
    </div>
  )

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onBookClick(book)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Book Cover */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-gray-800">
        {!imageError ? (
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={handleImageError}
            sizes="(max-width: 768px) 200px, 256px"
          />
        ) : (
          <FallbackCover />
        )}
        
        {/* Gradient Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
        />
        
        {/* Reading Progress Bar */}
        {book.currentPage && book.pageCount && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${(book.currentPage / book.pageCount) * 100}%` }}
            />
          </div>
        )}
        
        {/* Hover Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-4 right-4 flex justify-between items-end"
        >
          <div className="text-white flex-1 mr-4">
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-xs text-gray-300 mb-2">
              {book.author}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded font-medium">
                ★ {book.rating}
              </span>
              <span className="text-gray-300">{book.publishedYear}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onBookClick(book)
              }}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors"
            >
              <Play className="w-4 h-4 text-black" fill="currentColor" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToLibrary}
              className="w-8 h-8 bg-gray-700/80 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-600/80 transition-colors"
            >
              {isInLibrary ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Plus className="w-4 h-4 text-white" />
              )}
            </motion.button>
          </div>
        </motion.div>
        
        {/* Continue Reading Badge */}
        {book.currentPage && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Continue
          </div>
        )}
        
        {/* New Release Badge */}
        {book.publishedYear >= new Date().getFullYear() - 1 && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
            New
          </div>
        )}
      </div>
    </motion.div>
  )
}