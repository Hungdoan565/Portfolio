# 📧 Email Templates cho Portfolio Contact Form

## 📁 Cấu trúc thư mục

```
email-templates/
├── contact-template.html    # Template HTML cho EmailJS
├── SETUP-GUIDE.md          # Hướng dẫn setup chi tiết
└── README.md               # File này
```

---

## 🚀 Quick Start

### 1. Copy HTML Template

Mở file `contact-template.html` và copy toàn bộ nội dung

### 2. Paste vào EmailJS

1. Đăng nhập https://www.emailjs.com/
2. Vào **Email Templates** → **Create New Template**
3. Paste HTML vào phần **Content**
4. Lưu Template ID

### 3. Update Code

File `js/main-new.js` đã được cập nhật sẵn để gửi các biến:

```javascript
{
  from_name: "Tên người gửi",
  from_email: "email@example.com",
  subject: "Tiêu đề",
  message: "Nội dung",
  timestamp: "01/01/2025, 10:30:45",
  from_name_initial: "T",
  reply_to: "email@example.com"
}
```

### 4. Test

Submit form contact trên website và kiểm tra email!

---

## ✨ Features

### 📬 Email Template bao gồm:

- ✅ **Header gradient** với màu brand (tím)
- ✅ **Avatar circle** với chữ cái đầu tên
- ✅ **Thông tin đầy đủ**: Tên, Email, Tiêu đề, Thời gian
- ✅ **Nội dung tin nhắn** trong box riêng biệt
- ✅ **CTA Button** "Trả lời ngay" để reply nhanh
- ✅ **Footer** với thông tin copyright
- ✅ **Responsive design** cho mọi email client
- ✅ **Professional styling** với gradient và shadows

---

## 🎨 Customization

### Thay đổi màu sắc

Trong `contact-template.html`, tìm và sửa:

```css
/* Header gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Avatar gradient */
background: linear-gradient(135deg, #667eea, #764ba2);

/* CTA button */
background: linear-gradient(135deg, #667eea, #764ba2);
```

### Thay đổi text

- Dòng 146: "📬 Liên hệ mới từ Portfolio"
- Dòng 155: "Món Ngon Việt Nam" → Tên website của bạn
- Dòng 205: "Đoàn Vĩnh Hưng Portfolio" → Tên bạn

---

## 📱 Variables Map

| Form Field | Template Variable | Mô tả |
|-----------|------------------|-------|
| Name | `{{from_name}}` | Họ tên người gửi |
| Email | `{{from_email}}` | Email người gửi |
| Subject | `{{subject}}` | Tiêu đề liên hệ |
| Message | `{{message}}` | Nội dung chi tiết |
| - | `{{timestamp}}` | Thời gian gửi (auto) |
| - | `{{from_name_initial}}` | Ký tự đầu tên (auto) |
| - | `{{reply_to}}` | Email để reply (auto) |

---

## 🔧 EmailJS Settings

### Service Settings:
- **Service Type**: Gmail/Outlook/Custom SMTP
- **From Name**: Portfolio Website
- **From Email**: your-email@domain.com

### Template Settings:
- **Template Name**: Portfolio Contact Form
- **Subject**: `Liên hệ mới: {{subject}}`
- **Reply To**: `{{reply_to}}`

---

## 📸 Preview

### Desktop Email View:
```
┌──────────────────────────────────┐
│  📬 Liên hệ mới từ Portfolio     │ ← Gradient header
├──────────────────────────────────┤
│  Xin chào Quản trị viên,         │
│                                  │
│  ┌──────────────────────────┐   │
│  │ [T]  ← Avatar             │   │
│  │ 👤 Họ và tên: Nguyễn Văn A│   │
│  │ 📧 Email: email@gmail.com │   │
│  │ 📋 Tiêu đề: Hỏi về dịch vụ│   │
│  │ ⏰ Thời gian: 01/01 10:30 │   │
│  └──────────────────────────┘   │
│                                  │
│  ┌──────────────────────────┐   │
│  │ 💬 Nội dung liên hệ:     │   │
│  │ Tôi muốn hỏi về...       │   │
│  └──────────────────────────┘   │
│                                  │
│      [📨 Trả lời ngay]           │ ← CTA Button
├──────────────────────────────────┤
│  © 2025 Portfolio                │ ← Footer
└──────────────────────────────────┘
```

---

## ❓ Troubleshooting

### Email không nhận được?
1. Kiểm tra Service ID và Template ID
2. Kiểm tra Public Key
3. Xem Console log trong browser
4. Kiểm tra spam folder

### Email nhận được nhưng thiếu dữ liệu?
1. Đảm bảo tên biến trong template khớp với code
2. Check network tab xem data có gửi đi không
3. Test với EmailJS dashboard

### Style email bị lỗi?
1. Một số email client strip CSS
2. Dùng inline styles nhiều hơn
3. Test với Gmail, Outlook, Yahoo

---

## 📚 Documentation

- EmailJS Docs: https://www.emailjs.com/docs/
- HTML Email Guide: https://templates.mailchimp.com/resources/email-client-css-support/
- Can I Email: https://www.caniemail.com/

---

## 🎉 Done!

Template đã sẵn sàng! Chỉ cần:
1. Copy HTML vào EmailJS
2. Update Service/Template ID trong code
3. Test và enjoy! 

**Support:** hungmobile457@gmail.com

---

Made with ❤️ and Code by Đoàn Vĩnh Hưng
