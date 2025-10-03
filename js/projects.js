// Projects Data - Dễ dàng thêm/sửa/xóa projects
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "fullstack",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
        description: "Nền tảng thương mại điện tử đầy đủ với giỏ hàng, thanh toán, quản lý đơn hàng và admin dashboard.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        features: [
            "Giỏ hàng và wishlist với local storage",
            "Thanh toán trực tuyến tích hợp Stripe",
            "Admin dashboard quản lý sản phẩm",
            "Hệ thống đánh giá và review sản phẩm",
            "Email notifications cho đơn hàng"
        ],
        liveLink: "#",
        githubLink: "#",
        featured: true,
        year: 2024,
        duration: "3 tháng",
        role: "Full-stack Developer"
    },
    {
        id: 2,
        title: "Task Management App",
        category: "frontend",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
        description: "Ứng dụng quản lý công việc với drag & drop, real-time collaboration và notifications.",
        technologies: ["React", "TypeScript", "TailwindCSS", "Firebase"],
        features: [
            "Drag & drop tasks giữa các columns",
            "Real-time collaboration với nhiều users",
            "Push notifications cho deadlines",
            "Kanban board và List view",
            "Filter và search tasks nâng cao"
        ],
        liveLink: "#",
        githubLink: "#",
        featured: true,
        year: 2024,
        duration: "2 tháng",
        role: "Frontend Developer"
    },
    {
        id: 3,
        title: "REST API Backend",
        category: "backend",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
        description: "RESTful API với authentication, authorization, rate limiting và comprehensive documentation.",
        technologies: ["Node.js", "Express", "PostgreSQL", "JWT"],
        features: [
            "JWT authentication và refresh tokens",
            "Role-based access control (RBAC)",
            "Rate limiting và request throttling",
            "Swagger/OpenAPI documentation",
            "Database migrations và seeding"
        ],
        liveLink: "#",
        githubLink: "#",
        featured: false,
        year: 2023,
        duration: "1 tháng",
        role: "Backend Developer"
    },
    {
        id: 4,
        title: "Portfolio Website",
        category: "frontend",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
        description: "Website portfolio cá nhân với animations đẹp mắt, dark mode và responsive design.",
        technologies: ["HTML", "CSS", "JavaScript", "TailwindCSS"],
        features: [
            "Smooth scroll animations và transitions",
            "Dark/Light mode với theme toggle",
            "Fully responsive từ mobile đến desktop",
            "Timeline animations cho kinh nghiệm",
            "Dynamic projects với pagination",
            "PWA support với Service Worker",
            "EmailJS integration cho contact form",
            "SEO optimized với meta tags đầy đủ"
        ],
        liveLink: "https://hungdoan-portfolio.netlify.app/",
        githubLink: "https://github.com/Hungdoan565/Portfolio",
        featured: true,
        year: 2024,
        duration: "2 tuần",
        role: "Frontend Developer"
    },
    {
        id: 5,
        title: "Chat Application",
        category: "fullstack",
        image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop",
        description: "Real-time chat app với WebSocket, typing indicators, online status và file sharing.",
        technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
        features: [
            "Real-time messaging với WebSocket",
            "Typing indicators và read receipts",
            "File sharing và image uploads",
            "Online/offline status tracking",
            "Message history và search"
        ],
        liveLink: "#",
        githubLink: "#",
        featured: false,
        year: 2023,
        duration: "2 tháng",
        role: "Full-stack Developer"
    },
    {
        id: 6,
        title: "Blog CMS",
        category: "fullstack",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
        description: "Content Management System cho blog với rich text editor, SEO optimization và analytics.",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "TailwindCSS"],
        features: [
            "Rich text editor với markdown support",
            "SEO optimization và meta tags",
            "Google Analytics tích hợp",
            "Categories và tags system",
            "Comment system với moderation"
        ],
        liveLink: "#",
        githubLink: "#",
        featured: true,
        year: 2024,
        duration: "6 tuần",
        role: "Full-stack Developer"
    },
    {
        id: 7,
        title: "Weather Dashboard",
        category: "frontend",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop",
        description: "Dashboard thời tiết với charts, maps, forecasts và geolocation integration.",
        technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Leaflet"],
        features: [
            "Current weather và 7-day forecast",
            "Interactive weather maps",
            "Temperature và humidity charts",
            "Geolocation auto-detect",
            "Multiple cities management"
        ],
        liveLink: "#",
        githubLink: "#",
        featured: false,
        year: 2023,
        duration: "3 tuần",
        role: "Frontend Developer"
    },
    {
        id: 8,
        title: "GraphQL API Server",
        category: "backend",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
        description: "GraphQL API với Apollo Server, subscriptions, dataloader và type-safe schema.",
        technologies: ["Node.js", "GraphQL", "Apollo", "MongoDB"],
        features: [
            "Type-safe GraphQL schema",
            "Real-time subscriptions",
            "DataLoader cho batching queries",
            "GraphQL Playground documentation",
            "Error handling và validation"
        ],
        liveLink: "#",
        githubLink: "#",
        featured: false,
        year: 2023,
        duration: "1 tháng",
        role: "Backend Developer"
    },
    {
        id: 9,
        title: "Fitness Tracker",
        category: "frontend",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        description: "Ứng dụng theo dõi sức khỏe với workout plans, calorie tracking và progress charts.",
        technologies: ["React", "Redux", "Chart.js", "LocalStorage"],
        features: [
            "Workout plans và exercise library",
            "Calorie tracking và nutrition logs",
            "Progress charts và statistics",
            "Personal goals và milestones",
            "LocalStorage data persistence"
        ],
        liveLink: "#",
        githubLink: "#",
        featured: false,
        year: 2023,
        duration: "1 tháng",
        role: "Frontend Developer"
    },
    {
        id: 10,
        title: "Quản Lí Khách Sạn",
        category: "csharp",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
        description: "Hệ thống quản lý khách sạn hoàn chỉnh với C# WinForms, quản lý đặt phòng, khách hàng và dịch vụ.",
        technologies: ["C#", "WinForms", "SQL Server", ".NET Framework"],
        features: [
            "Quản lý thông tin khách hàng (frmKhachHang)",
            "Hệ thống đặt phòng (frmDatPhong)", 
            "Quản lý phòng và loại phòng (frmPhong)",
            "Quản lý dịch vụ khách sạn (frmSuDungDV)",
            "Báo cáo doanh thu và thống kê",
            "Giao diện thân thiện với người dùng",
            "Kết nối SQL Server database",
            "Xử lý nghiệp vụ khách sạn hoàn chỉnh"
        ],
        liveLink: "#", 
        githubLink: "https://github.com/Hungdoan565/Quan_Li_Khach_San.git", 
        featured: true,
        year: 2023,
        duration: "2 tuần", 
        role: "C#"
    },
    {
        id: 11,
        title: "Quản Lí Học Sinh",
        category: "csharp",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=600&h=400&fit=crop",
        description: "Hệ thống quản lý học sinh hoàn chỉnh với C# WinForms, quản lý điểm, lớp học và giáo viên.",
        technologies: ["C#", "WinForms", "SQL Server", "Crystal Reports", ".NET Framework"],
        features: [
            "Quản lý thông tin học sinh chi tiết",
            "Phân công lớp học và giáo viên phụ trách",
            "Nhập và quản lý điểm số theo môn học",
            "Báo cáo kết quả học tập và thống kê",
            "Tìm kiếm và lọc dữ liệu nhanh chóng",
            "Giao diện thân thiện, dễ sử dụng",
            "In ấn bảng điểm và báo cáo",
            "Bảo mật dữ liệu với phân quyền"
        ],
        liveLink: "#",
        githubLink: "#",
        featured: false,
        year: 2023,
        duration: "3 tuần",
        role: "C#"
    }
];

