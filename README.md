# BookFlix - Netflix for Books 📚

A cutting-edge PDF reader web application with a Netflix-style interface built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features ✨

- **Netflix-Style UI**: Beautiful, responsive interface with horizontal scrolling carousels
- **PDF Reading**: Full-featured PDF viewer with zoom, rotation, and navigation
- **Thumbnail Navigation**: Sliding thumbnail carousel for easy page jumping
- **Google Authentication**: Sign in with Google accounts
- **Book Library Management**: Organize and track your reading progress
- **Continue Reading**: Pick up where you left off
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern Tech Stack**: Next.js 14+, TypeScript, Tailwind CSS, PDF.js

## Tech Stack 🚀

- **Frontend**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Rendering**: PDF.js & React-PDF
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started 🏁

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd 4book
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Google OAuth credentials in `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   ```

4. **Add sample PDF files**
   - Place PDF files in `public/books/` directory
   - Update `src/lib/mockData.ts` with your PDF file paths

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage 📖

### Home Page
- Browse featured books in the hero section
- Scroll through different categories (Continue Reading, My Library, Trending, etc.)
- Click on any book to start reading

### PDF Reader
- **Navigation**: Use arrow keys or click navigation buttons
- **Zoom**: Use zoom controls or +/- keys
- **Thumbnails**: Click the book icon to view page thumbnails
- **Fullscreen**: Press F11 or click the fullscreen button
- **Progress**: Track reading progress with the progress bar

### Authentication
- Click "Sign In" to authenticate with Google
- Access your personal library and reading progress

## Project Structure 🏗️

```
src/
├── app/
│   ├── api/auth/         # NextAuth API routes
│   ├── reader/           # PDF reader page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── BookCard.tsx      # Individual book display
│   ├── BookRow.tsx       # Horizontal book carousel
│   ├── HeroSection.tsx   # Featured book hero
│   ├── Navbar.tsx        # Navigation bar
│   └── PDFViewer.tsx     # PDF reading component
├── lib/
│   ├── mockData.ts       # Sample book data
│   └── utils.ts          # Utility functions
└── types/
    └── index.ts          # TypeScript definitions
```

## Customization 🎨

### Adding Books
1. Add PDF files to `public/books/`
2. Update `src/lib/mockData.ts` with book metadata
3. Add cover images (can use Unsplash URLs for testing)

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- Customize the Netflix-style theme colors

### Features
- Add new book categories in `mockData.ts`
- Implement search functionality
- Add user preferences and settings
- Integrate with a real database

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License.

## Acknowledgments 🙏

- Netflix for the UI/UX inspiration
- PDF.js team for the excellent PDF rendering library
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling approach
