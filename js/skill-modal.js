// Skill Modal System
class SkillModalManager {
    constructor() {
        this.skillsData = this.initializeSkillsData();
        this.currentModal = null;
        this.modalOverlay = null;
        this.modalElement = null;
        this.hoverTimeout = null;
        this.closeTimeout = null;
        this.isMouseInCard = false;
        this.isMouseInModal = false;
        
        this.init();
    }
    
    init() {
        this.createModalStructure();
        this.attachEventListeners();
    }
    
    createModalStructure() {
        // Create overlay
        this.modalOverlay = document.createElement('div');
        this.modalOverlay.className = 'skill-modal-overlay';
        document.body.appendChild(this.modalOverlay);
        
        // Create modal
        this.modalElement = document.createElement('div');
        this.modalElement.className = 'skill-modal';
        this.modalElement.innerHTML = `
            <div class="skill-modal-header">
                <div class="skill-modal-icon" id="modal-icon"></div>
                <div class="skill-modal-title">
                    <h3 id="modal-title"></h3>
                    <span class="experience" id="modal-experience"></span>
                </div>
            </div>
            <div class="skill-modal-content">
                <div class="skill-modal-section">
                    <h4>Mô tả</h4>
                    <p id="modal-description"></p>
                </div>
                <div class="skill-modal-section">
                    <h4>Kỹ năng chính</h4>
                    <div class="skill-modal-tags" id="modal-skills"></div>
                </div>
                <div class="skill-modal-section">
                    <h4>Kinh nghiệm thực tế</h4>
                    <p id="modal-projects"></p>
                </div>
            </div>
        `;
        document.body.appendChild(this.modalElement);
        
        // Close modal when clicking overlay
        this.modalOverlay.addEventListener('click', () => this.closeModal());
    }
    
    attachEventListeners() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const tooltip = card.querySelector('.skill-tooltip');
            if (!tooltip) return;
            
            // Ẩn tooltip để không conflict với modal
            tooltip.style.display = 'none';
            
            const skillName = tooltip.querySelector('.font-semibold').textContent;
            const skillData = this.skillsData[skillName];
            
            if (!skillData) return;
            
            // HOVER to open modal - MODAL SẼ "GHIM" LẠI khi mở
            card.addEventListener('mouseenter', () => {
                this.isMouseInCard = true;
                clearTimeout(this.closeTimeout);
                clearTimeout(this.hoverTimeout);
                
                // Open modal after 600ms hover - đủ thời gian xác định ý định
                this.hoverTimeout = setTimeout(() => {
                    if (this.isMouseInCard) {
                        this.showModal(card, skillData);
                    }
                }, 600);
            });
            