// Projects Pagination System
class ProjectsManager {
    constructor() {
        this.projects = projectsData;
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.container = document.getElementById('projects-container');
        this.paginationContainer = document.getElementById('pagination-container');
        this.projectStats = document.getElementById('project-stats');
        
        this.init();
    }
    
    init() {
        this.updateFilterCounts();
        this.setupFilters();
        this.renderProjects();
        this.renderPagination();
        this.updateStats();
    }
    
    updateFilterCounts() {
        const allCount = this.projects.length;
        const frontendCount = this.projects.filter(p => p.category === 'frontend').length;
        const backendCount = this.projects.filter(p => p.category === 'backend').length;
        const fullstackCount = this.projects.filter(p => p.category === 'fullstack').length;
        const csharpCount = this.projects.filter(p => p.category === 'csharp').length;
        
        document.querySelector('[data-category="all"]').innerHTML = 
            `<i class="fas fa-th-large mr-2"></i>Tất cả <span class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">${allCount}</span>`;
        document.querySelector('[data-category="frontend"]').innerHTML = 
            `<i class="fas fa-palette mr-2"></i>Frontend <span class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">${frontendCount}</span>`;
        document.querySelector('[data-category="backend"]').innerHTML = 
            `<i class="fas fa-server mr-2"></i>Backend <span class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">${backendCount}</span>`;
        document.querySelector('[data-category="fullstack"]').innerHTML = 
            `<i class="fas fa-layer-group mr-2"></i>Full-stack <span class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">${fullstackCount}</span>`;
        document.querySelector('[data-category="csharp"]').innerHTML = 
            `<i class="fab fa-windows mr-2"></i>C# <span class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">${csharpCount}</span>`;
    }
    
