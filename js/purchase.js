document.addEventListener("DOMContentLoaded", () => {
    const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
    const itemsList = document.getElementById("purchased-items-list");

    if (!itemsList) {
        console.error("purchased-items-list 요소가 존재하지 않습니다.");
        return;
    }

    if (orderInfo) {
        // 주문 번호 및 총 결제 금액 출력
        document.getElementById("order-id").textContent = orderInfo.orderId;
        document.getElementById("total-amount").textContent = `₩${orderInfo.totalAmount.toLocaleString()}`;

        // 결제한 상품 목록 출력
        orderInfo.items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - ${item.quantity}개 - ₩${(item.price * item.quantity).toLocaleString()}`;
            itemsList.appendChild(listItem);
        });
    } else {
        // 결제 정보가 없을 경우 메시지 출력
        itemsList.innerHTML = "<li>결제된 상품이 없습니다.</li>";
    }
});
