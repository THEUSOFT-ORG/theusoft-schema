// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
});

// Scroll animation for content sections
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    // Atualizar brand com ano e etapa atual
    updateBrandCopyright();
});

// Função para atualizar o copyright do brand dinamicamente
function updateBrandCopyright() {
    const currentDate = new Date();
    const ano = currentDate.getFullYear();
    const mesNumero = currentDate.getMonth() + 1;
    
    let etapa;
    if (mesNumero >= 1 && mesNumero <= 4) {
        etapa = 1;
    } else if (mesNumero >= 5 && mesNumero <= 8) {
        etapa = 2;
    } else {
        etapa = 3;
    }
    
    const ano_etapa = `${ano}.${etapa}`;
    
    // Atualizar apenas o elemento do copyright (mantendo o slogan separado)
    const copyElement = document.getElementById('theusoft-copy');
    if (copyElement) {
        copyElement.textContent = `Ṫ͏͏͏͏HEÜSOFT™ © 2022–${ano_etapa} All rights reserved`;
    }
    
    // O slogan permanece estático no HTML como definido
    // <p id="theusoft-slogan">Ṫ͏͏ECNOLOGIA QÜE APRÖXIMA, EDÜCAÇÃO QÜE TRANSFÖRMA.</p>
}

// Navegação do carrossel com setas
function initCarouselNavigation() {
    const carousel = document.getElementById('partners-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');

    if (!carousel || !prevBtn || !nextBtn) return;

    // Configurações
    const scrollAmount = 200; // Quantidade de scroll por clique
    let currentIndex = 0;

    // Função para atualizar indicadores
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Seta anterior
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
        currentIndex = Math.max(0, currentIndex - 1);
        updateDots();
    });

    // Próxima seta
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        currentIndex = Math.min(dots.length - 1, currentIndex + 1);
        updateDots();
    });

    // Atualiza indicadores ao scroll manual
    carousel.addEventListener('scroll', () => {
        const scrollPos = carousel.scrollLeft;
        const itemWidth = carousel.children[0]?.offsetWidth || 0;
        const gap = 32; // gap-8 = 2rem
        
        if (itemWidth > 0) {
            currentIndex = Math.round(scrollPos / (itemWidth + gap));
            updateDots();
        }
    });

    // Esconde setas se não houver overflow
    function checkOverflow() {
        const hasOverflow = carousel.scrollWidth > carousel.clientWidth;
        prevBtn.style.display = hasOverflow ? 'flex' : 'none';
        nextBtn.style.display = hasOverflow ? 'flex' : 'none';
    }

    // Verifica overflow ao carregar e redimensionar
    window.addEventListener('load', checkOverflow);
    window.addEventListener('resize', checkOverflow);
    checkOverflow();
}

// Inicializa quando o DOM carregar
document.addEventListener('DOMContentLoaded', initCarouselNavigation);