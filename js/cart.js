// 로컬 스토리지 초기화
function initializeCart() {
    try {
        let cart = JSON.parse(localStorage.getItem("cart"));

        // 데이터가 배열이 아니면 초기화
        if (!Array.isArray(cart)) {
            localStorage.setItem("cart", JSON.stringify([]));
        }
    } catch (error) {
        console.error("로컬 스토리지 초기화 오류:", error);
        localStorage.setItem("cart", JSON.stringify([]));
    }
}

// 장바구니 렌더링
function renderCartItems() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalPriceElement = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = ""; // 기존 항목 초기화
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h2>${item.name}</h2>
                <p class="price">₩${item.price.toLocaleString()}</p>
                <label for="quantity-${index}">수량:</label>
                <input type="number" id="quantity-${index}" value="${item.quantity}" min="1">
                <button class="remove-item" data-index="${index}">삭제</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `₩${total.toLocaleString()}`;
}

// 수량 변경 및 삭제 처리
function handleCartActions() {
    const cartItemsContainer = document.querySelector(".cart-items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.addEventListener("input", function (e) {
        if (e.target.tagName === "INPUT") {
            const index = e.target.id.split("-")[1];
            cart[index].quantity = parseInt(e.target.value);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
        }
    });

    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
        }
    });
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
    initializeCart();
    renderCartItems();
    handleCartActions();
});


function goToCheckout() {
    // 결제 페이지로 이동
    const cartLength = document.querySelectorAll(".cart .cart-items .cart-item");
    if(cartLength.length === 0) {
        alert("결제할 상품이 없습니다.")
        return
    } else {
        window.location.href = "checkout.html";
    }
}
