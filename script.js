// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 0.95);
        
        if (scrolled > 50) {
            header.style.background = `rgba(255, 255, 255, ${opacity})`;
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .feature, .testimonial, .section-title');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                    
                    setTimeout(() => {
                        input.style.borderColor = '#e8e8e8';
                    }, 3000);
                } else {
                    input.style.borderColor = '#4CAF50';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitButton = this.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = '送信完了！';
                submitButton.style.background = '#4CAF50';
                submitButton.disabled = true;
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.style.background = '#8B4513';
                    submitButton.disabled = false;
                    
                    inputs.forEach(input => {
                        input.style.borderColor = '#e8e8e8';
                    });
                }, 2000);
            }
        });
    }

    // Masu animation
    const masuBox = document.querySelector('.masu-box');
    
    if (masuBox) {
        // Add subtle floating animation
        masuBox.style.animation = 'float 6s ease-in-out infinite';
        
        // Add CSS for the animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(2deg); }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .fade-in-up {
                animation: fadeInUp 0.6s ease forwards;
            }
        `;
        document.head.appendChild(style);
    }

    // Mobile menu toggle (for future enhancement)
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth <= 768) {
        // Add mobile menu functionality if needed
        const navLinks = nav.querySelectorAll('a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close mobile menu after clicking a link
                nav.classList.remove('mobile-open');
            });
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-content');
        
        if (parallax && scrolled < window.innerHeight) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add loading animation for images (when actual images are added)
    const imageContainers = document.querySelectorAll('.product-image, .craft-image');
    
    imageContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            const placeholder = this.querySelector('.product-placeholder, .craft-placeholder');
            if (placeholder) {
                placeholder.style.transform = 'scale(1.1) rotate(5deg)';
                placeholder.style.transition = 'transform 0.3s ease';
            }
        });
        
        container.addEventListener('mouseleave', function() {
            const placeholder = this.querySelector('.product-placeholder, .craft-placeholder');
            if (placeholder) {
                placeholder.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });


    // Add click animation to buttons
    const buttons = document.querySelectorAll('.cta-button, .product-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Any scroll-based animations can be optimized here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// FOMUSオリジナル新商品追加用関数
function addFOMUSOriginalProduct(productData) {
    // productData = {
    //     imageSrc: 'images/新商品画像.jpg',
    //     name: '新商品名',
    //     description: '商品の説明文',
    //     price: '価格'
    // }
    
    const productGrid = document.querySelector('.product-grid');
    
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${productData.imageSrc}" alt="${productData.name}" class="product-photo">
        </div>
        <div class="product-content">
            <h3>FOMUSオリジナル ${productData.name}</h3>
            <p>${productData.description}</p>
            <div class="price">¥${productData.price}</div>
            <button class="product-button">詳細を見る</button>
        </div>
    `;
    
    // アニメーション設定
    productCard.style.opacity = '0';
    productCard.style.transform = 'translateY(30px)';
    productCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    productGrid.appendChild(productCard);
    
    // アニメーション実行
    setTimeout(() => {
        productCard.style.opacity = '1';
        productCard.style.transform = 'translateY(0)';
    }, 100);
    
    // ホバー効果を追加
    productCard.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    productCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // ボタンにリップル効果を追加
    const button = productCard.querySelector('.product-button');
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    return productCard;
}

// 使用例:
// addFOMUSOriginalProduct({
//     imageSrc: 'images/新商品.jpg',
//     name: '特別限定版',
//     description: 'FOMUSだけの特別なオリジナルデザイン。数量限定でお届けします。',
//     price: '5,000'
// });