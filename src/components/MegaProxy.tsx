'use client'

import { useEffect, useState } from 'react'

interface MegaProxyProps {
  megaUrl: string
  fileType: 'pdf' | 'epub'
  onLoaded: (data: string) => void
  onError: (error: string) => void
}

export function MegaProxy({ megaUrl, fileType, onLoaded, onError }: MegaProxyProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // For the demo, we'll simply show an error that direct Mega links can't be loaded
    // In a real application, you would need a server-side proxy to download and serve the file
    setIsLoading(false)
    onError("Direct Mega links can't be loaded in the browser due to CORS restrictions. Please download the file and add it locally, or use a server-side proxy.")
  }, [megaUrl, onError])

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {isLoading && (
        <div className="animate-pulse">
          <p className="text-lg font-medium">Attempting to load file from Mega...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="text-red-800 font-medium">Unable to load file from Mega</h3>
          <p className="text-red-700 mt-2">{error}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-700">Alternatives:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
              <li>Download the file directly from Mega and add it locally</li>
              <li>Set up a server-side proxy to fetch Mega files</li>
              <li>Use files stored in your application's public directory</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}