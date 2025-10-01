// Main JavaScript file for Portfolio
(function() {
    'use strict';

    // ====== Page Loader ======
    class PageLoader {
        constructor() {
            this.loader = document.getElementById('page-loader');
            this.progress = document.getElementById('loader-progress');
            this.percentage = document.getElementById('loader-percentage');
            this.loadedResources = 0;
            this.totalResources = 0;
            this.currentPercentage = 0;
            this.targetPercentage = 0;
            this.isComplete = false;
            this.minDisplayTime = 1500; // Minimum time to display loader
            this.startTime = Date.now();
            this.init();
        }
        
        init() {
            // Count resources to load
            const imgs = Array.from(document.querySelectorAll('img:not([data-src])'));
            const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
            const scripts = Array.from(document.querySelectorAll('script[src]'));
            this.totalResources = imgs.length + styles.length + scripts.length;
            if (this.totalResources === 0) this.totalResources = 1;
            
            // Track resource loading
            this.trackResources();
            
            // Start smooth progress animation
            this.animateProgress();
            
            // Force complete after maximum timeout
            this.maxTimeout(5000);
        }
        
        trackResources() {
            // Track images
            document.querySelectorAll('img:not([data-src])').forEach(img => {
                if (img.complete) {
                    this.updateProgress();
                } else {
                    img.addEventListener('load', () => this.updateProgress(), { once: true });
                    img.addEventListener('error', () => this.updateProgress(), { once: true });
                }
            });
            
            // Track stylesheets
            document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                link.addEventListener('load', () => this.updateProgress(), { once: true });
                link.addEventListener('error', () => this.updateProgress(), { once: true });
            });
            
            // Track scripts
            document.querySelectorAll('script[src]').forEach(script => {
                script.addEventListener('load', () => this.updateProgress(), { once: true });
                script.addEventListener('error', () => this.updateProgress(), { once: true });
            });
            
            // Also listen to window load event
            window.addEventListener('load', () => {
                this.forceComplete();
            });
        }
        
        updateProgress() {
            this.loadedResources++;
            this.targetPercentage = Math.min(
                Math.round((this.loadedResources / this.totalResources) * 100),
                100
            );
            
            // If we reach 100%, mark as complete
            if (this.targetPercentage >= 100) {
                this.forceComplete();
            }
        }
        
        forceComplete() {
            // Force target to 100%
            this.targetPercentage = 100;
        }
        
        animateProgress() {
            const animate = () => {
                // Smoothly increment percentage
                if (this.currentPercentage < this.targetPercentage) {
                    // Speed up animation as we get closer to target
                    const increment = this.targetPercentage === 100 && this.currentPercentage > 90 ? 2 : 1;
                    this.currentPercentage = Math.min(this.currentPercentage + increment, this.targetPercentage);
                    
                    if (this.progress) {
                        this.progress.style.width = this.currentPercentage + '%';
                    }
                    
                    if (this.percentage) {
                        this.percentage.textContent = this.currentPercentage + '%';
                    }
                }
                
                // Check if we reached 100%
                if (this.currentPercentage >= 100 && !this.isComplete) {
                    this.isComplete = true;
                    this.checkAndHide();
                } else if (this.currentPercentage < 100) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        }
        
        checkAndHide() {
            // Ensure minimum display time has passed
            const elapsedTime = Date.now() - this.startTime;
            const remainingTime = Math.max(0, this.minDisplayTime - elapsedTime);
            
            setTimeout(() => {
                this.hide();
            }, remainingTime + 300); // Small delay after reaching 100%
        }
        
        maxTimeout(ms = 5000) {
            // Emergency timeout - force complete if something goes wrong
            setTimeout(() => {
                if (!this.isComplete) {
                    this.forceComplete();
                }
            }, ms);
        }
        
        hide() {
            if (!this.loader || this.loader.style.display === 'none') return;
            this.loader.style.opacity = '0';
            setTimeout(() => {
                if (!this.loader) return;
                this.loader.style.display = 'none';
                document.body.style.overflow = 'visible';
                
                // Trigger initial animations
                animateOnLoad();
            }, 500);
        }
    }
    
    // Initialize loader
    new PageLoader();

    // ====== Dark Mode Toggle ======
    const initTheme = () => {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const htmlElement = document.documentElement;
        
        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        if (currentTheme === 'dark') {
            htmlElement.classList.add('dark');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                htmlElement.classList.toggle('dark');
                
                if (htmlElement.classList.contains('dark')) {
                    localStorage.setItem('theme', 'dark');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                } else {
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            });
        }
    };

    // ====== Mobile Menu ======
    const initMobileMenu = () => {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('active');
            });
        }

        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        }

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    };

    // ====== Navbar Scroll Effect ======
    const initNavbar = () => {
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                navbar.classList.add('glass', 'backdrop-blur-lg', 'shadow-lg');
            } else {
                navbar.classList.remove('glass', 'backdrop-blur-lg', 'shadow-lg');
            }

            // Hide/Show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    };

    // ====== Typing Animation ======
    const initTypingAnimation = () => {
        const typedRole = document.getElementById('typed-role');
        if (!typedRole) return;

        const roles = [
            'Frontend Developer',
            'UI/UX Designer',
            'Web Developer',
            'Creative Coder'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typedRole.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedRole.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before typing next
            }

            setTimeout(type, typingSpeed);
        }

        type();
    };

    // ====== Scroll Reveal Animation ======
    const initScrollReveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        const staggers = document.querySelectorAll('.stagger');
        
        const revealOnScroll = () => {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });

            // Stagger animation for groups
            staggers.forEach((element, index) => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    setTimeout(() => {
                        element.classList.add('active');
                    }, index * 100);
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Check on load
    };

    // ====== Skills Progress Animation ======
    const initSkillsAnimation = () => {
        const skillBars = document.querySelectorAll('.skill-progress-bar');
        
        const animateSkills = () => {
            skillBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (barTop < windowHeight - 100 && !bar.classList.contains('animated')) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                    bar.classList.add('animated');
                }
            });
        };

        window.addEventListener('scroll', animateSkills);
        animateSkills();
    };

    // ====== Number Counter Animation ======
    const initNumberCounter = () => {
        const counters = document.querySelectorAll('[data-counter]');
        
        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-counter'));
            const suffix = element.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + suffix;
                }
            };
            
            updateCounter();
        };
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    };

    // ====== Timeline Animation ======
    const initTimelineAnimation = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('timeline-visible');
                    }, index * 150);
                }
            });
        }, observerOptions);
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    };

    // ====== Projects Data and Filtering ======
    const initProjects = () => {
        const projectsData = [
            {
                id: 1,
                title: 'E-Commerce Platform',
                category: 'web',
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
                description: 'Nền tảng thương mại điện tử hiện đại với React và Node.js',
                fullDescription: 'Một nền tảng thương mại điện tử đầy đủ tính năng với giao diện hiện đại, hệ thống thanh toán tích hợp và quản lý đơn hàng tự động.',
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
                features: [
                    'Giao diện responsive trên mọi thiết bị',
                    'Hệ thống thanh toán tích hợp Stripe',
                    'Quản lý sản phẩm và đơn hàng',
                    'Tìm kiếm và lọc sản phẩm',
                    'Dashboard admin',
                    'Thông báo real-time'
                ],
                duration: '3 tháng',
                role: 'Full-stack Developer',
                year: '2024',
                link: '#',
                github: '#'
            },
            {
                id: 2,
                title: 'Task Management App',
                category: 'web',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
                description: 'Ứng dụng quản lý công việc với real-time updates',
                tech: ['Vue.js', 'Express', 'Socket.io'],
                link: '#',
                github: '#'
            },
            {
                id: 3,
                title: 'Mobile Banking UI',
                category: 'mobile',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
                description: 'Giao diện ứng dụng ngân hàng di động',
                tech: ['React Native', 'Redux'],
                link: '#',
                github: '#'
            },
            {
                id: 4,
                title: 'Portfolio Website',
                category: 'web',
                image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
                description: 'Website portfolio cá nhân với hiệu ứng đẹp mắt',
                tech: ['HTML', 'CSS', 'JavaScript'],
                link: '#',
                github: '#'
            },
            {
                id: 5,
                title: 'Dashboard Design',
                category: 'design',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
                description: 'Thiết kế dashboard phân tích dữ liệu',
                tech: ['Figma', 'UI/UX'],
                link: '#',
                github: '#'
            },
            {
                id: 6,
                title: 'Social Media App',
                category: 'mobile',
                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
                description: 'Ứng dụng mạng xã hội với tính năng chat real-time',
                tech: ['Flutter', 'Firebase'],
                link: '#',
                github: '#'
            }
        ];

        const projectsGrid = document.getElementById('projects-grid');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // Render projects
        const renderProjects = (filter = 'all') => {
            const filteredProjects = filter === 'all' 
                ? projectsData 
                : projectsData.filter(project => project.category === filter);
            
            projectsGrid.innerHTML = '';
            
            filteredProjects.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = 'card glass rounded-2xl overflow-hidden reveal';
                projectCard.style.animationDelay = `${index * 0.1}s`;
                
                projectCard.innerHTML = `
                    <div class="relative group cursor-pointer" onclick="openProjectModal(${project.id})">
                        <img src="${project.image}" alt="${project.title}" 
                             class="w-full h-48 object-cover" 
                             onerror="this.src='https://via.placeholder.com/400x300/667eea/ffffff?text=${project.title}'">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="bg-white/90 dark:bg-black/90 w-12 h-12 rounded-full flex items-center justify-center">
                                    <i class="fas fa-plus text-xl text-gray-900 dark:text-white"></i>
                                </div>
                            </div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex gap-3">
                                    <button onclick="event.stopPropagation(); window.open('${project.link}', '_blank')" 
                                       class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">
                                        <i class="fas fa-external-link-alt mr-2"></i>Demo
                                    </button>
                                    <button onclick="event.stopPropagation(); window.open('${project.github}', '_blank')" 
                                       class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">
                                        <i class="fab fa-github mr-2"></i>Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${project.description}</p>
                        <div class="flex flex-wrap gap-2">
                            ${project.tech.slice(0, 3).map(tech => `
                                <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">
                                    ${tech}
                                </span>
                            `).join('')}
                            ${project.tech.length > 3 ? `
                                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                                    +${project.tech.length - 3}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                `;
                
                projectsGrid.appendChild(projectCard);
            });
            
            // Reinitialize scroll reveal for new elements
            initScrollReveal();
        };

        // Filter button click
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-indigo-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'dark:bg-gray-700');
                });
                
                button.classList.remove('bg-gray-200', 'dark:bg-gray-700');
                button.classList.add('bg-indigo-600', 'text-white');
                
                const filter = button.getAttribute('data-filter');
                renderProjects(filter);
            });
        });

        // Initial render
        renderProjects();
    };

    // ====== Contact Form ======
    const initContactForm = () => {
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init("wE_iY_vjEb7NPGCq7"); // Your EmailJS Public Key
        }
        
        const contactForm = document.getElementById('contact-form');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    from_name: document.getElementById('name').value,
                    from_email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                // Show loading state
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang gửi...';
                submitBtn.disabled = true;
                
                try {
                    if (typeof emailjs !== 'undefined') {
                        // Send email using EmailJS
                        const response = await emailjs.send(
                            "service_x0siako",     // Your EmailJS Service ID
                            "template_kxprilp",    // Your EmailJS Template ID
                            formData
                        );
                        
                        // Show success notification
                        showNotification('Tin nhắn đã được gửi thành công!', 'success');
                        
                        // Reset form
                        contactForm.reset();
                    } else {
                        // Fallback - show demo message
                        showNotification('Demo: Tin nhắn sẽ được gửi khi setup EmailJS!', 'info');
                        contactForm.reset();
                    }
                } catch (error) {
                    console.error('Email send failed:', error);
                    showNotification('Có lỗi xảy ra. Vui lòng thử lại sau!', 'error');
                } finally {
                    // Reset button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    };
    
    // ====== Notification System ======
    const showNotification = (message, type = 'success') => {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transform translate-x-full transition-all duration-300`;
        
        // Set colors based on type
        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-blue-500 text-white'
        };
        
        notification.className += ` ${colors[type] || colors.success}`;
        
        // Set icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="${icons[type] || icons.success}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white/80 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Slide in animation
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    };

    // ====== Project Modal Functions ======
    const projectsData = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            category: 'web',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
            description: 'Nền tảng thương mại điện tử hiện đại với React và Node.js',
            fullDescription: 'Một nền tảng thương mại điện tử đầy đủ tính năng với giao diện hiện đại, hệ thống thanh toán tích hợp và quản lý đơn hàng tự động.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
            features: [
                'Giao diện responsive trên mọi thiết bị',
                'Hệ thống thanh toán tích hợp Stripe',
                'Quản lý sản phẩm và đơn hàng',
                'Tìm kiếm và lọc sản phẩm',
                'Dashboard admin',
                'Thông báo real-time'
            ],
            duration: '3 tháng',
            role: 'Full-stack Developer',
            year: '2024',
            link: '#',
            github: '#'
        }
        // Add more projects with similar structure...
    ];

    const openProjectModal = (projectId) => {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;
        
        const modal = document.getElementById('project-modal');
        
        // Populate modal content
        document.getElementById('modal-image').src = project.image;
        document.getElementById('modal-image').alt = project.title;
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.fullDescription || project.description;
        
        // Features
        const featuresList = document.querySelector('#modal-features ul');
        featuresList.innerHTML = project.features ? project.features.map(feature => `<li>${feature}</li>`).join('') : '';
        
        // Tech stack
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = project.tech.map(tech => `
            <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">
                ${tech}
            </span>
        `).join('');
        
        // Project details
        document.getElementById('modal-duration').textContent = project.duration || '2 tuần';
        document.getElementById('modal-role').textContent = project.role || 'Developer';
        document.getElementById('modal-year').textContent = project.year || '2024';
        
        // Links
        document.getElementById('modal-live-link').href = project.link;
        document.getElementById('modal-github-link').href = project.github;
        
        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animation
        setTimeout(() => {
            modal.querySelector('.relative.bg-white').style.transform = 'scale(1)';
            modal.querySelector('.relative.bg-white').style.opacity = '1';
        }, 10);
    };
    
    const closeProjectModal = () => {
        const modal = document.getElementById('project-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'visible';
    };
    
    // Make functions global for onclick handlers
    window.openProjectModal = openProjectModal;
    window.closeProjectModal = closeProjectModal;

    // ====== Back to Top Button ======
    const initBackToTop = () => {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.pointerEvents = 'auto';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.pointerEvents = 'none';
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ====== Smooth Scroll for Anchor Links ======
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ====== Parallax Effect ======
    const initParallax = () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    };

    // ====== Animate on Load ======
    const animateOnLoad = () => {
        // Add animation classes to elements that should animate on page load
        const elementsToAnimate = document.querySelectorAll('.reveal');
        elementsToAnimate.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, index * 100);
        });
    };

    // ====== Initialize Everything ======
    const init = () => {
        initTheme();
        initMobileMenu();
        initNavbar();
        initTypingAnimation();
        initScrollReveal();
        initSkillsAnimation();
        initNumberCounter();
        initTimelineAnimation();
        initProjects();
        initContactForm();
        initBackToTop();
        initSmoothScroll();
        initParallax();
    };

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();