'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize, 
  BookOpen,
  ArrowLeft,
  Menu,
  Settings
} from 'lucide-react'
import { Book } from '@/types'

interface EPUBViewerProps {
  book: Book
  onClose: () => void
}

export function EPUBViewer({ book, onClose }: EPUBViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showMobileControls, setShowMobileControls] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [theme, setTheme] = useState('light')
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<any>(null)

  useEffect(() => {
    if (!book.epubUrl) return

    const loadEPUB = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const ePub = (await import('epubjs')).default
        
        // Create book instance
        bookRef.current = ePub(book.epubUrl)
        
        // Render to viewer
        const rendition = bookRef.current.renderTo(viewerRef.current, {
          width: '100%',
          height: '100%',
          spread: 'none'
        })

        // Set initial theme and font size
        rendition.themes.default({
          'body': {
            'font-size': `${fontSize}px !important`,
            'background-color': theme === 'dark' ? '#1a1a1a' : '#ffffff',
            'color': theme === 'dark' ? '#ffffff' : '#000000'
          }
        })

        // Load the book
        await rendition.display()
        setIsLoading(false)

        // Handle keyboard navigation
        rendition.on('keyup', (event: KeyboardEvent) => {
          if (event.key === 'ArrowLeft') {
            rendition.prev()
          } else if (event.key === 'ArrowRight') {
            rendition.next()
          }
        })

      } catch (error) {
        console.error('Error loading EPUB:', error)
        setIsLoading(false)
      }
    }

    loadEPUB()

    return () => {
      if (bookRef.current) {
        bookRef.current.destroy()
      }
    }
  }, [book.epubUrl, fontSize, theme])

  const goToPreviousPage = () => {
    if (bookRef.current) {
      bookRef.current.rendition.prev()
    }
  }

  const goToNextPage = () => {
    if (bookRef.current) {
      bookRef.current.rendition.next()
    }
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

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24))
  }

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12))
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
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
          increaseFontSize()
          break
        case '-':
          decreaseFontSize()
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
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={decreaseFontSize}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          
          <span className="text-white text-xs sm:text-sm px-2">
            {fontSize}px
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={increaseFontSize}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target"
          >
            <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
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

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-900/95 backdrop-blur-sm p-4 border-b border-gray-700 glass"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">Font Size:</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={decreaseFontSize}
                    className="p-2 bg-gray-700 text-white rounded-lg touch-target"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </motion.button>
                  <span className="text-white text-sm px-2">{fontSize}px</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={increaseFontSize}
                    className="p-2 bg-gray-700 text-white rounded-lg touch-target"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </motion.button>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-2 bg-gray-700 text-white rounded-lg touch-target"
                >
                  <RotateCw className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                className="p-3 bg-gray-700 text-white rounded-lg touch-target"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={goToNextPage}
                className="p-3 bg-gray-700 text-white rounded-lg touch-target"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-3 bg-gray-700 text-white rounded-lg touch-target"
              >
                <RotateCw className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSettings(!showSettings)}
                className="p-3 bg-gray-700 text-white rounded-lg touch-target"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main EPUB Viewer */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 overflow-auto mobile-scroll">
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="text-white text-lg sm:text-xl">Loading EPUB...</div>
          </div>
        )}
        
        <div 
          ref={viewerRef}
          className="w-full h-full"
          style={{ 
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000'
          }}
        />
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
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          
          <span className="text-white text-sm sm:text-base">
            EPUB Reader
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNextPage}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors touch-target"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        <div className="text-white text-xs sm:text-sm">
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </div>
      </motion.div>
    </div>
  )
}
