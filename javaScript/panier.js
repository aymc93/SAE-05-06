// ==========================
//      PANIER 
// ==========================

// Charger le panier depuis localStorage
let cart = JSON.parse(localStorage.getItem("panier")) || [];

function saveCart() {
    localStorage.setItem("panier", JSON.stringify(cart));
}

// ==========================
//      AFFICHAGE PANIER
// ==========================

function renderCart() {
    const itemsContainer = document.getElementById("panier-items");
    const panierVide = document.getElementById("panier-vide");
    const subtotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const totalElement = document.getElementById("total");

    // Vider le conteneur en supprimant uniquement les cartes
    const existingCards = itemsContainer.querySelectorAll('.panier-card');
    existingCards.forEach(card => card.remove());

    // Si le panier est vide
    if (cart.length === 0) {
        if (panierVide) {
            panierVide.style.display = 'block';
        }
        subtotalElement.textContent = "0,00 €";
        shippingElement.textContent = "0,00 €";
        totalElement.textContent = "0,00 €";
        return;
    }

    // Masquer le message panier vide
    if (panierVide) {
        panierVide.style.display = 'none';
    }

    let subtotal = 0;

    // Créer chaque carte individuellement (IMPORTANT: ne pas utiliser innerHTML +=)
    cart.forEach((item, index) => {
        let totalItem = item.prix * item.quantite;
        subtotal += totalItem;

        // Créer la carte avec createElement
        const cardDiv = document.createElement('div');
        cardDiv.className = 'panier-card';
        cardDiv.setAttribute('data-index', index);

        cardDiv.innerHTML = `
            <img src="${item.image}" alt="${item.nom}">
            
            <div class="info">
                <h3>${item.nom}</h3>
                <p>Petit pot gourmand pour bébé</p>

                <div class="quantite">
                    <button class="minus">−</button>
                    <span>${item.quantite}</span>
                    <button class="plus">+</button>
                </div>
            </div>

            <div class="prix">${totalItem.toFixed(2)} €</div>

            <button class="delete-btn">
                🗑️ Supprimer
            </button>
        `;

        // Ajouter la carte au conteneur
        itemsContainer.appendChild(cardDiv);
    });

    // Mise à jour des totaux
    let shipping = cart.length > 0 ? 2.90 : 0;
    let total = subtotal + shipping;

    subtotalElement.textContent = subtotal.toFixed(2) + " €";
    shippingElement.textContent = shipping.toFixed(2) + " €";
    totalElement.textContent = total.toFixed(2) + " €";
}

// ==========================
//    GESTION DES BOUTONS
// ==========================

document.addEventListener("click", function(e) {
    const card = e.target.closest(".panier-card");
    if (!card) return;

    const index = parseInt(card.dataset.index);

    // Ajouter quantité
    if (e.target.classList.contains("plus")) {
        cart[index].quantite++;
        saveCart();
        renderCart();
    }

    // Diminuer quantité
    if (e.target.classList.contains("minus")) {
        if (cart[index].quantite > 1) {
            cart[index].quantite--;
            saveCart();
            renderCart();
        } else {
            // Demander confirmation avant de supprimer
            if (confirm("Voulez-vous retirer ce produit du panier ?")) {
                cart.splice(index, 1);
                saveCart();
                renderCart();
            }
        }
    }

    // Supprimer un produit
    if (e.target.classList.contains("delete-btn")) {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }
    }
});

// ==========================
//        AU CHARGEMENT
// ==========================

document.addEventListener("DOMContentLoaded", renderCart);