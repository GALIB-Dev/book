'use client'

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import React from 'react'

// Make sure the worker is set
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString()
}

// Cache to avoid repeated rendering of the same PDF
const coverCache = new Map<string, string>()

/**
 * Extracts the first page of a PDF as an image
 * @param pdfUrl The URL to the PDF file
 * @returns A Promise that resolves to a data URL of the first page
 */
export async function extractPDFCover(pdfUrl: string): Promise<string> {
  // Check cache first
  if (coverCache.has(pdfUrl)) {
    return coverCache.get(pdfUrl)!
  }

  return new Promise((resolve, reject) => {
    // Create an invisible container for rendering
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.top = '-9999px'
    document.body.appendChild(container)

    // Render component
    const cleanup = () => {
      document.body.removeChild(container)
    }

    // Create a react-pdf Document and Page
    const doc = (
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => {
          if (numPages > 0) {
            // Wait for the page to render
            setTimeout(() => {
              // Find the rendered canvas
              const canvas = container.querySelector('canvas')
              if (canvas) {
                try {
                  // Convert to data URL
                  const dataUrl = canvas.toDataURL('image/jpeg', 0.75)
                  coverCache.set(pdfUrl, dataUrl)
                  cleanup()
                  resolve(dataUrl)
                } catch (err) {
                  cleanup()
                  reject(err)
                }
              } else {
                cleanup()
                reject(new Error('Canvas not found'))
              }
            }, 1000) // Give it time to render
          } else {
            cleanup()
            reject(new Error('PDF has no pages'))
          }
        }}
        onLoadError={(error) => {
          cleanup()
          reject(error)
        }}
      >
        <Page 
          pageNumber={1}
          width={300} // Width for thumbnail
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    )

    // Render the component to extract the canvas
    if (typeof window !== 'undefined') {
      const ReactDOM = require('react-dom')
      ReactDOM.render(doc, container)
    } else {
      cleanup()
      reject(new Error('Cannot render on server'))
    }
  })
}

/**
 * Hook to get a PDF cover image
 */
export function usePDFCover(pdfUrl: string | undefined) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!pdfUrl) return

    // Skip if it doesn't look like a PDF path
    if (!pdfUrl.endsWith('.pdf') && !pdfUrl.includes('/pdf')) {
      return
    }

    setIsLoading(true)
    
    extractPDFCover(pdfUrl)
      .then(url => {
        setCoverUrl(url)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error extracting PDF cover:', err)
        setError(err)
        setIsLoading(false)
      })
  }, [pdfUrl])

  return { coverUrl, isLoading, error }
}