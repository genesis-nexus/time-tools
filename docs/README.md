# TimeTools - Comprehensive Time Utilities

A modern, sleek web application providing essential time-related tools for productivity and convenience. Built with vanilla HTML, CSS, and JavaScript for optimal performance and accessibility.

## 🚀 Features

### ⏱️ Timer
- **Predefined timers**: Quick access to common durations (1min, 5min, 10min, 15min, 30min, 1hour)
- **Custom timer**: Set any duration in minutes and seconds
- **Visual feedback**: Animated display with sound notification
- **Controls**: Start, pause, and reset functionality

### ⏱️ Stopwatch
- **High precision**: Millisecond accuracy
- **Lap functionality**: Record and track multiple lap times
- **Persistent display**: Real-time updates with smooth animations
- **Full controls**: Start, pause, lap, and reset

### 🔢 Epoch & Unix Time Converter
- **Bidirectional conversion**: Convert between Unix timestamps and human-readable dates
- **Auto-detection**: Handles both seconds and milliseconds automatically
- **Real-time updates**: Current Unix time display
- **Multiple formats**: Comprehensive date and time formatting

### 🌍 World Clock
- **Multiple timezones**: Add and track multiple timezones simultaneously
- **Real-time updates**: Live time display for all selected timezones
- **Easy management**: Add/remove timezones with a single click
- **Popular locations**: Pre-configured with major world cities

### 📅 Holiday Calendar
- **Country-specific**: View holidays for different countries
- **Current year**: Automatically shows holidays for the current year
- **API integration**: Real-time holiday data from reliable sources
- **Fallback support**: Offline holiday data when API is unavailable

## 🎨 Design Features

### 🌓 Light & Dark Mode
- **Automatic detection**: Respects system preferences
- **Manual toggle**: Easy theme switching with persistent storage
- **Smooth transitions**: Elegant animations between themes
- **Consistent styling**: All components adapt seamlessly

### 📱 Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **Touch-friendly**: Large buttons and intuitive gestures
- **Adaptive layout**: Components reorganize for optimal viewing
- **Cross-platform**: Works on desktop, tablet, and mobile

### 🎯 Modern UI/UX
- **Minimalist design**: Clean, uncluttered interface
- **Intuitive navigation**: Smooth scrolling between sections
- **Visual feedback**: Hover effects and state indicators
- **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Technical Features

### ⚡ Performance
- **Vanilla JavaScript**: No framework dependencies for fast loading
- **Optimized assets**: Minimal CSS and efficient code
- **Service Worker**: Offline functionality and caching
- **Progressive Web App**: Installable on mobile devices

### 🔧 Browser Support
- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **ES6+ features**: Arrow functions, async/await, modules
- **Web APIs**: AudioContext, Service Worker, Local Storage
- **Fallback support**: Graceful degradation for older browsers

## 🚀 Getting Started

### Local Development
1. Clone the repository
2. Navigate to the `docs` directory
3. Start a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
4. Open `http://localhost:8000` in your browser

### Deployment
The application is a static site that can be deployed to any web hosting service:
- **GitHub Pages**: Push to a repository and enable Pages
- **Netlify**: Drag and drop the `docs` folder
- **Vercel**: Connect your repository for automatic deployments
- **Traditional hosting**: Upload files via FTP/SFTP

## 📁 Project Structure

```
docs/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and theming
├── script.js           # JavaScript functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── package.json       # Project configuration
├── README.md          # Documentation
└── assets/
    └── favicon.svg    # Application icon
```

## 🔧 Configuration

### Customization
- **Colors**: Modify CSS variables in `:root` and `[data-theme="dark"]`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Features**: Enable/disable tools by commenting out sections
- **API**: Update holiday API endpoints in `script.js`

### Adding New Features
1. Add HTML structure in `index.html`
2. Style components in `styles.css`
3. Implement functionality in `script.js`
4. Update navigation and manifest as needed

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 🔗 Links

- **Live Demo**: [Your deployed URL]
- **Repository**: [GitHub repository URL]
- **Issues**: [GitHub issues URL]

---

Built with ❤️ for productivity and time management.
