// Image configuration and utilities
export const IMAGE_DOMAINS = {
  OPEN_LIBRARY: 'covers.openlibrary.org',
  DICEBEAR: 'api.dicebear.com',
  UNSPLASH: 'images.unsplash.com'
}

// Fallback image URLs
export const FALLBACK_IMAGES = {
  BOOK_COVER: '/images/book-placeholder.png',
  USER_AVATAR: '/images/user-placeholder.png'
}

// Generate a placeholder image URL for books
export const generateBookPlaceholder = (title: string, author: string) => {
  const initials = title.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=1f2937&color=ffffff`
}

// Generate user avatar
export const generateUserAvatar = (name: string) => {
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase()
  return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=1f2937&color=ffffff`
}