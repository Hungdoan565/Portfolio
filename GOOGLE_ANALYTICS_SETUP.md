# 📊 HƯỚNG DẪN SETUP GOOGLE ANALYTICS

## Bước 1: Tạo tài khoản Google Analytics

1. Truy cập: https://analytics.google.com/
2. Đăng nhập bằng Google Account
3. Nhấn "Start measuring"
4. Nhập thông tin:
   - Account Name: `Portfolio - Đoàn Vĩnh Hưng`
   - Property Name: `Portfolio Website`
   - Time Zone: `Vietnam (GMT+7)`
   - Currency: `Vietnamese Dong (₫)`

## Bước 2: Lấy Measurement ID

1. Sau khi tạo property, bạn sẽ nhận được **Measurement ID**
   - Format: `G-XXXXXXXXXX`
2. Copy Measurement ID này

## Bước 3: Thêm vào Website

### Option 1: Thêm trực tiếp vào HTML

Thêm code sau **TRƯỚC thẻ `</head>`** trong file `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**⚠️ Thay `G-XXXXXXXXXX` bằng Measurement ID thực của bạn!**

### Option 2: Sử dụng file analytics.js có sẵn

File `js/analytics.js` đã được tạo sẵn với các event tracking:
- Button clicks
- Project views
- Form submissions
- CV downloads
- Social media clicks
- Theme changes

Chỉ cần cập nhật Measurement ID ở dòng 158:

```javascript
gtag('config', 'G-XXXXXXXXXX', {
    'page_path': lastPath
});
```

## Bước 4: Kích hoạt Analytics Module

Thêm vào cuối file `index.html`:

```html
<!-- Google Analytics Module -->
<script src="./js/analytics.js"></script>
```

## Bước 5: Verify

1. Mở website
2. Mở Chrome DevTools (F12) → Console
3. Kiểm tra xem có log `✅ Analytics module loaded` không
4. Quay lại Google Analytics Dashboard
5. Vào **Realtime** → Bạn sẽ thấy chính mình đang online!

## Custom Events đã được setup sẵn:

```javascript
// Track button click
Analytics.trackButtonClick('Download CV', 'Contact Section');

// Track project view
Analytics.trackProjectView(1, 'E-Commerce Platform');

// Track form submit
Analytics.trackFormSubmit('Contact Form', true);

// Track CV download
Analytics.trackDownload('Doan-Vinh-Hung-CV.pdf');

// Track social click
Analytics.trackSocialClick('GitHub', 'Hero Section');

// Track theme change
Analytics.trackThemeChange('dark');
```

## ⚠️ Lưu ý:

- **KHÔNG push Measurement ID lên GitHub public** (nếu lo ngại)
- Analytics mất 24-48h để hiển thị đầy đủ dữ liệu
- Nên test bằng Realtime view trước
- Có thể tắt tracking cho chính mình bằng browser extension

## 🎯 Metrics quan trọng cần theo dõi:

1. **Page Views** - Lượt xem trang
2. **Session Duration** - Thời gian ở lại
3. **Bounce Rate** - Tỷ lệ thoát ngay
4. **Most Viewed Projects** - Dự án được xem nhiều nhất
5. **Form Submissions** - Số lượng contact form gửi
6. **CV Downloads** - Số lần tải CV
7. **Traffic Sources** - Nguồn traffic (Direct, Social, Search...)

---

**Tạo bởi**: AI Assistant
**Ngày**: 2025-10-03
