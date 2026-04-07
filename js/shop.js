// ── Tab switching ──
const tabs = document.querySelectorAll('.shop-tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});

// ── Cart ──
let cartItems = [];
const toast = document.getElementById('cartToast');
let toastTimer;

function showToast(name) {
    toast.textContent = `🛒 "${name}" 장바구니에 담겼습니다!`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelectorAll('.product-card__cart-overlay').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const name = btn.dataset.name;
        cartItems.push(name);

        // 시각 피드백
        const orig = btn.innerHTML;
        btn.classList.add('added');
        btn.innerHTML = '<span>✓ 담겼습니다</span>';
        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = orig;
        }, 1200);

        showToast(name);
        console.log('장바구니:', cartItems);
    });
});