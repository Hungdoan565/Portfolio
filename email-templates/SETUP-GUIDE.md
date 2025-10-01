# 📧 Hướng dẫn Setup Email Template cho EmailJS

## 🎯 Bước 1: Đăng nhập EmailJS

1. Truy cập: https://www.emailjs.com/
2. Đăng nhập hoặc tạo tài khoản mới (FREE)

---

## ⚙️ Bước 2: Tạo Email Service

1. Vào **Email Services** → **Add New Service**
2. Chọn provider (Gmail, Outlook, etc.)
3. Kết nối email của bạn
4. Lưu **Service ID** (ví dụ: `service_x0siako`)

---

## 📝 Bước 3: Tạo Email Template

1. Vào **Email Templates** → **Create New Template**
2. **Template Name**: `Portfolio Contact Form`
3. **Subject**: `Liên hệ mới: {{subject}}`

### **Template Settings:**

Trong phần **Content**, dán HTML từ file `contact-template.html`

### **Template Variables (quan trọng!):**

EmailJS sử dụng các biến này từ form:

```javascript
{
  from_name: "Tên người gửi",
  from_email: "email@example.com", 
  subject: "Tiêu đề liên hệ",
  message: "Nội dung tin nhắn",
  timestamp: "01/01/2025 10:30",
  from_name_initial: "T"  // Chữ cái đầu của tên
}
```

### **Template Preview:**

Trong EmailJS template editor, thêm các biến:
- `{{from_name}}` - Họ tên
- `{{from_email}}` - Email
- `{{subject}}` - Tiêu đề
- `{{message}}` - Nội dung
- `{{timestamp}}` - Thời gian
- `{{from_name_initial}}` - Ký tự đầu tên

---

## 🔧 Bước 4: Cấu hình trong Code

File: `js/main-new.js`

```javascript
// Cập nhật Service ID và Template ID
const response = await emailjs.send(
    "service_x0siako",     // ← Thay bằng Service ID của bạn
    "template_kxprilp",    // ← Thay bằng Template ID của bạn
    {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toLocaleString('vi-VN'),
        from_name_initial: name.charAt(0).toUpperCase()
    }
);
```

### **Public Key:**
```javascript
emailjs.init("7Rf3Xss5Uzt5X6kIU"); // ← Thay bằng Public Key của bạn
```

Tìm Public Key tại: **Account** → **General**

---

## 🎨 Bước 5: Tùy chỉnh Template

### **Thay đổi màu sắc:**

```css
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Đổi màu gradient theo ý bạn */
}
```

### **Thay đổi logo/avatar:**

```css
.user-avatar {
    background: linear-gradient(135deg, #667eea, #764ba2);
    /* Hoặc thêm ảnh: */
    background-image: url('your-logo.png');
}
```

### **Thay đổi text:**

Trong file HTML, tìm và thay:
- `"Món Ngon Việt Nam"` → Tên website của bạn
- `"Đoàn Vĩnh Hưng Portfolio"` → Tên bạn

---

## ✅ Bước 6: Test

1. Mở file `index.html` trong browser
2. Scroll xuống **Contact Section**
3. Điền form và submit
4. Kiểm tra email inbox

---

## 🚨 Xử lý lỗi thường gặp

### Lỗi 1: Email không gửi được
- ✅ Kiểm tra Service ID, Template ID, Public Key
- ✅ Kiểm tra kết nối internet
- ✅ Xem Console log để debug

### Lỗi 2: Email nhận được nhưng thiếu dữ liệu
- ✅ Kiểm tra tên biến trong template phải khớp với code
- ✅ Đảm bảo tất cả field có giá trị

### Lỗi 3: Style email bị lỗi
- ✅ EmailJS có thể strip một số CSS
- ✅ Dùng inline styles thay vì external CSS
- ✅ Test với nhiều email client (Gmail, Outlook)

---

## 📱 Variables chính cần dùng

| Variable | Mô tả | Ví dụ |
|----------|-------|-------|
| `{{from_name}}` | Tên người gửi | "Nguyễn Văn A" |
| `{{from_email}}` | Email người gửi | "nguyenvana@gmail.com" |
| `{{subject}}` | Tiêu đề | "Hỏi về dịch vụ" |
| `{{message}}` | Nội dung | "Tôi muốn..." |
| `{{timestamp}}` | Thời gian | "01/01/2025, 10:30:45" |
| `{{from_name_initial}}` | Ký tự đầu | "N" |

---

## 🎉 Hoàn thành!

Sau khi setup xong, mỗi lần có người gửi contact form, bạn sẽ nhận được email đẹp như template!

### Preview email sẽ trông như thế này:
- ✨ Header gradient màu tím
- 👤 Avatar với chữ cái đầu tên
- 📋 Thông tin được format rõ ràng
- 💬 Nội dung tin nhắn trong box riêng
- 📨 Button "Trả lời ngay" để reply nhanh

---

## 💡 Tips thêm:

1. **Auto-reply**: Tạo template thứ 2 để gửi email xác nhận cho người liên hệ
2. **Notification sound**: Thêm sound khi form submit thành công
3. **Backup**: Lưu data vào database (Firebase, MongoDB) để backup
4. **Analytics**: Track số lượng contact nhận được

---

Made with ❤️ by Đoàn Vĩnh Hưng
