'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Menu, User, Bell, LogOut, Upload } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface NavbarProps {
  isScrolled: boolean
  onSearchClick: () => void
  user?: {
    name: string
    image: string
  }
}

export function Navbar({ isScrolled, onSearchClick, user }: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-red-600"
            >
              BookFlix
            </motion.div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link href="/upload" className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                <Upload className="w-4 h-4" /> Upload
              </Link>
              <Link href="/browse" className="text-white hover:text-gray-300 transition-colors">
                Browse
              </Link>
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                Trending
              </Link>
            </div>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSearchClick}
              className="p-2 text-white hover:text-gray-300 transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white hover:text-gray-300 transition-colors"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            
            {/* User Profile */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="hidden sm:block text-white text-sm">
                    {user.name}
                  </span>
                </motion.button>
                
                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12 w-48 bg-black/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-700"
                  >
                    <div className="p-2">
                      <button className="w-full flex items-center gap-2 p-2 text-white hover:bg-white/10 rounded transition-colors">
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button className="w-full flex items-center gap-2 p-2 text-white hover:bg-white/10 rounded transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Sign In
              </motion.button>
            )}
            
            {/* Mobile Menu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}