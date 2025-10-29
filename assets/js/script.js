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
    const brand = `© 2022-${ano_etapa} Ṫ͏͏HEÜSOFT – Ṫ͏͏ECNOLOGIA QÜE APRÖXIMA, EDÜCAÇÃO QÜE TRANSFÖRMA.`;

    // Atualizar apenas o elemento do footer com ID
    const brandElement = document.getElementById('brand-footer');
    if (brandElement) {
        brandElement.textContent = brand;
    }
}