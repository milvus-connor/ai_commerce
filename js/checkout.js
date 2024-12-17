document.addEventListener("DOMContentLoaded", () => {
    const orderItems = document.getElementById("order-items");
    const totalPrice = document.getElementById("total-price");

    // 로컬 스토리지에서 장바구니 데이터 가져오기
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    // 장바구니 항목 렌더링
    cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `<p data-id="${item.id}">${item.name} - ${item.quantity}개 - ₩${(item.price * item.quantity).toLocaleString()}</p>`;
        orderItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    // 총 결제 금액 업데이트
    totalPrice.textContent = `₩${total.toLocaleString()}`;

    // 결제 버튼 이벤트 처리
    const checkoutForm = document.querySelector(".submit-order");
    checkoutForm.addEventListener("click", (e) => {
        e.preventDefault(); // 폼 기본 동작 방지

        // 사용자 입력값 수집
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        // 결제 정보를 LocalStorage에 저장
        const orderInfo = {
            orderId: generateOrderId(),
            customer: { name, email, phone },
            items: cart,
            totalAmount: total,
            date: new Date().toLocaleString()
        };
        localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

        // 결제 완료 페이지로 이동 (purchase.html)
        window.location.href = "purchase.html";
    });

    // 고유한 주문 번호 생성 함수
    function generateOrderId() {
        const now = new Date();
        const timestamp = now.getFullYear().toString() +
                          (now.getMonth() + 1).toString().padStart(2, '0') +
                          now.getDate().toString().padStart(2, '0') +
                          now.getHours().toString().padStart(2, '0') +
                          now.getMinutes().toString().padStart(2, '0') +
                          now.getSeconds().toString().padStart(2, '0');
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${timestamp}${randomNum}`;
    }
});
