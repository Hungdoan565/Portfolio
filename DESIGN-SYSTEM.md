# 🎨 Design System Reference

## Color Palette

### Primary Colors
```css
/* Blue - Main brand color */
primary-50:  #eff6ff  /* Very light */
primary-100: #dbeafe
primary-200: #bfdbfe
primary-300: #93c5fd
primary-400: #60a5fa  /* Used in dark mode */
primary-500: #3b82f6  /* Default */
primary-600: #2563eb  /* Used in light mode */
primary-700: #1d4ed8
primary-800: #1e40af
primary-900: #1e3a8a  /* Very dark */
```

### Accent Colors
```css
purple: #8b5cf6  /* Purple accent */
pink:   #ec4899  /* Pink accent */
cyan:   #06b6d4  /* Cyan accent */
orange: #f97316  /* Orange accent */
```

### Semantic Colors

#### Light Mode
```css
Background:  #ffffff (white)
Surface:     #f5f5f5 (light gray)
Border:      #e5e5e5 (lighter gray)

Text Primary:   #0a0a0a (almost black) - Contrast: 21:1 ✅
Text Secondary: #525252 (dark gray)   - Contrast: 7.5:1 ✅
Text Tertiary:  #737373 (medium gray) - Contrast: 4.6:1 ✅
```

#### Dark Mode
```css
Background:  #0a0a0a (almost black)
Surface:     #1a1a1a (dark gray)
Border:      #262626 (lighter dark gray)

Text Primary:   #ffffff (white)       - Contrast: 21:1 ✅
Text Secondary: #a3a3a3 (light gray)  - Contrast: 8.2:1 ✅
Text Tertiary:  #737373 (medium gray) - Contrast: 4.8:1 ✅
```

## Typography

### Font Families
```css
Sans: 'Inter', system-ui, sans-serif
Mono: 'JetBrains Mono', monospace
```

### Font Sizes
```css
text-xs:   0.75rem (12px)
text-sm:   0.875rem (14px)
text-base: 1rem (16px)
text-lg:   1.125rem (18px)
text-xl:   1.25rem (20px)
text-2xl:  1.5rem (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem (36px)
text-5xl:  3rem (48px)
text-7xl:  4.5rem (72px)
text-8xl:  6rem (96px)
```

### Font Weights
```css
font-medium:  500  /* Nav links, labels */
font-semibold: 600 /* Subheadings */
font-bold:    700  /* Headings */
font-black:   900  /* Hero title */
```

## Components

### Buttons

#### Primary Button
```html
<button class="btn-primary">
  Click Me
</button>
```
**Style**: Gradient blue-purple, white text, shadow
**Use**: Main CTAs, important actions

#### Outline Button
```html
<button class="btn-outline">
  Learn More
</button>
```
**Style**: Border only, colored text, fills on hover
**Use**: Secondary actions

#### Ghost Button
```html
<button class="btn-ghost">
  Cancel
</button>
```
**Style**: No border, subtle hover background
**Use**: Tertiary actions, cancel buttons

### Cards

#### Standard Card
```html
<div class="card">
  Content here
</div>
```
**Style**: Glassmorphism, shadow, hover lift

#### Card with Glow
```html
<div class="card-glow">
  Content here
</div>
```
**Style**: Card + subtle shine animation on hover

#### Interactive Card
```html
<div class="card-interactive">
  Content here
</div>
```
**Style**: Card + clickable styling

### Glass Effects

#### Full Glass
```html
<div class="glass">
  Content
</div>
```
**Style**: Strong blur, 80% opacity, visible borders

#### Light Glass
```html
<div class="glass-light">
  Content
</div>
```
**Style**: Medium blur, 60% opacity, subtle borders

### Text Styles

#### Gradient Text
```html
<span class="gradient-text">
  Highlighted Text
</span>
```
**Style**: Blue → Purple → Pink gradient
**Use**: Headings, important keywords

#### Text Colors (Light Mode)
```html
<p class="text-gray-900">Primary text</p>
<p class="text-gray-700">Secondary text</p>
<p class="text-gray-600">Tertiary text</p>
```

