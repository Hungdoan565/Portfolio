# 📖 Hướng Dẫn Setup Portfolio

## Bước 1: Cài Đặt Môi Trường ✅

```bash
# Đã hoàn tất!
npm install
npm run build
```

## Bước 2: Thêm Assets 🖼️

### A. Ảnh Profile (Bắt buộc)

Thêm 2 ảnh của bạn vào folder `assets/`:

1. **`avatar.jpg`** - Ảnh profile cho Hero section (vuông, 400x400px)
2. **`about-image.jpg`** - Ảnh cho About section (landscape, 800x600px)

💡 **Tip**: Dùng [RemoveBG](https://www.remove.bg/) để xóa background nếu muốn!

### B. CV File

Thêm file CV của bạn:
- `assets/cv.pdf` - File CV để download

### C. Screenshots Projects

Tạo folder `assets/projects/` và thêm screenshots:
```
assets/projects/
├── project-1.jpg
├── project-2.jpg
├── project-3.jpg
└── ...
```

**Kích thước đề xuất**: 1200x800px (tỷ lệ 3:2)

## Bước 3: Customize Nội Dung ✏️

### A. Thông Tin Cá Nhân

Mở `index.html` và tìm các phần sau:

**1. Hero Section** (dòng ~105)
```html
<h1>Đoàn Vĩnh Hưng</h1>
```
→ Đổi thành tên của bạn

**2. Description** (dòng ~117)
```html
<p>Đam mê tạo ra những trải nghiệm web hiện đại...</p>
```
→ Viết description của bạn

**3. Contact Info** (dòng ~375-400)
```html
<a href="mailto:doanvinhhung@example.com">
<a href="tel:+84123456789">
```
→ Đổi email & phone của bạn

**4. Social Links** (dòng ~410-420)
```html
<a href="https://github.com">
<a href="https://linkedin.com">
```
→ Thêm links thật của bạn

### B. About Section

Tìm section `#about` trong `index.html` (dòng ~200-230):

```html
<p class="text-gray-400 leading-relaxed">
    Là một Frontend Developer đam mê...
</p>
```
→ Viết về bản thân bạn (2-3 đoạn)

**Quick Stats** (dòng ~182-194):
```html
<div class="text-3xl font-bold gradient-text" data-count="2">0</div>
```
→ Đổi số năm kinh nghiệm, số projects

### C. Skills

**Option 1: Sửa trong HTML** (dòng ~257-309)
```html
<div class="skill-item" data-skill="HTML5" data-level="95"></div>
```

**Option 2: Sửa level** - Đổi `data-level` (0-100)

### D. Projects

Mở `js/projects.js` và edit mảng `this.projects`:

```javascript
{
    id: 1,
    title: 'Tên Project',
    description: 'Mô tả ngắn gọn project',
    image: './assets/projects/project-1.jpg',
    category: 'frontend', // hoặc 'fullstack', 'ui'
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/username/repo',
    demo: 'https://demo-link.com',
    featured: true // true = hiển thị badge Featured
}
```

**Categories**:
- `frontend` - Pure frontend projects
- `fullstack` - Full-stack projects
- `ui` - UI/UX design projects

## Bước 4: Chạy Development Server 🚀

```bash
npm run dev
```

Mở `index.html` bằng Live Server (VS Code extension) hoặc browser.

File CSS sẽ tự động rebuild khi bạn chỉnh sửa!

## Bước 5: Customize Colors (Optional) 🎨

Mở `tailwind.config.js`:

```javascript
colors: {
    primary: {
        500: '#0ea5e9', // Màu chính
    },
    accent: {
        pink: '#ec4899',   // Màu phụ 1
        purple: '#a855f7', // Màu phụ 2
        cyan: '#06b6d4',   // Màu phụ 3
    }
}
```

Sau khi đổi, chạy lại:
```bash
npm run build
```

## Bước 6: Test 🧪

### Checklist:

- [ ] Tất cả images hiển thị đúng
- [ ] Links hoạt động (GitHub, LinkedIn, etc.)
- [ ] Contact form có validation
- [ ] Responsive trên mobile
- [ ] Dark/Light mode toggle
- [ ] Animations chạy smooth
- [ ] CV có thể download
- [ ] Project filters hoạt động

### Test Responsive:

1. Mở Chrome DevTools (F12)
2. Click icon mobile ở góc trái
3. Test các kích thước:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

## Bước 7: Deploy 🌐

### Option A: Netlify (Đề xuất - Free & Easy)

1. Push code lên GitHub
2. Đăng nhập [Netlify](https://netlify.com)
3. "New site from Git" → Chọn repo
4. Build command: `npm run build`
5. Publish directory: `/` (root)
6. Deploy!

### Option B: Vercel

```bash
npm install -g vercel
vercel --prod
```

### Option C: GitHub Pages

1. Repo Settings → Pages
2. Source: Deploy from branch
3. Branch: `main` → `/root`
4. Save

**⚠️ Note**: Với GitHub Pages, chạy `npm run build` trước khi commit!

## 🎉 Done!

Website của bạn đã sẵn sàng! 

### Next Steps:

1. **SEO**: 
   - Thêm meta description
   - Add Open Graph tags
   - Submit to Google Search Console

2. **Analytics**:
   - Google Analytics
   - Hotjar for heatmaps

3. **Performance**:
   - Compress images (TinyPNG)
   - Use WebP format
   - Enable caching

4. **Content**:
   - Viết blog posts
   - Thêm testimonials
   - Update projects thường xuyên

## 🆘 Need Help?

- **CSS không compile**: Chạy lại `npm install`
- **Animations không chạy**: Check Console (F12) for errors
- **Images không load**: Kiểm tra paths trong HTML & JS
- **Responsive lỗi**: Check TailwindCSS classes (md:, lg:)

---

Good luck với portfolio! 🚀✨
