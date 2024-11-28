document.addEventListener("DOMContentLoaded", () => {
    const orderItems = document.getElementById("order-items");
    const totalPrice = document.getElementById("total-price");

    // 로컬 스토리지에서 장바구니 데이터 가져오기
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    // 장바구니 항목 렌더링
    cart.forEach((item) => {
        const itemElement = document.createElement("p");
        itemElement.textContent = `${item.name} - ${item.quantity}개 - ₩${item.price * item.quantity}`;
        orderItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    // 총 결제 금액 업데이트
    totalPrice.textContent = `₩${total}`;
});
