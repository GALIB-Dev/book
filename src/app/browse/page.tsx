'use client'

import { useMemo, useState } from 'react'
import { getAllBooks } from '@/lib/mockData'
import { Book } from '@/types'
import { BookCard } from '@/components/BookCard'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function BrowsePage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')

  const books: Book[] = getAllBooks()

  const genres = useMemo(() => {
    return Array.from(new Set(books.map(b => b.genre))).sort()
  }, [books])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return books.filter(b => {
      if (genre && b.genre !== genre) return false
      if (!q) return true
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      )
    })
  }, [books, query, genre])

  const handleBookClick = (book: Book) => {
    router.push(`/reader?id=${book.id}`)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 mobile-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Browse Books</h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-400"
              placeholder="Search by title or author"
            />
            <select
              value={genre}
              onChange={e => setGenre(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 min-w-[140px]"
            >
              <option value="">All Genres</option>
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-400 mb-4">
            {filtered.length} book{filtered.length !== 1 ? 's' : ''} found
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <BookCard book={book} onBookClick={handleBookClick} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No books found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}


