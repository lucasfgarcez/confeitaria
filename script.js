const slideContainer = document.querySelector('.carousel-slide');
const slides = Array.from(document.querySelectorAll('.carousel-card'));
const dotsContainer = document.querySelector('.carousel-dots');
const intervalTime = 5000;
let currentIndex = 0;
let timer;

// Ajuste manual por slide: altere os valores abaixo conforme necessário.
// Exemplo: '20% center' move a imagem para a esquerda, '80% center' move para a direita.
const slidePositions = [
    '50% center', // slide 1 - Doces Finos
    '50% center', // slide 2 - Bolos Confeitados
    '50% center', // slide 3 - Brownies
    '50% center', // slide 4 - Páscoa
    '50% center', // slide 5 - Natal
    '50% center'  // slide 6 - Sobremesas Gourmet
];

function applySlidePosition(index) {
    const img = slides[index].querySelector('img');
    if (img) {
        img.style.objectPosition = slidePositions[index] || '50% center';
    }
}

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            restartTimer();
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    slideContainer.style.transform = `translateX(-${index * 100}%)`;
    applySlidePosition(index);
    updateDots();
}

function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
}

function restartTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, intervalTime);
}

createDots();
slides.forEach((_, index) => applySlidePosition(index));
restartTimer();

// Funcionalidade de clique para cards do catálogo em mobile
const produtoCards = document.querySelectorAll('.produto-card');

produtoCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Apenas em mobile (largura <= 900px)
        if (window.innerWidth <= 900) {
            e.preventDefault();
            
            // Se este card está ativo, desativa
            if (card.classList.contains('active')) {
                card.classList.remove('active');
            } else {
                // Se não, remove active de todos e adiciona apenas neste
                produtoCards.forEach(c => {
                    c.classList.remove('active');
                });
                card.classList.add('active');
            }
        }
    });
});
