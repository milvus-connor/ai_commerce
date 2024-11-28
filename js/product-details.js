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

// 장바구니에 상품 추가
function addToCartWithConfirmation(product) {
    try {
        let cart = JSON.parse(localStorage.getItem("cart"));

        // 데이터가 배열인지 확인하고 초기화
        if (!Array.isArray(cart)) {
            cart = [];
        }

        // 중복 상품 확인
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            // 중복된 상품 수량 증가
            existingProduct.quantity += product.quantity;
        } else {
            // 새로운 상품 추가
            cart.push(product);
        }

        // 업데이트된 장바구니 데이터를 저장
        localStorage.setItem("cart", JSON.stringify(cart));

        // 확인 메시지 표시
        if (confirm("장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?")) {
            window.location.href = "../cart.html";
        }
    } catch (error) {
        console.error("장바구니 추가 중 오류 발생:", error);
        alert("장바구니에 상품을 추가하는 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
    initializeCart();
});

function goToCheckoutWithItem() {
    const product = {
        name: '흰색 티셔츠',
        price: 15000,
        quantity: parseInt(document.getElementById('quantity').value),
        image: '../assets/images/product1.webp',
    };

    // 로컬 스토리지에 상품 정보 저장
    localStorage.setItem('checkoutItem', JSON.stringify(product));

    // 결제 페이지로 이동
    window.location.href = '../checkout.html';
}