            card.addEventListener('mouseleave', () => {
                this.isMouseInCard = false;
                clearTimeout(this.hoverTimeout);
                // KHÔNG TỰ ĐỘNG ĐÓNG - modal sẽ ở lại cho đến khi:
                // 1. User click overlay
                // 2. Hover vào card khác
            });
        });
        
        // Modal event listeners - không cần nữa vì modal "ghim" lại
        // User chỉ đóng bằng cách click overlay hoặc hover card khác
    }
    
    showModal(card, skillData) {
        // Nếu đang có modal khác đang mở, đóng nó trước
        if (this.currentModal && this.currentModal !== card) {
            this.closeModal();
        }
        
        // Get icon from card - tìm trong div chính không phải tooltip
        const cardMain = card.querySelector('.glass');
        const iconElement = cardMain ? (cardMain.querySelector('i') || cardMain.querySelector('svg')) : null;
        const iconClone = iconElement ? iconElement.cloneNode(true) : null;
        
        // Update modal content
        const modalIcon = this.modalElement.querySelector('#modal-icon');
        modalIcon.innerHTML = '';
        if (iconClone) {
            // Đảm bảo icon size đúng
            if (iconClone.tagName === 'I') {
                iconClone.className = iconClone.className.replace('text-4xl', 'text-3xl');
            } else if (iconClone.tagName === 'svg') {
                iconClone.classList.remove('w-10', 'h-10');
                iconClone.classList.add('w-12', 'h-12');
            }
            modalIcon.appendChild(iconClone);
        }
        
        this.modalElement.querySelector('#modal-title').textContent = skillData.name;
        this.modalElement.querySelector('#modal-experience').innerHTML = 
            `<i class="fas fa-clock"></i> ${skillData.experience}`;
        this.modalElement.querySelector('#modal-description').textContent = skillData.description;
        
        // Add skills tags
        const skillsContainer = this.modalElement.querySelector('#modal-skills');
        skillsContainer.innerHTML = '';
        skillData.skills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-modal-tag';
            tag.textContent = skill;
            skillsContainer.appendChild(tag);
        });
        
        this.modalElement.querySelector('#modal-projects').textContent = skillData.projects;
        
        // Show modal - MODAL SẼ Ở LẠI cho đến khi user click overlay
        this.modalOverlay.classList.add('active');
        this.modalElement.classList.add('active');
        this.currentModal = card;
    }
    
    closeModal() {
        clearTimeout(this.hoverTimeout);
        clearTimeout(this.closeTimeout);
        this.modalOverlay.classList.remove('active');
        this.modalElement.classList.remove('active');
        this.currentModal = null;
        this.isMouseInCard = false;
        this.isMouseInModal = false;
    }
    
    initializeSkillsData() {
        return {
            'HTML5': {
                name: 'HTML5',
                experience: '3+ năm kinh nghiệm',
                description: 'Thành thạo HTML5 với các tính năng hiện đại, semantic markup để SEO tốt hơn, accessibility standards (ARIA) cho người dùng khuyết tật, và xây dựng responsive layouts cho mọi thiết bị.',
                skills: ['Semantic HTML', 'SEO Optimization', 'ARIA', 'Forms & Validation', 'Web Components', 'Canvas API'],
                projects: 'Đã xây dựng hơn 20+ trang web với cấu trúc HTML semantic chuẩn, tối ưu SEO và accessibility score 95+.'
            },
            'CSS3': {
                name: 'CSS3',
                experience: '3+ năm kinh nghiệm',
                description: 'Chuyên sâu về CSS3 với Flexbox và Grid layouts, animations và transitions mượt mà, responsive design cho tất cả devices, và các modern CSS techniques như CSS Variables, Custom Properties.',
                skills: ['Flexbox', 'CSS Grid', 'Animations', 'Responsive Design', 'CSS Variables', 'Transforms'],
                projects: 'Tạo ra nhiều giao diện phức tạp với animations mượt mà, responsive hoàn hảo từ mobile đến desktop, và performance tối ưu.'
            },
            'JavaScript (ES6+)': {
                name: 'JavaScript',
                experience: '3+ năm kinh nghiệm',
                description: 'Thành thạo modern JavaScript ES6+ với async/await, promises, arrow functions, destructuring, và các features mới. Có kinh nghiệm với OOP, functional programming, và DOM manipulation hiệu quả.',
                skills: ['ES6+ Syntax', 'Async/Await', 'Promises', 'DOM Manipulation', 'Event Handling', 'OOP & FP', 'Modules'],
                projects: 'Phát triển nhiều ứng dụng web interactive, xử lý APIs, real-time data, và complex business logic với clean code.'
            },
            'React': {
                name: 'React',
                experience: '2+ năm kinh nghiệm',
                description: 'Sử dụng React để xây dựng các ứng dụng web hiện đại với Hooks, Context API, Redux cho state management, React Router cho navigation, và optimization techniques để đạt performance cao nhất.',
                skills: ['React Hooks', 'Context API', 'Redux', 'React Router', 'Component Lifecycle', 'Performance Optimization', 'Custom Hooks'],
                projects: 'Xây dựng các SPA phức tạp với state management tốt, code splitting, lazy loading, và performance score 90+.'
            },
            'TailwindCSS': {
                name: 'TailwindCSS',
                experience: '2+ năm kinh nghiệm',
                description: 'Utility-first CSS framework giúp phát triển UI nhanh chóng. Thành thạo custom configuration, responsive design, dark mode implementation, và tạo animations với Tailwind.',
                skills: ['Utility Classes', 'Custom Config', 'Responsive Design', 'Dark Mode', 'Animations', 'JIT Mode', 'Plugins'],
                projects: 'Sử dụng Tailwind trong hầu hết các dự án mới, giúp giảm 70% thời gian viết CSS và maintain code dễ dàng hơn.'
            },
            'TypeScript': {
                name: 'TypeScript',
                experience: '1+ năm kinh nghiệm',
                description: 'Type-safe JavaScript với TypeScript. Sử dụng interfaces, generics, type inference, và decorators để code an toàn hơn, dễ maintain và refactor. Tích hợp tốt với React và Node.js.',
                skills: ['Type Safety', 'Interfaces', 'Generics', 'Type Inference', 'Decorators', 'TSConfig', 'Type Guards'],
                projects: 'Áp dụng TypeScript vào các dự án lớn, giảm bugs runtime và cải thiện developer experience đáng kể.'
            },
            'Sass/SCSS': {
                name: 'Sass/SCSS',
                experience: '2+ năm kinh nghiệm',
                description: 'CSS preprocessor mạnh mẽ với variables, mixins, nesting, functions, và imports. Giúp tổ chức code CSS có cấu trúc tốt, dễ maintain và reusable.',
                skills: ['Variables', 'Mixins', 'Nesting', 'Functions', 'Imports', 'Partials', 'Extends'],
                projects: 'Sử dụng Sass để xây dựng design systems với components reusable, themes, và maintainable architecture.'
            },
            'Bootstrap': {
                name: 'Bootstrap',
                experience: '2+ năm kinh nghiệm',
                description: 'Framework CSS phổ biến với grid system mạnh mẽ, components đa dạng, utilities classes, và responsive design sẵn có. Có khả năng customization với SCSS.',
                skills: ['Grid System', 'Components', 'Utilities', 'Responsive', 'SCSS Customization', 'JavaScript Plugins'],
                projects: 'Xây dựng nhiều website với Bootstrap, custom theme và components để phù hợp với design riêng.'
            },
            'Node.js': {
                name: 'Node.js',
                experience: '2+ năm kinh nghiệm',
                description: 'Server-side JavaScript runtime để xây dựng scalable applications. Có kinh nghiệm với RESTful APIs, real-time apps với Socket.io, file system operations, và streams.',
                skills: ['Server Development', 'RESTful APIs', 'Socket.io', 'File System', 'Streams', 'Event Emitters', 'NPM Packages'],
                projects: 'Phát triển nhiều backend services, APIs, real-time chat applications, và microservices với Node.js.'
            },
            'Express.js': {
                name: 'Express.js',
                experience: '2+ năm kinh nghiệm',
                description: 'Web framework cho Node.js để tạo REST APIs. Thành thạo middleware, routing, authentication, error handling, và MVC pattern. Security best practices với helmet, cors.',
                skills: ['REST APIs', 'Middleware', 'Routing', 'Authentication', 'Error Handling', 'MVC Pattern', 'Security'],
                projects: 'Xây dựng nhiều REST APIs với Express, bao gồm authentication, authorization, validation, và documentation.'
            },
            'MongoDB': {
                name: 'MongoDB',
                experience: '1+ năm kinh nghiệm',
                description: 'NoSQL database với Mongoose ODM. Thành thạo aggregation pipelines, indexing strategies, schema design, và database optimization cho performance tốt nhất.',
                skills: ['Mongoose ODM', 'Aggregation', 'Indexing', 'Schema Design', 'Query Optimization', 'Transactions', 'Replication'],
                projects: 'Thiết kế và implement database schemas cho nhiều projects, optimize queries và indexes để cải thiện performance.'
            },
            'MySQL': {
                name: 'MySQL',
                experience: '1+ năm kinh nghiệm',
                description: 'Relational database với SQL. Có khả năng viết complex queries, joins, subqueries, transactions, stored procedures, và optimization. Thiết kế database schemas chuẩn 3NF.',
                skills: ['SQL Queries', 'Joins', 'Transactions', 'Stored Procedures', 'Indexing', 'Query Optimization', 'Database Design'],
                projects: 'Thiết kế databases cho enterprise applications, optimize slow queries, và migrate data giữa các systems.'
            },
            'REST API': {
                name: 'REST API',
                experience: '2+ năm kinh nghiệm',
                description: 'Thiết kế và xây dựng RESTful APIs theo best practices. Thành thạo HTTP methods, status codes, authentication (JWT, OAuth), API documentation với Swagger/OpenAPI.',
                skills: ['RESTful Design', 'HTTP Methods', 'Status Codes', 'Authentication', 'API Documentation', 'Versioning', 'Rate Limiting'],
                projects: 'Phát triển nhiều public và private APIs, implement authentication, rate limiting, và comprehensive documentation.'
            },
            'GraphQL': {
                name: 'GraphQL',
                experience: 'Đang học',
                description: 'Query language cho APIs thay thế REST. Đang học về schemas, resolvers, mutations, subscriptions, và Apollo Client/Server. Hiểu rõ ưu điểm so với REST APIs.',
                skills: ['Schemas', 'Resolvers', 'Mutations', 'Subscriptions', 'Apollo', 'Type System', 'Queries'],
                projects: 'Đang thực hành xây dựng GraphQL APIs và tích hợp vào React applications để test performance và DX.'
            },
            'Git': {
                name: 'Git',
                experience: '3+ năm kinh nghiệm',
                description: 'Version control system thiết yếu. Thành thạo branching strategies (Git Flow, GitHub Flow), merging, rebasing, cherry-picking, conflict resolution, và Git workflow best practices.',
                skills: ['Branching', 'Merging', 'Rebasing', 'Conflict Resolution', 'Git Flow', 'Cherry-picking', 'Git Hooks'],
                projects: 'Sử dụng Git hàng ngày trong tất cả projects, manage repositories, và collaborate với teams qua Git workflows.'
            },
            'GitHub': {
                name: 'GitHub',
                experience: '3+ năm kinh nghiệm',
                description: 'Platform cho Git repositories. Thành thạo Pull Requests process, Issues tracking, GitHub Actions cho CI/CD, code review, và team collaboration. Open source contributions.',
                skills: ['Pull Requests', 'Issues', 'GitHub Actions', 'Code Review', 'CI/CD', 'Collaboration', 'GitHub Pages'],
                projects: 'Manage nhiều repositories, set up CI/CD pipelines, conduct code reviews, và contribute to open source projects.'
            },
            'VS Code': {
                name: 'VS Code',
                experience: '3+ năm kinh nghiệm',
                description: 'Code editor chủ lực với productivity cao. Thành thạo extensions ecosystem, debugging tools, snippets, keyboard shortcuts, và workspace customization để maximize productivity.',
                skills: ['Extensions', 'Debugging', 'Snippets', 'Shortcuts', 'Settings Sync', 'Multi-cursor', 'IntelliSense'],
                projects: 'Customize VS Code với personal extensions config, snippets library, và keyboard shortcuts để code nhanh hơn 50%.'
            },
            'Figma': {
                name: 'Figma',
                experience: '2+ năm kinh nghiệm',
                description: 'UI/UX design tool hiện đại. Sử dụng cho wireframing, prototyping, component design systems, và team collaboration. Auto-layout, constraints, và plugins ecosystem.',
                skills: ['Wireframing', 'Prototyping', 'Design Systems', 'Auto-layout', 'Components', 'Collaboration', 'Plugins'],
                projects: 'Thiết kế UI/UX cho nhiều projects, tạo design systems với reusable components, và collaborate với designers.'
            },
            'Photoshop': {
                name: 'Photoshop',
                experience: '2+ năm kinh nghiệm',
                description: 'Photo editing và graphic design tool. Sử dụng cho image optimization, banners, visual assets cho web, và photo manipulation. Layers, masks, và blend modes.',
                skills: ['Photo Editing', 'Image Optimization', 'Banners', 'Layers', 'Masks', 'Blend Modes', 'Export for Web'],
                projects: 'Tạo và optimize images cho web, design banners, social media graphics, và visual assets cho marketing.'
            },
            'NPM': {
                name: 'NPM',
                experience: '3+ năm kinh nghiệm',
                description: 'Node Package Manager cho JavaScript. Thành thạo package management, dependencies resolution, scripts automation, versioning với semantic versioning, và publish packages.',
                skills: ['Package Management', 'Dependencies', 'Scripts', 'Versioning', 'Publishing', 'NPX', 'Package.json'],
                projects: 'Manage dependencies cho tất cả projects, create và publish custom packages, và automate workflows với npm scripts.'
            },
            'Webpack': {
                name: 'Webpack',
                experience: '1+ năm kinh nghiệm',
                description: 'Module bundler cho JavaScript applications. Configure loaders và plugins, code splitting, tree shaking, và build optimization để giảm bundle size và improve loading time.',
                skills: ['Module Bundling', 'Loaders', 'Plugins', 'Code Splitting', 'Tree Shaking', 'Optimization', 'Dev Server'],
                projects: 'Setup Webpack config cho nhiều projects, optimize bundles để giảm size 40%, và improve build performance.'
            },
            'Postman': {
                name: 'Postman',
                experience: '2+ năm kinh nghiệm',
                description: 'API testing và development tool. Sử dụng cho testing APIs, create collections, manage environments, automated tests với scripts, và generate API documentation.',
                skills: ['API Testing', 'Collections', 'Environments', 'Automated Tests', 'Scripts', 'Documentation', 'Mock Servers'],
                projects: 'Test tất cả APIs trước khi deploy, create comprehensive test collections, và generate documentation cho clients.'
            }
        };
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SkillModalManager();
});
