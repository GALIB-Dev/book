# Development Tools 🛠️

## React DevTools

This project includes React DevTools for improved debugging and component inspection. 

### Using React DevTools

1. Run the standalone React DevTools:

```bash
npm run devtools
```

2. This will open a separate window with React DevTools that connects to your app.

3. Keep this window open while developing to inspect component hierarchies, props, state, and hooks.

### Benefits of React DevTools

- Inspect component props and state
- Track component re-renders
- Measure performance with the Profiler
- Debug context providers and consumers
- Explore component trees

### PDF Cover Extraction

The application now uses the first page of PDF files as cover images when available. This is implemented using the React-PDF library and custom extraction logic in `pdfCovers.tsx`.

Key features:
- Dynamically extracts the first page of PDFs as cover images
- Caches extracted covers for better performance
- Falls back to standard cover images when extraction fails
- Shows loading indicator during extraction process