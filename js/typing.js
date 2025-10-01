// Typing Animation Effect
class TypeWriter {
    constructor(element, words, wait = 2000) {
        this.element = element;
        this.words = words;
        this.text = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullText = this.words[current];
        
        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }
        
        this.element.textContent = this.text;
        
        let typeSpeed = this.isDeleting ? 50 : 100;
        
        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typedText = document.getElementById('typed-text');
    
    if (typedText) {
        const words = [
            'Frontend Developer',
            'UI/UX Enthusiast',
            'Creative Coder',
            'Problem Solver',
            'Web Designer'
        ];
        
        new TypeWriter(typedText, words, 3000);
    }
});
