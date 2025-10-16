'use client'

import { useMemo, useState } from 'react'
import { getAllBooks } from '@/lib/mockData'
import { Book } from '@/types'
import { BookCard } from '@/components/BookCard'
import { motion } from 'framer-motion'

export default function BrowsePage() {
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

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Browse</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Search by title or author"
          />
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
          >
            <option value="">All Genres</option>
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <BookCard book={book} onBookClick={() => {}}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


