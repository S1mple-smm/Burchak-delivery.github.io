// script.js
let cart = [];
let total = 0;

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';
    total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert(`Thank you for your purchase! Your total is $${total.toFixed(2)}`);
    cart = [];
    updateCart();
}

function showDetails(itemName) {
    alert(`Showing details for: ${itemName}`);
    // Здесь можно добавить больше информации о блюде, например, открыть модальное окно
}

function searchFood() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const foodCards = document.querySelectorAll('.food-card');

    foodCards.forEach(card => {
        const itemName = card.querySelector('h2').textContent.toLowerCase();
        card.style.display = itemName.includes(searchInput) ? 'block' : 'none';
    });
}

function filterCategory(category) {
    const foodCards = document.querySelectorAll('.food-card');

    foodCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        card.style.display = (category === 'all' || itemCategory === category) ? 'block' : 'none';
    });

    // Обновляем активную кнопку категории
    document.querySelectorAll('.category').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`[onclick="filterCategory('${category}')"]`).classList.add('active');
}

// Массив продуктов
const products = [
    {
        name: 'Cheese Bust Burger',
        price: 10.67,
        category: 'burger',
        image: '\img/burger.jpg',
        description: 'Double cheese burger with lettuce and tomato.'
    },
    {
        name: 'Hot Dog',
        price: 5.67,
        category: 'Hot Dog',
        image: '\img/hot dog.jpg',
        description: 'Hot dog with chips'
    },
    {
        name: 'Coffee',
        price: 5.67,
        category: 'drink',
        image: '\img/coffee.jpg',
        description: 'Original cofee with milk'
    },
    // Добавьте больше продуктов по аналогии
];

// Функция для отображения продуктов
function displayProducts() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = ''; // Очищаем перед добавлением

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('food-card');
        card.setAttribute('data-category', product.category);

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            <button class="details" onclick="showDetails('${product.name}')">More Details</button>
        `;

        mainContent.appendChild(card);
    });
}

// Вызов функции для отображения продуктов при загрузке страницы
document.addEventListener('DOMContentLoaded', displayProducts);

// Функция для отображения модального окна с информацией о продукте
function showDetails(productName) {
    const product = products.find(p => p.name === productName);
    if (product) {
        document.getElementById('modal-image').src = product.image;
        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-description').textContent = product.description;
        document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;

        // Показать модальное окно
        const modal = document.getElementById('product-modal');
        modal.style.display = 'flex';
    }
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Функция для отображения модального окна оплаты
function showPaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    paymentModal.style.display = 'flex';
}

// Функция для закрытия модального окна оплаты
function closePaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    paymentModal.style.display = 'none';
}

// Функция для обработки платежа
function processPayment() {
    const cardNumber = document.getElementById('card-number').value;
    const cardHolder = document.getElementById('card-holder').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && cardHolder && expiryDate && cvv) {
        // Пример проверки данных (можно заменить на реальную обработку)
        alert('Оплата прошла успешно!');
        closePaymentModal();
    } else {
        alert('Пожалуйста, заполните все поля для оплаты.');
    }
}

// Закрытие модального окна при клике вне его
// window.onclick = function(event) {
//     const paymentModal = document.getElementById('payment-modal');
//     if (event.target === paymentModal) {
//         paymentModal.style.display = 'none';
//     }
// };
