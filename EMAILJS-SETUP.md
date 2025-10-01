# 📧 HƯỚNG DẪN SETUP EMAILJS - BƯỚC CUỐI!

## 🚨 **VẤN ĐỀ HIỆN TẠI:**
Form reset nhưng không gửi được email → **Service ID hoặc Template ID sai!**

---

## ✅ **GIẢI PHÁP - LÀM THEO CÁC BƯỚC SAU:**

### **BƯỚC 1: Đăng nhập EmailJS**
1. Vào: https://dashboard.emailjs.com/
2. Đăng nhập tài khoản

---

### **BƯỚC 2: Lấy Service ID**

1. Click **Email Services** ở sidebar trái
2. Bạn sẽ thấy danh sách services
3. **Copy Service ID** (dạng: `service_xxxxxx`)

#### **Ví dụ:**
```
Service Name: Gmail
Service ID: service_abc123xyz  ← Copy cái này!
```

---

### **BƯỚC 3: Lấy Template ID**

1. Click **Email Templates** ở sidebar trái
2. Tìm template bạn vừa tạo (hoặc tạo mới nếu chưa có)
3. **Copy Template ID** (dạng: `template_xxxxxx`)

#### **Ví dụ:**
```
Template Name: Portfolio Contact Form
Template ID: template_xyz789abc  ← Copy cái này!
```

---

### **BƯỚC 4: Lấy Public Key**

1. Click **Account** ở sidebar trái
2. Tab **General**
3. Tìm **Public Key** (dạng: `xxxxxxxxxxxxxxx`)
4. Copy key này

#### **Ví dụ:**
```
Public Key: wE_iY_vjEb7NPGCq7  ← Copy cái này!
```

---

### **BƯỚC 5: Update Code**

Mở file: `js/main-new.js`

#### **5.1. Update Public Key** (dòng ~658):
```javascript
emailjs.init("wE_iY_vjEb7NPGCq7"); // ← Thay bằng Public Key của bạn
```

#### **5.2. Update Service ID và Template ID** (dòng ~733-734):
```javascript
const SERVICE_ID = "service_x0siako";      // ← Thay bằng Service ID của bạn
const TEMPLATE_ID = "template_kxprilp";    // ← Thay bằng Template ID của bạn
```

---

### **BƯỚC 6: Setup Email Template (Nếu chưa có)**

#### **6.1. Tạo Template:**
1. Vào **Email Templates** → **Create New Template**

#### **6.2. Template Settings:**
- **Template Name**: `Portfolio Contact Form`
- **Subject**: `Liên hệ mới: {{subject}}`

#### **6.3. Content (HTML):**
Paste code này vào phần **Content**:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .greeting { color: #dc2626; font-size: 20px; font-weight: 600; margin-bottom: 20px; }
        .info-box { background: #f9fafb; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .info-row { margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .label { font-weight: 600; color: #374151; display: inline-block; width: 120px; }
        .value { color: #1f2937; }
        .message-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .message-label { font-weight: 600; color: #374151; margin-bottom: 10px; }
        .message-content { color: #1f2937; line-height: 1.6; white-space: pre-wrap; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📬 Liên hệ mới từ Portfolio</h1>
            <p>Bạn vừa nhận được tin nhắn từ website</p>
        </div>
        
        <div class="content">
            <div class="greeting">Xin chào!</div>
            
            <p>Bạn vừa nhận được một liên hệ mới từ website Portfolio:</p>
            
            <div class="info-box">
                <div class="info-row">
                    <span class="label">👤 Họ và tên:</span>
                    <span class="value">{{from_name}}</span>
                </div>
                <div class="info-row">
                    <span class="label">📧 Email:</span>
                    <span class="value">{{from_email}}</span>
                </div>
                <div class="info-row">
                    <span class="label">📋 Tiêu đề:</span>
                    <span class="value">{{subject}}</span>
                </div>
                <div class="info-row">
                    <span class="label">⏰ Thời gian:</span>
                    <span class="value">{{timestamp}}</span>
                </div>
            </div>
            
            <div class="message-box">
                <div class="message-label">💬 Nội dung liên hệ:</div>
                <div class="message-content">{{message}}</div>
            </div>
            
            <center>
                <a href="mailto:{{from_email}}" class="button">📨 Trả lời ngay</a>
            </center>
        </div>
        
        <div class="footer">
            <p><strong>© 2025 Portfolio</strong></p>
            <p>Made with ❤️ and Code</p>
        </div>
    </div>
</body>
</html>
```

#### **6.4. Settings Tab:**
- **To Email**: `hungmobile457@gmail.com` (email bạn muốn nhận)
- **From Name**: `Portfolio Website`
- **Reply To**: `{{from_email}}`

#### **6.5. Save Template**
Click **Save** và copy **Template ID**

---

### **BƯỚC 7: Test**

1. **Reload website**: Ctrl + F5
2. **Mở Console**: F12 → Console tab
3. **Điền form và submit**
4. **Xem Console log:**
   - Phải thấy: `✅ Email sent successfully!`
   - Nếu lỗi: Đọc error message và fix

5. **Check Gmail inbox**: Kiểm tra email (cả spam folder)

---

## 🔍 **XỬ LÝ LỖI THƯỜNG GẶP:**

### **Lỗi 1: "Invalid service ID"**
→ Service ID sai hoặc service chưa active
→ Check lại ở Email Services

### **Lỗi 2: "Template not found"**
→ Template ID sai hoặc template chưa save
→ Check lại ở Email Templates

### **Lỗi 3: "Public key is invalid"**
→ Public key sai
→ Check lại ở Account → General

### **Lỗi 4: Email gửi thành công nhưng không nhận được**
→ Check spam folder
→ Check email trong template Settings → To Email

---

## 📸 **NƠI LẤY THÔNG TIN:**

```
EmailJS Dashboard
├── Email Services
│   └── [Your Service]
│       └── Service ID: service_xxxxx  ← Copy
│
├── Email Templates  
│   └── [Your Template]
│       └── Template ID: template_xxxxx  ← Copy
│
└── Account
    └── General
        └── Public Key: xxxxxxxxx  ← Copy
```

---

## 🎯 **CHECKLIST CUỐI CÙNG:**

- [ ] Đã có EmailJS account
- [ ] Đã tạo Email Service (Gmail/Outlook)
- [ ] Đã tạo Email Template với HTML
- [ ] Đã lấy Service ID
- [ ] Đã lấy Template ID
- [ ] Đã lấy Public Key
- [ ] Đã update code với 3 thông tin trên
- [ ] Đã test và check console
- [ ] Đã check Gmail inbox/spam

---

## 💡 **TIP:**

Để test nhanh, dùng **Test it** button trong EmailJS Template editor!

---

Nếu vẫn không được, paste **Console error** cho tôi xem nhé! 😊