#### Text Colors (Dark Mode)
```html
<p class="dark:text-gray-100">Primary text</p>
<p class="dark:text-gray-300">Secondary text</p>
<p class="dark:text-gray-400">Tertiary text</p>
```

## Spacing

### Padding/Margin Scale
```css
0:    0
1:    0.25rem (4px)
2:    0.5rem (8px)
3:    0.75rem (12px)
4:    1rem (16px)
6:    1.5rem (24px)
8:    2rem (32px)
12:   3rem (48px)
16:   4rem (64px)
20:   5rem (80px)
24:   6rem (96px)
```

### Section Padding
```html
<section class="section-padding">
  <!-- Auto: py-20 px-6 md:px-12 lg:px-24 -->
</section>
```

## Animations

### Duration
```css
duration-200: 200ms  /* Buttons, quick transitions */
duration-300: 300ms  /* Default, theme toggle */
duration-500: 500ms  /* Modals, overlays */
duration-700: 700ms  /* Page transitions */
```

### Built-in Animations
```html
<!-- Floating -->
<div class="animate-float">Float</div>

<!-- Slide Up -->
<div class="animate-slide-up">Slide Up</div>

<!-- Slide Down -->
<div class="animate-slide-down">Slide Down</div>

<!-- Fade In -->
<div class="animate-fade-in">Fade In</div>

<!-- Pulse -->
<div class="animate-pulse">Pulse</div>

<!-- Bounce -->
<div class="animate-bounce">Bounce</div>
```

## Hover States

### Subtle Lift
```html
<div class="hover:-translate-y-1 transition-transform">
  Lifts slightly
</div>
```

### Scale
```html
<div class="hover:scale-105 transition-transform">
  Scales up 5%
</div>
```

### Color Change
```html
<a class="text-gray-700 hover:text-primary-600 transition-colors">
  Link
</a>
```

## Responsive Design

### Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Usage
```html
<!-- Hidden on mobile, visible on desktop -->
<div class="hidden md:block">Desktop only</div>

<!-- Stack on mobile, grid on desktop -->
<div class="flex flex-col md:flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Different sizes -->
<h1 class="text-3xl md:text-5xl lg:text-7xl">
  Responsive Title
</h1>
```

## Best Practices

### ✅ DO
- Use semantic HTML (`<nav>`, `<section>`, `<article>`)
- Add `aria-label` to icon-only buttons
- Use `dark:` prefix for dark mode variants
- Keep contrast ratio > 4.5:1 for text
- Use `transition-all` for smooth theme switching
- Add `focus:ring` to interactive elements

### ❌ DON'T
- Don't use pure black (`#000000`) or pure white on backgrounds
- Don't remove focus indicators
- Don't use text smaller than 14px
- Don't rely on color alone for information
- Don't use excessive animations
- Don't use custom cursors (accessibility)

## Accessibility Checklist

- [ ] All text has 4.5:1+ contrast ratio
- [ ] Interactive elements have focus states
- [ ] Images have alt text
- [ ] Buttons have aria-labels (if icon-only)
- [ ] Form inputs have labels
- [ ] Headings follow hierarchy (h1 → h2 → h3)
- [ ] Links are distinguishable from text
- [ ] Motion can be reduced (prefers-reduced-motion)
- [ ] Keyboard navigation works
- [ ] Color is not the only indicator

## Quick Reference

### Common Patterns

#### Link with Icon
```html
<a href="#" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
  <i class="fas fa-link mr-2"></i>
  Link Text
</a>
```

#### Section Header
```html
<div class="text-center mb-16">
  <h2 class="text-4xl md:text-5xl font-black mb-4">
    <span class="gradient-text">Section Title</span>
  </h2>
  <div class="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full"></div>
</div>
```

#### Responsive Container
```html
<div class="max-w-7xl mx-auto px-6 md:px-12">
  <!-- Content -->
</div>
```

#### Glass Card
```html
<div class="glass p-6 rounded-xl hover:-translate-y-1 transition-all">
  <!-- Card content -->
</div>
```

---

**Version**: 2.0  
**Last Updated**: 2025  
**Maintained by**: Đoàn Vĩnh Hưng  
**License**: MIT
