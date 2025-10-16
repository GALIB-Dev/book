'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Book } from '@/types'
import { BookCard } from './BookCard'

interface BookRowProps {
  title: string
  books: Book[]
  onBookClick: (book: Book) => void
}

export function BookRow({ title, books, onBookClick }: BookRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 160 : 320 * 2 // Smaller scroll on mobile
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative group/row">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>
      
      <div className="relative">
        {/* Left Arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:bg-black/70 touch-target"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.button>
        
        {/* Right Arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:bg-black/70 touch-target"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.button>
        
        {/* Books Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 py-2 mobile-scroll"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-36 sm:w-48 lg:w-56 xl:w-64"
            >
              <BookCard book={book} onBookClick={onBookClick} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}