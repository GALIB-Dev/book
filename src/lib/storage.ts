import { Book } from '@/types'

const USER_BOOKS_KEY = 'book_arcade_user_books'

function getSafeWindow(): Window | null {
  if (typeof window === 'undefined') return null
  try {
    return window
  } catch {
    return null
  }
}

export function loadUserBooks(): Book[] {
  const w = getSafeWindow()
  if (!w) return []
  try {
    const raw = w.localStorage.getItem(USER_BOOKS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Book[]
  } catch {
    return []
  }
}

export function saveUserBooks(books: Book[]): void {
  const w = getSafeWindow()
  if (!w) return
  try {
    w.localStorage.setItem(USER_BOOKS_KEY, JSON.stringify(books))
  } catch {
    // ignore persistence errors
  }
}

export function addUserBook(book: Book): void {
  const books = loadUserBooks()
  const deduped = books.filter(b => b.id !== book.id)
  deduped.push(book)
  saveUserBooks(deduped)
}

export function removeUserBook(bookId: string): void {
  const books = loadUserBooks().filter(b => b.id !== bookId)
  saveUserBooks(books)
}


