export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  pdfUrl?: string;
  epubUrl?: string;
  megaUrl?: string; // Added support for Mega links
  format: 'PDF' | 'EPUB' | 'BOTH';
  genre: string;
  rating: number;
  publishedYear: number;
  pageCount: number;
  lastRead?: Date;
  currentPage?: number;
  isInLibrary: boolean;
  isFeatured?: boolean;
}

export interface BookCategory {
  id: string;
  name: string;
  books: Book[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  library: Book[];
  currentlyReading: Book[];
}