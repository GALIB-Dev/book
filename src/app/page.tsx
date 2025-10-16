'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { HeroSection } from '@/components/HeroSection'
import { BookRow } from '@/components/BookRow'
import { Navbar } from '@/components/Navbar'
import { Book } from '@/types'
import { 
  getFeaturedBook, 
  getCurrentlyReading, 
  getMyLibrary, 
  getTrendingBooks, 
  getBooksByGenre 
} from '@/lib/mockData'

export default function Home() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [featuredBook, setFeaturedBook] = useState<Book | null>(null)
  const [currentlyReading, setCurrentlyReading] = useState<Book[]>([])
  const [myLibrary, setMyLibrary] = useState<Book[]>([])
  const [trending, setTrending] = useState<Book[]>([])
  const [sciFiBooks, setSciFiBooks] = useState<Book[]>([])
  const [fantasyBooks, setFantasyBooks] = useState<Book[]>([])

  useEffect(() => {
    // Load data
    setFeaturedBook(getFeaturedBook())
    setCurrentlyReading(getCurrentlyReading())
    setMyLibrary(getMyLibrary())
    setTrending(getTrendingBooks())
    setSciFiBooks(getBooksByGenre('Science Fiction'))
    setFantasyBooks(getBooksByGenre('Fantasy'))

    // Handle scroll for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookClick = (book: Book) => {
    router.push(`/reader?id=${book.id}`)
  }

  const handleSearchClick = () => {
    // TODO: Open search modal
    console.log('Opening search')
  }

  if (!featuredBook) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar 
        isScrolled={isScrolled} 
        onSearchClick={handleSearchClick}
        user={{
          name: 'John Doe',
          image: 'https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=1f2937'
        }}
      />
      
      <main>
        <HeroSection featuredBook={featuredBook} />
        
        <div className="space-y-12 pb-20">
          {currentlyReading.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <BookRow 
                title="Continue Reading" 
                books={currentlyReading} 
                onBookClick={handleBookClick}
              />
            </motion.div>
          )}
          
          {myLibrary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <BookRow 
                title="My Library" 
                books={myLibrary} 
                onBookClick={handleBookClick}
              />
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BookRow 
              title="Trending Now" 
              books={trending} 
              onBookClick={handleBookClick}
            />
          </motion.div>
          
          {sciFiBooks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <BookRow 
                title="Science Fiction" 
                books={sciFiBooks} 
                onBookClick={handleBookClick}
              />
            </motion.div>
          )}
          
          {fantasyBooks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <BookRow 
                title="Fantasy Adventures" 
                books={fantasyBooks} 
                onBookClick={handleBookClick}
              />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}