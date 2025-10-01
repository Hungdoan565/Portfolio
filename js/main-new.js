// Main JavaScript file for Portfolio
(function() {
    'use strict';

    // ====== Page Loader ======
    window.addEventListener('load', function() {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.style.overflow = 'visible';
                    
                    // Trigger initial animations
                    animateOnLoad();
                }, 500);
            }
        }, 2000);
    });

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

    // ====== Projects Data and Filtering ======
    const initProjects = () => {
        const projectsData = [
            {
                id: 1,
                title: 'E-Commerce Platform',
                category: 'web',
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
                description: 'Nền tảng thương mại điện tử hiện đại với React và Node.js',
                tech: ['React', 'Node.js', 'MongoDB'],
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
                    <div class="relative group">
                        <img src="${project.image}" alt="${project.title}" 
                             class="w-full h-48 object-cover" 
                             onerror="this.src='https://via.placeholder.com/400x300/667eea/ffffff?text=${project.title}'">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex gap-3">
                                    <a href="${project.link}" target="_blank" 
                                       class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">
                                        <i class="fas fa-external-link-alt mr-2"></i>Demo
                                    </a>
                                    <a href="${project.github}" target="_blank" 
                                       class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">
                                        <i class="fab fa-github mr-2"></i>Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${project.description}</p>
                        <div class="flex flex-wrap gap-2">
                            ${project.tech.map(tech => `
                                <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">
                                    ${tech}
                                </span>
                            `).join('')}
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
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                // Here you would typically send the data to a server
                console.log('Form data:', formData);
                
                // Show success message (mock)
                alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
                
                // Reset form
                contactForm.reset();
            });
        }
    };

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