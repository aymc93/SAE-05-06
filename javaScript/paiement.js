// ==========================
//      Paiement.js
// ==========================

// Récupérer le panier depuis localStorage
const cart = JSON.parse(localStorage.getItem("panier")) || [];

// Elements du DOM
const recapSection = document.querySelector(".recap");
const lignes = recapSection.querySelectorAll(".ligne span:last-child");
const btnPayer = document.querySelector(".btn-payer");
const toast = document.getElementById("toast");

// Calcul et affichage des totaux
function afficherTotaux() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.prix * item.quantite;
    });
    let shipping = cart.length > 0 ? 2.90 : 0;
    let total = subtotal + shipping;

    if (lignes.length >= 3) {
        lignes[0].textContent = subtotal.toFixed(2) + " €"; // Sous-total
        lignes[1].textContent = shipping.toFixed(2) + " €"; // Livraison
        lignes[2].textContent = total.toFixed(2) + " €";    // Total
    }
}

// Vérification du formulaire
function formulaireValide() {
    const inputs = document.querySelectorAll("input, select");
    for (let input of inputs) {
        if (input.value.trim() === "") {
            return false;
        }
    }
    return true;
}

// Affichage du toast
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Gestion du clic sur "Valider le paiement"
btnPayer.addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Votre panier est vide !");
        return;
    }

    if (!formulaireValide()) {
        showToast("Veuillez remplir tous les champs !");
        return;
    }

    showToast("Paiement valide !");
    
});

// Au chargement de la page
document.addEventListener("DOMContentLoaded", afficherTotaux);
