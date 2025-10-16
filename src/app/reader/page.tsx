'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PDFViewer } from '@/components/PDFViewer'
import { Book } from '@/types'
import { mockBooks } from '@/lib/mockData'
import { useRouter } from 'next/navigation'

export default function ReaderPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const bookId = searchParams.get('id')
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    if (bookId) {
      const foundBook = mockBooks.find(b => b.id === bookId)
      if (foundBook) {
        setBook(foundBook)
      } else {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }, [bookId, router])

  const handleClose = () => {
    router.push('/')
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return <PDFViewer book={book} onClose={handleClose} />
}