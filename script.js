const modal = document.getElementById("contact-modal");
const checkoutBtn = document.getElementById("checkout-btn");
const closeBtn = document.querySelector(".close-btn");
const categoryButtons = document.querySelectorAll(".categories .badge");
const productCards = document.querySelectorAll(".tous .card");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");

let cart = [];
let total = 0;

addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        const card = this.closest(".card");
        const name = card.querySelector("h3").innerText;
        const price = parseInt(card.querySelector(".price").getAttribute("data-price"));
        
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        
        total += price;
        updateCartDisplay();
    });
});

function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        const quantityText = item.quantity > 1 ? ` x ${item.quantity}` : "";
        itemElement.innerHTML = `<span>${item.name}${quantityText}</span> <span>${(item.price * item.quantity).toLocaleString()} FCFA</span>`;
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartTotalElement.innerText = total.toLocaleString();
    cartCountElement.innerText = cart.reduce((count, item) => count + item.quantity, 0);
}

checkoutBtn.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }
    modal.classList.add("active");
});

closeBtn.addEventListener("click", function() {
    modal.classList.remove("active");
});

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.classList.remove("active");
    }
});

categoryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const category = this.getAttribute('data-category');

        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = document.getElementById('name').value;
    const telephone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    
    const detailsCommande = cart.map(item => `${item.name}${item.quantity > 1 ? ' x' + item.quantity :''} (${item.price * item.quantity} FCFA)`).join(", ");
    const totalCommande = total.toLocaleString() + " FCFA";

    const telephoneBoutique = "2250161334977"; 

    const texteMessage = `Bonjour, je suis ${nom}.%0A` +
                         `Téléphone : ${telephone}%0A` +
                         `Email : ${email}%0A%0A` +
                         `Commande : ${detailsCommande}%0A` +
                         `Total : ${totalCommande}`;

    const urlWhatsApp = `https://wa.me/${telephoneBoutique}?text=${texteMessage}`;

    window.open(urlWhatsApp, '_blank');
});