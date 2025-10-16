'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addUserBook } from '@/lib/storage'
import { Book } from '@/types'
import { motion } from 'framer-motion'

export default function UploadPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const [epubUrl, setEpubUrl] = useState('')
  const [format, setFormat] = useState<'PDF' | 'EPUB' | 'BOTH'>('PDF')
  const [genre, setGenre] = useState('General')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !author || (!pdfUrl && !epubUrl)) return
    setIsSubmitting(true)

    const newBook: Book = {
      id: `user-${Date.now()}`,
      title,
      author,
      coverUrl: coverUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(title)}`,
      description: `${title} by ${author}`,
      pdfUrl: format === 'PDF' || format === 'BOTH' ? pdfUrl : undefined,
      epubUrl: format === 'EPUB' || format === 'BOTH' ? epubUrl : undefined,
      format,
      genre,
      rating: 0,
      publishedYear: new Date().getFullYear(),
      pageCount: 0,
      isInLibrary: true
    }

    addUserBook(newBook)
    setTimeout(() => {
      router.push('/')
    }, 200)
  }

  return (
    <div className="min-h-screen bg-black bg-grid text-white pt-20 px-4 mobile-padding">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-6">Add a Book</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Title *</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-400"
                placeholder="e.g., Linear Algebra Notes"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Author *</label>
              <input
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-400"
                placeholder="e.g., Prof. Smith"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Format *</label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as 'PDF' | 'EPUB' | 'BOTH')}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                required
              >
                <option value="PDF">PDF Only</option>
                <option value="EPUB">EPUB Only</option>
                <option value="BOTH">Both PDF & EPUB</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Cover URL (optional)</label>
              <input
                value={coverUrl}
                onChange={e => setCoverUrl(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-400"
                placeholder="https://...jpg"
                type="url"
              />
            </div>

            {(format === 'PDF' || format === 'BOTH') && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">PDF URL {format === 'BOTH' ? '(optional)' : '*'}</label>
                <input
                  value={pdfUrl}
                  onChange={e => setPdfUrl(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-400"
                  placeholder="https://...pdf"
                  type="url"
                  required={format === 'PDF'}
                />
              </div>
            )}

            {(format === 'EPUB' || format === 'BOTH') && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">EPUB URL {format === 'BOTH' ? '(optional)' : '*'}</label>
                <input
                  value={epubUrl}
                  onChange={e => setEpubUrl(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-400"
                  placeholder="https://...epub"
                  type="url"
                  required={format === 'EPUB'}
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-300 mb-2">Genre</label>
              <input
                value={genre}
                onChange={e => setGenre(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-400"
                placeholder="e.g., Science, Math, Literature"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-lg px-6 py-4 font-semibold text-lg touch-target btn-shine"
            >
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}