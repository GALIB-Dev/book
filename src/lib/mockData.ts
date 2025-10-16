import { Book } from '@/types'

// Mock data for demonstration with real book cover images
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    pdfUrl: '/books/great-gatsby.pdf',
    genre: 'Classic Fiction',
    rating: 4.2,
    publishedYear: 1925,
    pageCount: 180,
    isInLibrary: false,
    isFeatured: true
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://covers.openlibrary.org/b/id/8226154-L.jpg',
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    pdfUrl: '/books/mockingbird.pdf',
    genre: 'Classic Fiction',
    rating: 4.5,
    publishedYear: 1960,
    pageCount: 281,
    currentPage: 45,
    isInLibrary: true
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    description: 'A dystopian social science fiction novel exploring surveillance, government control, and individual freedom.',
    pdfUrl: '/books/1984.pdf',
    genre: 'Science Fiction',
    rating: 4.4,
    publishedYear: 1949,
    pageCount: 328,
    isInLibrary: false
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://covers.openlibrary.org/b/id/8226184-L.jpg',
    description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    pdfUrl: '/books/pride-prejudice.pdf',
    genre: 'Romance',
    rating: 4.3,
    publishedYear: 1813,
    pageCount: 432,
    currentPage: 120,
    isInLibrary: true
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://covers.openlibrary.org/b/id/8226144-L.jpg',
    description: 'A controversial novel about teenage rebellion and alienation in post-war America.',
    pdfUrl: '/books/catcher-rye.pdf',
    genre: 'Coming of Age',
    rating: 3.8,
    publishedYear: 1951,
    pageCount: 277,
    isInLibrary: false
  },
  {
    id: '6',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://covers.openlibrary.org/b/id/8630105-L.jpg',
    description: 'A science fiction epic set in a distant future amidst a feudal interstellar society.',
    pdfUrl: '/books/dune.pdf',
    genre: 'Science Fiction',
    rating: 4.6,
    publishedYear: 1965,
    pageCount: 688,
    isInLibrary: true
  },
  {
    id: '7',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://covers.openlibrary.org/b/id/9255566-L.jpg',
    description: 'An epic high fantasy novel following the quest to destroy the One Ring.',
    pdfUrl: '/books/lotr.pdf',
    genre: 'Fantasy',
    rating: 4.7,
    publishedYear: 1954,
    pageCount: 1216,
    currentPage: 234,
    isInLibrary: true
  },
  {
    id: '8',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    coverUrl: 'https://covers.openlibrary.org/b/id/10521270-L.jpg',
    description: 'A young wizard discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.',
    pdfUrl: '/books/harry-potter.pdf',
    genre: 'Fantasy',
    rating: 4.5,
    publishedYear: 1997,
    pageCount: 309,
    isInLibrary: false
  },
  {
    id: '9',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://covers.openlibrary.org/b/id/6979861-L.jpg',
    description: 'A fantasy adventure following Bilbo Baggins on his unexpected journey.',
    pdfUrl: '/books/hobbit.pdf',
    genre: 'Fantasy',
    rating: 4.6,
    publishedYear: 1937,
    pageCount: 310,
    isInLibrary: true
  },
  {
    id: '10',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverUrl: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
    description: 'A dystopian novel exploring a future society driven by technology and social engineering.',
    pdfUrl: '/books/brave-new-world.pdf',
    genre: 'Science Fiction',
    rating: 4.1,
    publishedYear: 1932,
    pageCount: 268,
    isInLibrary: false
  },
  {
    id: '11',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    coverUrl: 'https://covers.openlibrary.org/b/id/8634589-L.jpg',
    description: 'A coming-of-age novel following the emotions and experiences of its eponymous heroine.',
    pdfUrl: '/books/jane-eyre.pdf',
    genre: 'Romance',
    rating: 4.4,
    publishedYear: 1847,
    pageCount: 507,
    currentPage: 67,
    isInLibrary: true
  },
  {
    id: '12',
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    coverUrl: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
    description: 'A series of seven fantasy novels chronicling the adventures in the magical land of Narnia.',
    pdfUrl: '/books/narnia.pdf',
    genre: 'Fantasy',
    rating: 4.5,
    publishedYear: 1950,
    pageCount: 767,
    isInLibrary: false
  }
]

export const getFeaturedBook = (): Book => {
  return mockBooks.find(book => book.isFeatured) || mockBooks[0]
}

export const getBooksByGenre = (genre: string): Book[] => {
  return mockBooks.filter(book => book.genre === genre)
}

export const getCurrentlyReading = (): Book[] => {
  return mockBooks.filter(book => book.currentPage && book.currentPage > 0)
}

export const getMyLibrary = (): Book[] => {
  return mockBooks.filter(book => book.isInLibrary)
}

export const getTrendingBooks = (): Book[] => {
  return mockBooks.sort((a, b) => b.rating - a.rating).slice(0, 6)
}

export const getNewReleases = (): Book[] => {
  const currentYear = new Date().getFullYear()
  return mockBooks.filter(book => book.publishedYear >= currentYear - 2)
}