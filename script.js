// nexusArts Portfolio - Script principale
// GDPR compliant - no external cookies or tracking

document.addEventListener('DOMContentLoaded', function() {
    // Inizializzazione
    initLoader();
    initNavigation();
    initPortfolioCarousel(); // Inizializza il carosello del portfolio
    initScrollAnimations();
    initCookieBanner();
    initSmoothScrolling();
    
    console.log('nexusArts Portfolio loaded successfully');
});

// === LOADER ANIMATION ===
function initLoader() {
    const loader = document.getElementById('loader');
    const body = document.body;
    
    // Simula caricamento con animazione progressiva
    setTimeout(() => {
        loader.classList.add('hidden');
        body.style.overflow = 'auto';
        
        // Rimuove il loader dal DOM dopo l'animazione
        setTimeout(() => {
            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
    }, 2800); // Tempo coordinato con l'animazione CSS
}

// === NAVIGATION ===
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect per navbar
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Menu hamburger toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Chiudi menu al click sui link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Highlight active section
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// === PORTFOLIO CAROUSEL 2D (FLAT) ===
function initPortfolioCarousel() {
    const carousel = document.getElementById('portfolio-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    if (!carousel) return;
    
    // Dati degli elementi del portfolio (immagini e descrizioni)
    const portfolioData = [
        {
            image: 'portfolio1.png', // Percorso dell'immagine 1
            title: 'FiveM - Effinity Network', // Titolo dell'immagine 1
            description: 'Branding completo logo, banner per il server Minecraft Affinity Network.' // Descrizione dell'immagine 1
        },
        {
            image: 'portfolio3.png', // Percorso dell'immagine 3
            title: 'Gaming Brand Identity - Abyss', // Titolo dell'immagine 3
            description: 'Logo design e kit branding per il server Minecraft "Abyss".' // Descrizione dell'immagine 3
        },
        {
            image: 'portfolio4.png', // Percorso dell'immagine 4
            title: 'Esports Team Logo - Gapple', // Titolo dell'immagine 4
            description: 'Creazione logo distintivo per il server Minecraft "Gapple".' // Descrizione dell'immagine 4
        },
        {
            image: 'portfolio5.png', // Percorso dell'immagine 5
            title: 'Minecraft - Drippy Network', // Titolo dell'immagine 5
            description: 'Pack completo di grafiche e branding per il server Minecraft "Drippy Network".' // Descrizione dell'immagine 5
        },
    ];
    
    let currentIndex = 0; // Indice della slide corrente
    
    // Funzione per creare gli elementi del portfolio nel carosello
    function createPortfolioItems() {
        carousel.innerHTML = ''; // Pulisce il contenuto esistente del carosello
        indicatorsContainer.innerHTML = ''; // Pulisce gli indicatori esistenti
        
        portfolioData.forEach((item, index) => {
            // Crea l'elemento del portfolio (div con immagine e overlay)
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${index === 0 ? 'active' : ''}`; // Aggiunge 'active' alla prima slide
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" onerror="this.src='https://placehold.co/800x500/FF4D00/FFFFFF?text=${encodeURIComponent(item.title)}'">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            // Per il carosello 2D, gli elementi vengono aggiunti in sequenza e posizionati orizzontalmente
            carousel.appendChild(portfolioItem); // Aggiunge l'elemento al carosello
            
            // Crea gli indicatori (pallini) sotto il carosello
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`; // Aggiunge 'active' al primo indicatore
            indicator.addEventListener('click', () => goToSlide(index)); // Al click sull'indicatore, va alla slide corrispondente
            indicatorsContainer.appendChild(indicator); // Aggiunge l'indicatore al contenitore
        });
    }
    
    // Funzione per andare a una slide specifica (scorrimento 2D)
    function goToSlide(index) {
        const items = carousel.querySelectorAll('.portfolio-item'); // Seleziona tutti gli elementi del carosello
        const indicators = indicatorsContainer.querySelectorAll('.indicator'); // Seleziona tutti gli indicatori
        
        // Rimuove la classe 'active' da tutti gli elementi e indicatori
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Aggiunge la classe 'active' all'elemento e all'indicatore della slide corrente
        if (items[index]) items[index].classList.add('active');
        if (indicators[index]) indicators[index].classList.add('active');
        
        // Trasla il carosello orizzontalmente per mostrare la slide corretta
        // Ogni slide occupa il 100% della larghezza del carosello
        carousel.style.transform = `translateX(-${index * 100}%)`;
        
        currentIndex = index; // Aggiorna l'indice corrente
    }
    
    // Event listener per i pulsanti di navigazione (precedente/successivo)
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length; // Calcola l'indice precedente (gestendo il ritorno all'ultima slide)
            goToSlide(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % portfolioData.length; // Calcola l'indice successivo (gestendo il ritorno alla prima slide)
            goToSlide(currentIndex);
        });
    }
    
    // Auto rotazione del carosello
    // Questa funzione fa scorrere il carosello automaticamente ogni 5 secondi
    let autoRotate = setInterval(() => {
        currentIndex = (currentIndex + 1) % portfolioData.length;
        goToSlide(currentIndex);
    }, 5000); // 5000 millisecondi = 5 secondi. Modifica questo valore per cambiare la velocità.
    
    // Pausa l'auto rotazione quando il mouse entra nel carosello
    carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
    // Riprende l'auto rotazione quando il mouse esce dal carosello
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % portfolioData.length;
            goToSlide(currentIndex);
        }, 5000); // 5000 millisecondi = 5 secondi. Assicurati che questo valore sia lo stesso sopra.
    });
    
    // Navigazione tramite tastiera (frecce sinistra/destra)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
            goToSlide(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % portfolioData.length;
            goToSlide(currentIndex);
        }
    });
    
    // Inizializza il carosello al caricamento della pagina
    createPortfolioItems();
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    // Intersection Observer per animazioni fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Elementi da animare
    const animatedElements = document.querySelectorAll(`
        .service-item,
        .stat-item,
        .tool-item,
        .contact-method,
        .about-text,
        .section-header
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Parallax effect per elementi floating
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element, .decoration-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 1;
            const yPos = -(scrolled * speed * 0.1);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    });
}

// === COOKIE BANNER ===
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    
    if (!cookieBanner || !cookieAccept) return;
    
    // Verifica se l'utente ha già accettato
    const cookiesAccepted = localStorage.getItem('nexusarts-cookies-accepted');
    
    if (!cookiesAccepted) {
        // Mostra banner dopo 1 secondo
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Gestisci click accetta
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('nexusarts-cookies-accepted', 'true');
        cookieBanner.classList.remove('show');
        
        // Rimuovi banner dal DOM
        setTimeout(() => {
            if (cookieBanner && cookieBanner.parentNode) {
                cookieBanner.parentNode.removeChild(cookieBanner);
            }
        }, 300);
    });
}

// === SMOOTH SCROLLING ===
function initSmoothScrolling() {
    // Smooth scroll per anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Altezza navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === UTILITY FUNCTIONS ===

// Debounce function per performance
function debounce(func, wait) {
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

// Throttle function per scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// === PERFORMANCE OPTIMIZATIONS ===

// Lazy loading per immagini
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// === CONTACT METHODS ANIMATION ===
function initContactAnimations() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach((method, index) => {
        method.style.animationDelay = `${index * 0.1}s`;
        
        method.addEventListener('mouseenter', () => {
            method.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', () => {
            method.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// === ACCESSIBILITY IMPROVEMENTS ===
function initAccessibility() {
    // Focus trap per menu mobile
    const navMenu = document.getElementById('nav-menu');
    const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    
    if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        navMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Escape key per chiudere menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// === INIT ADDITIONAL FEATURES ===
document.addEventListener('DOMContentLoaded', () => {
    initContactAnimations();
    initAccessibility();
    initLazyLoading();
});

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.warn('nexusArts Portfolio: Minor error caught and handled:', e.message);
});

// === RESIZE HANDLER ===
window.addEventListener('resize', debounce(() => {
    // Ricalcola posizioni portfolio se necessario
    const carousel = document.getElementById('portfolio-carousel');
    if (carousel) {
        // Trigger re-calculation
        carousel.style.transform = carousel.style.transform;
    }
}, 250));

// === PREFETCH RESOURCES ===
function prefetchResources() {
    const criticalImages = [
        'logo.png',
        'portfolio1.jpg' // Questo è un esempio, aggiungi tutte le immagini critiche
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Prefetch after initial load
window.addEventListener('load', prefetchResources);
