# 🚀 Portfolio Setup Guide

## 📧 Cấu hình EmailJS (Để Contact Form hoạt động)

### Bước 1: Đăng ký EmailJS
1. Truy cập [https://www.emailjs.com/](https://www.emailjs.com/)
2. Đăng ký tài khoản miễn phí (100 emails/tháng)
3. Xác nhận email

### Bước 2: Tạo Email Service
1. Vào **Email Services** → **Add New Service**
2. Chọn Gmail (hoặc email provider của bạn)
3. Connect Gmail account: `hungmobile457@gmail.com`
4. Copy **Service ID** (ví dụ: `service_abc123`)

### Bước 3: Tạo Email Template
1. Vào **Email Templates** → **Create New Template**
2. Sử dụng template này:

```
Subject: 📬 Contact từ Portfolio - {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from Portfolio Website
```

3. **Template Variables cần có:**
   - `from_name`
   - `from_email`
   - `subject`
   - `message`

4. Copy **Template ID** (ví dụ: `template_xyz789`)

### Bước 4: Lấy Public Key
1. Vào **Account** → **General**
2. Copy **Public Key** (ví dụ: `user_abc123xyz`)

### Bước 5: Cập nhật Code
Mở file `js/main-new.js` và tìm dòng:

```javascript
// Line ~447
emailjs.init("YOUR_PUBLIC_KEY"); // Thay bằng Public Key của bạn

// Line ~473-475
const response = await emailjs.send(
    "YOUR_SERVICE_ID",     // Thay bằng Service ID
    "YOUR_TEMPLATE_ID",    // Thay bằng Template ID
    formData
);
```

**Ví dụ sau khi thay:**
```javascript
emailjs.init("user_abc123xyz");

const response = await emailjs.send(
    "service_abc123",
    "template_xyz789",
    formData
);
```

### Bước 6: Test
1. Refresh trang web
2. Điền form contact
3. Submit
4. Kiểm tra email `hungmobile457@gmail.com`

---

## 📝 Cập nhật Nội dung Portfolio

### Timeline/Experience
File: `index.html` (dòng 670-815)
- Cập nhật job titles, companies, dates
- Thêm/xóa timeline items

### Projects
File: `js/main-new.js` (dòng 304-370)
```javascript
const projectsData = [
    {
        id: 1,
        title: 'Tên dự án',
        category: 'web', // web, mobile, design
        image: 'URL ảnh',
        description: 'Mô tả ngắn',
        fullDescription: 'Mô tả đầy đủ',
        tech: ['React', 'Node.js', ...],
        features: ['Feature 1', 'Feature 2', ...],
        duration: '3 tháng',
        role: 'Full-stack Developer',
        year: '2024',
        link: 'https://demo.com',
        github: 'https://github.com/...'
    }
]
```

### Skills
File: `index.html` (dòng 950-990)
- Cập nhật skill names và percentages
- Thêm/xóa skills

### Social Links
File: `index.html`
- Hero section (dòng 514-526)
- Contact section (dòng 1110-1130)

Update URLs:
```html
<a href="https://github.com/yourusername" target="_blank">
<a href="https://linkedin.com/in/yourusername" target="_blank">
<a href="https://twitter.com/yourusername" target="_blank">
<a href="https://facebook.com/yourusername" target="_blank">
```

---

## 🎨 Tùy chỉnh Theme Colors

File: `index.html` (dòng 33-45)

```javascript
colors: {
    primary: {
        500: '#6366f1',  // Main color
        600: '#4f46e5',  // Hover color
        // ... more shades
    }
}
```

---

## 📷 Thêm Ảnh Thật

1. Tạo thư mục `assets/` trong Portfolio
2. Thêm các file:
   - `avatar.jpg` (400x400px)
   - `about-image.jpg` (600x400px)
   - `project1.jpg` - `project6.jpg` (400x300px)

3. Update URLs trong code:
```javascript
// Avatar (index.html dòng 537)
<img src="./assets/avatar.jpg" ...>

// About image (index.html dòng 583)
<img src="./assets/about-image.jpg" ...>

// Projects (js/main-new.js)
image: './assets/project1.jpg'
```

---

## 🚀 Deploy

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

Settings → Pages → Source: main branch → Save

### Vercel
1. Import GitHub repository
2. Deploy (tự động)

### Netlify
1. Drag & drop folder Portfolio
2. Deploy

---

## 📞 Thông tin liên hệ

- **Email:** hungmobile457@gmail.com
- **Phone:** 0764 950 871

---

## ✨ Features đã implement

✅ Responsive design
✅ Dark/Light mode
✅ Timeline animation
✅ Number counter
✅ Project modal
✅ Contact form với EmailJS
✅ Notification system
✅ Smooth animations
✅ SEO ready

---

**Chúc bạn thành công với Portfolio mới! 🎉**
