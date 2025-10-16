'use client'

import { useState, useRef, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize, 
  Settings,
  BookOpen,
  ArrowLeft,
  Menu
} from 'lucide-react'
import { Book } from '@/types'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

interface PDFViewerProps {
  book: Book
  onClose: () => void
}

export function PDFViewer({ book, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(book.currentPage || 1)
  const [scale, setScale] = useState<number>(1.2)
  const [rotation, setRotation] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileControls, setShowMobileControls] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setIsLoading(false)
  }

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, numPages))
  }

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3))
  }

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5))
  }

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setShowThumbnails(false)
  }

  // Mobile touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY
      
      const deltaX = endX - startX
      const deltaY = endY - startY
      
      // Swipe left/right for page navigation
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          goToPreviousPage()
        } else {
          goToNextPage()
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchend', handleTouchEnd)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPreviousPage()
          break
        case 'ArrowRight':
          goToNextPage()
          break
        case 'Escape':
          if (isFullscreen) {
            toggleFullscreen()
          } else {
            onClose()
          }
          break
        case '+':
        case '=':
          zoomIn()
          break
        case '-':
          zoomOut()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, onClose])

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-black z-50 flex flex-col ${isFullscreen ? 'p-0' : ''}`}
      onTouchStart={handleTouchStart}
    >
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-3 sm:p-4 bg-gray-900/90 backdrop-blur-sm glass"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors touch-target"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </motion.button>
          
          <div className="text-white">
            <h1 className="text-base sm:text-lg font-semibold line-clamp-1">{book.title}</h1>
            <p className="text-xs sm:text-sm text-gray-300 line-clamp-1">by {book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMobileControls(!showMobileControls)}
            className="md:hidden p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="hidden md:block p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target"
          >
            <BookOpen className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={zoomOut}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target btn-shine"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          
          <span className="text-white text-xs sm:text-sm px-2">
            {Math.round(scale * 100)}%
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={zoomIn}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target btn-shine"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={rotate}
            className="hidden sm:block p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target"
          >
            <RotateCw className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target btn-shine"
          >
            <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Controls Overlay */}
      {showMobileControls && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-sm p-4 border-b border-gray-700 glass"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
                className="p-3 bg-gray-700 text-white rounded-lg disabled:opacity-50 touch-target"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <span className="text-white text-sm">
                {currentPage} / {numPages}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={goToNextPage}
                disabled={currentPage >= numPages}
                className="p-3 bg-gray-700 text-white rounded-lg disabled:opacity-50 touch-target"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={rotate}
                className="p-3 bg-gray-700 text-white rounded-lg touch-target"
              >
                <RotateCw className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="p-3 bg-gray-700 text-white rounded-lg touch-target"
              >
                <BookOpen className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnail Sidebar */}
        {showThumbnails && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-48 sm:w-64 bg-gray-800 p-3 sm:p-4 overflow-y-auto"
          >
            <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Pages</h3>
            <div className="space-y-2">
              {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
                <motion.button
                  key={pageNum}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => goToPage(pageNum)}
                  className={`w-full p-2 text-left rounded transition-colors touch-target ${
                    pageNum === currentPage 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="aspect-[3/4] bg-gray-600 rounded mb-1 relative overflow-hidden">
                    <Document
                      file={book.pdfUrl}
                      loading={<div className="bg-gray-600 w-full h-full" />}
                    >
                      <Page 
                        pageNumber={pageNum} 
                        scale={0.2}
                        rotate={rotation}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                  </div>
                  <span className="text-xs">Page {pageNum}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Main PDF Viewer */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 overflow-auto mobile-scroll">
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="text-white text-lg sm:text-xl">Loading PDF...</div>
            </div>
          )}
          
          <Document
            file={book.pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="text-white">Loading PDF...</div>}
            error={<div className="text-red-500">Failed to load PDF</div>}
          >
            <Page
              pageNumber={currentPage}
              scale={scale}
              rotate={rotation}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-2xl"
            />
          </Document>
        </div>
      </div>

      {/* Bottom Controls */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-3 sm:p-4 bg-gray-900/90 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          
          <span className="text-white text-sm sm:text-base">
            Page {currentPage} of {numPages}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNextPage}
            disabled={currentPage >= numPages}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 mx-4 sm:mx-8">
          <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-300"
              style={{ width: `${(currentPage / numPages) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-white text-xs sm:text-sm">
          {Math.round((currentPage / numPages) * 100)}% Complete
        </div>
      </motion.div>
    </div>
  )
}