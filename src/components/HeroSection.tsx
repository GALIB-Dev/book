'use client'

import { motion } from 'framer-motion'
import { BookCoverImage } from './BookCoverImage'
import { Play, Info, Plus, Check } from 'lucide-react'
import { Book } from '@/types'
import { useState } from 'react'

interface HeroSectionProps {
  featuredBook: Book
}

export function HeroSection({ featuredBook }: HeroSectionProps) {
  const [isInLibrary, setIsInLibrary] = useState(featuredBook.isInLibrary)

  const handleAddToLibrary = () => {
    setIsInLibrary(!isInLibrary)
    // TODO: Implement actual library addition logic
  }

  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <BookCoverImage
          src={featuredBook.coverUrl}
          alt={featuredBook.title}
          title={featuredBook.title}
          author={featuredBook.author}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center bg-gradient-to-b from-black/40 via-black/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold gradient-text mb-4">
              {featuredBook.title}
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-200 mb-2">
              by {featuredBook.author}
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded font-semibold">
                ★ {featuredBook.rating}
              </span>
              <span className="text-gray-300">{featuredBook.publishedYear}</span>
              <span className="text-gray-300">{featuredBook.pageCount} pages</span>
              <span className="bg-gray-700 text-white px-2 py-1 rounded text-sm">
                {featuredBook.genre}
              </span>
            </div>
            
            <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
              {featuredBook.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors btn-shine"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Start Reading
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 glass text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                <Info className="w-5 h-5" />
                More Info
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToLibrary}
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/70 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                {isInLibrary ? (
                  <>
                    <Check className="w-5 h-5" />
                    In Library
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add to Library
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}