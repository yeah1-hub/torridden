// 수량 + 총금액 연동
const unitPrice = 27000;
let qty = 1;

const qtyNum = document.querySelector('.qty-num');
const totalPrice = document.querySelector('.detail-total-price');

function updateTotal() {
    qtyNum.textContent = qty;
    totalPrice.innerHTML = (unitPrice * qty).toLocaleString() + '원 <em>(' + qty + '개)</em>';
}

document.querySelector('.qty-btn.plus').addEventListener('click', () => {
    qty++;
    updateTotal();
});

document.querySelector('.qty-btn.minus').addEventListener('click', () => {
    if (qty > 1) { qty--; updateTotal(); }
});

// 페이지 로드되자마자 scrolled 상태로 고정
const header = document.getElementById('header');
header.classList.remove('transparent');
header.classList.add('scrolled');