    setupFilters() {
        const filterButtons = document.querySelectorAll('.project-filter');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                this.currentCategory = button.dataset.category;
                this.currentPage = 1; // Reset to page 1
                this.renderProjects();
                this.renderPagination();
                this.updateStats();
            });
        });
    }
    
    getFilteredProjects() {
        if (this.currentCategory === 'all') {
            return this.projects;
        }
        return this.projects.filter(p => p.category === this.currentCategory);
    }
    
    getPaginatedProjects() {
        const filtered = this.getFilteredProjects();
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return filtered.slice(start, end);
    }
    
    getTotalPages() {
        const filtered = this.getFilteredProjects();
        return Math.ceil(filtered.length / this.itemsPerPage);
    }
    
    renderProjects() {
        const projects = this.getPaginatedProjects();
        
        if (projects.length === 0) {
            this.container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-folder-open text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                    <p class="text-gray-500 dark:text-gray-400">Không có dự án nào trong danh mục này.</p>
                </div>
            `;
            return;
        }
        
        // Fade out animation
        this.container.style.opacity = '0';
        
        setTimeout(() => {
            this.container.innerHTML = projects.map((project, index) => `
                <div class="project-card stagger" style="animation-delay: ${index * 0.1}s" onclick="projectsManager.openProjectModal(${project.id})">
                    <div class="card glass rounded-2xl overflow-hidden group cursor-pointer">
                        <!-- Image -->
                        <div class="relative overflow-hidden aspect-video">
                            <img src="${project.image}" 
                                 alt="${project.title}" 
                                 loading="lazy" decoding="async"
                                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <!-- Overlay buttons -->
                            <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <a href="${project.liveLink}" target="_blank" 
                                   class="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-110"
                                   onclick="event.stopPropagation()">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                                <a href="${project.githubLink}" target="_blank" 
                                   class="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-110"
                                   onclick="event.stopPropagation()">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                            
                            ${project.featured ? '<div class="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded-full">Nổi bật</div>' : ''}
                        </div>
                        
                        <!-- Content -->
                        <div class="p-6">
                            <div class="flex items-center gap-2 mb-3">
                                <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium capitalize">
                                    ${this.getCategoryLabel(project.category)}
                                </span>
                                <span class="text-xs text-gray-500 dark:text-gray-400">${project.year}</span>
                            </div>
                            
                            <h3 class="text-xl font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                ${project.title}
                            </h3>
                            
                            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                ${project.description}
                            </p>
                            
                            <!-- Technologies -->
                            <div class="flex flex-wrap gap-2">
                                ${project.technologies.map(tech => `
                                    <span class="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium border border-indigo-100 dark:border-indigo-800/50 hover:scale-105 transition-transform">
                                        ${tech}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Fade in animation
            this.container.style.opacity = '1';
            
            // Trigger stagger animation
            setTimeout(() => {
                document.querySelectorAll('.project-card.stagger').forEach(card => {
                    card.classList.add('active');
                });
            }, 50);
        }, 300);
    }
    
    renderPagination() {
        const totalPages = this.getTotalPages();
        
        if (totalPages <= 1) {
            this.paginationContainer.innerHTML = '';
            return;
        }
        
        let paginationHTML = '<div class="flex items-center justify-center gap-2 mt-12">';
        
        // Previous button
        paginationHTML += `
            <button onclick="projectsManager.goToPage(${this.currentPage - 1})" 
                    class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}"
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            // Show first, last, current, and adjacent pages
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `
                    <button onclick="projectsManager.goToPage(${i})" 
                            class="pagination-btn ${this.currentPage === i ? 'active' : ''}">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += '<span class="px-2 text-gray-400">...</span>';
            }
        }
        
        // Next button
        paginationHTML += `
            <button onclick="projectsManager.goToPage(${this.currentPage + 1})" 
                    class="pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}"
                    ${this.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        paginationHTML += '</div>';
        
        this.paginationContainer.innerHTML = paginationHTML;
    }
    
    updateStats() {
        const filtered = this.getFilteredProjects();
        const start = (this.currentPage - 1) * this.itemsPerPage + 1;
        const end = Math.min(start + this.itemsPerPage - 1, filtered.length);
        
        this.projectStats.innerHTML = `
            <p class="text-sm text-gray-600 dark:text-gray-400">
                Hiển thị <span class="font-semibold text-indigo-600 dark:text-indigo-400">${start}-${end}</span> 
                trong tổng số <span class="font-semibold text-indigo-600 dark:text-indigo-400">${filtered.length}</span> dự án
            </p>
        `;
    }
    
    goToPage(page) {
        const totalPages = this.getTotalPages();
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.renderProjects();
        this.renderPagination();
        this.updateStats();
        
        // Smooth scroll to projects section
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    getCategoryLabel(category) {
        const labels = {
            'all': 'Tất cả',
            'frontend': 'Frontend',
            'backend': 'Backend',
            'fullstack': 'Full-stack',
            'desktop': 'C#'
        };
        return labels[category] || category;
    }
    
    openProjectModal(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        // Update modal content
        document.getElementById('modal-image').src = project.image;
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;
        document.getElementById('modal-duration').textContent = project.duration;
        document.getElementById('modal-role').textContent = project.role;
        document.getElementById('modal-year').textContent = project.year;
        document.getElementById('modal-live-link').href = project.liveLink;
        document.getElementById('modal-github-link').href = project.githubLink;
        
        // Tech stack
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = project.technologies.map(tech => `
            <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium">
                ${tech}
            </span>
        `).join('');
        
        // Features list
        const featuresContainer = document.getElementById('modal-features');
        if (project.features && project.features.length > 0) {
            featuresContainer.innerHTML = `
                <h4 class="font-semibold mb-3">Tính năng chính:</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            `;
        } else {
            featuresContainer.innerHTML = '';
        }
        
        // Show modal
        document.getElementById('project-modal').classList.remove('hidden');
    }
}

// Close modal function
function closeProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}

// Initialize when DOM is ready
let projectsManager;
document.addEventListener('DOMContentLoaded', () => {
    projectsManager = new ProjectsManager();
});
