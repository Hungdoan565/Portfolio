# 🚀 Portfolio - Đoàn Vĩnh Hưng

Modern, responsive portfolio website built with vanilla JavaScript, TailwindCSS, and optimized for performance.

## ✨ Features

- ✅ **Responsive Design**: Mobile-first approach with smooth transitions
- ✅ **Dark/Light Theme**: System preference detection with manual toggle
- ✅ **Timeline Animation**: Work experience & education with animated timeline
- ✅ **Number Counter**: Animated statistics in About section
- ✅ **Project Modal**: Detailed project view with lightbox effect
- ✅ **Contact Form**: EmailJS integration with notification system
- ✅ **Smooth Animations**: GPU-accelerated animations using CSS transforms
- ✅ **Modern UI**: Glassmorphism effects with gradient backgrounds
- ✅ **Performance**: Optimized loading with lazy images and minimal JavaScript

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid
- **JavaScript ES6+** - Vanilla JS with modern features
- **TailwindCSS** - Utility-first CSS framework
- **Font Awesome** - Icon library

## 🏗️ Project Structure

```
Portfolio/
├── assets/              # Images, favicon
├── dist/               # Built CSS output
├── js/                 # JavaScript modules
│   ├── main-new.js     # Main application (all-in-one)
│   ├── main.js         # Legacy code
│   ├── loader.js       # Page loader
│   ├── typing.js       # Typing animation
│   └── ...
├── src/
│   └── input.css       # Source CSS with Tailwind
├── index.html          # Main HTML file
├── index-backup.html   # Backup version
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── SETUP.md            # Setup instructions
└── README.md           # This file
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies** (Optional - cho Tailwind build)
   ```bash
   npm install
   ```

3. **Open index.html**
   ```bash
   # Open in your browser
   start index.html  # Windows
   open index.html   # macOS
   xdg-open index.html # Linux
   ```

4. **Setup EmailJS** (Xem file [SETUP.md](SETUP.md))
   - Đăng ký EmailJS account
   - Thêm Service ID, Template ID, Public Key vào `js/main-new.js`

## 📦 NPM Scripts

```bash
npm run build       # Build production CSS
npm run watch       # Watch for changes
npm run dev         # Development mode
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3B82F6',  // Your brand color
        // ...
      }
    }
  }
}
```

### Content
- Update personal information in `index.html`
- Replace images in `assets/` folder  
- Modify project data in `js/main-new.js` (line 304+)
- Update timeline/experience in `index.html` (line 670-815)
- Update skills percentages in `index.html` (Skills section)

**Chi tiết xem [SETUP.md](SETUP.md)**

## 📱 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## ⚡ Performance

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast color ratios
- Focus indicators
- Semantic HTML structure

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- **Email**: hungmobile457@gmail.com
- **Phone**: 0764 950 871
- **GitHub**: [github.com/yourusername](https://github.com/yourusername)
- **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

---

⭐ Star this repo if you found it helpful!

**Made with ❤️ and code**