let cartCount = 0;
const toast = document.getElementById('toast');

function updateCartUI() {
    const cartSpan = document.getElementById('cart-count');
    if (cartSpan) cartSpan.innerText = cartCount;
}

function showToast(message) {
    if (!toast) return;
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 1500);
}

function addToCart(gameName) {
    cartCount++;
    updateCartUI();
    showToast(`${gameName} добавлена`);
}

// Привязка ко всем кнопкам "В корзину" (вызывается после каждого рендера)
function bindCartButtons() {
    document.querySelectorAll('.game-card button, .game-info button').forEach(btn => {
        // удаляем старые обработчики, чтобы избежать дублей
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = newBtn.getAttribute('data-name');
            if (name) addToCart(name);
        });
    });
}

// Загружаем корзину из localStorage
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('cartCount');
    if (saved) cartCount = parseInt(saved);
    updateCartUI();
    bindCartButtons();
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('cartCount', cartCount);
});