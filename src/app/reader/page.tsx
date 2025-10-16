'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PDFViewer } from '@/components/PDFViewer'
import { EPUBViewer } from '@/components/EPUBViewer'
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

  // Determine which viewer to show based on available formats
  const hasPDF = book.pdfUrl && book.format !== 'EPUB'
  const hasEPUB = book.epubUrl && book.format !== 'PDF'

  if (hasPDF && hasEPUB) {
    // Both formats available - show PDF by default, could add format selector
    return <PDFViewer book={book} onClose={handleClose} />
  } else if (hasPDF) {
    return <PDFViewer book={book} onClose={handleClose} />
  } else if (hasEPUB) {
    return <EPUBViewer book={book} onClose={handleClose} />
  } else {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">No supported format available</div>
      </div>
    )
  }
}