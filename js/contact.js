// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.toast = document.getElementById('toast');
        this.toastMessage = document.getElementById('toast-message');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate
        if (!this.validateForm(formData)) {
            this.showToast('Vui lòng điền đầy đủ thông tin!', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang gửi...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual API endpoint)
            await this.simulateSubmit(formData);
            
            // Success
            this.showToast('Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi sớm nhất.', 'success');
            this.form.reset();
            
        } catch (error) {
            this.showToast('Có lỗi xảy ra. Vui lòng thử lại sau!', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return (
            data.name.trim().length > 0 &&
            emailRegex.test(data.email) &&
            data.subject.trim().length > 0 &&
            data.message.trim().length > 10
        );
    }
    
    async simulateSubmit(data) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 1500);
        });
        
        // In production, replace with:
        // const response = await fetch('YOUR_API_ENDPOINT', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // return await response.json();
    }
    
    showToast(message, type = 'success') {
        this.toastMessage.textContent = message;
        
        const icon = this.toast.querySelector('i');
        icon.className = type === 'success' 
            ? 'fas fa-check-circle text-green-500 text-xl'
            : 'fas fa-exclamation-circle text-red-500 text-xl';
        
        // Show toast
        this.toast.style.transform = 'translateX(0)';
        
        // Hide after 4 seconds
        setTimeout(() => {
            this.toast.style.transform = 'translateX(full)';
        }, 4000);
    }
}

// Initialize - DISABLED to avoid conflict with main-new.js
// document.addEventListener('DOMContentLoaded', () => {
//     new ContactForm();
// });
