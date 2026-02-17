# PDF Reader App

A professional, feature-rich PDF reader built with React. Perfect for reading books with mobile responsiveness, zoom controls, and a magnifying lens feature.

## Features

- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔍 **Magnifying Lens** - Hover over text with a magnifying glass for detailed viewing
- ➕➖ **Zoom Controls** - Zoom in/out with buttons or keyboard shortcuts
- 👆 **Touch Gestures** - Pinch to zoom on mobile devices
- ⌨️ **Keyboard Navigation** - Arrow keys for pages, +/- for zoom
- 🎨 **Modern UI** - Beautiful, dark-themed interface
- 📄 **Page Navigation** - Easy page jumping with input field
- 🚀 **Fast Performance** - Optimized rendering with react-pdf

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Start the app with `npm start`
2. Click "Choose PDF File" to upload your PDF book
3. Use the controls at the bottom to navigate:
   - **◀ ▶** - Previous/Next page
   - **− +** - Zoom out/in
   - **⟲** - Reset zoom
   - **🔍** - Toggle magnifying lens

## Keyboard Shortcuts

- `←` / `→` - Previous/Next page
- `+` / `=` - Zoom in
- `-` - Zoom out
- `0` - Reset zoom

## Mobile Gestures

- **Pinch** - Zoom in/out
- **Swipe** - Scroll through pages

## Technologies Used

- React 18
- react-pdf for PDF rendering
- PDF.js for PDF processing
- CSS3 for styling and animations

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Tips

- For the best reading experience on mobile, use landscape mode for larger pages
- The magnifying lens works best on desktop with a mouse
- Use keyboard shortcuts for faster navigation
- The app remembers your zoom level as you navigate pages

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

MIT
