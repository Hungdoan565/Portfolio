// Projects Data & Management
class ProjectsManager {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: 'E-Commerce Platform',
                description: 'Modern e-commerce website với real-time cart và payment integration',
                image: './assets/projects/project-1.jpg',
                category: 'fullstack',
                tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                featured: true
            },
            {
                id: 2,
                title: 'Portfolio Dashboard',
                description: 'Admin dashboard với charts và analytics',
                image: './assets/projects/project-2.jpg',
                category: 'frontend',
                tags: ['TailwindCSS', 'JavaScript', 'Chart.js'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                featured: false
            },
            {
                id: 3,
                title: 'Task Management App',
                description: 'Ứng dụng quản lý công việc với drag & drop',
                image: './assets/projects/project-3.jpg',
                category: 'frontend',
                tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                featured: false
            },
            {
                id: 4,
                title: 'Weather App',
                description: 'App thời tiết với API integration và animations',
                image: './assets/projects/project-4.jpg',
                category: 'frontend',
                tags: ['JavaScript', 'API', 'TailwindCSS'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                featured: false
            },
            {
                id: 5,
                title: 'Blog CMS',
                description: 'Content Management System cho blog với WYSIWYG editor',
                image: './assets/projects/project-5.jpg',
                category: 'fullstack',
                tags: ['Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                featured: false
            },
            {
                id: 6,
                title: 'Landing Page Design',
                description: 'Modern landing page với animations và micro-interactions',
                image: './assets/projects/project-6.jpg',
                category: 'ui',
                tags: ['Figma', 'HTML', 'CSS', 'JavaScript'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                featured: false
            }
        ];
        
        this.currentFilter = 'all';
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.setupFilters();
    }
    
    renderProjects(filter = 'all') {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        
        const filteredProjects = filter === 'all' 
            ? this.projects 
            : this.projects.filter(p => p.category === filter);
        
        grid.innerHTML = filteredProjects.map(project => this.createProjectCard(project)).join('');
        
        // Add animation
        const cards = grid.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    createProjectCard(project) {
        return `
            <div class="project-card card-glow reveal group" data-category="${project.category}">
                <!-- Image Container -->
                <div class="relative overflow-hidden rounded-lg mb-4 aspect-video">
                    <img src="${project.image}" 
                         alt="${project.title}"
                         class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                         onerror="this.src='https://via.placeholder.com/600x400/1e293b/38bdf8?text=${encodeURIComponent(project.title)}'">
                    
                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <a href="${project.demo}" target="_blank" 
                           class="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-primary-500 transition-all hover:scale-110">
                            <i class="fas fa-external-link-alt text-white"></i>
                        </a>
                        <a href="${project.github}" target="_blank"
                           class="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-primary-500 transition-all hover:scale-110">
                            <i class="fab fa-github text-white"></i>
                        </a>
                    </div>
                    
                    ${project.featured ? '<div class="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-purple rounded-full text-xs font-semibold">Featured</div>' : ''}
                </div>
                
                <!-- Content -->
                <div class="space-y-3">
                    <h3 class="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                        ${project.title}
                    </h3>
                    
                    <p class="text-gray-400 text-sm line-clamp-2">
                        ${project.description}
                    </p>
                    
                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2">
                        ${project.tags.map(tag => `
                            <span class="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                    
                    <!-- Links -->
                    <div class="flex gap-3 pt-2">
                        <a href="${project.demo}" target="_blank"
                           class="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-purple rounded-lg text-center text-sm font-semibold hover:scale-105 transition-transform">
                            <i class="fas fa-eye mr-1"></i> Live Demo
                        </a>
                        <a href="${project.github}" target="_blank"
                           class="px-4 py-2 border-2 border-primary-500 text-primary-400 rounded-lg text-sm font-semibold hover:bg-primary-500 hover:text-white transition-all">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active', 'bg-primary-500/20', 'text-primary-400'));
                btn.classList.add('active', 'bg-primary-500/20', 'text-primary-400');
                
                // Filter projects
                const filter = btn.dataset.filter;
                this.renderProjects(filter);
            });
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
});
